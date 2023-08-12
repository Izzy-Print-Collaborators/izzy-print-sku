
function gerarSKU() {
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
        tamanhos = ['P', 'PP', 'M', 'G', 'GG', 'EG', 'G1', 'G2'];

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
        { key: 'branca', allowClara: true, allowEG: true },
        { key: 'preta', allowClara: false, allowEG: true },
        { key: 'cinzaMescla', allowClara: false, allowEG: false },
        { key: 'estonadaChumbo', allowClara: false, allowEG: false },
        { key: 'estonadaMarrom', allowClara: false, allowEG: false },
        { key: 'lilas', allowClara: false, allowEG: false },
        { key: 'marrom', allowClara: false, allowEG: false },
        { key: 'offWhite', allowClara: true, allowEG: true },
        { key: 'verdeMusgo', allowClara: false, allowEG: false },
        { key: 'verde', allowClara: false, allowEG: false },
        { key: 'vermelha', allowClara: false, allowEG: false },
        { key: 'azulMarinho', allowClara: false, allowEG: false },
        { key: 'azulClaro', allowClara: false, allowEG: false }
    ];

    cores.forEach(corConfig => {
        const corMarcada = document.getElementById(corConfig.key).checked;
        const cor = document.getElementById(corConfig.key).value;
        if (corMarcada) {
            let skuCor = [];

            if (corConfig.allowClara) {
                tipoImpressao = 'CL';
            } else {
                tipoImpressao = 'ES';
            }

            tamanhos.forEach(tamanho => {
                if (corConfig.allowEG || tamanho != 'EG') {
                    const skuItem = nomeEstampa + "-A2-" + tipoImpressao + local + modelagem + cor + tamanho;
                    skuCor.push(skuItem);
                }
            });

            sku = sku.concat(skuCor);
        }
    });
    document.querySelector("#invisivel").style.display = "block";

    sku.forEach(codigo => {
        const skuContainer = document.getElementById("skuContainer");
        skuContainer.innerHTML += `<p class="grid-item"><button onclick="copiarSKU('${codigo}')" class="botao-copiar">${codigo}</button></p>`;
    });        
}

function limparSKUs() {
    const skuContainer = document.getElementById("skuContainer");
    skuContainer.innerHTML = ''; 
}

function copiarSKU(sku) {
    const textarea = document.createElement('textarea');
    textarea.value = sku;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}