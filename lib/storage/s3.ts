import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!;

export interface UploadResult {
    url: string;
    key: string;
}

/**
 * Upload file to S3
 */
export async function uploadFile(
    file: Buffer,
    key: string,
    contentType: string
): Promise<UploadResult> {
    try {
        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
            Body: file,
            ContentType: contentType,
            ACL: 'public-read', // Make files publicly accessible
        });

        await s3Client.send(command);

        const url = `https://${BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${key}`;

        return { url, key };
    } catch (error: any) {
        console.error('S3 upload error:', error);
        throw new Error(error.message || 'Failed to upload file');
    }
}

/**
 * Upload multiple files to S3
 */
export async function uploadFiles(
    files: Array<{ buffer: Buffer; key: string; contentType: string }>
): Promise<UploadResult[]> {
    try {
        const uploadPromises = files.map((file) =>
            uploadFile(file.buffer, file.key, file.contentType)
        );
        return await Promise.all(uploadPromises);
    } catch (error: any) {
        console.error('S3 multiple upload error:', error);
        throw new Error(error.message || 'Failed to upload files');
    }
}

/**
 * Delete file from S3
 */
export async function deleteFile(key: string): Promise<void> {
    try {
        const command = new DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
        });

        await s3Client.send(command);
    } catch (error: any) {
        console.error('S3 delete error:', error);
        throw new Error(error.message || 'Failed to delete file');
    }
}

/**
 * Delete multiple files from S3
 */
export async function deleteFiles(keys: string[]): Promise<void> {
    try {
        const deletePromises = keys.map((key) => deleteFile(key));
        await Promise.all(deletePromises);
    } catch (error: any) {
        console.error('S3 multiple delete error:', error);
        throw new Error(error.message || 'Failed to delete files');
    }
}

/**
 * Get signed URL for private file access
 */
export async function getSignedFileUrl(
    key: string,
    expiresIn: number = 3600
): Promise<string> {
    try {
        const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
        });

        const url = await getSignedUrl(s3Client, command, { expiresIn });
        return url;
    } catch (error: any) {
        console.error('S3 signed URL error:', error);
        throw new Error(error.message || 'Failed to generate signed URL');
    }
}

/**
 * Generate unique file key with timestamp
 */
export function generateFileKey(
    folder: string,
    filename: string,
    extension: string
): string {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const sanitizedFilename = filename
        .replace(/[^a-z0-9]/gi, '_')
        .toLowerCase()
        .substring(0, 50);

    return `${folder}/${timestamp}-${randomString}-${sanitizedFilename}.${extension}`;
}

/**
 * Extract S3 key from URL
 */
export function extractKeyFromUrl(url: string): string | null {
    try {
        const urlObj = new URL(url);
        const key = urlObj.pathname.substring(1); // Remove leading slash
        return key;
    } catch (error) {
        console.error('Invalid URL:', url);
        return null;
    }
}

export { s3Client };
