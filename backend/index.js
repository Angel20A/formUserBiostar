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
    baseURL: "https://127.0.0.1:8443/api",
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
        const result = await instancia.post("/login", req.body, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        });
        res.setHeader("bs-session-id", result.headers["bs-session-id"]);
        const data = [result.data, result.headers["bs-session-id"]];
        //res.send(result.data);
        res.send(data);
        
        console.log(result.data);
    }catch(error){
        const message = error.message;
        const status = error.status;
        const code = error.code;
        const errors = {message, status, code};
        res.send(errors);

        //res.status().json(error.message);
        console.log(error.message);
    }
});

app.post("/createUser", async (req, res) => {
    try{
        const result = await instancia.post("/users", req.body, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'bs-session-id': req.headers["bs-session-id"]
            }  
        });
        res.send(result);
        console.log(result);
    }catch(error){
        const message = error.message;
        const status = error.status;
        const code = error.code;
        const errors = {message, status, code};
        res.send(error);

        //res.send(error.response);
        console.log(error.message);
    }
});

app.listen(4000, () => {
    console.log("Aplicacion corriendo en el puerto 4000");
});
