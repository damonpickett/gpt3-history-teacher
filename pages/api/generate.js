import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = `
Tell me about an historical subject in the from of a detailed, well-researched story. Write in the style of American author Hunter S. Thompson. Use a lot of bizarre similies. Be sure to explain the circumstances surrounding the event as well as the event itself. Keep the language concise.

Subject:
`;
const generateAction = async (req, res) => {
    // Run first prompt
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.userInput}\n`,
        temperature: 0.7,
        max_tokens: 750,
    });


    const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json({ output: basePromptOutput });
    setFirstOutput(true);
};

export default generateAction;