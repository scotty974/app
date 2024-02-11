import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from 'cors'

const prisma = new PrismaClient();

// Initializing the cors middleware
const cors = Cors({
  origin: "*", // Autorise toutes les origines (à ajuster en fonction de vos besoins de sécurité)
  methods: ["GET", "HEAD"],
});

// Helper method to make middleware work
async function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise<void>((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve();
    });
  });
}

export default async function getWords(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Run the middleware
    await runMiddleware(req, res, cors);

    if (req.method !== "GET") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const words = await prisma.words.findMany({});
    res.status(200).json(words);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Impossible de récupérer les données" });
  } finally {
    await prisma.$disconnect();
  }
}
