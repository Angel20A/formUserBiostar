import express from "express";
import cors from "cors";
import {config}from "./config.js";
import fs from "fs";
import https from "https";
import fetch from "node-fetch";
import axios from "axios";

/*const getAPI = async() => {
    const response = await fetch("https://127.0.0.1:8443/api/login",{
        method: "GET",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'accept': 'application/json',
        },
        body: {
            "User": {
                "login_id": "admin",
                "password": "SDGsns2025"
            }
        }
    }
    );
    const data = await response.json();
    console.log(data);
}
getAPI();*/

const app = express();
app.use(cors());
app.use(express.json());
app.post("/login", async (req, res) => {
    try{
        const result = await axios.post("https://127.0.0.1:8443/api/login/", {
            "User": {
                "login_id": req.body.User.login_id,
                "password": req.body.User.password
            }
        },{
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            httpsAgent: new https.Agent({
                rejectUnauthorized: false // Desactiva la verificación del certificado SSL
            })
        });
        res.json(result);
        console.log(result);
    }catch(error){
        res.status(error.response.status).json(error.message);
        console.log(error);
    }
})
app.listen(4000, () => {
    console.log("Aplicacion corriendo en el puerto 4000");
});

/*https.createServer({
    cert: fs.readFileSync("./cert/serverBiostar.cer"),
    key: fs.readFileSync("./cert/serverBiostar.key")
}, app).listen(4000, function(){
    console.log("Servidor HTTPS corriendo en el puerto 4000");
});*/
/*app.use(cors());
app.use(express.json());
app.listen(4000, () => {
    console.log("Aplicacion corriendo en el puerto 4000");
});*/
