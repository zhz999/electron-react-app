// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get completions for the provided prompt.
 *
 * @summary get completions.
 */

const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

const endpoint = "https://user-platform.openai.azure.com";
const azureApiKey ="92fd307677e6468eb259f1a549f0e4e8";

const prompt = ["什么是猫?"];

async function main() {
    const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
    const deploymentId = "gpt-35-turbo";
    const result = await client.getCompletions(deploymentId, prompt, { maxTokens: 128 ,n: 4 });

    for (const choice of result.choices) {
        console.log(choice.text);
    }
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});

module.exports = { main };

module.exports.main()
