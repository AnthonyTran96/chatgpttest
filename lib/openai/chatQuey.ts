// model: Xác định phiên bản mô hình ChatGPT được sử dụng.
// prompt: Đoạn văn bản được gửi làm câu hỏi hoặc đầu vào cho mô hình ChatGPT.
// temperature: Điều chỉnh độ ngẫu nhiên trong câu trả lời. Giá trị càng cao thì câu trả lời càng ngẫu nhiên và đa dạng. Giá trị càng thấp thì câu trả lời càng chính xác và thận trọng.
// max_tokens: Giới hạn số lượng từ tối đa trong câu trả lời được sinh ra bởi mô hình. Nếu giá trị này thấp, câu trả lời sẽ ngắn hơn và tập trung vào thông tin quan trọng.
// top_p: Xác định phần trăm xác suất cộng dồn để tạo câu trả lời. Giá trị càng cao, câu trả lời càng đa dạng.
// frequency_penalty: Điều chỉnh sự lặp lại của cụm từ trong câu trả lời. Giá trị càng cao, mô hình sẽ tránh tái sử dụng các cụm từ đã xuất hiện trước đó.
// presence_penalty: Điều chỉnh sự xuất hiện của các cụm từ không liên quan trong câu trả lời. Giá trị càng cao, mô hình sẽ tránh sử dụng các cụm từ không liên quan.

import openai from './openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const chatQuery = async (messages: string) => {
    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages,
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
};

export default chatQuery;
