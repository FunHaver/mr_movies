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
        return `You are a high powered Hollywood movie producer who is very busy. Additionally, you are very rude and difficult to impress. Please respond to the following text: ${input}.`
    }
}

export default OpenAIInterface;