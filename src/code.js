
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
