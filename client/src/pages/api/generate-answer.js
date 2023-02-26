import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: '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'
})

const openai = new OpenAIApi(configuration)
export default async function handler(req, res) {
  const prompt = req.body.prompt
  console.log(prompt)

  if (!prompt || prompt === '') {
    return new Response('Please send your prompt', { status: 400 })
  }

  const aiResult = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${prompt}`,
    temperature: 0.9,
    max_tokens: 2048,
    frequency_penalty: 0.5,
    presence_penalty: 0
  })

  const response = aiResult.data.choices[0] || 'Sorry, there was a problem!'
  console.log(response)
  res.status(200).json({ text: response })
}