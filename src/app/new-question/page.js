"use client";

import { useState } from "react";
import { useMutation } from "react-query";
import { addQuestionService } from "@/services/questions";
import { isEmptyOrSpaces } from "@/utils/helpers";
import Link from "next/link";

export default function NewQuestion() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const mutation = useMutation({
    mutationFn: (data) => addQuestionService(data),
    onSuccess: () => {
      alert("Soru başarıyla eklendi.");
      setQuestion("");
      setAnswer("");
    },
    onError: (error) =>
      alert("Soru eklenirken bir hata oluştu.\n" + error.data),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmptyOrSpaces(question) || isEmptyOrSpaces(answer)) {
      alert("Girişlerinizde hata var!");
      return;
    }
    mutation.mutate({ question, answer });
  };

  return (
    <div className="p-4 xl:p-0 max-w-[1030px] w-full min-h-full mx-auto flex flex-col gap-10 items-center justify-center">
      <Link
        href="/"
        className="px-4 py-2 bg-[#ffdd29] text-black rounded-lg hover:opacity-75 transition-all"
      >
        Ana Sayfaya Dön
      </Link>
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 w-full bg-[#0d0d0d] shadow shadow-[#ffdd29] p-8 rounded-lg"
      >
        <h2 className="text-2xl font-extrabold mb-5">Soru Ekleme Sihirbazı</h2>
        <div>
          <p className="text-lg mb-2.5">Soru:</p>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 w-full h-10 bg-[#212121] outline-none p-4 rounded-lg"
          />
        </div>
        <div>
          <p className="text-lg mb-2.5">Cevap:</p>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full h-10 bg-[#212121] outline-none p-4 rounded-lg"
          />
        </div>
        <button
          disabled={mutation.isLoading}
          type="submit"
          className="px-4 py-2 mt-5 bg-[#ffdd29] text-black rounded-lg hover:opacity-75 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Ekle
        </button>
      </form>
    </div>
  );
}
