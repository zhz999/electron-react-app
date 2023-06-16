const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors())

app.get('/api/v1/webui/listening-status/:sd_account', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    console.log('/api/v1/webui/listening-status:',req.params)
    const data = ['Pending', 'Running',  'NotCreated','NoResources'];

    setInterval(() => {
        const index = Math.floor(Math.random() * data.length);
        const ress = {
            "timestamp": 1686735479,
            "status": 'Running',
            "start-duration": 300,
        }
        const message = `data: ${JSON.stringify(ress)}\n\n`;
        res.write(message);
    }, 5000);
});


app.get('/api/v1/webui/status/:sd_account',(req,res)=>{
    console.log('/api/v1/webui/status:',req.params)
    const sd_account = req.query.sd_account
    res.send({
        "timestamp": 1686735479,
        "status": "Running",
        "start-duration": 300,
        "sd_account":sd_account,
    })
})

app.listen(3001, () => {
    console.log('Server started on port 3001');
});
