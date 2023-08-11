
//nav -> node -> express -> middleware -> function

//middleware


// caminho = __dirname(pega o diretorio local)/pages/registro.html


function login(req, res) {
    res.status(303)
    const caminho = path.join(__dirname,"pages", "login.html");
    res.sendFile(caminho);
}

function processarLogin(req, res) {
    const codigo = req.body.codigo;
    const erros = [];

    if(codigo == '' || codigo){
        
    }
}

//---- codigo noss abaixo
    const express = require("express");
    const path = require("path");
    const app = express ();
    app.use(express.static('scr'));

    app.use(express.urlencoded());
    app.get("/formulario", formulario); //não pode ser o mesmo nome do que o post
    app.post("/formulario", processarFormulario);
    app.post("/login", login);
    app.post("/logincompleto", processarLogin);

    function formulario(req, res){
        const caminho = path.join(__dirname, "scr","index.html");
        res.sendFile(caminho);
    }

    function processarFormulario(req, res){
        let nomeEstampa = req.body.estampa;
        nomeEstampa = nomeEstampa.replace(/\s/g, '');

        let char = nomeEstampa.charAt(nomeEstampa.length - 1);
        if (nomeEstampa.length > 8) {
            nomeEstampa = nomeEstampa.substring(0, 8).toUpperCase();
        } else {
            nomeEstampa = nomeEstampa.toUpperCase();
            for (let i = nomeEstampa.length; i < 8; i++) {
                nomeEstampa += char.toUpperCase();
            }
        }

        let tipoImpressao = "";
        if (req.body.white != "" || req.body.offwhite != "" ){
             tipoImpressao = "CL";
        }
        else {
             tipoImpressao = "ES";
        }

        let local = req.body.local;
        let modelagem = req.body.modelagem;
        var tamanhos = [];

        if(modelagem == "ST"){
            tamanhos.push("P");
            tamanhos.push("PP");
            tamanhos.push("M");
            tamanhos.push("G");
            tamanhos.push("GG");
            tamanhos.push("EG");
            tamanhos.push("G1");
            tamanhos.push("G2");
        }
        else if(modelagem == "CL"){
            tamanhos.push("P");
            tamanhos.push("PP");
            tamanhos.push("M");
            tamanhos.push("G");
            tamanhos.push("GG");
            tamanhos.push("EG");
        }
        else if(modelagem == "BB"){
            tamanhos.push("P");
            tamanhos.push("PP");
            tamanhos.push("M");
            tamanhos.push("G");
            tamanhos.push("GG");
        }
        else if(modelagem == "IN"){
            tamanhos.push("02");
            tamanhos.push("04");
            tamanhos.push("06");
            tamanhos.push("08");
            tamanhos.push("10");
        }
        else{
            tamanhos.push("P");
            tamanhos.push("PP");
            tamanhos.push("M");
            tamanhos.push("G");
            tamanhos.push("GG");
            tamanhos.push("EG");
        }

        if (req.body.branco != null){
            let cor = req.body.branco;
            tamanhos.forEach(function(tamanho){
                let i = 0;
                let skuBranco = [];
                skuBranco[i]  = nomeEstampa + "-A2-" + tipoImpressao + local + modelagem + cor + tamanho;
                console.log(skuBranco[i]);
                i++
            })
        }
        if (req.body.preto != null){
            let cor = req.body.preto;
            tamanhos.forEach(function(tamanho){
                let i = 0;
                let skuPreto = [];
                skuPreto[i]  = nomeEstampa + "-A2-" + tipoImpressao + local + modelagem + cor + tamanho;
                console.log(skuPreto[i]);
                i++
            })
        }
        if (req.body.cinzaMescla != null){
            let cor = req.body.cinzaMescla;
            tamanhos.forEach(function(tamanho){
                let i = 0;
                let skuCinzaMescla = [];
                skuCinzaMescla[i]  = nomeEstampa + "-A2-" + tipoImpressao + local + modelagem + cor + tamanho;
                if (tamanho =! "EG"){
                    console.log(skuCinzaMescla[i]);
                }
                i++
            })
        }
        if (req.body.estonadaChumbo != null){
            let cor = req.body.estonadaChumbo;
            tamanhos.forEach(function(tamanho){
                let i = 0;
                let skuEstonadaChumbo = [];
                skuEstonadaChumbo[i]  = nomeEstampa + "-A2-" + tipoImpressao + local + modelagem + cor + tamanho;
                if (tamanho =! "EG"){
                    console.log(skuEstonadaChumbo[i]);
                }
                i++
            })
        }
        if (req.body.estonadaMarrom != null){
            let cor = req.body.estonadaMarrom;
            tamanhos.forEach(function(tamanho){
                let i = 0;
                let skuEstonadaMarrom = [];
                skuEstonadaMarrom[i]  = nomeEstampa + "-A2-" + tipoImpressao + local + modelagem + cor + tamanho;
                if (tamanho =! "EG"){
                    console.log(skuEstonadaMarrom[i]);
                }
                i++
            })
        }
        if (req.body.lilas != null){
            let cor = req.body.lilas;
            tamanhos.forEach(function(tamanho){
                let i = 0;
                let skuLilas = [];
                skuLilas[i]  = nomeEstampa + "-A2-" + tipoImpressao + local + modelagem + cor + tamanho;
                if (tamanho =! "EG"){
                    console.log(skuLilas[i]);
                }
                i++
            })
        }
        if (req.body.marrom != null){
            let cor = req.body.marrom;
            tamanhos.forEach(function(tamanho){
                let i = 0;
                let skuMarrom = [];
                skuMarrom[i]  = nomeEstampa + "-A2-" + tipoImpressao + local + modelagem + cor + tamanho;
                if (tamanho =! "EG"){
                    console.log(skuMarrom[i]);
                }
                i++
            })
        }
        if (req.body.offWhite != null){
            let cor = req.body.offWhite;
            tamanhos.forEach(function(tamanho){
                let i = 0;
                let skuOffWhite = [];
                skuOffWhite[i]  = nomeEstampa + "-A2-" + tipoImpressao + local + modelagem + cor + tamanho;
                console.log(skuOffWhite[i]);
                i++
            })
        }
        if (req.body.verdeMusgo != null){
            let cor = req.body.verdeMusgo;
            tamanhos.forEach(function(tamanho){
                let i = 0;
                let skuVerdeMusgo = [];
                skuVerdeMusgo[i]  = nomeEstampa + "-A2-" + tipoImpressao + local + modelagem + cor + tamanho;
                if (tamanho =! "EG"){
                    console.log(skuVerdeMusgo[i]);
                }
                i++
            })
        }
        if (req.body.verde != null){
            let cor = req.body.verde;
            tamanhos.forEach(function(tamanho){
                let i = 0;
                let skuVerde = [];
                skuVerde[i]  = nomeEstampa + "-A2-" + tipoImpressao + local + modelagem + cor + tamanho;
                if (tamanho =! "EG"){
                    console.log(skuVerde[i]);
                }
                i++
            })
        }
        if (req.body.vermelho != null){
            let cor = req.body.vermelho;
            tamanhos.forEach(function(tamanho){
                let i = 0;
                let skuVermelho = [];
                skuVermelho[i]  = nomeEstampa + "-A2-" + tipoImpressao + local + modelagem + cor + tamanho;
                if (tamanho =! "EG"){
                    console.log(skuVermelho[i]);
                }
                i++
            })
        }
        if (req.body.azulMarinho != null){
            let cor = req.body.azulMarinho;
            tamanhos.forEach(function(tamanho){
                let i = 0;
                let skuAzulMarinho = [];
                skuAzulMarinho[i]  = nomeEstampa + "-A2-" + tipoImpressao + local + modelagem + cor + tamanho;
                if (tamanho =! "EG"){
                    console.log(skuAzulMarinho[i]);
                }
                i++
            })
        }
        if (req.body.azulClaro != null){
            let cor = req.body.azulClaro;
            tamanhos.forEach(function(tamanho){
                let i = 0;
                let skuAzulClaro = [];
                skuAzulClaro[i]  = nomeEstampa + "-A2-" + tipoImpressao + local + modelagem + cor + tamanho;
                if (tamanho =! "EG"){
                    console.log(skuAzulClaro[i]);
                }
                i++
            })
        }
        res.send("SKU CODE feito com sucesso!")
        
    }

    app.listen(3001, () => console.log("Rodando na porta 3001"));
