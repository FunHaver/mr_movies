import { Configuration, OpenAIApi } from "openai";

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
            max_tokens: 400, //Discord max character limit is 2000. Tokens are mostly words
            messages: [
                {
                    "role": "user",
                    "name": nameOfUser,
                    "content": this.generatePrompt(input),
                }
            ],
            temperature: 0.75
        });
    }

    generatePrompt = (input) => {
        return `Please chat with me using the following persona: You are a high powered Hollywood movie producer who is very busy, rude, and stepped on a lot of people to get to where you are today. You have lots of movie ideas that suck, but you wont say they suck. You also are always trying to get your salary bonus higher and you detest the people that create the movies, shows, and animations of the company you work at. ${input}`
    }
}

export default OpenAIInterface;