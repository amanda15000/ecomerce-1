
// Dados dos produtos
const products = [
    {
        id: 1,
        name: "Base Cover Up Mari Maria",
        price: 55.90,
        image: "image/Base Cover Up Mari Maria.webp"
    },
    {
        id: 2,
        name: "Boticário Óleo Hidratante Nativa 300ml",
        price: 85.45,
        image: "image/Boticário Óleo Hidratante Nativa 300ml.webp"
    },
    {
        id: 3,
        name: "Carolina Herrera Good Girl Eau de Parfum",
        price: 649.99,
        image: "image/Carolina Herrera Good Girl Eau de Parfum.webp"
    },
    {
        id: 4,
        name: "Creme Acetinado Hidratante Desodorante Corporal Lily Lumière 250g",
        price: 118.45,
        image: "image/Creme Acetinado Hidratante Desodorante Corporal Lily Lumière 250g.webp"
    },
    {
        id: 5,
        name: "Creme Ácido Glicólico Creamy 30g",
        price: 78.84,
        image: "image/Creamy Ácido Glicólico 30g.webp"
    },
    {
        id: 6,
        name: "Dove Óleo de Banho 240ml",
        price: 39.90,
        image: "image/Dove Óleo de Banho 240ml.jpg"
    },
    {
        id: 7,
        name: "Gel de Limpeza Facial Garnier Uniform e Matte Vitamina C 150g",
        price: 23.19,
        image: "image/Gel de Limpeza Facial Garnier Uniform e Matte Vitamina C 150g.webp"
    },
    {
        id: 8,
        name: "Gloss Fran By Franciny Ehlke Liphoney",
        price: 62.90,
        image: "image/Gloss Fran By Franciny Ehlke Liphoney.jpg"
    },
    {
        id: 9,
        name: "Labotrat Esfoliante Corporal.webp",
        price: 26.76,
        image: "image/Labotrat Esfoliante Corporal.webp"
    },
    {
        id: 10,
        name: "Principia Sérum Mix-02 30ml",
        price: 60.95,
        image: "image/Principia Sérum Mix-02 30ml.webp"
    },
    {
        id: 11,
        name: "Chantilly de Banho Sabonete Líquido",
        price: 69.90,
        image: "image/Chantilly de Banho Sabonete Líquido.webp"
    },
    {
        id: 12,
        name: "Protetor Solar Sallve Bastão Fps 90",
        price: 84.90,
        image: "image/Protetor Solar Sallve Bastão Fps 90.webp"
    },
    

];
   


// Estado do carrinho
let cart = [];

// Elementos DOM
const productsGrid = document.getElementById('products-grid');
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');

// Inicializar a página
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCart();
});

// Renderizar produtos
function renderProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });

    // Adicionar event listeners aos botões
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Adicionar produto ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    // Verificar se o produto já está no carrinho
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${product.name} adicionado ao carrinho!`);
}

// Remover produto do carrinho
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Atualizar carrinho
function updateCart() {
    // Atualizar contador
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Atualizar lista de itens
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Seu carrinho está vazio</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
                <button class="cart-item-remove" data-id="${item.id}">Remover</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Atualizar total
    cartTotal.textContent = total.toFixed(2);
    
    // Adicionar event listeners aos botões de remover
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

// Mostrar notificação
function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #2ecc71;
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        transition: transform 0.3s, opacity 0.3s;
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateY(20px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Abrir/fechar carrinho
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});
