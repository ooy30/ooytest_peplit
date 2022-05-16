const express = require('express');
const app = express();
var uuid = require("uuid");
const cors = require('cors');

const PORT = process.env.PORT || 3001
const Database = require("@replit/database");

app.use(cors());
app.use(express.json());


const db = new Database()


app.post('/user',async (req,res) => {
    console.log( uuid.v4(),req.body)
    req.body.id = uuid.v4()
    var dataGet = [];
    await  db.get("user").then(value => { 
      dataGet = value;
    })
    await db.delete("user").then(() => {});
    dataGet.push(req.body);
    await db.set("user", dataGet ).then((result) => { 
            res.status(200).json(result)
    });
  
})

app.get('/user',(req,res) => {
    db.get("user").then((result) => { 
            res.status(200).json(result)
    });
})

app.get('/',(req,res) => {
  
  db.list().then(keys => {
    console.log( keys)
    db.get(keys[0]).then(value => { console.log(value)})
  })
    res.json({result :"ok",status :"Server Run"})

})

app.listen(PORT,()=>{
  console.log('Server Run',PORT);
  console.log('DB Run',process.env.REPLIT_DB_URL);
  
    // connection.connect((err,result)=>{
    //     if(err){
    //         console.log(err);
    //     }else{
    //         res.send(result);
    //     }
    // })
})