document.addEventListener("DOMContentLoaded", function() {
   info();
});

function info(){
    const cores = [
        { key: 'branca', name: 'Branca', hex: '#ffffff' },
        { key: 'preta', name: 'Preta', hex: '#000000' },
        { key: 'cinzaMescla', name: 'Cinza Mescla', hex: '#b0afa7' },
        { key: 'estonadaChumbo', name: 'Estonada Chumbo', hex: '#666662' },
        { key: 'estonadaMarrom', name: 'Estonada Marrom', hex: '#8B4513' },
        { key: 'lilas', name: 'Lilás', hex: '#b35fd4' },
        { key: 'marrom', name: 'Marrom', hex: '#8B4513' },
        { key: 'offWhite', name: 'Off White', hex: '#d4d3ab' },
        { key: 'verdeMusgo', name: 'Verde Musgo', hex: '#74a148' },
        { key: 'verde', name: 'Verde', hex: '#78d10a' },
        { key: 'vermelha', name: 'Vermelha', hex: '#bd1c1c' },
        { key: 'azulMarinho', name: 'Azul Marinho', hex: '#0c3a69' },
        { key: 'marmorizadaPreta', name: 'Marmorizada Preta', hex: '#000000' },
        { key: 'azulClaro', name: 'Azul Claro', hex: '#5da0e3' }
    ];
    const modelos = [
        { key: 'ST', name: 'Camiseta Street' },
        { key: 'CB', name: 'Camiseta Boxy' },
        { key: 'RB', name: 'Regata Boxy' },
        { key: 'RO', name: 'Regata Oversized' },
        { key: 'CL', name: 'Camiseta Clássica' },
        { key: 'ES', name: 'Camiseta Babylook Feminina' },
        { key: 'IN', name: 'Camiseta Infantil' },
        { key: 'MG', name: 'Moletom Gola Careca' },
        { key: 'MC', name: 'Moletom Canguru' }
    ];

    const local = [
        { key: 'FR', name: 'Frente' },
        { key: 'FC', name: 'Frente e Costas' },
        { key: 'CF', name: 'Costas na Frente' }

    ];


    let nomeEstampa = document.getElementById("estampa").value;
    document.getElementById("nome_camiseta").innerText = nomeEstampa;

    let modelagem = document.querySelector('input[name="modelagem"]:checked')?.value;

    if (modelagem) {
        document.getElementById("modelo").innerText =
            modelos.find(m => m.key === modelagem)?.name || 'Modelo não encontrado';
    } else {
        document.getElementById("modelo").innerText = "Nenhum modelo selecionado";
    }

 
    let localEstampa = document.querySelector('input[name="local"]:checked')?.value;

    if (localEstampa) {
        document.getElementById("localidade").innerText =
            local.find(l => l.key === localEstampa)?.name || 'Local não encontrado';
    } else {
        document.getElementById("localidade").innerText = "Nenhum modelo selecionado";
    }


    const coresContainer = document.getElementById("coresContainer");
    let coresHTML = '';

    cores.forEach(corConfig => {
        const corMarcada = document.getElementById(corConfig.key).checked;
        if (corMarcada) {
            coresHTML += `
                <div style="display: flex; align-items: center; margin: 5px 0;">
                    <div style="width: 20px; height: 20px; background-color: ${corConfig.hex}; margin-right: 10px;"></div>
                    <span>${corConfig.name}</span>
                </div>
            `;
        }
    });

    coresContainer.innerHTML = coresHTML; 
}

function gerarSKU() {
    const skuContainer = document.getElementById("skuContainer");
    skuContainer.innerHTML = ''; 
    let nomeEstampa = document.getElementById("estampa").value;
    document.getElementById("nome_camiseta").innerText = nomeEstampa;
    
    nomeEstampa = nomeEstampa.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ç/g, "c").replace(/[^a-zA-Z0-9 ]/g, "");   // remove tudo que não seja letra, número ou espaço
    
   
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

    if (modelagem == 'ST' || modelagem == 'RO') {
        tamanhos = ['P', 'M', 'G', 'GG', 'EG', 'G1', 'G2', 'G3', 'G4'];
    } else if (modelagem == 'CL') {
        tamanhos = ['P', 'PP', 'M', 'G', 'GG', 'EG', 'G1'];
    } else if (modelagem == 'BB') {
        tamanhos = ['P', 'M', 'G', 'GG'];
    } else if (modelagem == 'IN') {
        tamanhos = ['02', '04', '06', '08', '10', '12'];
    } else if (modelagem == 'CB' || modelagem == 'RB') {
        tamanhos = ['P', 'M', 'G', 'GG', 'EG'];
    }
    else if (modelagem == 'MC'){
        tamanhos = ['P', 'M', 'G', 'GG', 'EG', 'G1']
    }
     else if(modelagem == 'MG'){
        tamanhos = ['P', 'M', 'G', 'GG', 'EG', 'G1'];
    }
    else {
        tamanhos = ['P', 'M', 'G', 'GG', 'EG'];
    }

    let sku = [];

    const cores = [
        { key: 'branca', allowClara: true, last: '', hex: '#383636' },
        { key: 'preta', allowClara: false, last: '', hex: '#000000' },
        { key: 'cinzaMescla', allowClara: false, last: 'G4', hex: '#b0afa7' },
        { key: 'estonadaChumbo', allowClara: false, last: 'G4', hex: '#666662' },
        { key: 'estonadaMarrom', allowClara: false, last: 'G4', hex: '#8B4513' },
        { key: 'lilas', allowClara: false, last: 'G1', hex: '#b35fd4' }, 
        { key: 'marrom', allowClara: false, last: 'G1', hex: '#8B4513' }, 
        { key: 'offWhite', allowClara: true, last: '', hex: '#d4d3ab' }, 
        { key: 'verdeMusgo', allowClara: false, last: 'G2', hex: '#74a148' }, 
        { key: 'verde', allowClara: false, last: 'G2', hex: '#78d10a' }, 
        { key: 'vermelha', allowClara: false, last: 'G1', hex: '#bd1c1c' }, 
        { key: 'azulMarinho', allowClara: false, last: 'G1', hex: '#0c3a69' }, 
        { key: 'marmorizadaPreta', allowClara: false, last: 'G1', hex: '#000000' },
        { key: 'azulClaro', allowClara: false, last: 'G1', hex: '#5da0e3' } 
    ];

    let empresa = document.getElementById("opcoes").value;

const empresaOriginal = empresa.toUpperCase();

const empresaMap = [
  { id: "01", keywords: ["AGED"] },
  { id: "02", keywords: ["SOCCER"] },
  { id: "03", keywords: ["XAPO"] },
  { id: "04", keywords: ["STUFF"] },
  { id: "05", keywords: ["POESIA"] },
  { id: "06", keywords: ["BALOVE"] },
  { id: "07", keywords: ["NEW ERA", "NEW"] },
  { id: "08", keywords: ["MUD CONCEPT", "MUD"] },
  { id: "09", keywords: ["MADFERIT"] },
  { id: "10", keywords: ["VISCERY"] },
  { id: "11", keywords: ["GOLDERA"] },
  { id: "12", keywords: ["OLDFUTURE"] },
  { id: "13", keywords: ["STYLTRAP"] },
  { id: "14", keywords: ["INKCT STUDIOS", "INKCT"] },
  { id: "15", keywords: ["AGS10"] },
  { id: "16", keywords: ["WD4U"] },
  { id: "17", keywords: ["DOPE"] },
  { id: "18", keywords: ["FX IMPORTS", "FX"] },
  { id: "19", keywords: ["CYBER ZERO", "CYBERZZERO"] },
  { id: "20", keywords: ["HERTIMA"] },
  { id: "21", keywords: ["SALVE", "SALVECRAZY"] },
  { id: "22", keywords: ["LEECYN"] },
  { id: "23", keywords: ["FORJA DOS FORTES", "FORJADOSFORTES"] },
  { id: "24", keywords: ["HOLDINGLABZ", "HOLDING LABZ"] },
  { id: "25", keywords: ["VIBRECINEMA", "VIBRE CINEMA"] },
  { id: "26", keywords: ["REALOG", "REAL OG"] },
  { id: "27", keywords: ["DRT RECORDS", "DRT"] },
  { id: "28", keywords: ["QUEBRA COMPANY", "QUEBRACOMAPANY"] },
  { id:"29", keywords:["FTX", "FTX STUDIOS"]},
  { id:"30", keywords:["NTS", "NTS STUDIOS"]},
  { id: "31", keywords: ["FESTIVAL MANDELAO"] },
  { id: "32", keywords: ["LG COMPANY"] },
  { id: "33", keywords: ["MANDELAO WORLD"] },
  { id: "34", keywords: ["DATABASE"] },
  { id: "35", keywords: ["123 COMPANY", "123COMPANY"] },
   { id: "36", keywords: ["BANHEIRISTAS"] },
   { id: "37", keywords: ["ANIME-SE", "ANIMESE"] },
   { id: "38", keywords: ["EMPIRE"] },
   { id: "39", keywords: ["AVIV"] },
   { id: "40", keywords: ["FAITH COMPANY", "FAITHCOMPANY"] },
   { id: "41", keywords: ["KING TIGER", "KINGTIGER"] },
   { id: "42", keywords: ["TURF"] },
   { id: "43", keywords: ["VASCON"] },
   { id: "44", keywords: ["LYRICALCO", "LYRICAL CO"] },
   { id: "45", keywords: ["FECIT CREATIONS", "FECITCREATIONS", "FECIT"] },
   { id: "46", keywords: ["XTHRIVE"] },
   { id: "47", keywords: ["KNESSE"] },
   { id: "48", keywords: ["ÔTEZ CLLUB", "OTEZ CLLUB"] },
   { id: "49", keywords: ["ASPECT"] },
   { id: "50", keywords: ["EUASPECT"] },
   { id: "51", keywords: ["VICTOR LOU" ,"VICTORLOU"]  },
   { id: "52", keywords: ["JASONCOMICS"] },
   { id: "53", keywords: ["THAGGY"] },
   { id: "54", keywords: ["MMRCH1994"] },
      { id: "55", keywords: ["STREET VERSE" ,"STREETVERSE"]  },
         { id: "56", keywords: ["SOLTFIT"]  },
   { id: "57", keywords: ["LOYALTY TRADEMARK","LOYALTYTRADEMARK"]  },
   { id: "58", keywords: ["PATIOGBA"]  },
   { id: "59", keywords: ["BLOW"]  },
   { id: "60", keywords: ["USUALDANCE"]  },

  { id: "99", keywords: ["IZZY", "IZZY PRINT" , "IZZYPRINT"] }
];

let empresaId = null;

const empresaNormalizada = empresaOriginal.trim().toUpperCase();

for (const item of empresaMap) {
  if (item.keywords.some(keyword => empresaNormalizada === keyword)) {
    empresaId = item.id;
    break;
  }
}


if (!empresaId) {
    Toastify({
      text: "Empresa não cadastrada. Por favor contatar Izzy Print",
      duration: 3000, 
      gravity: "top",
      position: "center", 
      backgroundColor: "#ff4444",
      stopOnFocus: true 
    }).showToast();

  return;
}

empresa = empresaId;

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
        info();

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
