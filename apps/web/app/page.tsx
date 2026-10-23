'use client'
import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { useState } from "react";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function checkApi() {
    setLoading(true);
    setResult("");

    try {
      const response = await fetch(
        "http://localhost:5000/health"
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold">
        Nerux Engineer
      </h1>

      <p className="text-gray-500">
        AI software engineering agent
      </p>

      <button
        onClick={checkApi}
        disabled={loading}
        className="rounded-lg bg-black px-5 py-3 text-white disabled:opacity-50"
      >
        {loading ? "Connecting..." : "Test API Connection"}
      </button>

      {result && (
        <pre className="w-full max-w-lg overflow-auto rounded-lg border p-4 text-sm">
          {result}
        </pre>
      )}
    </main>
  );
}
