import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const app = express();
app.use( cors() );
app.use( express.json() );

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello World!'
        });
});

app.post('/chat', async (req, res) => {
    try {
        // get the prompt from the request body
	    const prompt = req.body.prompt;
	    
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: prompt,
            temperature: 0.05,
            maxTokens: 3000,
            topP: 1,
            frequencyPenalty: 0.5,
            presencePenalty: 0,
        });

        // send the response to the client
        res.status(200).send({
            bot: response.data.choices[0].text
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({error});
    }
});

app.listen( 5000, () => { console.log('Server is running on port http://localhost:5000')} );