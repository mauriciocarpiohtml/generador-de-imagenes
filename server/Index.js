const express = require('express')
const cors = require('cors')
const { Configuration, OpenAIApi } = require('openai')
const dotenv = require('dotenv')


const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT

const configuration = new Configuration({
    apiKey:process.env.OPEN_AI_KEY
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

app.listen(PORT, () => console.log(`Servidor funcionando correctamente en el puerto ${PORT}`))