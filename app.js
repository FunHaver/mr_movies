/**
 * The following file is so far copied from the example usage in discord.js docs
 * https://discord.js.org/docs/packages/core/0.6.0
 */
import { REST } from '@discordjs/rest';
import { WebSocketManager } from '@discordjs/ws';
import { GatewayDispatchEvents, GatewayIntentBits, InteractionType, MessageFlags, Client } from '@discordjs/core';
import * as dotenv from 'dotenv';

dotenv.config();
const token = process.env.DISCORD_TOKEN;


// Create REST and WebSocket managers directly
const rest = new REST({version: '10'}).setToken(token);
const gateway = new WebSocketManager({
    token,
    intents: GatewayIntentBits.GuildMessages | GatewayIntentBits.MessageContent,
    rest
});

// Create a client to emit relevant events.
const client = new Client({ rest, gateway });

// Listen for interactions
// Each event contains an `api` prop along with the event data that allows you to interface with the Discord REST API

client.on(GatewayDispatchEvents.MessageCreate, async ({ data: interaction, api }) => {
    console.log(interaction)
    if(interaction.content !== "ping"){
        return;
    }

    await api.channels.createMessage("", {
        "content": "Pong"
    })
});

// Listen for the ready event
client.once(GatewayDispatchEvents.Ready, (api) => {
    console.log('Ready!');
    api.api.channels.createMessage("",{
        "content": "Hello"
    })
});

// Start the WebSocket connection.
gateway.connect();