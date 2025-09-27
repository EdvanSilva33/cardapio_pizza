import React, { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';

const CheckoutForm = ({ isOpen, onClose, cartItems, total, onSubmitOrder }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    neighborhood: '',
    complement: '',
    paymentMethod: 'dinheiro',
    changeFor: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitOrder(formData);
  };

  const deliveryFee = total >= 50 ? 0 : 5;
  const finalTotal = total + deliveryFee;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-red-600 text-white p-4 flex items-center justify-between rounded-t-lg">
          <h2 className="text-xl font-bold">Finalizar Pedido</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Dados pessoais */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome completo *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Seu nome completo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefone *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="(11) 99999-9999"
            />
          </div>

          {/* Endereço */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Endereço completo *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Rua, número"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bairro *
            </label>
            <input
              type="text"
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Seu bairro"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Complemento
            </label>
            <input
              type="text"
              name="complement"
              value={formData.complement}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Apartamento, bloco, etc."
            />
          </div>

          {/* Forma de pagamento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Forma de pagamento *
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="dinheiro"
                  checked={formData.paymentMethod === 'dinheiro'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Dinheiro
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cartao"
                  checked={formData.paymentMethod === 'cartao'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Cartão (débito/crédito)
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="pix"
                  checked={formData.paymentMethod === 'pix'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                PIX
              </label>
            </div>
          </div>

          {formData.paymentMethod === 'dinheiro' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Troco para quanto?
              </label>
              <input
                type="number"
                name="changeFor"
                value={formData.changeFor}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Valor para troco"
                step="0.01"
              />
            </div>
          )}

          {/* Resumo do pedido */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <h3 className="font-semibold mb-2">Resumo do pedido:</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxa de entrega:</span>
                <span className={deliveryFee === 0 ? 'text-green-600 font-semibold' : ''}>
                  {deliveryFee === 0 ? 'Grátis' : `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`}
                </span>
              </div>
              <div className="border-t pt-1 flex justify-between font-bold">
                <span>Total:</span>
                <span className="text-red-600">R$ {finalTotal.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          </div>

          {/* Botão de enviar */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Enviar pedido via WhatsApp</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;

