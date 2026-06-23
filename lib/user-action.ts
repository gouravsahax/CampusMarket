"use server";

import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

export async function getProfile() {
    const session = await auth();

    if(!session?.user) {
        return null;
    }

    return {name:session?.user?.name, email:session?.user?.email}
}