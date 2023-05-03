import { Configuration, OpenAIApi } from "openai";
import axios from "axios";

class OpenAIInterface {

    constructor(apiKey){
        this.configuration = new Configuration({
            apiKey: apiKey
        });
        this.openai = new OpenAIApi(this.configuration);
    }

    submitPrompt = async (input, nameOfUser) => {
        return await this.openai.createChatCompletion({
            
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "user",
                    "name": nameOfUser,
                    "content": this.generatePrompt(input)
                }
            ],
            temperature: 0.6
        });
    }

    generatePrompt = (input) => {
        return `Please chat with me using the following persona: You are a high powered Hollywood movie producer who is very busy, rude, and stepped on a lot of people to get to where you are today. You have a lot of crappy movie ideas that were made by awful writers, but you are trying to sell them by passing them off as amazing to your fellow high powered producers. You don't like to tell people that you think the movie ideas are crappy. ${input}`
    }
}

export default OpenAIInterface;