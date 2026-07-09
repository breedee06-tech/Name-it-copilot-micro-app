const express = require('express');
const app = express();
const fetch = require('node-fetch'); // You might need to run 'npm install node-fetch'

app.use(express.json());

app.post('/vapi/tts', async (req, res) => {
  const { text } = req.body;
  
  const response = await fetch('https://api.inworld.ai/tts/v1/voice:stream', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic YOUR_BASE64_API_KEY_HERE',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: text,
      voice_id: "upbeat-laurel-7206__milo",
      model_id: "inworld-tts-2",
      audio_config: { audio_encoding: "MP3", speaking_rate: 1 },
      delivery_mode: "BALANCED"
    })
  });

  // Pipe the audio stream from Inworld to Vapi
  response.body.pipe(res);
});

app.listen(process.env.PORT || 3000);