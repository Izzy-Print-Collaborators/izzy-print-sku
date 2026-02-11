"use client";
import React, { useState, useEffect } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import Header from "../../components/Header";


interface Cor {
  key: string;
  name: string;
  hex: string;
  allowClara?: boolean;
  last?: string;
}

interface Modelo {
  key: string;
  name: string;
}

interface Local {
  key: string;
  name: string;
}

const cores: Cor[] = [
  { key: "BR", name: "Branca", hex: "#ffffff", allowClara: true },
  { key: "PR", name: "Preta", hex: "#000000", allowClara: false },
  { key: "CM", name: "Cinza Mescla", hex: "#b0afa7", allowClara: false, last: "G4" },
  { key: "EC", name: "Estonada Chumbo", hex: "#666662", allowClara: false, last: "G4" },
  { key: "EM", name: "Estonada Marrom", hex: "#8B4513", allowClara: false, last: "G4" },
  { key: "LL", name: "Lilás", hex: "#b35fd4", allowClara: false, last: "G1" },
  { key: "MR", name: "Marrom", hex: "#8B4513", allowClara: false, last: "G1" },
  { key: "OW", name: "Off White", hex: "#d4d3ab", allowClara: true },
  { key: "VM", name: "Verde Musgo", hex: "#74a148", allowClara: false, last: "G2" },
  { key: "VR", name: "Verde", hex: "#78d10a", allowClara: false, last: "G2" },
  { key: "VE", name: "Vermelha", hex: "#bd1c1c", allowClara: false, last: "G1" },
  { key: "AM", name: "Azul Marinho", hex: "#0c3a69", allowClara: false, last: "G1" },
  { key: "MP", name: "Marmorizada Preta", hex: "#000000", allowClara: false, last: "G1" },
  { key: "AC", name: "Azul Claro", hex: "#5da0e3", allowClara: false, last: "G1" },
];

const modelos: Modelo[] = [
  { key: "ST", name: "Camiseta Street" },
  { key: "CB", name: "Camiseta Boxy" },
  { key: "CL", name: "Camiseta Clássica" },
  { key: "ES", name: "Camiseta Babylook Feminina" },
  { key: "IN", name: "Camiseta Infantil" },
  { key: "MG", name: "Moletom Gola Careca" },
  { key: "MC", name: "Moletom Canguru" },
];

const locais: Local[] = [
  { key: "FR", name: "Frente" },
  { key: "FC", name: "Frente e Costas" },
  { key: "CF", name: "Costas na Frente" },
];

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
  { id: "99", keywords: ["IZZY", "IZZY PRINT", "IZZYPRINT"] },
];

const GeradorSKU: React.FC = () => {
  const [empresa, setEmpresa] = useState("");
  const [estampa, setEstampa] = useState("");
  const [modelagem, setModelagem] = useState("");
  const [localEstampa, setLocalEstampa] = useState("");
  const [coresSelecionadas, setCoresSelecionadas] = useState<string[]>([]);
  const [skuList, setSkuList] = useState<string[]>([]);


  const handleCoresChange = (key: string) => {
    setCoresSelecionadas(prev =>
      prev.includes(key) ? prev.filter(c => c !== key) : [...prev, key]
    );
  };
  const getCookie = (name: string) => {
    return document.cookie
      .split("; ")
      .find(row => row.startsWith(name + "="))
      ?.split("=")[1];
  };


  useEffect(() => {
    const empresaCookie = getCookie("empresa");

    if (empresaCookie) {
      setEmpresa(decodeURIComponent(empresaCookie));
    }
  }, []);

  const gerarSKU = () => {
    let empresaId: string | null = null;
    const nomeEmpresa = empresa.trim().toUpperCase();

    for (const item of empresaMap) {
      if (item.keywords.some(keyword => nomeEmpresa === keyword)) {
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
        stopOnFocus: true,
      }).showToast();
      return;
    }

    let nomeEstampaFormatado = estampa
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ç/g, "c")
      .replace(/[^a-zA-Z0-9 ]/g, "");

    let char = nomeEstampaFormatado.charAt(nomeEstampaFormatado.length - 1);

    if (nomeEstampaFormatado.length > 8) {
      nomeEstampaFormatado = nomeEstampaFormatado.substring(0, 8).toUpperCase();
    } else {
      nomeEstampaFormatado = nomeEstampaFormatado.toUpperCase();
      for (let i = nomeEstampaFormatado.length; i < 8; i++) {
        nomeEstampaFormatado += char.toUpperCase();
      }
    }

    let tamanhos: string[] = [];

    switch (modelagem) {
      case "ST":
        tamanhos = ["P", "M", "G", "GG", "EG", "G1", "G2", "G3", "G4"];
        break;
      case "CL":
        tamanhos = ["P", "PP", "M", "G", "GG", "EG", "G1"];
        break;
      case "IN":
        tamanhos = ["02", "04", "06", "08", "10", "12"];
        break;
      case "CB":
        tamanhos = ["P", "M", "G", "GG", "EG"];
        break;
      case "MC":
      case "MG":
        tamanhos = ["P", "M", "G", "GG", "EG", "G1"];
        break;
      default:
        tamanhos = ["P", "M", "G", "GG", "EG"];
    }

    const novosSKUs: string[] = [];

    coresSelecionadas.forEach(corKey => {
      const corConfig = cores.find(c => c.key === corKey);
      if (!corConfig) return;

      const tipoImpressao = corConfig.allowClara ? "CL" : "ES";

      for (let tamanho of tamanhos) {
        if (tamanho === corConfig.last) break;
        const skuItem = `${empresaId}-${nomeEstampaFormatado}-A2-${tipoImpressao}${localEstampa}${modelagem}${corKey}${tamanho}`;
        novosSKUs.push(skuItem);
      }
    });

    setSkuList(novosSKUs);
  };

  const copiarSKU = (sku: string) => {
    navigator.clipboard.writeText(sku).then(() => {
      Toastify({
        text: "SKU copiado!",
        duration: 1500,
        gravity: "top",
        position: "center",
        backgroundColor: "#4caf50",
      }).showToast();
    });
  };

  return (
    <div className="p-0 m-0">
        <Header />
        <main className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

              <section className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-md border border-zinc-200">
                <div className="flex items-center gap-4 mb-8">
                  <img
                    src="https://www.izzyprint.com.br/wp-content/uploads/2020/04/cropped-LOGO-IZZY-PRETO_DIFERENTE-1-192x192.png"
                    className="w-20 h-20 rounded-xl border border-zinc-200"
                  />
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">Gerador de SKU</h1>
                    <p className="text-zinc-500 text-sm">Sistema interno Izzy Print</p>
                  </div>
                </div>

                <form
                  onSubmit={e => {
                    e.preventDefault();
                    gerarSKU();
                  }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium mb-1">Nome da empresa</label>
                    <h1>{empresa}</h1>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Nome da estampa</label>
                    <input
                      type="text"
                      value={estampa}
                      onChange={e => setEstampa(e.target.value)}
                      maxLength={8}
                      placeholder="Ex: ROCKBRAS"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <fieldset className="border border-zinc-300 p-4 rounded-xl">
                    <legend className="text-sm font-semibold text-indigo-600 px-2">Local da estampa</legend>
                    <div className="space-y-2 mt-2">
                      {locais.map(l => (
                        <label className="flex items-center gap-2" key={l.key}>
                          <input
                            type="radio"
                            name="local"
                            value={l.key}
                            checked={localEstampa === l.key}
                            onChange={() => setLocalEstampa(l.key)}
                            className="accent-indigo-600"
                          />
                          {l.name}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="border border-zinc-300 p-4 rounded-xl">
                    <legend className="text-sm font-semibold text-indigo-600 px-2">Modelagem</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                      {modelos.map(m => (
                        <label className="flex items-center gap-2" key={m.key}>
                          <input
                            type="radio"
                            name="modelagem"
                            value={m.key}
                            checked={modelagem === m.key}
                            onChange={() => setModelagem(m.key)}
                            required
                            className="accent-indigo-600"
                          />
                          {m.name}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="border border-zinc-300 p-4 rounded-xl">
                    <legend className="text-sm font-semibold text-indigo-600 px-2">Cores</legend>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                      {cores.map(c => (
                        <label className="flex items-center gap-2" key={c.key}>
                          <input
                            type="checkbox"
                            checked={coresSelecionadas.includes(c.key)}
                            onChange={() => handleCoresChange(c.key)}
                            className="accent-indigo-600"
                          />
                          {c.name}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white transition rounded-xl py-3 font-bold shadow"
                    >
                      Gerar SKU
                    </button>
                    <button
                      type="reset"
                      onClick={() => {
                        setEmpresa("");
                        setEstampa("");
                        setModelagem("");
                        setLocalEstampa("");
                        setCoresSelecionadas([]);
                        setSkuList([]);
                      }}
                      className="flex-1 bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition rounded-xl py-3 font-bold"
                    >
                      Resetar
                    </button>
                  </div>
                </form>
              </section>

              <aside className="bg-white rounded-2xl p-8 shadow-md border border-zinc-200">
                <h2 className="text-xl font-bold text-indigo-600 mb-4">Estrutura do SKU</h2>
                <div className="space-y-3 text-sm text-zinc-600">
                  <p>
                    <b>Empresa:</b> Código identificador.
                  </p>
                  <p>
                    <b>Estampa:</b> Até 8 caracteres.
                  </p>
                  <p>
                    <b>Local:</b> Frente, Costas ou Ambas.
                  </p>
                  <p>
                    <b>Modelagem:</b> Tipo do produto.
                  </p>
                  <p>
                    <b>Cor:</b> Variação final.
                  </p>

                  <div id="invisivel" className="border mt-2 p-2">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-wrap gap-4">
                        <div>
                          <label>Nome estampa:</label>
                          <h3>{estampa}</h3>
                        </div>
                        <div>
                          <label>Modelo camiseta:</label>
                          <h3>{modelagem}</h3>
                        </div>
                        <div>
                          <label>Local da estampa:</label>
                          <h3>{localEstampa}</h3>
                        </div>
                        <div id="coresContainer" className="flex flex-wrap gap-2">
                          {coresSelecionadas.map(cKey => {
                            const cor = cores.find(c => c.key === cKey);
                            return (
                              <div
                                key={cKey}
                                style={{ display: "flex", alignItems: "center", margin: "5px 0" }}
                              >
                                <div style={{ width: 20, height: 20, backgroundColor: cor?.hex, marginRight: 10 }}></div>
                                <span>{cor?.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div id="skuContainer" className="grid gap-2 mt-2">
                        {skuList.map((sku, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <button
                              style={{ color: "#4a90e2" }}
                              onClick={() => copiarSKU(sku)}
                              className="botao-copiar"
                            >
                              {sku}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-indigo-600 font-medium pt-2">Clique no SKU gerado para copiar.</p>
                </div>
              </aside>
            </main>
    </div>

  );
};

export default GeradorSKU;
