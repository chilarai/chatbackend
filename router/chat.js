const express = require("express");
const Chat = require("../modal/Chat");
const { Configuration, OpenAIApi } = require("openai");
const router = express.Router();


require('dotenv').config()


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



// Middleware
router.use(express.json());

  
// Chart route
router.post("/chat", async (req, res) => {
    let responseTxt = ""
    let responseTxtArray = []
    try {

        let question = req.body.prompt.includes("?") ? req.body.prompt : req.body.prompt + "?"

        const response = await openai.createCompletion({
            model: process.env.OPENAI_MODEL,
            prompt: question,
            max_tokens: 70,
            temperature: 1,
        });
        responseTxt = response.data.choices[0].text
        // console.log(responseTxt)

        if(responseTxt.includes("END")){
            responseTxtArray = responseTxt.split("END")
        } else {
            responseTxtArray.push(responseTxt) 
        }

        if(responseTxtArray[0].includes("->")){
            responseTxtArray[0] = responseTxtArray[0].replace("->", "")
        } 

        let chat = new Chat({question});
        await chat.save();

        return res.status(200).json({ message: responseTxtArray[0] });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Export the router
module.exports = router;
