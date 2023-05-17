const express = require('express')
const cors = require('cors')
const { Configuration, OpenAIApi } = require('openai')

const app = express()
app.use(cors())
app.use(express.json())

const configuration = new Configuration({
    apiKey:'claveOpenAi'
  })
  const openai = new OpenAIApi(configuration)

app.post('/', async(req, res) => {
    try {
        const prompt = req.body.prompt
        const response = await openai.createImage({
            prompt: `${prompt}`,
            n: 2,
            size: "256x256",})
            

             // Serializar manualmente el objeto response
            const serializedResponse = {
                data: response.data,
                headers: response.headers,
                status: response.status,
                statusText: response.statusText,
            }
            res.status(200).json({ bot : serializedResponse })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }  
})

app.listen(3053, () => console.log('Servidor funcionando correctamente en el puerto 3053'))