import openai from './openai';

const modelQuery = async () => {
    try {
        const res = await openai.listModels();
        const models = res.data.data;
        return models;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export default modelQuery;
