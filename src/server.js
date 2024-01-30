const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

const openai = new OpenAI({ apiKey: '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' });

app.use(cors());
app.use(bodyParser.json());

app.post('/QuizPage', async (req, res) => {
  try {
    const { language, difficulty, number, type } = req.body;

    console.log(`Received request with data: ${language}, ${difficulty}, ${number}, ${type}`);

    const completion = await openai.chat.completions.create({
      messages: [
        { "role": "system", "content": "You are a quiz assistant." },
        { "role": "user", "content": `create a quiz based on ${language} programming with difficulty level ${difficulty}, ${number} questions, and question style ${type}.` },
      ],
      model: "gpt-3.5-turbo",
      response_format: { type: 'text' },
    });

    const generatedQuiz = completion.choices[0].message.content;
    console.log(`Generated quiz: ${generatedQuiz}`);

    res.json({ quiz: generatedQuiz });
  } catch (error) {
    console.error('Error in /QuizPage:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});










