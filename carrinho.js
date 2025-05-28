// Recupera o carrinho do localStorage
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Seleciona os elementos
const itensCarrinho = document.getElementById('itens-carrinho');
const valorTotalSpan = document.getElementById('valor-total');
const modalCadastro = document.getElementById('modal-cadastro');
const btnFecharModal = document.querySelector('.fechar');
const btnEnviarCadastro = document.getElementById('enviar-cadastro');

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

// Finalizar compra (abrir modal)
document.getElementById('finalizar-compra').addEventListener('click', () => {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
  } else {
    modalCadastro.style.display = 'block';
  }
});

// Fechar o modal
btnFecharModal.addEventListener('click', () => {
  modalCadastro.style.display = 'none';
});

// Enviar cadastro e redirecionar para a página de pagamento
btnEnviarCadastro.addEventListener('click', () => {
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const endereco = document.getElementById('endereco').value.trim();
  const cidade = document.getElementById('cidade').value.trim();
  const cep = document.getElementById('cep').value.trim();

  if (!nome || !email || !telefone || !endereco || !cidade || !cep) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  // Simular carregamento e redirecionamento
  btnEnviarCadastro.disabled = true;
  btnEnviarCadastro.textContent = 'Processando...';

  setTimeout(() => {
    // Salvar os dados do cliente no localStorage (ou enviar para backend)
    const dadosCliente = { nome, email, telefone, endereco, cidade, cep };
    localStorage.setItem('dadosCliente', JSON.stringify(dadosCliente));

    // Fechar modal
    modalCadastro.style.display = 'none';

    // Redirecionar para a página de pagamento
    window.location.href = 'pagamento.html'; // Substitua pelo caminho correto se necessário
  }, 2000); // 2 segundos simulando processamento
});

// Inicializa o carrinho
atualizarCarrinho();

// Fechar o modal se clicar fora do conteúdo
window.addEventListener('click', (event) => {
  if (event.target === modalCadastro) {
    modalCadastro.style.display = 'none';
  }
});
