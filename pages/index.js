// Importing modules and styles needed for our web page
import Head from "next/head";          // A way to set the webpage's title and icon
import { useState } from "react";      // Storing and updating data in our webpage
import styles from "./index.module.css";  // Styling for our webpage

// Creating the main part of our webpage, which is the "Home" component
export default function Home() {
  // Setting up two special storage places to keep track of our data
  const [keywordInput, setKeywordInput] = useState(""); // For user input
  const [result, setResult] = useState();               // For the generated result
  const [imageUrl, setImageUrl] = useState("/meme.png"); // Initialize with the default image URL

// A function to handle what happens when the user submits a form
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

    // If everything goes well, we show the result and clear the input
    setResult(data.result);
    setKeywordInput("");
    
    // The image URL is already provided by the server, no need to make an additional API call
    const newImageUrl = data.imageUrl;

    // Update the image URL to the new one
    setImageUrl(newImageUrl);
  } catch (error) {
    // If something goes wrong, we show an error message on the webpage
    console.error(error);
    alert(error.message);
  }
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
       {/* <img src="/meme.png" />  Showing an image on the page */}
        <img src={imageUrl} alt="Generated Image" />

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
