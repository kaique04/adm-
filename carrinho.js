// Recupera o carrinho do localStorage
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Seleciona os elementos
const itensCarrinho = document.getElementById('itens-carrinho');
const valorTotalSpan = document.getElementById('valor-total');

// Função para atualizar o carrinho na tela
function atualizarCarrinho() {
  itensCarrinho.innerHTML = '';
  let total = 0;

  if (carrinho.length === 0) {
    itensCarrinho.innerHTML = '<p>Seu carrinho está vazio.</p>';
  } else {
    carrinho.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('item-carrinho');

      itemDiv.innerHTML = `
        <img src="${item.imagem}" alt="${item.nome}" style="width: 80px; height: 80px; object-fit: cover; margin-right: 10px;">
        <div>
          <p><strong>${item.nome}</strong></p>
          <p>Preço: R$ ${item.preco.toFixed(2)}</p>
          <p>Quantidade: ${item.quantidade}</p>
        </div>
        <button onclick="removerItem(${index})">Remover</button>
      `;

      itensCarrinho.appendChild(itemDiv);
      total += item.preco * item.quantidade;
    });
  }

  valorTotalSpan.textContent = total.toFixed(2);
}

// Função para remover um item
function removerItem(index) {
  carrinho.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarCarrinho();
}

// Finalizar compra
document.getElementById('finalizar-compra').addEventListener('click', () => {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
  } else {
    alert('Compra finalizada! Obrigado por escolher a Rommanel!');
    localStorage.removeItem('carrinho');
    carrinho = [];
    atualizarCarrinho();
  }
});

// Inicializa o carrinho
atualizarCarrinho();
