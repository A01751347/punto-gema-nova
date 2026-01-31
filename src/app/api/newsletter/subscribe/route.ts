import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { error: 'Email inválido' },
                { status: 400 }
            );
        }

        // Check if already subscribed
        const existing = await prisma.newsletterSubscriber.findUnique({
            where: { email },
        });

        if (existing) {
            // If disabled, re-enable
            if (!existing.isActive) {
                await prisma.newsletterSubscriber.update({
                    where: { email },
                    data: { isActive: true },
                });
            }
            return NextResponse.json({ message: 'Ya estás suscrito.' }, { status: 200 });
        }

        await prisma.newsletterSubscriber.create({
            data: {
                email,
            },
        });

        return NextResponse.json({ message: '¡Suscripción exitosa!' }, { status: 200 });

    } catch (error) {
        console.error('Newsletter error:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}
