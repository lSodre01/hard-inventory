const sqlite3 = require('sqlite3').verbose();
const os = require("os");
const fs = require("fs");
const express = require("express");
const axios = require("axios");
const app = express();

let memCalc = (mem)=> {

mem = mem/1073741824

return Math.round(mem)

}

function findIp () {

if (os.networkInterfaces().Ethernet) {

    return os.networkInterfaces().Ethernet.find(element =>{
    
        if (element.family === 'IPv4') {
            
            return element
        } 
    });

} else if(os.networkInterfaces()['Wi-Fi']) {

    return os.networkInterfaces()['Wi-Fi'].find(element =>{
    
        if (element.family === 'IPv4') {
            
            return element
        } 
    });
} 
    return ''
}


async function bootstrap () {

    let processador =  os.cpus()[0].model;
    let memoria = memCalc(os.totalmem());
    let sistema = os.platform();
    let versao = os.version();
    let logon = os.userInfo().username;
    let hostname = os.hostname();
    const interface = findIp();
    
    let ipv4 = interface.address;
    let mac= interface.mac;
    
    const db = new sqlite3.Database('database.sqlite');
    
    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS inventario (logon TEXT, hostname TEXT, processador TEXT, memoria INTEGER, sistema TEXT, versao TEXT, ip TEXT, mac TEXT)");
    
        const stmt = db.prepare("INSERT INTO inventario VALUES (?,?,?,?,?,?,?,?)");
    
            stmt.run(logon, hostname, processador, memoria, sistema, versao, ipv4, mac)
        
            stmt.finalize();
        })
        
    db.close();
    
    const response = await axios.get("https://ifconfig.me/all.json")
    console.log(response.data)

}

bootstrap()