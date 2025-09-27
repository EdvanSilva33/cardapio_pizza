import React, { useState } from "react";
import Header from "./components/Header";
import MenuCategory from "./components/menu/MenuCategory";
import MenuItem from "./components/menu/MenuItem";
import Cart from "./components/cart/Cart";
import CheckoutForm from "./components/checkout/CheckoutForm";
import { menuData, categories } from "./data/menuData";
import "./App.css";
import cartao from "./assets/cartao.png";
function App() {
  const [activeCategory, setActiveCategory] = useState("pizzas-tradicionais");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Função para adicionar item ao carrinho
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  // Função para atualizar quantidade no carrinho
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Função para remover item do carrinho
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Função para abrir checkout
  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Função para enviar pedido via WhatsApp
  const submitOrder = (customerData) => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const deliveryFee = total >= 50 ? 0 : 5;
    const finalTotal = total + deliveryFee;

    // Montar mensagem do WhatsApp
    let message = `🍕 *NOVO PEDIDO - PIZZARIA LUIGI DELIVERY*\n\n`;
    message += `👤 *Cliente:* ${customerData.name}\n`;
    message += `📱 *Telefone:* ${customerData.phone}\n\n`;
    message += `📍 *Endereço de entrega:*\n`;
    message += `${customerData.address}\n`;
    message += `${customerData.neighborhood}\n`;
    if (customerData.complement) {
      message += `${customerData.complement}\n`;
    }
    message += `\n🛒 *Itens do pedido:*\n`;

    cartItems.forEach((item) => {
      message += `• ${item.quantity}x ${item.name} - R$ ${(
        item.price * item.quantity
      )
        .toFixed(2)
        .replace(".", ",")}\n`;
    });

    message += `\n💰 *Resumo financeiro:*\n`;
    message += `Subtotal: R$ ${total.toFixed(2).replace(".", ",")}\n`;
    message += `Taxa de entrega: ${
      deliveryFee === 0
        ? "Grátis"
        : `R$ ${deliveryFee.toFixed(2).replace(".", ",")}`
    }\n`;
    message += `*Total: R$ ${finalTotal.toFixed(2).replace(".", ",")}*\n\n`;
    message += `💳 *Forma de pagamento:* ${
      customerData.paymentMethod.charAt(0).toUpperCase() +
      customerData.paymentMethod.slice(1)
    }\n`;

    if (customerData.paymentMethod === "dinheiro" && customerData.changeFor) {
      message += `💵 *Troco para:* R$ ${parseFloat(customerData.changeFor)
        .toFixed(2)
        .replace(".", ",")}\n`;
    }

    // Codificar mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "556132480808"; // Substitua pelo número real
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Abrir WhatsApp
    window.open(whatsappUrl, "_blank");

    // Limpar carrinho e fechar modais
    setCartItems([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  const cartItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemsCount={cartItemsCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      <MenuCategory
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            {menuData[activeCategory]?.title}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Escolha seus sabores favoritos e adicione ao carrinho
          </p>
        </div>

        <div className="space-y-4">
          {menuData[activeCategory]?.items.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              onAddToCart={addToCart}
              cartItems={cartItems}
              onUpdateQuantity={updateQuantity}
            />
          ))}
        </div>
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={openCheckout}
      />

      <CheckoutForm
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        total={cartTotal}
        onSubmitOrder={submitOrder}
      />

      {/* Footer */}
      <footer className="bg-black text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-2">LUIGI PIZZAS</h3>
          <p className="text-gray-300 mb-4">Sabor que você pode confiar</p>
          <p> 💳 ACEITAMOS CARTÕES DE CRÉDITO E DÉBITO</p>
          <div className="flex justify-center my-2 bg-white p-2 rounded w-80 mx-auto">
            <img src={cartao} alt="Cartões Aceitos" />
          </div>

          <div className="space-y-1 text-sm text-gray-400">
            <p>📱 Telefone: (61) 3248-0808</p>
            <p>🕒 Horário: 18:00 às 23:00</p>
            <p>🚚 Entrega grátis acima de R$ 50,00</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
