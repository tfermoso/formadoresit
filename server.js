const express = require('express')
const comprobarUsuario=require('./validacion');
const conexion=require('./BBDD');
require('dotenv').config()
var bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const verifyToken = require('./validate-token');
const Conexion = require('./BBDD');
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
    let con=new Conexion();
    con.getDatos((result)=>{
        res.json({datos: result})
    })
    
})

app.listen(process.env.PORT,()=>{
    console.log(`Servidor iniciado en ${process.env.PORT}`)
  
})


