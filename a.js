const os = require("os");
const fs = require("fs");

let memCalc = (mem)=> {

mem = mem/1073741824

return Math.round(mem)

}

let processador =  "Processador: " + os.cpus()[0].model + "\n";
let memoria = "Memoria: " + memCalc(os.totalmem()) + "\n";
let sistema = "OS: " + os.platform() + "\n";

let texto = processador + memoria + sistema;


fs.writeFile("teste.txt", texto, {enconding:'utf-8',flag: 'a'}, function (err) {
    if (err) throw err;
    console.log('Arquivo salvo!');
});

