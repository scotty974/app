"use client";
import getWords from "@/pages/api/words/getAll";
import { useEffect, useState } from "react";

export default function Home() {
  const [wordsList, setWordsList] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const resp = await fetch("api/words/getAll", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await resp.json();

        setWordsList(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchdata();
  }, []);

  return (
    <section className="container m-auto flex gap-5">
      {wordsList.map((item: any, index) => (
        <div key={index} className="flex flex-col">
          <span>{item.word}</span>
          <span>{item.declinaison}</span>
          <span>{item.description}</span>
        </div>
      ))}
    </section>
  );
}
