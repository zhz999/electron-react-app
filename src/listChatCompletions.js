const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

const endpoint = "https://user-platform.openai.azure.com";
const azureApiKey ="92fd307677e6468eb259f1a549f0e4e8";

const messages = [
    // { role: "system", content: "You are a helpful assistant." },
    // { role: "user", content: JSON.stringify([{
    //         "en": "A stunning Halo Reach landscape with a Spartan on a hilltop, lush green forests surround them, clear sky, distant city view, focusing on the Spartan's majestic pose, intricate armor, and weapons, Artwork, oil painting on canvas",
    //         "zh_cn": "令人惊叹的Halo Reach景观，斯巴达人站在山顶，郁郁葱葱的绿色森林环绕着他们，晴朗的天空，遥远的城市景观，专注于斯巴达人的雄伟姿态，复杂的盔甲和武器，艺术品，帆布油画"
    //     },
    //         {
    //             "en": "A captivating Halo Reach landscape with a Spartan amidst a battlefield, fallen enemies around, smoke and fire in the background, emphasizing the Spartan's determination and bravery, detailed environment blending chaos and beauty, Illustration, digital art",
    //             "zh_cn": "迷人的光晕:战场上的斯巴达人，倒下的敌人，烟雾和火焰的背景，强调斯巴达人的决心和勇敢，详细的环境混合混乱和美丽，插图，数字艺术"
    //         }]) },
    { role: "assistant", content: `As a prompt generator for a generative AI called "Midjourney", you will create image prompts for the AI to visualize. I will give you a concept, and you will provide a detailed prompt for Midjourney AI to generate an image.

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

Example Prompts: {"en": "英文描述1","zh_cn": "中文翻译1"}` },
    { role: "user", content: "pig" },
];

async function main() {
    const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
    const deploymentId = "gpt-35-turbo";
    const events = await client.listChatCompletions(deploymentId, messages);
    const texts= []
    for await (const event of events) {
        for (const choice of event.choices) {
            texts.push(choice.delta?.content)
            try {
                if(texts.join('').includes('[')&& texts.join('').includes(']'))
                    console.log(JSON.parse(texts.join('')));
                else
                    console.log(texts.join(''))
            }catch (e) {

            }
        }
    }
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});

module.exports = { main };

module.exports.main()
