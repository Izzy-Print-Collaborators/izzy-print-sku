document.addEventListener("DOMContentLoaded", function() {
    let nomeEstampa = document.getElementById("estampa").value;
    document.getElementById("nome_camiseta").innerText = nomeEstampa;

    let modelagem = document.querySelector('input[name=modelagem]:checked').value;
    document.getElementById("modelo").innerText = modelagem;

    let local = document.querySelector('input[name=local]:checked').value;
    document.getElementById("localidade").innerText = local;



});


function gerarSKU() {
    const skuContainer = document.getElementById("skuContainer");
    skuContainer.innerHTML = ''; 
    let nomeEstampa = document.getElementById("estampa").value;
    document.getElementById("nome_camiseta").innerText = nomeEstampa;
    
    
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
        tamanhos = ['P', 'PP', 'M', 'G'];

    } else if (modelagem == 'IN') {
        tamanhos = ['02', '04', '06', '08', '10'];

    } else if (modelagem == 'CB') {
        tamanhos = ['P', 'M', 'G', 'GG', 'EG'];

    }
     else {
        tamanhos = ['P', 'M', 'G', 'GG', 'EG'];
    }

    let sku = [];

    let last = 'G4'; 

    const cores = [
        { key: 'branca', allowClara: true, last: '', hex: '#383636' },
        { key: 'preta', allowClara: false, last: '', hex: '#000000' },
        { key: 'cinzaMescla', allowClara: false, last: 'G1', hex: '#b0afa7' },
        { key: 'estonadaChumbo', allowClara: false, last: 'G3', hex: '#666662' },
        { key: 'estonadaMarrom', allowClara: false, last: 'G3', hex: '#8B4513' },
        { key: 'lilas', allowClara: false, last: 'G1', hex: '#b35fd4' }, 
        { key: 'marrom', allowClara: false, last: 'G1', hex: '#8B4513' }, 
        { key: 'offWhite', allowClara: true, last: '', hex: '#d4d3ab' }, 
        { key: 'verdeMusgo', allowClara: false, last: 'G2', hex: '#74a148' }, 
        { key: 'verde', allowClara: false, last: 'G2', hex: '#78d10a' }, 
        { key: 'vermelha', allowClara: false, last: 'G1', hex: '#bd1c1c' }, 
        { key: 'azulMarinho', allowClara: false, last: 'G1', hex: '#0c3a69' }, 
        { key: 'marmorizadaPreta', allowClara: false, last: 'G3', hex: '#000000' },
        { key: 'azulClaro', allowClara: false, last: 'G1', hex: '#5da0e3' } 
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
    else if( empresa.toUpperCase().includes('AGS10')){
        empresa = "15"
    }
    else if( empresa.toUpperCase().includes('WD4U')){
        empresa = "16"
    }
    else if( empresa.toUpperCase().includes('DOPE')){
        empresa = "17"
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
            
            for (let index2 = 0; index2 < tamanhos.length; index2++) {
                let tamanho = tamanhos[index2];
                console.log(corConfig.last);
                console.log(tamanho);
        
                if (tamanho == corConfig.last) {
                    break; 
                }
        
                let skuItem = empresa + "-" + nomeEstampa + "-A2-" + tipoImpressao + local + modelagem + cor.value + tamanho;
                const skuContainer = document.getElementById("skuContainer");
                var id_aviso = index1 + "" + index2;
                skuContainer.innerHTML +=
                    `
                        <div style="display: flex;" margin:35px; >
                            <p class="p-copiar" style="color: ${corConfig.hex};" class="grid-item"> <b> Cor: </b> ${cor.name} <b> Tamanho: </b> ${tamanho}</p>
                            <button style="color: ${corConfig.hex};" onclick="copiarSKU('${skuItem}', '${id_aviso}')" class="botao-copiar">${skuItem}</button>
                            <div id="aviso_${id_aviso}" class="aviso"><b>SKU copiado!</b></div>
                        </div>
                    `;
            }
            sku = sku.concat(skuCor);
        }
        
    });

var audioElement = new Audio('/src/audio/bloop-2-186531.mp3');


}

function copiarSKU(sku, avisoId) {
    const textarea = document.createElement('textarea');
    textarea.value = sku;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    var todosAvisos = document.querySelectorAll('[id^="aviso_"]');

    todosAvisos.forEach(function(aviso) {
        if (aviso.id !== "aviso_" + avisoId) {
            aviso.style.display = 'none';
        }
    });


    var avisoEspecifico = document.getElementById("aviso_" + avisoId);
    avisoEspecifico.style.display = 'block';

}