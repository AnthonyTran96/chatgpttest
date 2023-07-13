// model: Xác định phiên bản mô hình ChatGPT được sử dụng.
// prompt: Đoạn văn bản được gửi làm câu hỏi hoặc đầu vào cho mô hình ChatGPT.
// temperature: Điều chỉnh độ ngẫu nhiên trong câu trả lời. Giá trị càng cao thì câu trả lời càng ngẫu nhiên và đa dạng. Giá trị càng thấp thì câu trả lời càng chính xác và thận trọng.
// max_tokens: Giới hạn số lượng từ tối đa trong câu trả lời được sinh ra bởi mô hình. Nếu giá trị này thấp, câu trả lời sẽ ngắn hơn và tập trung vào thông tin quan trọng.
// top_p: Xác định phần trăm xác suất cộng dồn để tạo câu trả lời. Giá trị càng cao, câu trả lời càng đa dạng.
// frequency_penalty: Điều chỉnh sự lặp lại của cụm từ trong câu trả lời. Giá trị càng cao, mô hình sẽ tránh tái sử dụng các cụm từ đã xuất hiện trước đó.
// presence_penalty: Điều chỉnh sự xuất hiện của các cụm từ không liên quan trong câu trả lời. Giá trị càng cao, mô hình sẽ tránh sử dụng các cụm từ không liên quan.

import openai from './openai';
const titleQuery = async (question: string, model: string) => {
    const prompt = `Impersonate an intelligent AI with the sole task as follows: "I will provide you with a question sentence to initiate a conversation with OpenAI's ChatGPT tool. Based on the question's content, create a suitable title for the conversation that will be formed around that question, using fewer than 8 words. Only provide the accurate summary sentence, without adding any extra words or unnecessary punctuation. Do not include the word 'Title' or any similar words in other languages. Do not enclose your answer within any brackets or quotation marks, such as "". Respond in the same language as the question.
        Question: Write a program in the JavaScript programming language to sort an array of integers in descending order.
        Title: Sort Array Descending
        Question: what is an AI
        Title: AI: Understanding Artificial Intelligence
        Question: what is the weather like today?
        Title: Weather Today
        Question: Hãy đóng giả làm 1 AI thông minh có 1 nhiệm vụ duy nhất như sau: "Tôi sẽ đưa bạn 1 đoạn câu hỏi dùng để bắt đầu 1 cuộc hội thoại với công cụ ChatGPT của Openai. Dựa vào nội dung câu hỏi hãy tạo ra 1 tiêu đề cho phù hợp đoạn hội thoại sẽ được tạo với câu hỏi đó, với số lượng từ ít hơn 8 từ.  Bạn chỉ cần nói đúng câu tóm tắt, tuyệt đối không trả lời thêm từ ngữ thừa nào khác.
        Title: Dịch CSS sang tailwindCSS
        Question: tôi muốn viết một chương trinhg giống chatGPT và đang không biết làm thế nào để phần mềm có thể biết và hiển thị phần lập trình theo 1 khung khi được hỏi, bạn có thể giải thích giúp tôi
        Title: Xây dựng chương trình ChatGPT
        Question: You are an intelligent AI tasked with helping me translate sentences, words, or passages from technical documents in the fields of electronics, programming, information technology, and electronic games that are written in English into easy-to-understand Vietnamese.
        Title: Translating Technical Documents
        Question: ${question}
        Title: `;
    try {
        const completion = await openai.createCompletion({
            prompt,
            model: 'text-davinci-003',
            temperature: 0.1,
            max_tokens: 20,
            top_p: 0.2,
            frequency_penalty: 0.0,
            presence_penalty: 0.9,
        });
        const data = await completion.json();
        return data.choices[0].text;
    } catch (error) {
        return 'New Chat';
    }
};

export default titleQuery;
