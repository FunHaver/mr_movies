import * as dotenv from 'dotenv';
import DiscordCommunicator from './discordCommunicator.js';

dotenv.config();
const token = process.env.DISCORD_TOKEN;

const discordCommunicator = new DiscordCommunicator(token);

discordCommunicator.initializeConnection();