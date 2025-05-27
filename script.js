// Inicializa o carrinho (buscando do localStorage ou iniciando vazio)
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Atualiza o contador ao carregar a página
atualizarContadorCarrinho();

// Seleciona todos os botões de "Adicionar ao Carrinho"
const botoesComprar = document.querySelectorAll('.btn-comprar');

botoesComprar.forEach(botao => {
  botao.addEventListener('click', () => {
    const nome = botao.getAttribute('data-nome');
    const preco = parseFloat(botao.getAttribute('data-preco'));
    const imagem = botao.getAttribute('data-imagem');

    // Cria o objeto do produto
    const produto = {
      nome: nome,
      preco: preco,
      imagem: imagem,
      quantidade: 1
    };

    // Verifica se o produto já existe no carrinho
    const index = carrinho.findIndex(item => item.nome === nome);
    if (index !== -1) {
      // Se já existe, aumenta a quantidade
      carrinho[index].quantidade += 1;
    } else {
      // Se não existe, adiciona ao carrinho
      carrinho.push(produto);
    }

    // Atualiza o carrinho no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Atualiza o contador
    atualizarContadorCarrinho();

    alert(`${nome} adicionado ao carrinho!`);
  });
});

// Função para atualizar o contador no ícone do carrinho
function atualizarContadorCarrinho() {
  const contador = document.querySelector('.cart span');
  const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
  contador.textContent = totalItens;
}
