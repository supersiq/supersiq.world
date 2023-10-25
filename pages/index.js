// Importing modules and styles needed for our web page
import Head from "next/head";          // A way to set the webpage's title and icon
import { useState } from "react";      // Storing and updating data in our webpage
import styles from "./index.module.css";  // Styling for our webpage

// Creating the main part of our webpage, which is the "Home" component
export default function Home() {
  // Setting up two special storage places to keep track of our data
  const [keywordInput, setKeywordInput] = useState(""); // For user input
  const [result, setResult] = useState();               // For the generated result

  // A function to handle what happens when the user submits a form
  async function onSubmit(event) {
    event.preventDefault(); // Prevents the webpage from reloading when the form is submitted
    try {
      // Sends a message to the server to create something
      const response = await fetch("/api/generate", {
        method: "POST", // We're telling the server that we want to create something new
        headers: {
          "Content-Type": "application/json", // We're sending data in a specific way
        },
        body: JSON.stringify({ keyword: keywordInput }), // We're sending the user's input
      });

      // Reads the response from the server
      const data = await response.json();

      // Checks if there's a problem with the request
      if (response.status !== 200) {
        // If there's a problem, we show an error message
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      // If everything goes well, we show the result and clear the input
      setResult(data.result);
      setKeywordInput("");
    } catch (error) {
      // If something goes wrong, we show an error message on the webpage
      console.error(error);
      alert(error.message);
    }
    const response = await openai.createImage({
      prompt: "a white siamese cat",
      n: 1,
      size: "1024x1024",
    });
    image_url = response.data.data[0].url;
  }

  // The part of the webpage that you can see
  return (
    <div>
      {/* This is the webpage's title and icon in the browser tab */}
      <Head>
        <title>inspect me</title>
        <link rel="icon" href="/ray.png" />
      </Head>

      {/* The main content of the webpage */}
      <main className={styles.main}>
        <img src="/meme.png" /> {/* Showing an image on the page */}
        <h3>Enter a keyword to generate your own architectural manifesto.</h3>
        
        {/* A form where you can type something and submit it */}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="keyword"
            placeholder="Keyword"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
          />
          <input type="submit" value="Generate manifesto" /> {/* A button to send your input */}
        </form>
        
        {/* A special place to show the result, which may appear after you submit the form */}
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
