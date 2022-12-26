import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = `
Generate an outline for an objective story about a historical subject which will present multiple viewpoints.

Subject:
`;
const generateAction = async (req, res) => {
    // Run first prompt
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.userInput}\n`,
        temperature: 0.7,
        max_tokens: 500,
    });


    const basePromptOutput = baseCompletion.data.choices.pop();

    const secondPrompt =`
    Use the Subject and Outline below to generate a Story. Write in the style of Hunter S. Thompson.
    Subject: ${req.body.userInput}
    Outline: ${basePromptOutput.text}
    Story:`

    const secondPromptCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${secondPrompt}\n`,
        temperature: 0.7,
        max_tokens: 750,
    });

    const secondPromptOutput = secondPromptCompletion.data.choices.pop();

    res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;