var express = require('express')
 var app = express()
     app.get('/', (req, res) => { 
         res.send('ok')    
     });
    app.get('/test', (req, res) => { 
        res.send('{status:200, message:"ok"}')
    });    
    app.get('/time', (req, res) => { 
        var today = new Date(); 
        var time = today.getHours() +":" + today.getSeconds();
        res.send({status:200,message:time})
    });   
app.listen(3000, () => console.log('listinig on port 3000'));