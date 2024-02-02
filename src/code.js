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
        { key: 'branca', allowClara: true, allowEG: true},
        { key: 'preta', allowClara: false, allowEG: true },
        { key: 'cinzaMescla', allowClara: false, allowEG: true },
        { key: 'estonadaChumbo', allowClara: false, allowEG: true },
        { key: 'estonadaMarrom', allowClara: false, allowEG: true  },
        { key: 'lilas', allowClara: false, allowEG: false , allowG2: false },
        { key: 'marrom', allowClara: false, allowEG: false , allowG2: false },
        { key: 'offWhite', allowClara: true, allowEG: true , allowG2: false },
        { key: 'verdeMusgo', allowClara: false, allowEG: false , allowG2: false },
        { key: 'verde', allowClara: false, allowEG: false , allowG2: false },
        { key: 'vermelha', allowClara: false, allowEG: false , allowG2: false },
        { key: 'azulMarinho', allowClara: false, allowEG: false , allowG2: false },
        { key: 'azulClaro', allowClara: false, allowEG: false , allowG2: false }
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
    else if( empresa.toUpperCase().includes('NEW ERA')){
        empresa = "07"
    }
    else if( empresa.toUpperCase().includes('MUD CONCEPT')){
        empresa = "08"
    }
    else if( empresa.toUpperCase().includes('MADFERIT')){
        empresa = "09"
    }
    else if( empresa.toUpperCase().includes('VISCERY')){
        empresa = "10"
    }
    else if( empresa.toUpperCase().includes('GOLDERA')){
        empresa = "11"
    }
    else if( empresa.toUpperCase().includes('OLDFUTURE')){
        empresa = "11"
    }
    else {
        alert("Empresa não cadastrada. Por favor contatar Izzy Print");
        return ;
    }
    
    document.querySelector("#invisivel").style.display = "block";

    cores.forEach(corConfig => {
        const corMarcada = document.getElementById(corConfig.key).checked;
        const cor = document.getElementById(corConfig.key);
        if (corMarcada) {
            let skuCor = [];
            if (corConfig.allowClara) {
                tipoImpressao = 'CL';
            } else {
                tipoImpressao = 'ES';
            }
            tamanhos.forEach(tamanho => {
                if (corConfig.allowEG || tamanho != 'EG') {
                    
                    let skuItem = '';
                    skuItem = empresa + "-" + nomeEstampa + "-A2-" + tipoImpressao + local + modelagem + cor.value + tamanho;
                    const skuContainer = document.getElementById("skuContainer");
                    skuContainer.innerHTML += 
                    `<p class="grid-item"> <b> Cor: </b> ${cor.name} <b> Tamanho: </b> ${tamanho}
                        <button onclick="copiarSKU('${skuItem}')" class="botao-copiar">${skuItem}
                        </button>
                    </p>`;
                    
                }
            });
            sku = sku.concat(skuCor);
        }
    });
    sku.forEach(codigo => {
    });        
}


function copiarSKU(sku) {
    const textarea = document.createElement('textarea');
    textarea.value = sku;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);


}
