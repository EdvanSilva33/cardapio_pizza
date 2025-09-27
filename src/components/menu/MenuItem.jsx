import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const MenuItem = ({ item, onAddToCart, cartItems, onUpdateQuantity }) => {
  const [selectedSize, setSelectedSize] = useState('grande'); // Tamanho padrão
  
  // Para pizzas, usar o tamanho selecionado; para bebidas, usar o item diretamente
  const currentPrice = item.sizes ? item.sizes[selectedSize].price : item.price;
  const currentDescription = item.sizes ? item.sizes[selectedSize].description : '';
  
  // Criar um ID único que inclui o tamanho (para pizzas)
  const itemKey = item.sizes ? `${item.id}-${selectedSize}` : item.id;
  
  const cartItem = cartItems.find(cartItem => cartItem.id === itemKey);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    const itemToAdd = {
      ...item,
      id: itemKey,
      price: currentPrice,
      size: selectedSize,
      sizeDescription: currentDescription,
      displayName: item.sizes ? `${item.name} (${selectedSize === 'pequena' ? 'Pequena' : 'Grande'})` : item.name
    };
    onAddToCart(itemToAdd);
  };

  const handleIncrement = () => {
    onUpdateQuantity(itemKey, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onUpdateQuantity(itemKey, quantity - 1);
    } else {
      onUpdateQuantity(itemKey, 0); // Remove do carrinho
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200">
      <div className="flex">
        {/* Conteúdo do item */}
        <div className="flex-1 p-4">
          <h3 className="font-bold text-base text-gray-800 mb-2">{item.name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
          
          {/* Seleção de tamanho (apenas para pizzas) */}
          {item.sizes && (
            <div className="mb-3">
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedSize('pequena')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedSize === 'pequena'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Pequena ({item.sizes.pequena.description})
                </button>
                <button
                  onClick={() => setSelectedSize('grande')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedSize === 'grande'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Grande ({item.sizes.grande.description})
                </button>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">a partir de</span>
              <span className="text-lg font-bold text-green-600">
                R$ {currentPrice.toFixed(2).replace('.', ',')}
              </span>
              {currentDescription && (
                <span className="text-xs text-gray-500">{currentDescription}</span>
              )}
            </div>
            
            {quantity === 0 ? (
              <button
                onClick={handleAddToCart}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Adicionar</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2 bg-red-50 rounded-lg p-1">
                <button
                  onClick={handleDecrement}
                  className="w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-semibold text-red-600 min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Imagem do item */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 m-4 rounded-lg overflow-hidden">
          {item.image ? (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-2xl sm:text-3xl">🍕</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;

