const sqlite3 = require('sqlite3').verbose();
const os = require("os");
const fs = require("fs");

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

let texto = processador + memoria + sistema;

const db = new sqlite3.Database('database.sqlite');

db.serialize(() => {
    db.run("CREATE TABLE inventario (logon TEXT, hostname TEXT, processador TEXT, memoria TEXT, sistema TEXT, versao TEXTE)");

    const stmt = db.prepare("INSERT INTO inventario VALUES (?,?,?,?,?,?)");

        stmt.run(logon, hostname, processador, memoria, sistema, versao)
    
        stmt.finalize();
    })
    
db.close();
// Hostname; Nome de Logon; Endereço IP; Version; 
