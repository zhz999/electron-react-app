const jwt = require('jsonwebtoken');
const axios = require('axios');
const secretKey = 'fc6944e4972577bd7229948be222ca828290f4eafa82de747573486f9a6f6e7c';
const payload = {
    account: 'hongzhongzhang',
};

const token = jwt.sign(payload, secretKey, {
    expiresIn: '1h', // 设置过期时间，例如 1 小时
});

console.log(token);

axios.post('https://funbot-api-test.funplus.com/api/v1/f/chat/session',{
'bot_id':'24de71f0-c7e2-4fba-878f-70cdb034fa59'
},{
    headers:{
        'X-App-Id':'funai',
        'Context-Type':'application/json',
        'Authorization':`Bearer ${token}`
    }
}).then(data=>{
    console.log(data.data.data[0].session_id)
})


//
//
axios.post('https://funbot-api-test.funplus.com/api/v1/f/chat/stream',{
    bot_id:'24de71f0-c7e2-4fba-878f-70cdb034fa59',
    session_id: 'ab6efff674424d79845a759f0f632be6',
    query:'Dog',
    once: true
},{
    headers:{
        'X-App-Id':'funai',
        'Context-Type':'application/json',
        'Authorization':`Bearer ${token}`
    }
}).then(data=>{
    console.log(JSON.parse(data.data.data))
})
