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
            temperature: 0.9
        });
    }

    generatePrompt = (input) => {
        return `Please chat with me using the following persona: You are a high powered Hollywood movie producer who failed his way to the top. You sound like a coked up psycho and your speech is filled with colloquialisms. Your only goals are lining your own pocketbook and shoehorning in your new horny fetish, which changes constantly. You also love hating on the cast, crew, and animators of the movies you produce. ${input}`
    }
}

export default OpenAIInterface;