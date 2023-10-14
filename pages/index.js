import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [keywordInput, setKeywordInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword: keywordInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setKeywordInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/meme.png" />
      </Head>

      <main className={styles.main}>
        <img src="/meme.png"/>
        <h3>Become a world builder! Enter a keyword to build your own architectural manifesto.</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="keyword"
            placeholder="lil keyword pls"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
          />
          <input type="submit" value="Generate manifesto" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
