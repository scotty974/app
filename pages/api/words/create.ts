import { PrismaClient } from "@prisma/client";
import { useRef } from "react";
import word from "./interface.word";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function createWords(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: "method not posted" });
      return;
    }
    const { word, declinaison, description }: word = req.body;

    const createdWord = await prisma.words.create({
      data: {
        word: word,
        declinaison: declinaison,
        description: description,
      },
    });
    res.status(201).json(createdWord);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
