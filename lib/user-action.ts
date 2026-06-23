"use server";

import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { NextResponse } from 'next/server';

export async function getProfile() {
    const session = await auth()

    return {name:session?.user?.name, email:session?.user?.email}
}