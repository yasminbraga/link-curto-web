"use client";
import api from "@/services/api";
import copy from "clipboard-copy";
import { useRef, useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const submitUrl = async () => {
    const res = await api.post("/links", { url });
    setShortUrl(res.data);
  };

  const handleCopy = async () => {
    try {
      await copy(shortUrl);
      setIsCopied(true);
    } catch (error) {
      console.error("Falha ao copiar", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-2xl text-blue-500 font-semibold">
        Encurtador de link
      </h1>
      <label htmlFor="">Encurte seu link:</label>
      <div className="rounded overflow-hidden mb-4">
        <input
          type="text"
          ref={inputRef}
          placeholder="Cole sua url aqui"
          className="border border-gray-300 p-2 rounded-l"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={submitUrl}
          className="bg-blue-500 text-white font-semibold p-2 border border-blue-500"
        >
          Encurtar link
        </button>
      </div>
      {shortUrl ? (
        <div className="rounded overflow-hidden flex">
          <div className="border border-gray-300 p-2 rounded-l">{shortUrl}</div>

          <button
            onClick={handleCopy}
            className={`text-white font-semibold p-2 border  ${
              isCopied
                ? "bg-green-500 border-green-500"
                : "bg-blue-500 border-blue-500"
            }`}
          >
            {isCopied ? "Copiado!" : "Copiar"}
          </button>
        </div>
      ) : (
        ""
      )}
    </main>
  );
}
