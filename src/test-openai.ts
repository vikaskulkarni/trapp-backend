import { OpenAIApi, Configuration } from 'openai';
import 'dotenv/config';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function testOpenAI() {
  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: 'Say something nice',
      max_tokens: 10,
    });

    console.log(completion.data.choices[0].text);
  } catch (error) {
    console.error(
      'Error communicating with OpenAI:',
      error.response ? error.response.data : error.message,
    );
  }
}

testOpenAI();
