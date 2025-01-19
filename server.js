require('dotenv').config(); // Load .env file
const express = require('express'); // Import Express framework
const axios = require('axios'); // Import Axios library
const cors = require('cors'); // Import CORS middleware

const app = express();
const PORT = 3001; // Backend server port
const apiKey = process.env.OPENAI_API_KEY; // Load OpenAI API key from .env file

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware: Parse JSON requests

// Define a POST route for the frontend to call
app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body; // Get user input from request body

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    // Call OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Send the response back to the frontend
    res.json({ answer: response.data.choices[0].message.content.trim() });
  } catch (error) {
    console.error('Error communicating with OpenAI API:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
