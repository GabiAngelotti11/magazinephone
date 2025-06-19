const produtos = [
    {
        id: 1,
        nome: "iPhone 15 Pro",
        marca: "Apple",
        especificacoes: {
            tela: "6.1 polegadas OLED",
            processador: "A17 Pro",
            memoria: "256GB",
            camera: "48MP + 12MP + 12MP"
        },
        preco: 8999.90,
        disponivel: true,
        imagem: "img/produtos/iphone_15_pro.png"
    },
    {
        id: 2,
        nome: "Galaxy S24 Ultra",
        marca: "Samsung",
        especificacoes: {
            tela: "6.8 polegadas Dynamic AMOLED",
            processador: "Snapdragon 8 Gen 3",
            memoria: "512GB",
            camera: "200MP + 12MP + 50MP + 10MP"
        },
        preco: 9999.90,
        disponivel: true,
        imagem: "img/produtos/S24ultra.png"
    },
    {
        id: 3,
        nome: "Pixel 8 Pro",
        marca: "Google",
        especificacoes: {
            tela: "6.7 polegadas OLED",
            processador: "Google Tensor G3",
            memoria: "256GB",
            camera: "50MP + 48MP + 48MP"
        },
        preco: 7999.90,
        disponivel: true,
        imagem: "img/produtos/google-pixel-b_grande-removebg-preview.png"
    },
    {
        id: 4,
        nome: "Xiaomi 14 Pro",
        marca: "Xiaomi",
        especificacoes: {
            tela: "6.73 polegadas AMOLED",
            processador: "Snapdragon 8 Gen 3",
            memoria: "512GB",
            camera: "50MP + 50MP + 50MP"
        },
        preco: 6999.90,
        disponivel: true,
        imagem: "img/produtos/xiaomi14pro.png"
    },
    {
        id: 5,
        nome: "Motorola Edge 40 Pro",
        marca: "Motorola",
        especificacoes: {
            tela: "6.67 polegadas OLED",
            processador: "Snapdragon 8 Gen 2",
            memoria: "256GB",
            camera: "50MP + 50MP + 12MP"
        },
        preco: 4999.90,
        disponivel: true,
        imagem: "img/produtos/motorola-edge-40-pro.png"
    },
    {
        id: 6,
        nome: "OnePlus 12",
        marca: "OnePlus",
        especificacoes: {
            tela: "6.82 polegadas AMOLED",
            processador: "Snapdragon 8 Gen 3",
            memoria: "256GB",
            camera: "50MP + 48MP + 64MP"
        },
        preco: 5999.90,
        disponivel: true,
        imagem: "img/produtos/Oneplus12.png"
    },
    {
        id: 7,
        nome: "Nothing Phone 2",
        marca: "Nothing",
        especificacoes: {
            tela: "6.7 polegadas OLED",
            processador: "Snapdragon 8+ Gen 1",
            memoria: "256GB",
            camera: "50MP + 50MP"
        },
        preco: 3999.90,
        disponivel: true,
        imagem: "img/produtos/nothing-phone-2.png"
    },
    {
        id: 8,
        nome: "ASUS ROG Phone 8",
        marca: "ASUS",
        especificacoes: {
            tela: "6.78 polegadas AMOLED",
            processador: "Snapdragon 8 Gen 3",
            memoria: "512GB",
            camera: "50MP + 13MP + 32MP"
        },
        preco: 8999.90,
        disponivel: false,
        imagem: "img/produtos/rogphone.png"
    },
    {
        id: 9,
        nome: "Sony Xperia 1 V",
        marca: "Sony",
        especificacoes: {
            tela: "6.5 polegadas OLED",
            processador: "Snapdragon 8 Gen 2",
            memoria: "256GB",
            camera: "48MP + 12MP + 12MP"
        },
        preco: 7999.90,
        disponivel: true,
        imagem: "img/produtos/sony-xperia-1.png"
    },
    {
        id: 10,
        nome: "Realme GT5 Pro",
        marca: "Realme",
        especificacoes: {
            tela: "6.78 polegadas AMOLED",
            processador: "Snapdragon 8 Gen 3",
            memoria: "256GB",
            camera: "50MP + 8MP + 50MP"
        },
        preco: 4499.90,
        disponivel: true,
        imagem: "img/produtos/relme-GT5-Pro.png"
    },
    {
        id: 11,
        nome: "Vivo X100 Pro",
        marca: "Vivo",
        especificacoes: {
            tela: "6.78 polegadas AMOLED",
            processador: "MediaTek Dimensity 9300",
            memoria: "512GB",
            camera: "50MP + 50MP + 50MP"
        },
        preco: 6999.90,
        disponivel: true,
        imagem: "img/produtos/vivo_x100_pro.png"
    },
    {
        id: 12,
        nome: "OPPO Find X7 Ultra",
        marca: "OPPO",
        especificacoes: {
            tela: "6.82 polegadas AMOLED",
            processador: "Snapdragon 8 Gen 3",
            memoria: "512GB",
            camera: "50MP + 50MP + 50MP + 50MP"
        },
        preco: 7999.90,
        disponivel: false,
        imagem: "img/produtos/oppo-find-x7-ultra.png"
    }
];

function formatarPreco(preco) {
    return preco.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

function criarCardProduto(produto) {
    return `
        <div class="col-md-4 mb-4">
            <div class="card h-100">
                <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}" style="height: 200px; object-fit: contain;">
                <div class="card-body">
                    <h5 class="card-title">${produto.nome}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${produto.marca}</h6>
                    <p class="card-text">
                        <strong>Especificações:</strong><br>
                        Tela: ${produto.especificacoes.tela}<br>
                        Processador: ${produto.especificacoes.processador}<br>
                        Memória: ${produto.especificacoes.memoria}<br>
                        Câmera: ${produto.especificacoes.camera}
                    </p>
                    <p class="card-text">
                        <strong>Preço:</strong> ${formatarPreco(produto.preco)}<br>
                        <strong>Disponibilidade:</strong> 
                        <span class="badge ${produto.disponivel ? 'bg-success' : 'bg-danger'}">
                            ${produto.disponivel ? 'Disponível' : 'Indisponível'}
                        </span>
                    </p>
                    <button class="btn btn-primary w-100" ${!produto.disponivel ? 'disabled' : ''}>
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        </div>
    `;
}

function exibirProdutos() {
    const containerProdutos = document.getElementById('lista-produtos');
    if (containerProdutos) {
        containerProdutos.innerHTML = produtos.map(produto => criarCardProduto(produto)).join('');
    }
}

function filtrarProdutos() {
    const categoria = document.getElementById('filtro-categoria').value;
    const marca = document.getElementById('filtro-marca').value;
    const precoMin = parseFloat(document.getElementById('filtro-preco-min').value) || 0;
    const precoMax = parseFloat(document.getElementById('filtro-preco-max').value) || Infinity;

    const produtosFiltrados = produtos.filter(produto => {
        const matchCategoria = !categoria || produto.categoria === categoria;
        const matchMarca = !marca || produto.marca.toLowerCase() === marca.toLowerCase();
        const matchPreco = produto.preco >= precoMin && produto.preco <= precoMax;
        return matchCategoria && matchMarca && matchPreco;
    });

    const containerProdutos = document.getElementById('lista-produtos');
    if (containerProdutos) {
        containerProdutos.innerHTML = produtosFiltrados.map(produto => criarCardProduto(produto)).join('');
    }
}

function ordenarProdutos(tipo) {
    let produtosOrdenados = [...produtos];
    
    if (tipo === 'menor-preco') {
        produtosOrdenados.sort((a, b) => a.preco - b.preco);
    } else if (tipo === 'maior-preco') {
        produtosOrdenados.sort((a, b) => b.preco - a.preco);
    }
    
    const containerProdutos = document.getElementById('lista-produtos');
    if (containerProdutos) {
        containerProdutos.innerHTML = produtosOrdenados.map(produto => criarCardProduto(produto)).join('');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    exibirProdutos();
}); 