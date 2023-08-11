
//nav -> node -> express -> middleware -> function

//middleware


// caminho = __dirname(pega o diretorio local)/pages/registro.html


//---- codigo noss abaixo
    const express = require("express");
    const path = require("path");
    const app = express ();
    app.use(express.static('src'));

    app.use(express.urlencoded());
    app.get("/formulario", formulario); //não pode ser o mesmo nome do que o post
    app.post("/formulario", processarFormulario);
    app.get("/login", login);
    app.post("/login", processarLogin);

    function formulario(req, res){
        const caminho = path.join(__dirname,"src", "pages","formulario.html");
        res.sendFile(caminho);
    }

    function gerarSKU(skuCor) {
        if (skuCor != null){
            let cor = skuCor;
            tamanhos.forEach(function(tamanho){
                let i = 0;
                if (tamanho =! "EG" ){ //arrumar!!!!!!!!!
                    let skuTemp = [];
                    skuTemp[i]  = nomeEstampa + "-A2-" + tipoImpressao + local + modelagem + cor + tamanho;
                    console.log(skuBranco[i]);
                }
                i++
            })
            sku = sku.concat(skuTemp)
        }
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

        let sku = []; 
        gerarSKU(req.body.branco)

        if (req.body.branco != null){
            let cor = req.body.branco;
            tamanhos.forEach(function(tamanho){
                let i = 0;
                let skuBranco = [];
                skuBranco[i]  = nomeEstampa + "-A2-" + tipoImpressao + local + modelagem + cor + tamanho;
                console.log(skuBranco[i]);
                i++
            })
            sku = sku.concat(skuBranco)
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
            sku = sku.concat(skuPreto)
        }
        if (req.body.cinzaMescla != null){
            let cor = req.body.cinzaMescla;
            let i = 0;
            let skuCinzaMescla = [];
            tamanhos.forEach(function(tamanho){
                if (tamanho =! "EG"){
                skuCinzaMescla[i]  = nomeEstampa + "-A2-" + tipoImpressao + local + modelagem + cor + tamanho;
                    console.log(skuCinzaMescla[i]);
                }
                i++
            })
            sku = sku.concat(skuCinzaMescla)
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
            sku = sku.concat(skuEstonadaChumbo)
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
            sku = sku.concat(skuEstonadaMarrom)
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
            sku = sku.concat(skuLilas)
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
            sku = sku.concat(skuMarrom)
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
            sku = sku.concat(skuOffWhite)
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
            sku = sku.concat(skuVerdeMusgo)
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
            sku = sku.concat(skuVerde)
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
            sku = sku.concat(skuVermelho)
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
            sku = sku.concat(skuAzulMarinho)
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
            sku = sku.concat(skuAzulClaro)
        }
    }

    function login(req, res) {
        res.status(303)
        const caminho = path.join(__dirname, "src", "pages", "login.html");
        res.sendFile(caminho);
    }
    
    function processarLogin(req, res) {
        const codigo = req.body.codigo;
        
    
        if(codigo == 'SP3065791' || codigo == 'mateusmeuamor'){
            res.status(301);
            res.header("Location", "/formulario");
            res.send();
        }
        else{
            res.status(302);
            res.header("Location", "/login")
            res.send("Digite um código valido")
        }
        
    }

    app.listen(3001, () => console.log("Rodando na porta 3001"));
