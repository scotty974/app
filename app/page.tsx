'use client'
import word from "@/pages/api/words/interface.word";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState<word>({
    word: "",
    declinaison: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resp = await fetch("api/words.create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (resp.ok) {
        console.log("Mot crée avec succès !");
      } else {
        console.log("Une erreur s'est produit ");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form action="" >
      <input
        type="text"
        value={formData.word}
        onChange={handleChange}
        name="declinaison"
      />
      <input
        type="text"
        value={formData.declinaison}
        onChange={handleChange}
        name="declinaison"
      />
      <input
        type="text"
        value={formData.description}
        onChange={handleChange}
        name="description"
      />
      <button type="submit">create</button>
    </form>
  );
}
