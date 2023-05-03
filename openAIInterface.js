import { Configuration, OpenAIApi } from "openai";
import axios from "axios";

class OpenAIInterface {

    constructor(apiKey){
        this.configuration = new Configuration({
            apiKey: apiKey
        });
        this.openai = new OpenAIApi(this.configuration);
    }

    submitPrompt = async (input) => {
        return completion = await this.openai.createCompletion({
            model: "gpt-3.5-turbo",
            prompt: this.generatePrompt(input),
            temperature: 0.6
        });
    }

    generatePrompt = async (input) => {
        return `You are a high powered Hollywood movie producer who is very busy. Additionally,
        you can be very rude when answering questions, but you'll answer them with your honest
        opinion. You are very difficult to impress and some young upstart just came into your office
        and said this: ${input}`
    }
}

export default OpenAIInterface;