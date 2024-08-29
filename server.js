require('dotenv').config()

const OpenAI = require('openai')
const express = require('express');
const data = require('./data.json')

const openai = new OpenAI({
    apiKey: `${process.env.OPENAI_API_KEY}`,
});

const app = express()
app.use('/api/', express.json());

app.get('/api/', (req, res) => {
    res.send('Hello, Node.js server! v3')
});

app.get('/api/reminders', (req, res) => {
    res.send(data.reminders)
})

app.get('/api/reminders/:id', (req, res) => {

    const reminderId = parseInt(req.params.id)
    const reminder = data.reminders.find( reminder  => reminder.id == reminderId)
    console.log(reminder)
    if (reminder) {
        res.send(reminder)
    }
    else {
        res.status(404).send({error: 'Reminder not found' });
    }
});
    
app.get('/api/completions', async (req, res) => {
    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: 'You are a helper assistant.'
            },
            {
                'role': 'user',
                'content': 'write a summary of how the golden state warriors and toronto raptors did recently'
            }
        ]
   });

  res.send(`Hello, you've reached the completion page. message: ${completion.choices[0].message.content}`);
});

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


