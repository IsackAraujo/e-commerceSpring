export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    categoryEntity: {
        id: number;
        name: string;
    };
}

export interface CartItem extends Product {
    quantity: number;
}

let cart: CartItem[] = loadCartFromLocalStorage();

function loadCartFromLocalStorage(): CartItem[] {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export const addToCart = (product: Product) => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCartToLocalStorage();
};

export const removeFromCart = (productId: number) => {
    cart = cart.filter(product => product.id !== productId);
    saveCartToLocalStorage();
};

export const getCart = () => {
    return cart;
};

export const clearCart = () => {
    cart = [];
    saveCartToLocalStorage();
};

export const getCartTotal = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
};

