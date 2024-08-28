const OpenAI = require('openai')
const express = require('express');
const openai = new OpenAI();

/*
const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
        {
            "role": "user",
            "content": "write a haiku about ai",
        }
    ]
});
*/

const app = express()

app.get('/', (req, res) => {
    res.send('Hello, Node.js server! v3')
});

app.get('/completions', async (req, res) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a helper assistant."
            },
            {
                "role": "user",
                "content": "write a summary of how the golden state warriors and toronto raptors did recently"
            }
        ]
   });

  console.log(completion)
  console.log(completion.choices[0].message.content);
  res.send(`Hello, you've reached the completion page. message: ${completion.choices[0].message.content}`);
  //res.send(completion)
});

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


