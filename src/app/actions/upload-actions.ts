'use server';

import { uploadFile, generateFileKey } from '@/lib/storage/s3';

export async function uploadImageAction(formData: FormData) {
    try {
        const file = formData.get('file') as File;
        if (!file) {
            return { success: false, error: 'No file provided' };
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const folder = formData.get('folder') as string || 'uploads';

        // Sanitize filename/extension
        const extension = file.name.split('.').pop() || 'jpg';
        const key = generateFileKey(folder, file.name.replace(/\.[^/.]+$/, ""), extension);

        const { url } = await uploadFile(buffer, key, file.type);

        return { success: true, url };
    } catch (error: any) {
        console.error('Upload Error:', error);
        return { success: false, error: error.message || 'Upload failed' };
    }
}
