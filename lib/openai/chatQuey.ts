import openai from './openai';
const chatQuery = async (prompt: string, model: string) => {
    try {
        const res = await openai.createCompletion({
            model,
            prompt,
            temperature: 0.9,
            max_tokens: 1000,
            top_p: 0.7,
            frequency_penalty: 0.0,
            presence_penalty: 0.6,
        });
        return res.data.choices[0].text;
    } catch (error) {
        return `ChatGPT was unable to find an answer for that! (${error})`;
    }
};

export default chatQuery;
