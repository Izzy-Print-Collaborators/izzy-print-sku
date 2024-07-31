function gerarSKU() {
    const skuContainer = document.getElementById("skuContainer");
    skuContainer.innerHTML = ''; 
    let nomeEstampa = document.getElementById("estampa").value;
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

    let local = document.querySelector('input[name=local]:checked').value;
    let modelagem = document.querySelector('input[name=modelagem]:checked').value;
    let tipoImpressao = '';

    let tamanhos = [];

    if (modelagem == 'ST') {
        tamanhos = ['P', 'M', 'G', 'GG', 'EG', 'G1', 'G2', 'G3', 'G4'];

    } else if (modelagem == 'CL') {
        tamanhos = ['P', 'PP', 'M', 'G', 'GG', 'EG'];

    } else if (modelagem == 'BB') {
        tamanhos = ['P', 'PP', 'M', 'G', 'GG'];

    } else if (modelagem == 'IN') {
        tamanhos = ['02', '04', '06', '08', '10'];

    } else {
        tamanhos = ['P', 'PP', 'M', 'G', 'GG', 'EG'];
    }

    let sku = [];

    const cores = [
        { key: 'branca', allowClara: true, allowEG: true, hex: '#d4d2d2' },
        { key: 'preta', allowClara: false, allowEG: true, hex: '#000000' },
        { key: 'cinzaMescla', allowClara: false, allowEG: true, hex: '#b0afa7' },
        { key: 'estonadaChumbo', allowClara: false, allowEG: true, hex: '#666662' },
        { key: 'estonadaMarrom', allowClara: false, allowEG: true, hex: '#8B4513' },
        { key: 'lilas', allowClara: false, allowEG: false, allowG2: false, hex: '#b35fd4' },
        { key: 'marrom', allowClara: false, allowEG: false, allowG2: false, hex: '#8B4513' },
        { key: 'offWhite', allowClara: true, allowEG: true, allowG2: false, hex: '#d4d3ab' },
        { key: 'verdeMusgo', allowClara: false, allowEG: false, allowG2: false, hex: '#74a148' },
        { key: 'verde', allowClara: false, allowEG: false, allowG2: false, hex: '#78d10a' },
        { key: 'vermelha', allowClara: false, allowEG: false, allowG2: false, hex: '#bd1c1c' },
        { key: 'azulMarinho', allowClara: false, allowEG: false, allowG2: false, hex: '#0c3a69' },
        { key: 'azulClaro', allowClara: false, allowEG: false, allowG2: false, hex: '#5da0e3' }
    ];
    

    let empresa = document.getElementById("opcoes").value;

    if(empresa.toUpperCase().includes('AGED')){
        empresa = "01";
    }
    else if(empresa.toUpperCase().includes('SOCCER')){
        empresa = "02";
    }
    else if(empresa.toUpperCase().includes('XAPO')){
        empresa = "03";
    }
    else if(empresa.toUpperCase().includes('STUFF')){
        empresa = "04";
    }
    else if(empresa.toUpperCase().includes('POESIA')){
        empresa = "05";
    }
    else if( empresa.toUpperCase().includes('BALOVE')){
        empresa = "06"
    }
    else if( empresa.toUpperCase().includes('NEW ERA') || empresa.toUpperCase().includes('NEW') ){
        empresa = "07"
    }
    else if( empresa.toUpperCase().includes('MUD CONCEPT') || empresa.toUpperCase().includes('MUD') ){
        empresa = "08"
    }
    else if( empresa.toUpperCase().includes('MADFERIT')){
        empresa = "09"
    }
    else if( empresa.toUpperCase().includes('VISCERY') ){
        empresa = "10"
    }
    else if( empresa.toUpperCase().includes('GOLDERA')){
        empresa = "11"
    }
    else if( empresa.toUpperCase().includes('OLDFUTURE') || empresa.toUpperCase().includes('OLD')){
        empresa = "12"
    }
    else if( empresa.toUpperCase().includes('STYLTRAP')){
        empresa = "13"
    }
    else if( empresa.toUpperCase().includes('CYBER')){
        empresa = "14"
    }

    else {
        alert("Empresa não cadastrada. Por favor contatar Izzy Print");
        return ;
    }
    
    document.querySelector("#invisivel").style.display = "block";

    cores.forEach((corConfig, index1) => {
        const corMarcada = document.getElementById(corConfig.key).checked;
        const cor = document.getElementById(corConfig.key);
        if (corMarcada) {
            let skuCor = [];
            let tipoImpressao = corConfig.allowClara ? 'CL' : 'ES';
            tamanhos.forEach((tamanho, index2) => {
                if (corConfig.allowEG || tamanho !== 'EG') {
                    let skuItem = empresa + "-" + nomeEstampa + "-A2-" + tipoImpressao + local + modelagem + cor.value + tamanho;
                    const skuContainer = document.getElementById("skuContainer");
                    var id_aviso = index1 + "" + index2;
                    skuContainer.innerHTML +=
                        `
                            <div   style="display: flex;" margin:35px; >
    
                                <p class="p-copiar" style="color: ${corConfig.hex};" class="grid-item"> <b> Cor: </b> ${cor.name} <b> Tamanho: </b> ${tamanho}</p>
                                <button style="color: ${corConfig.hex};" onclick="copiarSKU('${skuItem}', '${id_aviso}')" class="botao-copiar">${skuItem}</button>
                                <div id="aviso_${id_aviso}" class="aviso"><b>SKU copiado!</b></div>

                            </div>

                        `
                        
                        ;

                }
            });
            sku = sku.concat(skuCor);
        }
    });
    
    

}

var audioElement = new Audio('/src/audio/bloop-2-186531.mp3');

function copiarSKU(sku, avisoId) {
    const textarea = document.createElement('textarea');
    textarea.value = sku;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    var todosAvisos = document.querySelectorAll('[id^="aviso_"]');
    todosAvisos.forEach(function(aviso) {
        // Verifica se o ID do aviso não é igual ao ID específico que você está manipulando
        if (aviso.id !== "aviso_" + avisoId) {
            // Oculta o aviso
            aviso.style.display = 'none';
        }
    });


    var avisoEspecifico = document.getElementById("aviso_" + avisoId); // Corrigido para "aviso_" + avisoId
    avisoEspecifico.style.display = 'block';



    
}


