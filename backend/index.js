import express from "express";
import cors from "cors";
import {config}from "./config.js";
import fs from "fs";
import https from "https";

const app = express();
https.createServer({
    cert: fs.readFileSync("./cert/serverBiostar.cer"),
    key: fs.readFileSync("./cert/serverBiostar.key")
}, app)/*.listen(4000, function(){
    console.log("Servidor HTTPS corriendo en el puerto 4000");
});*/
app.use(cors(config.application.cors.server));
app.use(express.json());
/*app.listen(4000, () => {
    console.log("Aplicacion corriendo en el puerto 4000");
});*/
