# Pizzaria Delivery - Site de Delivery

Um site moderno e responsivo para delivery de pizzaria, desenvolvido em React com Tailwind CSS.

## 🍕 Funcionalidades

- **4 Categorias de Produtos:**
  - Pizzas Tradicionais
  - Pizzas Especiais
  - Pizzas Doces
  - Bebidas

- **Sistema de Carrinho:**
  - Adicionar/remover itens
  - Alterar quantidades
  - Cálculo automático do total
  - Taxa de entrega (grátis acima de R$ 50,00)

- **Checkout Completo:**
  - Formulário de dados do cliente
  - Endereço de entrega
  - Formas de pagamento (Dinheiro, Cartão, PIX)
  - Envio automático via WhatsApp

- **Design Responsivo:**
  - Funciona em desktop e mobile
  - Interface intuitiva e moderna
  - Cores baseadas no site de referência

## 🚀 Como usar

### Pré-requisitos
- Node.js instalado
- npm (gerenciador de pacotes)

### Instalação
```bash
cd pizzaria-delivery
npm install
```

### Executar em desenvolvimento
```bash
npm run dev
```

O site estará disponível em `http://localhost:5173`

### Build para produção
```bash
npm run build
```

## 📱 Configuração do WhatsApp

Para personalizar o número do WhatsApp que receberá os pedidos:

1. Abra o arquivo `src/App.jsx`
2. Localize a linha com `whatsappNumber = '5511999999999'`
3. Substitua pelo seu número no formato internacional (sem espaços ou símbolos)

Exemplo: Para o número (11) 98765-4321, use: `5511987654321`

## 🎨 Personalização

### Alterar dados da pizzaria
Edite o arquivo `src/components/Header.jsx` para alterar:
- Nome da pizzaria
- Telefone de contato

Edite o arquivo `src/components/BusinessHours.jsx` para alterar:
- Horário de funcionamento (variáveis `OPENING_HOUR` e `CLOSING_HOUR`)

### Modificar cardápio
Edite o arquivo `src/data/menuData.js` para:
- Adicionar/remover produtos
- Alterar preços
- Modificar descrições
- Adicionar novas categorias

### Personalizar cores e layout
O projeto usa Tailwind CSS. As cores principais podem ser alteradas no arquivo `src/App.css`.

## 📋 Estrutura do Projeto

```
src/
├── components/
│   ├── cart/
│   │   └── Cart.jsx
│   ├── checkout/
│   │   └── CheckoutForm.jsx
│   ├── menu/
│   │   ├── MenuCategory.jsx
│   │   └── MenuItem.jsx
│   └── Header.jsx
├── data/
│   └── menuData.js
├── App.jsx
└── main.jsx
```

## 🛠️ Tecnologias Utilizadas

- **React** - Framework JavaScript
- **Tailwind CSS** - Framework CSS
- **Lucide React** - Ícones
- **Vite** - Build tool
- **npm** - Gerenciador de pacotes

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através do WhatsApp configurado no sistema.

---

Desenvolvido com ❤️ para facilitar pedidos de delivery de pizzaria.



## 🖼️ Gerenciamento de Imagens

Para adicionar imagens aos produtos:

1.  **Localização:** Coloque os arquivos de imagem na pasta `src/assets/`.
2.  **Formato e Tamanho:** Recomenda-se usar imagens no formato JPG ou PNG. Para melhor desempenho e visualização, o tamanho ideal para as imagens dos produtos é de aproximadamente **150x150 pixels** ou um formato quadrado similar, com boa resolução para evitar pixelização.
3.  **Associação:** No arquivo `src/data/menuData.js`, atualize o campo `image` de cada item para apontar para o caminho correto da sua imagem, por exemplo: `image: "/src/assets/pizza-margherita.jpg"`.

## 🚚 Configurações de Frete

As configurações de frete (taxa de entrega e valor para frete grátis) são definidas no arquivo `src/App.jsx` e utilizadas no `src/components/cart/Cart.jsx`.

1.  **Taxa de Entrega Grátis:**
    - Abra o arquivo `src/App.jsx`.
    - Localize a linha que calcula `deliveryFee` e `finalTotal`.
    - A condição `total >= 50` define que a entrega é grátis para pedidos acima de R$ 50,00. Você pode alterar o valor `50` para o limite desejado.

2.  **Valor do Frete:**
    - Abra o arquivo `src/App.jsx`.
    - Na mesma linha de `deliveryFee`, o valor `5` representa a taxa de entrega padrão. Altere este valor para o custo de frete desejado.

Exemplo de como encontrar e alterar em `src/App.jsx`:

```javascript
  const submitOrder = (customerData) => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = total >= 50 ? 0 : 5; // Altere '50' para o limite de frete grátis e '5' para o valor do frete
    const finalTotal = total + deliveryFee;
    // ... restante do código
  };
```




## 🌐 Alterar Favicon

O `favicon.ico` é o pequeno ícone que aparece na aba do navegador. Para alterá-lo:

1.  **Localização:** O arquivo `favicon.ico` está localizado na pasta `public/` do projeto.
2.  **Substituição:** Substitua o arquivo `public/favicon.ico` pelo seu novo ícone. Certifique-se de que o novo arquivo também se chame `favicon.ico`.
3.  **Formato:** O formato `.ico` é o mais recomendado para favicons, mas navegadores modernos também suportam `.png` ou `.svg`.

Se você usar um formato diferente de `.ico` ou um nome de arquivo diferente, você precisará atualizar a referência no arquivo `index.html`:

- Abra `index.html` (na raiz do projeto).
- Localize a linha:
  ```html
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  ```
- Altere o `href` e o `type` para corresponder ao seu novo arquivo (ex: `href="/meu-icone.png" type="image/png"`).




##  troubleshooting

### Favicon não atualiza

Se você substituiu o `favicon.ico` e ele não aparece atualizado no navegador, pode ser um problema de cache. Tente as seguintes soluções:

1.  **Limpar o cache do navegador:**
    -   **Chrome/Edge/Brave:** Pressione `Ctrl + Shift + R` (Windows/Linux) ou `Cmd + Shift + R` (Mac) para forçar um recarregamento completo da página, ignorando o cache.
    -   Alternativamente, vá para as configurações do navegador e limpe os dados de navegação (cache e cookies).

2.  **Reiniciar o servidor de desenvolvimento:**
    -   Se você estiver usando o `npm run dev`, pare o servidor (pressione `Ctrl + C` no terminal onde ele está rodando).
    -   Inicie-o novamente com `npm run dev`.

3.  **Verificar o caminho no `index.html`:**
    -   Certifique-se de que a tag `<link rel="icon" ...>` no seu `public/index.html` está apontando corretamente para o `favicon.ico`.
    -   O caminho padrão é `href="/favicon.ico"`.

Essas etapas devem resolver a maioria dos problemas de cache do favicon.




## 🎨 Personalização de Cores

O projeto utiliza [Tailwind CSS](https://tailwindcss.com/) para estilização, o que facilita a personalização das cores e do layout.

### Cores Principais

As cores principais do site (vermelho, cinza, verde, etc.) são definidas diretamente nas classes CSS do Tailwind nos componentes React. Por exemplo:

-   **Vermelho (primário):** Usado para o cabeçalho, botões de adicionar, e destaques. As classes são geralmente `bg-red-600`, `text-red-600`, `border-red-600`, etc. Para alterar o tom de vermelho ou usar outra cor, você pode substituir `red-600` por, por exemplo, `blue-600` ou `purple-700`.
-   **Verde (preços):** Usado para os preços dos produtos (`text-green-600`).
-   **Amarelo (notificações):** Usado para o contador do carrinho (`bg-yellow-400`).

### Como Alterar as Cores

Para alterar as cores, você precisará editar os arquivos `.jsx` dos componentes e o `App.css`:

1.  **Componentes React (`.jsx`):**
    -   Abra os arquivos dos componentes, como `src/components/Header.jsx`, `src/components/menu/MenuItem.jsx`, `src/App.jsx`, etc.
    -   Procure por classes Tailwind relacionadas a cores (ex: `bg-red-600`, `text-red-100`, `border-red-600`).
    -   Substitua o nome da cor e/ou o número do tom pela cor desejada (ex: `bg-red-600` para `bg-blue-700`).

2.  **Arquivo CSS Global (`src/App.css`):**
    -   Este arquivo contém as diretivas `@tailwind` e pode ser usado para adicionar CSS personalizado ou sobrescrever estilos padrão, embora a maioria das cores seja controlada diretamente nos componentes via classes Tailwind.
    -   Se você precisar de cores personalizadas que não estão na paleta padrão do Tailwind, você pode estender o tema do Tailwind no arquivo `tailwind.config.js` (na raiz do projeto). Por exemplo, para adicionar uma cor `minha-cor-personalizada`:

    ```javascript
    // tailwind.config.js
    module.exports = {
      theme: {
        extend: {
          colors: {
            'minha-cor-personalizada': '#FF4500',
          },
        },
      },
      // ...
    };
    ```
    Depois de definir a cor no `tailwind.config.js`, você pode usá-la em seus componentes como `bg-minha-cor-personalizada`, `text-minha-cor-personalizada`, etc.

Lembre-se de que, após qualquer alteração nos arquivos, você precisará reiniciar o servidor de desenvolvimento (`npm run dev`) e/ou limpar o cache do navegador para ver as mudanças.



### Seleção de Tamanho para Pizzas

As pizzas agora possuem a opção de seleção de tamanho (Pequena e Grande), cada uma com seu preço e descrição de pedaços. Essa funcionalidade é controlada no arquivo `src/data/menuData.js` e no componente `src/components/menu/MenuItem.jsx`.

-   **`src/data/menuData.js`**: Para cada item de pizza, o campo `price` foi substituído por `sizes`, que é um objeto contendo as opções `pequena` e `grande`, cada uma com `price` e `description` (ex: "4 pedaços", "8 pedaços").

    ```javascript
    // Exemplo de item de pizza com tamanhos
    {
      id: 'margherita',
      name: 'Pizza Margherita',
      description: 'Molho de tomate, mussarela, manjericão e oregano',
      sizes: {
        pequena: { price: 35.00, description: '4 pedaços' },
        grande: { price: 45.00, description: '8 pedaços' }
      },
      image: '/src/assets/pizza-margherita.jpg',
      category: 'pizza'
    }
    ```

-   **`src/components/menu/MenuItem.jsx`**: Este componente foi atualizado para exibir os botões de seleção de tamanho e ajustar o preço e a descrição do item dinamicamente com base na escolha do usuário. Ao adicionar ao carrinho, o item é registrado com o tamanho selecionado.

Para adicionar novos tamanhos ou modificar os existentes, edite o objeto `sizes` no `src/data/menuData.js` para cada pizza.

