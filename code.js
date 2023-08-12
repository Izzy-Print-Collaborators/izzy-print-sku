
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

    function gerarSKU(req, skuCor) {
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

    function processarFormulario(req, res) {
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

        let tipoImpressao = '';
        if (req.body.white != '' || req.body.offwhite != ''){
             tipoImpressao = 'CL';
        }
        else {
             tipoImpressao = 'ES';
        }

        var local = req.body.local;
        var modelagem = req.body.modelagem;
        var tamanhos = [];

        if(modelagem == 'ST'){
            tamanhos.push('P');
            tamanhos.push('PP');
            tamanhos.push('M');
            tamanhos.push('G');
            tamanhos.push('GG');
            tamanhos.push('EG');
            tamanhos.push('G1');
            tamanhos.push('G2');
        }
        else if(modelagem == 'CL'){
            tamanhos.push('P');
            tamanhos.push('PP');
            tamanhos.push('M');
            tamanhos.push('G');
            tamanhos.push('GG');
            tamanhos.push('EG');
        }
        else if(modelagem == 'BB'){
            tamanhos.push('P');
            tamanhos.push('PP');
            tamanhos.push('M');
            tamanhos.push('G');
            tamanhos.push('GG');
        }
        else if(modelagem == 'IN'){
            tamanhos.push('02');
            tamanhos.push('04');
            tamanhos.push('06');
            tamanhos.push('08');
            tamanhos.push('10');
        }
        else{
            tamanhos.push('P');
            tamanhos.push('PP');
            tamanhos.push('M');
            tamanhos.push('G');
            tamanhos.push('GG');
            tamanhos.push('EG');
        }

        let sku = [];

        const cores = [
        { key: 'branco', allowEG: true },
        { key: 'preto', allowEG: true },
        { key: 'cinzaMescla', allowEG: false },
        { key: 'estonadaChumbo', allowEG: false },
        { key: 'estonadaMarrom', allowEG: false },
        { key: 'lilas', allowEG: false },
        { key: 'marrom', allowEG: false },
        { key: 'offWhite', allowEG: true },
        { key: 'verdeMusgo', allowEG: false },
        { key: 'verde', allowEG: false },
        { key: 'vermelho', allowEG: false },
        { key: 'azulMarinho', allowEG: false },
        { key: 'azulClaro', allowEG: false }
        ];

        cores.forEach(corConfig => {
            const cor = req.body[corConfig.key];
            if (cor !== null) {
                const i = 0;
                const skuCor = [];

                tamanhos.forEach(tamanho => {
                if (corConfig.allowEG || tamanho != 'EG') {
                    skuCor[i] = nomeEstampa + "-A2-" + tipoImpressao + local + modelagem + cor + tamanho;
                    console.log(skuCor[i]);
                    i++;
                }
                });

                sku = sku.concat(skuCor);
            }
        });

        sku.forEach(codigoSKU => {
            let grid = document.getElementById("grid-item");
            grid.textContent = `<div class="grid-item"> ${codigoSKU} </div>`
        })
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
