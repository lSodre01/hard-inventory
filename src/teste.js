import os from "os";
import geoip  from "geoip-lite";
import express from "express";
import fetch from "node-fetch";


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const ipaddress = os.networkInterfaces().Ethernet.find(element =>{

    if (element.family === 'IPv4') {
        
        return element
    } 
})