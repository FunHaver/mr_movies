import { REST } from '@discordjs/rest';
import { WebSocketManager } from '@discordjs/ws';
import { GatewayDispatchEvents, GatewayIntentBits, Client, UsersAPI } from '@discordjs/core';

class DiscordCommunicator {

    constructor(token){
        this.token = token;
        // Create REST and WebSocket managers directly
        this.rest = new REST({version: '10'}).setToken(token);
        this.gateway = new WebSocketManager({
            token,
            intents: GatewayIntentBits.GuildMessages | GatewayIntentBits.MessageContent,
            rest: this.rest
        });

        // Create a client to emit relevant events.
        this.client = new Client({ rest: this.rest, gateway: this.gateway });

        this.usersAPI = new UsersAPI(this.rest);
        this.botUser = {};
    }

    /**
     * async function that connects this nodejs app to the discord gateway
     * and sets various listeners for interactions. For each new interaction,
     * add the function below the ready log fn
     */
    initializeConnection = async () => {
        // Start the WebSocket connection.
        await this.gateway.connect();

        //Record ready state to console log
        this.client.once(GatewayDispatchEvents.Ready, () => {
            console.log('Ready!');
        });

        this.botUser = await this.usersAPI.getCurrent();
        this.replyToMentions();
    }

    /**
     * Listens for any message to be created in any given channel in a "guild" a.k.a server
     * If the bot is tagged, they respond with the tagger's tag
     */
    replyToMentions = () => {
        this.client.on(GatewayDispatchEvents.MessageCreate, async({ data: interaction, api}) => {
            if(interaction.content.includes(`<@${this.botUser.id}>`)){
                let taggedUser = `<@${interaction.author.id}>`;
                await api.channels.createMessage(interaction.channel_id, {
                    content: `Hey ${taggedUser}`
                })
            }
        })
    }
}

export default DiscordCommunicator;