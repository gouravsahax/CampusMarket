"use server";

import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

export async function getProfile() {
    const session = await auth();

    if(!session?.user) {
        return null;
    }

    try{
        const user = await prisma.user.findFirst({
            where: {
                id: session.user.id
            }
        })

        // console.log(user);
        return user
    } catch {
        throw new Error("Error in fetching user data");
    }
}
