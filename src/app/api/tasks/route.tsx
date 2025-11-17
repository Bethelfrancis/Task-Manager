import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId")!;

    const tasks = await prisma.task.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tasks);
}

export async function POST(req: Request) {
    const { title, description } = await req.json();

    const {
        data: { session },
    } = await supabase.auth.getSession();

    const task = await prisma.task.create({
        data: { title, description, userId: session!.user.id },
    });

    return NextResponse.json(task);
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id")!;

    await prisma.task.delete({ where: { id } });

    return NextResponse.json({ success: true });
}
