function atualizarCarrinho() {
  const contadorSpan = document.querySelector('nav a.cart span');
  let quantidade = localStorage.getItem('carrinhoQuantidade') || 0;
  contadorSpan.textContent = quantidade;
}

// Função para adicionar item ao carrinho
function adicionarAoCarrinho() {
  let quantidade = parseInt(localStorage.getItem('carrinhoQuantidade')) || 0;
  quantidade += 1;
  localStorage.setItem('carrinhoQuantidade', quantidade);
  atualizarCarrinho();
}

// Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  atualizarCarrinho();
  const botoes = document.querySelectorAll('.btn-comprar');
  botoes.forEach(botao => {
    botao.addEventListener('click', adicionarAoCarrinho);
  });
});