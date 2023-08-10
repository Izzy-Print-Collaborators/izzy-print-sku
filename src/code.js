let sku = "";
let nomeEstampa = "Rock Brasileiro";
nomeEstampa = nomeEstampa.replace(/\s/g, '')
let char = nomeEstampa.charAt(nomeEstampa.length - 1)
let cor = "PR";
let local = "FR";
let modelagem = "ST";

if (nomeEstampa.length > 8) {
    let maiusculo = nomeEstampa.substring(0, 8).toUpperCase();
    sku = maiusculo;
} else {
    sku = nomeEstampa.toUpperCase();
    for (let i = nomeEstampa.length; i < 8; i++) {
        sku += char.toUpperCase();
    }
}
sku += "-A2-";

if(cor == "BR" || cor == "OW"){
    sku+="CL"
}
else{
    sku+="ES"
}

sku+= local;
sku+= modelagem;
sku+= cor;

let stSizes = ["PP", "P", "M", "G", "EG", "GG", "G1", "G2", "02", "04", "06", "08", "10"];

if(modelagem = "ST") {
    stSizes = [stSizes[1], stSizes[2], stSizes[3], stSizes[4], stSizes[5], stSizes[6], stSizes[7]];
}

for(let i = 0; i < stSizes.length; i++) {
    sku += stSizes[i];
    console.log(sku);
}