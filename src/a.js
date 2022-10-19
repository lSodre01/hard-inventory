const sqlite3 = require('sqlite3').verbose();
const os = require("os");
const fs = require("fs");
const express = require("express");

const app = express();

let memCalc = (mem)=> {

mem = mem/1073741824

return Math.round(mem)

}

let processador =  os.cpus()[0].model;
let memoria = memCalc(os.totalmem());
let sistema = os.platform();
let versao = os.version();
let logon = os.userInfo().username;
let hostname = os.hostname();
const ipaddress = os.networkInterfaces().Ethernet.find(element =>{

    if (element.family === 'IPv4') {
        
        return element
    } 
});

let ipv4 = ipaddress.address;
let mac= ipaddress.mac;

const db = new sqlite3.Database('database.sqlite');

db.serialize(() => {
    db.run("CREATE TABLE inventario (logon TEXT, hostname TEXT, processador TEXT, memoria INTEGER, sistema TEXT, versao TEXTE, ip TEXT, mac TEXT)");

    const stmt = db.prepare("INSERT INTO inventario VALUES (?,?,?,?,?,?,?,?)");

        stmt.run(logon, hostname, processador, memoria, sistema, versao, ipv4, mac)
    
        stmt.finalize();
    })
    
db.close();
// Hostname; Nome de Logon; Endereço IP; Version; 

app.get("ifconfig.me/all.json", (req, res)=>{
    req.body;
})

