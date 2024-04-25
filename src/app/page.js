"use client";

import Image from "next/image";
import { useMessages } from "@/store/chat/hooks";
import MessageItem from "@/components/message-item";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { getQuestionService } from "@/services/questions";
import { addMessage } from "@/store/chat/actions";
import { isEmptyOrSpaces } from "@/utils/helpers";

export default function Home() {
  const [text, setText] = useState("");
  const messages = useMessages();
  const ref = useRef(null);

  const mutation = useMutation({
    mutationFn: (data) => getQuestionService(data),
    onSuccess: (data) => {
      if (data?.data?.answer?.length > 0) {
        addMessage({
          isBot: true,
          text: data.data.answer,
        });
      } else {
        addMessage({
          isBot: true,
          text: data.data,
        });
      }
    },
    onError: () =>
      addMessage({
        isBot: true,
        text: "I don't understand. You can teach me the answer to this or try again later!",
      }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEmptyOrSpaces(text)) {
      return alert("Lütfen bir giriş yapın");
    }

    addMessage({
      isBot: false,
      text,
    });
    setText("");
    mutation.mutate({ question: text });
  };

  useEffect(() => {
    ref.current.scrollTo({
      top: ref.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="p-4 xl:p-0 max-w-[1030px] w-full min-h-full mx-auto flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4 w-full bg-[#0d0d0d] shadow shadow-[#ffdd29] p-8 rounded-lg">
        <header className="w-full flex items-center justify-between border-b-2 border-[#1b1b1b] pb-4">
          <div className="flex items-center gap-x-4">
            <div className="relative">
              <Image
                width={512}
                height={512}
                className="w-12 h-12 md:w-20 md:h-20 rounded-full object-cover"
                src="https://cdn-icons-png.flaticon.com/512/219/219986.png"
                alt="profile photo"
              />
              <div className="absolute bottom-0.5 right-0.5 animate-pulse ring-2 ring-white w-4 h-4 rounded-full bg-green-500" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-bold text-base md:text-lg">
                Siro39 AI ChatBot
              </p>
              <p className="text-xs text-[#cccccc]">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-x-4 md:gap-x-10 text-[#ffdd29]">
            <div className="md:w-12 md:h-12 flex items-center justify-center rounded-full hover:bg-[#222222] cursor-pointer transition-all">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <path d="M436.9 364.8c-14.7-14.7-50-36.8-67.4-45.1-20.2-9.7-27.6-9.5-41.9.8-11.9 8.6-19.6 16.6-33.3 13.6-13.7-2.9-40.7-23.4-66.9-49.5-26.2-26.2-46.6-53.2-49.5-66.9-2.9-13.8 5.1-21.4 13.6-33.3 10.3-14.3 10.6-21.7.8-41.9C184 125 162 89.8 147.2 75.1c-14.7-14.7-18-11.5-26.1-8.6 0 0-12 4.8-23.9 12.7-14.7 9.8-22.9 18-28.7 30.3-5.7 12.3-12.3 35.2 21.3 95 27.1 48.3 53.7 84.9 93.2 124.3l.1.1.1.1c39.5 39.5 76 66.1 124.3 93.2 59.8 33.6 82.7 27 95 21.3 12.3-5.7 20.5-13.9 30.3-28.7 7.9-11.9 12.7-23.9 12.7-23.9 2.9-8.1 6.2-11.4-8.6-26.1z" />
              </svg>
            </div>
            <div className="md:w-12 md:h-12 flex items-center justify-center rounded-full hover:bg-[#222222] cursor-pointer transition-all">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 576 512"
                height="200px"
                width="200px"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <path d="M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z" />
              </svg>
            </div>
            <div className="md:w-12 md:h-12 flex items-center justify-center rounded-full hover:bg-[#222222] cursor-pointer transition-all">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 128 512"
                height="200px"
                width="200px"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
              </svg>
            </div>
          </div>
        </header>
        <div
          ref={ref}
          className="flex flex-col gap-5 w-full h-[400px] md:h-[500px] overflow-auto pr-4"
        >
          <div className="w-full md:w-3/4 p-5 rounded-lg bg-[#1b1b1b]">
            Hi! Im Siro39 AI ChatBot. You can ask me everything.
          </div>
          {messages.map((message, idx) => (
            <MessageItem key={idx} message={message} />
          ))}
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col border-t-2 border-[#1b1b1b] pt-4"
        >
          {mutation.isLoading && (
            <div className="flex items-center gap-x-2.5 mb-4 pl-2">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 animate-spin"
              >
                <path d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3 22.2 52.4 53.9 99.5 94.3 139.9 40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6 52.4-22.2 99.5-53.9 139.9-94.3 40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7-63.1 26.8-130.2 40.3-199.3 40.3z" />
              </svg>
              <p>Siro39 AI ChatBot is typing...</p>
            </div>
          )}
          <div className="w-full flex items-center gap-4">
            <input
              type="text"
              placeholder="Write something..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 h-10 bg-[#212121] outline-none p-4 rounded-lg"
            />
            <button
              disabled={mutation.isLoading}
              type="submit"
              className="flex-shrink-0 w-10 h-10 bg-[#ffdd29] flex items-center justify-center text-black rounded-lg hover:opacity-75 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
              >
                <path d="m476.59 227.05-.16-.07L49.35 49.84A23.56 23.56 0 0 0 27.14 52 24.65 24.65 0 0 0 16 72.59v113.29a24 24 0 0 0 19.52 23.57l232.93 43.07a4 4 0 0 1 0 7.86L35.53 303.45A24 24 0 0 0 16 327v113.31A23.57 23.57 0 0 0 26.59 460a23.94 23.94 0 0 0 13.22 4 24.55 24.55 0 0 0 9.52-1.93L476.4 285.94l.19-.09a32 32 0 0 0 0-58.8z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
      <p className="mt-4 text-[#cccccc] text-xs">Powered by Sirac Yakut</p>
    </div>
  );
}
