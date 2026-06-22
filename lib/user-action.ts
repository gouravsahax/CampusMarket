import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

export async function getProfile() {
    const session = await auth()

    console.log(session);
}