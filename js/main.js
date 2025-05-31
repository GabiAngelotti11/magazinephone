// Inicialização do Local Storage
if (!localStorage.getItem('produtos')) {
    localStorage.setItem('produtos', JSON.stringify([]));
}
if (!localStorage.getItem('usuarios')) {
    localStorage.setItem('usuarios', JSON.stringify([]));
}
if (!localStorage.getItem('carrinho')) {
    localStorage.setItem('carrinho', JSON.stringify([]));
}
if (!localStorage.getItem('listaDesejos')) {
    localStorage.setItem('listaDesejos', JSON.stringify([]));
}

// Função para carregar produtos em destaque
function carregarProdutosDestaque() {
    const produtos = JSON.parse(localStorage.getItem('produtos'));
    const container = document.getElementById('produtos-destaque');
    if (!container) return;

    // Ordena os produtos por data de cadastro (mais recentes primeiro)
    produtos.sort((a, b) => new Date(b.dataCadastro) - new Date(a.dataCadastro));

    // Pega os 8 produtos mais recentes
    const produtosDestaque = produtos.slice(0, 8);

    container.innerHTML = produtosDestaque.map(produto => `
        <div class="col-md-3 mb-4">
            <div class="card h-100">
                <div class="position-relative">
                    <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}">
                    ${produto.precoAntigo ? `
                        <span class="badge bg-danger position-absolute top-0 end-0 m-2">
                            ${Math.round((1 - produto.preco / produto.precoAntigo) * 100)}% OFF
                        </span>
                    ` : ''}
                </div>
                <div class="card-body">
                    <h5 class="card-title">${produto.nome}</h5>
                    <p class="card-text text-muted">${produto.marca} - ${produto.modelo}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            ${produto.precoAntigo ? `
                                <small class="text-decoration-line-through text-muted">R$ ${produto.precoAntigo.toFixed(2)}</small><br>
                            ` : ''}
                            <span class="h5 mb-0">R$ ${produto.preco.toFixed(2)}</span>
                        </div>
                        <button class="btn btn-primary" onclick="adicionarAoCarrinho(${produto.id})">
                            <i class="bi bi-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(produtoId) {
    const produtos = JSON.parse(localStorage.getItem('produtos'));
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));
    const produto = produtos.find(p => p.id === produtoId);

    if (!produto) return;

    const itemCarrinho = carrinho.find(item => item.produtoId === produtoId);
    if (itemCarrinho) {
        itemCarrinho.quantidade++;
    } else {
        carrinho.push({
            produtoId: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: 1,
            imagem: produto.imagem
        });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
    mostrarNotificacao('Produto adicionado ao carrinho!');
}

// Função para atualizar o contador do carrinho
function atualizarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));
    const contador = document.getElementById('carrinho-count');
    if (contador) {
        const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
        contador.textContent = totalItens;
    }
}

// Função para mostrar notificação
function mostrarNotificacao(mensagem) {
    const toast = document.createElement('div');
    toast.className = 'toast position-fixed bottom-0 end-0 m-3';
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="toast-header">
            <strong class="me-auto">MagazinePhone</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body">
            ${mensagem}
        </div>
    `;
    document.body.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    toast.addEventListener('hidden.bs.toast', () => toast.remove());
}

// Função para cadastrar produto
function cadastrarProduto(event) {
    event.preventDefault();
    const produtos = JSON.parse(localStorage.getItem('produtos'));
    const novoProduto = {
        id: produtos.length + 1,
        nome: document.getElementById('nome').value,
        marca: document.getElementById('marca').value,
        categoria: document.getElementById('categoria').value,
        modelo: document.getElementById('modelo').value,
        descricao: document.getElementById('descricao').value,
        preco: parseFloat(document.getElementById('preco').value),
        precoAntigo: document.getElementById('preco-antigo').value ? parseFloat(document.getElementById('preco-antigo').value) : null,
        estoque: parseInt(document.getElementById('estoque').value),
        imagem: document.getElementById('imagem').value,
        especificacoes: document.getElementById('especificacoes').value,
        dataCadastro: new Date().toISOString()
    };

    produtos.push(novoProduto);
    localStorage.setItem('produtos', JSON.stringify(produtos));
    mostrarNotificacao('Produto cadastrado com sucesso!');
    window.location.href = 'produtos.html';
}

// Função para cadastrar usuário
function cadastrarUsuario(event) {
    event.preventDefault();
    const usuarios = JSON.parse(localStorage.getItem('usuarios'));
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;

    if (senha !== confirmarSenha) {
        mostrarNotificacao('As senhas não coincidem!');
        return;
    }

    const novoUsuario = {
        id: usuarios.length + 1,
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        senha: senha,
        endereco: {
            cep: document.getElementById('cep').value,
            estado: document.getElementById('estado').value,
            cidade: document.getElementById('cidade').value,
            bairro: document.getElementById('bairro').value,
            rua: document.getElementById('rua').value,
            numero: document.getElementById('numero').value,
            complemento: document.getElementById('complemento').value
        },
        tipo: document.getElementById('tipo-usuario').value,
        dataCadastro: new Date().toISOString()
    };

    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    mostrarNotificacao('Usuário cadastrado com sucesso!');
    window.location.href = 'usuarios.html';
}

// Função para listar produtos
function listarProdutos() {
    const produtos = JSON.parse(localStorage.getItem('produtos'));
    const container = document.getElementById('lista-produtos');
    if (!container) return;

    container.innerHTML = produtos.map(produto => `
        <div class="col-md-3 mb-4">
            <div class="card h-100">
                <div class="position-relative">
                    <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}">
                    ${produto.precoAntigo ? `
                        <span class="badge bg-danger position-absolute top-0 end-0 m-2">
                            ${Math.round((1 - produto.preco / produto.precoAntigo) * 100)}% OFF
                        </span>
                    ` : ''}
                </div>
                <div class="card-body">
                    <h5 class="card-title">${produto.nome}</h5>
                    <p class="card-text text-muted">${produto.marca} - ${produto.modelo}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            ${produto.precoAntigo ? `
                                <small class="text-decoration-line-through text-muted">R$ ${produto.precoAntigo.toFixed(2)}</small><br>
                            ` : ''}
                            <span class="h5 mb-0">R$ ${produto.preco.toFixed(2)}</span>
                        </div>
                        <div class="btn-group">
                            <button class="btn btn-outline-primary" onclick="editarProduto(${produto.id})">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-outline-danger" onclick="excluirProduto(${produto.id})">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Função para listar usuários
function listarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios'));
    const container = document.getElementById('lista-usuarios');
    if (!container) return;

    container.innerHTML = usuarios.map(usuario => `
        <tr>
            <td>${usuario.id}</td>
            <td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td>${usuario.telefone}</td>
            <td>
                <span class="badge bg-${usuario.tipo === 'admin' ? 'danger' : usuario.tipo === 'funcionario' ? 'warning' : 'info'}">
                    ${usuario.tipo.charAt(0).toUpperCase() + usuario.tipo.slice(1)}
                </span>
            </td>
            <td>
                <div class="btn-group">
                    <button class="btn btn-sm btn-outline-primary" onclick="editarUsuario(${usuario.id})">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="excluirUsuario(${usuario.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Função para filtrar produtos
function filtrarProdutos() {
    const produtos = JSON.parse(localStorage.getItem('produtos'));
    const categoria = document.getElementById('filtro-categoria').value;
    const marca = document.getElementById('filtro-marca').value;
    const precoMin = document.getElementById('filtro-preco-min').value;
    const precoMax = document.getElementById('filtro-preco-max').value;

    const produtosFiltrados = produtos.filter(produto => {
        const matchCategoria = !categoria || produto.categoria === categoria;
        const matchMarca = !marca || produto.marca === marca;
        const matchPrecoMin = !precoMin || produto.preco >= parseFloat(precoMin);
        const matchPrecoMax = !precoMax || produto.preco <= parseFloat(precoMax);
        return matchCategoria && matchMarca && matchPrecoMin && matchPrecoMax;
    });

    const container = document.getElementById('lista-produtos');
    if (!container) return;

    container.innerHTML = produtosFiltrados.map(produto => `
        <div class="col-md-3 mb-4">
            <div class="card h-100">
                <div class="position-relative">
                    <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}">
                    ${produto.precoAntigo ? `
                        <span class="badge bg-danger position-absolute top-0 end-0 m-2">
                            ${Math.round((1 - produto.preco / produto.precoAntigo) * 100)}% OFF
                        </span>
                    ` : ''}
                </div>
                <div class="card-body">
                    <h5 class="card-title">${produto.nome}</h5>
                    <p class="card-text text-muted">${produto.marca} - ${produto.modelo}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            ${produto.precoAntigo ? `
                                <small class="text-decoration-line-through text-muted">R$ ${produto.precoAntigo.toFixed(2)}</small><br>
                            ` : ''}
                            <span class="h5 mb-0">R$ ${produto.preco.toFixed(2)}</span>
                        </div>
                        <div class="btn-group">
                            <button class="btn btn-outline-primary" onclick="editarProduto(${produto.id})">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-outline-danger" onclick="excluirProduto(${produto.id})">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Função para filtrar usuários
function filtrarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios'));
    const nome = document.getElementById('filtro-nome').value.toLowerCase();
    const email = document.getElementById('filtro-email').value.toLowerCase();
    const tipo = document.getElementById('filtro-tipo').value;

    const usuariosFiltrados = usuarios.filter(usuario => {
        const matchNome = !nome || usuario.nome.toLowerCase().includes(nome);
        const matchEmail = !email || usuario.email.toLowerCase().includes(email);
        const matchTipo = !tipo || usuario.tipo === tipo;
        return matchNome && matchEmail && matchTipo;
    });

    const container = document.getElementById('lista-usuarios');
    if (!container) return;

    container.innerHTML = usuariosFiltrados.map(usuario => `
        <tr>
            <td>${usuario.id}</td>
            <td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td>${usuario.telefone}</td>
            <td>
                <span class="badge bg-${usuario.tipo === 'admin' ? 'danger' : usuario.tipo === 'funcionario' ? 'warning' : 'info'}">
                    ${usuario.tipo.charAt(0).toUpperCase() + usuario.tipo.slice(1)}
                </span>
            </td>
            <td>
                <div class="btn-group">
                    <button class="btn btn-sm btn-outline-primary" onclick="editarUsuario(${usuario.id})">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="excluirUsuario(${usuario.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Função para editar produto
function editarProduto(id) {
    window.location.href = `cadastro-produto.html?id=${id}`;
}

// Função para excluir produto
function excluirProduto(id) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        const produtos = JSON.parse(localStorage.getItem('produtos'));
        const produtosAtualizados = produtos.filter(produto => produto.id !== id);
        localStorage.setItem('produtos', JSON.stringify(produtosAtualizados));
        listarProdutos();
        mostrarNotificacao('Produto excluído com sucesso!');
    }
}

// Função para editar usuário
function editarUsuario(id) {
    window.location.href = `cadastro-usuario.html?id=${id}`;
}

// Função para excluir usuário
function excluirUsuario(id) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        const usuarios = JSON.parse(localStorage.getItem('usuarios'));
        const usuariosAtualizados = usuarios.filter(usuario => usuario.id !== id);
        localStorage.setItem('usuarios', JSON.stringify(usuariosAtualizados));
        listarUsuarios();
        mostrarNotificacao('Usuário excluído com sucesso!');
    }
}

// Função para atualizar o contador da lista de desejos
function atualizarListaDesejos() {
    const listaDesejos = JSON.parse(localStorage.getItem('listaDesejos'));
    const contador = document.getElementById('wishlist-count');
    if (contador) {
        contador.textContent = listaDesejos.length;
    }
}

// Função para adicionar produto à lista de desejos
function adicionarAosDesejos(produtoId) {
    const produtos = JSON.parse(localStorage.getItem('produtos'));
    const listaDesejos = JSON.parse(localStorage.getItem('listaDesejos'));
    const produto = produtos.find(p => p.id === produtoId);

    if (!produto) return;

    if (!listaDesejos.some(item => item.produtoId === produtoId)) {
        listaDesejos.push({
            produtoId: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem
        });
        localStorage.setItem('listaDesejos', JSON.stringify(listaDesejos));
        atualizarListaDesejos();
        mostrarNotificacao('Produto adicionado à lista de desejos!');
    } else {
        mostrarNotificacao('Este produto já está na sua lista de desejos!');
    }
}

// Função para remover produto da lista de desejos
function removerDosDesejos(produtoId) {
    const listaDesejos = JSON.parse(localStorage.getItem('listaDesejos'));
    const listaAtualizada = listaDesejos.filter(item => item.produtoId !== produtoId);
    localStorage.setItem('listaDesejos', JSON.stringify(listaAtualizada));
    atualizarListaDesejos();
    mostrarNotificacao('Produto removido da lista de desejos!');
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarProdutosDestaque();
    listarProdutos();
    listarUsuarios();
    atualizarCarrinho();
    atualizarListaDesejos();
}); 