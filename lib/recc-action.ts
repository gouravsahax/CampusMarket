"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createRecc(data: FormData) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

//   console.log(session.user)

  const title = data.get("title") as string;
  const desc = data.get("desc") as string;
  const url = data.get("url") as string;
  const type = data.get("type") as string;

  try {
    await prisma.recc.create({
      data: {
        title: title,
        description : desc,
        url: url,
        type: type,
        userId: session.user.id,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create recommendation");
  }

  redirect("/reccs")
}