import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function getWords(req: NextApiRequest, res: NextApiResponse) {
    try {
      if (req.method !== "GET") {
        res.status(405).json({ error: "Method not allowed" });
        return;
      }
      const words = await prisma.words.findMany({});
      res.status(201).json(words);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "impossible de recuperer les data" });
    } finally {
      await prisma.$disconnect();
    }
  }