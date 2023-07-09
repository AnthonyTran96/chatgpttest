// model: Xác định phiên bản mô hình ChatGPT được sử dụng.
// prompt: Đoạn văn bản được gửi làm câu hỏi hoặc đầu vào cho mô hình ChatGPT.
// temperature: Điều chỉnh độ ngẫu nhiên trong câu trả lời. Giá trị càng cao thì câu trả lời càng ngẫu nhiên và đa dạng. Giá trị càng thấp thì câu trả lời càng chính xác và thận trọng.
// max_tokens: Giới hạn số lượng từ tối đa trong câu trả lời được sinh ra bởi mô hình. Nếu giá trị này thấp, câu trả lời sẽ ngắn hơn và tập trung vào thông tin quan trọng.
// top_p: Xác định phần trăm xác suất cộng dồn để tạo câu trả lời. Giá trị càng cao, câu trả lời càng đa dạng.
// frequency_penalty: Điều chỉnh sự lặp lại của cụm từ trong câu trả lời. Giá trị càng cao, mô hình sẽ tránh tái sử dụng các cụm từ đã xuất hiện trước đó.
// presence_penalty: Điều chỉnh sự xuất hiện của các cụm từ không liên quan trong câu trả lời. Giá trị càng cao, mô hình sẽ tránh sử dụng các cụm từ không liên quan.

import openai from './openai';
const titleQuery = async (question: string, model: string) => {
    const prompt = `Impersonate an intelligent AI with the sole task as follows: "I will provide you with a question sentence to initiate a conversation with OpenAI's ChatGPT tool. Based on the question's content, create a suitable title for the conversation that will be formed around that question, using fewer than 12 words. Only provide the accurate summary sentence, without adding any extra words or unnecessary punctuation. Do not include the word 'Title' or any similar words in other languages. Do not enclose your answer within any brackets or quotation marks, such as "". Respond in the same language as the question. Here is the question content: "${question}"`;
    try {
        const res = await openai.createCompletion({
            model,
            prompt,
            temperature: 0.1,
            max_tokens: 20,
            top_p: 0.2,
            frequency_penalty: 0.0,
            presence_penalty: 0.9,
        });
        return res.data.choices[0].text;
    } catch (error) {
        return 'New Chat';
    }
};

export default titleQuery;
