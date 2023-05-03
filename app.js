import * as dotenv from 'dotenv';
import DiscordCommunicator from './discordCommunicator.js';
import OpenAIInterface from './openAIInterface.js';

dotenv.config();
const discordToken = process.env.DISCORD_TOKEN;
const openAIKey = process.env.OPENAI_KEY;
const discordCommunicator = new DiscordCommunicator(discordToken);
const gptAPI = new OpenAIInterface(openAIKey);

discordCommunicator.initializeConnection();