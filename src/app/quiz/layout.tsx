import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Quiz de Estilo | Punto Gema Nova',
    description: 'Descubre qué estilo de joyería va contigo.',
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
