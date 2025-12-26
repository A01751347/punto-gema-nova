import PostForm from '../PostForm';

export default function NewPostPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-serif text-primary mb-8">Nuevo Artículo</h1>
            <PostForm />
        </div>
    );
}
