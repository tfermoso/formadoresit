const express = require('express')
const comprobarUsuario=require('./validacion');
require('dotenv').config()
var bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const verifyToken = require('./validate-token');
const app = express()
app.use(bodyParser.json());

app.post("/login",(req,res)=>{

    comprobarUsuario(req.body.user,req.body.pass,(resulV)=>{
        if(resulV){
            //Envio Token
            const token = jwt.sign({
                name: req.body.user
            }, process.env.SEMILLA,{ expiresIn: 1 * 60 })
            res.header('auth-token', token).json({
                error: null,
                data: {token}
            })
            
        }else{
            //Envío error
            res.json({result:"Usuario o Contraseña no existe"});
    
        }
    })
  
    
})

app.get("/datos",verifyToken,(req,res)=>{
    res.json({datos: "datos"})
})

app.listen(process.env.PORT,()=>{
    console.log(`Servidor iniciado en ${process.env.PORT}`)
  
})


