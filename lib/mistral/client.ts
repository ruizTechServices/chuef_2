import { Mistral } from '@mistralai/mistralai';

const apiKey = process.env.MISTRAL_API_KEY;
if (!apiKey) {
  throw new Error('MISTRAL_API_KEY environment variable is required');
}

const client = new Mistral({apiKey: apiKey});

export default client;