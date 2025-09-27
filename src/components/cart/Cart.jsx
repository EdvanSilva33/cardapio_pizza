import React from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';

const Cart = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = total >= 50 ? 0 : 5;
  const finalTotal = total + deliveryFee;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        {/* Header do carrinho */}
        <div className="bg-red-600 text-white p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Seu Pedido</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Itens do carrinho */}
        <div className="p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-6xl mb-4 block">🛒</span>
              <p className="text-gray-500">Seu carrinho está vazio</p>
              <p className="text-gray-400 text-sm mt-2">Adicione alguns itens deliciosos!</p>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="border-b border-gray-200 py-4">
                  <div className="flex items-start space-x-3">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.image ? (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-2xl sm:text-3xl">🍕</span>
            </div>
          )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {item.displayName || item.name}
                      </h3>
                      <p className="text-red-600 font-bold">
                        R$ {item.price.toFixed(2).replace('.', ',')}
                        {item.sizeDescription && ` - ${item.sizeDescription}`}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Resumo do pedido */}
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxa de entrega:</span>
                  <span className={deliveryFee === 0 ? 'text-green-600 font-semibold' : ''}>
                    {deliveryFee === 0 ? 'Grátis' : `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-red-600">R$ {finalTotal.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              {/* Botão de finalizar pedido */}
              <button
                onClick={onCheckout}
                disabled={total < 30}
                className={`w-full mt-6 py-3 rounded-lg font-semibold transition-colors ${
                  total >= 30
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {total >= 30 ? 'Finalizar Pedido' : `Pedido mínimo R$ 30,00`}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

