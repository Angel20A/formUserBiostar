import express from "express";
import cors from "cors";
import fs from "fs";
import https from "https";
import fetch from "node-fetch";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

const instancia = axios.create({
    //baseURL: "https://127.0.0.1:8443/api",
    baseURL: "https://127.0.0.1/api",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'accept': 'application/json',
    },
    httpsAgent: new https.Agent({
        rejectUnauthorized: false // Desactiva la verificación del certificado SSL
    })
});

app.post("/login", async (req, res) => {
    try{
        const result = await instancia.post("/login", req.body);

        res.setHeader("bs-session-id", result.headers["bs-session-id"]);
        const data = [result.data, result.headers["bs-session-id"]];
        //res.send(result.data);
        res.send(data);
        
        console.log(result.data);
    }catch(error){
        res.status(400).send(error.response.data);
        console.log(error.response.data);
    }
});

app.get("/getUserGroup", async (req, res) => {
    try{
        const result = await instancia.post("/v2/user_groups/search", req.body,{
            headers:{
                'bs-session-id': req.headers["bs-session-id"]
            }
        });
        res.send(result.data);
        console.log(result.data);
    }catch(error){
        res.status(400).send(error.response.data);
        console.log(error.response.data);
    }
});

app.post("/createUser", async (req, res) => {
    try{
        const result = await instancia.post("/users", req.body, {
            headers: {
                'bs-session-id': req.headers["bs-session-id"]
            }  
        });
        res.send(result.data);
        console.log(result.data);
    }catch(error){
        res.status(400).send(error.response.data);
        console.log(error.response.data);
    }
});

app.listen(4000, () => {
    console.log("Aplicacion corriendo en el puerto 4000");
});
