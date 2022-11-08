const express = require('express')
require('dotenv').config()
var bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');

const app = express()
app.use(bodyParser.json());

app.post("/login",(req,res)=>{
    if(comprobarUsuario(req.body.user,req.body.pass)){
        //Envio Token
        res.json({result:"ok"});
    }else{
        //Envío error
        res.json({result:"Usuario o Contraseña no existe"});

    }
    
})

app.listen(process.env.PORT,()=>{
    console.log(`Servidor iniciado en ${process.env.PORT}`)
  
})

function comprobarUsuario(user,pass) {
    if(user=="tomas" && pass=="1234"){
        return true;
    }else{
        return false;
    }
    
}
