let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function adicionaAoCarrinho(nomeProduto, precoProduto) {
  const produto = { nome: nomeProduto, preco: precoProduto };
  carrinho.push(produto);
  atualizaContagemCarrinho();
  salvarCarrinho();
  alert(`O produto ${nomeProduto} foi adicionado ao seu carrinho.`);
}

const gerarRelatorio = (vendas) => {
  const formatarMoeda = (valor) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);

  let relatorio = `Relatório de Vendas:\n\n`;
  let totalGeral = 0;
  let comissoes = {};

  vendas.forEach(({ produto, preco, quantidade, vendedor }) => {
    const total = preco * quantidade;
    const comissao = total * 0.05;

    totalGeral += total;

    if (!comissoes[vendedor]) {
      comissoes[vendedor] = 0;
    }
    comissoes[vendedor] += comissao;

    relatorio += `- Produto: ${produto}
Quantidade: ${quantidade}
Preço Unitário: ${formatarMoeda.format(preco)}
Total: ${formatarMoeda.format(total)}
Vendedor: ${vendedor}

`;
  });

  relatorio += `Total Geral: ${formatarMoeda.format(totalGeral)}\n\n`;
  relatorio += `Total de comissão (5%):\n\n`;

  for (const vendedor in comissoes) {
    relatorio += `${vendedor}: ${formatarMoeda.format(comissoes[vendedor])}\n`;
  }

  return relatorio;
};

const gerarEmail = ({ nome, email, plano, ativo }) => {
  let template = `Para: ${email}
    
    Olá, ${nome} 
    
    `;

  if (ativo) {
    template += `Obrigado por ser um assinante do nosso plano ${plano}! Estamos felizes tem tê-lo conosco.
        
        Caso precise de suporte, estamos à disposição.
        
        Atenciosamente,
        Equipe StreamingWeb.`;
  } else {
    template += `Notamos que sua assinatura do plano ${plano} está inativa. Que tal voltar e  aproveitar nossos conteúdos exclusivos?
    
        Reative agora e continue sua experiência conosco!
    
        Atenciosamente,
        Equipe StreamingWeb.`;
  }

  return template;
};

const normalizarUsuario = ({ nome, idade, ativo, saldo }) => {
  let idadeNormalizada = parseInt(idade, 10);
  if (Number.isNaN(idadeNormalizada)) {
    idadeNormalizada = null;
  }

  let ativoNormalizado =
    ativo === true || ativo === "true" || ativo === 1;

  let saldoNormalizado = parseFloat(saldo);
  if (Number.isNaN(saldoNormalizado)) {
    saldoNormalizado = 0;
  }
  saldoNormalizado = Number(saldoNormalizado.toFixed(2));

  return {
    nome,
    idade: idadeNormalizada,
    ativo: ativoNormalizado,
    saldo: saldoNormalizado
  };
};

const processarUsuario = (lista) => {
  const usuariosNormalizados = lista.map(usuario =>
    normalizarUsuario(usuario)
  );

  console.log(usuariosNormalizados);
};

const somar = (numeros, callback) => callback(numeros);

const somaCincoPares = (x) => {
  let inicio = x % 2 === 0 ? x : x + 1;

  const pares = [];
  for (let i = 0; i < 5; i++) {
    pares.push(inicio + i * 2);
  }

  const resultado = somar(pares, lista =>
    lista.reduce((acc, n) => acc + n, 0)
  );

  console.log(`Entrada: ${x} => Saída: ${resultado}`);
};

const exportacao = {
  paisDestino: "Estados Unidos",
  produto: {
    nome: "aço",
    valorEmDolares: 100000,
    taxaImposta: 0.25
  },
  empresa: "Siderúrgica Brasil Ltda"
};

const calcularTarifa = ({ produto, empresa }) => {
  const { nome, valorEmDolares, taxaImposta } = produto;

  const valorComTarifa = valorEmDolares * (1 + taxaImposta);

  console.log(`Produto: ${nome}`);
  console.log(`Empresa: ${empresa}`);
  console.log(`Valor original: US$ ${valorEmDolares}`);
  console.log(`Taxa: ${taxaImposta * 100}%`);
  console.log(`Valor com tarifa: US$ ${valorComTarifa}`);
};



function atualizaContagemCarrinho() {
  document.getElementById("carrinho-contagem").textContent = carrinho.length;
}

function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function carregaCarrinho() {
  carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  atualizaContagemCarrinho();
  mostrarItensCarrinho();
}

function mostrarItensCarrinho() {
  const containerCarrinho = document.getElementById("carrinho-container");
  const totalCarrinho = document.getElementById("carrinho-total");
  containerCarrinho.innerHTML = "";
  let total = 0;

  carrinho.forEach((produto, indice) => {
    const itemCarrinho = document.createElement("div");
    itemCarrinho.classList.add("carrinho__item");

    itemCarrinho.innerHTML = `
            <img src="./img/${produto.nome}.jpg" alt="${produto.nome}">
            <div class="carrinho__item--detalhes">
                <h3>${produto.nome}</h3>
                <p>${produto.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
            </div>
            <button onclick="removerItemCarrinho(${indice})">Remover</button>
        `;

    containerCarrinho.appendChild(itemCarrinho);
    total += produto.preco;
  });

  totalCarrinho.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function removerItemCarrinho(indice) {
  carrinho.splice(indice, 1);
  atualizaContagemCarrinho();
  salvarCarrinho();
  mostrarItensCarrinho();
}

function limpaCarrinho() {
  carrinho = [];
  atualizaContagemCarrinho();
  salvarCarrinho();
  mostrarItensCarrinho();
}

//RESPOSTAS

//Etapa 02
//URL para buscar: https://viacep.com.br/ws/58400240/json/
//Método http para usar: GET
//Resposta do Reject: reject('Erro ao consultar o CEP'))
const buscarEndereco = (cep) => {
  return new Promise((resolve, reject) => {
    //TODO
  });
};

const consultaCep = () => {
  const cep = document.getElementById("cep").value.replace(/\D/g, "");
  if (cep.length === 8) {
    buscarEndereco(cep)
      .then((data) => {
        //TODO
      })
      .catch((error) => alert(error));
  } else {
    alert("CEP inválido!");
  }
};

//Etapa 03
const geraTextoMarketeiro = (dadosFormulario) => {
  const card = document.createElement("div");
  card.style.width = "300px";
  card.style.border = "1px solid #ccc";
  card.style.borderRadius = "10px";
  card.style.padding = "15px";
  card.style.boxShadow = "2px 2px 10px rgba(0,0,0,0.1)";
  card.style.margin = "10px auto";
  card.style.fontFamily = "Arial, sans-serif";
  card.style.backgroundColor = "#f9f9f9";

  card.innerHTML = `
        <h3 style="text-align: center; color: #333;">Informações do Usuário</h3>
        <p><strong>Mensagem:</strong> Apresentamos ${dadosFormulario.nome}, residente na rua ${dadosFormulario.endereco}</p>
    `;

  document.body.appendChild(card);
};

//Não mexer neste método
function submeterDados(event) {
  const dadosFormulario = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    motivo: document.getElementById("motivo").value,
    cep: document.getElementById("cep").value,
    endereco: document.getElementById("logradouro").value,
    endereco: document.getElementById("complemento").value,
    cidade: document.getElementById("cidade").value,
    estado: document.getElementById("estado").value,
  };

  gerarTextoMarketeiro(dadosFormulario);
}

//Etapa 04
//URL para buscar: https://fakestoreapi.com/products
//Método http para usar: GET
//Resposta do Reject: reject('Erro ao consultar os Produtos'))
const consultarProdutosExternos = () => {
  return new Promise((resolve, reject) => {
    //TODO
  });
};

const alterarValoresTabela = () => {
  consultarProdutosExternos()
    .then((data) => {
      //TODO
    })
    .catch((error) => alert(error));
};

//Não mexer neste método
const modificaValores = ([
  produto1,
  produto2,
  produto3,
  produto4,
  produto5,
  produto6,
]) => {
  const tabela = document
    .getElementById("tabelaProdutos")
    .getElementsByTagName("tbody")[0];
  tabela.rows[0].cells[1].innerText = produto1.preco;
  tabela.rows[0].cells[2].innerText = produto1.estoque;
  tabela.rows[1].cells[1].innerText = produto2.preco;
  tabela.rows[1].cells[2].innerText = produto2.estoque;
  tabela.rows[2].cells[1].innerText = produto3.preco;
  tabela.rows[2].cells[2].innerText = produto3.estoque;
  tabela.rows[3].cells[1].innerText = produto4.preco;
  tabela.rows[3].cells[2].innerText = produto4.estoque;
  tabela.rows[4].cells[1].innerText = produto5.preco;
  tabela.rows[4].cells[2].innerText = produto5.estoque;
  tabela.rows[5].cells[1].innerText = produto6.preco;
  tabela.rows[5].cells[2].innerText = produto6.estoque;
};

window.onload = carregaCarrinho;
