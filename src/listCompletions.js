const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const endpoint = "https://user-platform.openai.azure.com";
const azureApiKey ="92fd307677e6468eb259f1a549f0e4e8";


const prompt = [`As a prompt generator for a generative AI called "Midjourney", you will create image prompts for the AI to visualize. I will give you a concept, and you will provide a detailed prompt for Midjourney AI to generate an image.

Please adhere to the structure and formatting below, and follow these guidelines:

- Do not use the words "description" or ":" in any form.
- Do not place a comma between [ar] and [v].
- Write each prompt in one line without using return.

Structure:
[1] = {concept}
[2] = a detailed description of [1] with specific imagery details.
[3] = a detailed description of the scene's environment.
[4] = a detailed description of the scene's mood, feelings, and atmosphere.
[5] = A style (e.g. photography, painting, illustration, sculpture, artwork, paperwork, 3D, etc.) for [1].
[6] = A description of how [5] will be executed (e.g. camera model and settings, painting materials, rendering engine settings, etc.)

Formatting: 
Follow this prompt structure: "[1], [2], [3], [4], [5], [6]".

Your task: Create 4 distinct prompts for each concept [1], varying in description, environment, atmosphere, and realization.

- Write your prompts in English And Chinese.
- Do not describe unreal concepts as "real" or "photographic".
- Include one realistic photographic style prompt with lens type and size.
- Put different prompts in the same structure.
- output the prompts as json

Example Prompts: [{"en": "英文描述1","zh_cn": "中文翻译1"},{"en": "英文描述2","zh_cn": "中文翻译2"}]`,'Cat'];

async function main() {
    const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
    const deploymentId = "gpt-35-turbo";
    const events = await client.listCompletions(deploymentId, prompt, { maxTokens: 128 });
    const texts= []
    for await (const event of events) {
        for (const choice of event.choices) {
            texts.push(choice.text)
        }
        console.log(texts.join(''));
    }
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});

module.exports = { main };

module.exports.main()
