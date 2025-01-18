require('dotenv').config();
const axios = require('axios'); // 引入 Axios 库

// 从 .env 文件中加载 API 密钥
const apiKey = process.env.OPENAI_API_KEY;

const testAPI = async () => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions', // 确保路径是 chat/completions
            {
                model: 'gpt-3.5-turbo', // 或者使用 'gpt-4'
                messages: [ // 替代旧的 prompt 参数
                    { role: 'system', content: 'You are a helpful assistant.' }, // 系统指令
                    { role: 'user', content: 'What is the capital of France?' }  // 用户问题
                ],
                max_tokens: 50, // 限制回答长度
                temperature: 0.7, // 控制生成结果的随机性
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`, // 添加 API 密钥
                    'Content-Type': 'application/json', // 设置请求头
                },
            }
        );

        // 打印返回的结果
        console.log('Response from OpenAI:', response.data.choices[0].message.content.trim());
    } catch (error) {
        // 打印错误信息
        console.error('Error communicating with OpenAI API:', error.response ? error.response.data : error.message);
    }
};

testAPI();
