import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured.",
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(req.body.keyword || ""),
      max_tokens: 100,
      temperature: 0.6,
    });

    // Generate an image based on the keyword
    const imageResponse = await openai.createImage({
      prompt: req.body.keyword, // Use the keyword directly to generate an image
      n: 1,
      size: "1024x1024",
    });

    res.status(200).json({
      result: completion.data.choices[0].text,
      imageUrl: imageResponse.data.data[0].url, // Include the image URL in the response
    });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(keyword) {
  return `Generate a short, 100-word, architectural manifesto in words based on the keyword: ${keyword}.
          Make it snappy and spoken like a classical manifesto with elements such as
          abandoning all old technology and get on board with this new ${keyword}`;
}
