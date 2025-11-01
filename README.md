# Sistema de Lançamento de Pedidos de Venda

Este projeto é uma aplicação **SPA (Single Page Application)** desenvolvida em **Angular 16+** com **Angular Material**, cujo objetivo é permitir o lançamento de pedidos de venda, adição e remoção de itens, e o cálculo automático de totais do pedido.  
O foco está em boas práticas, performance, responsividade e organização do código.

---

## Tecnologias Utilizadas

- **Angular 16+**
- **Angular Material**
- **TypeScript**
- **RxJS**
- **JSON Server** (para simular a API backend)
- **SCSS**
- **HTML5 / CSS3**
- **Node.js / NPM**

---

## Funcionalidades

- **Geração automática do número do pedido** (3 letras + 3 números)
- **Data do pedido automática**, impedindo seleção de datas futuras
- **Tabela de itens** com as colunas:
  - Código
  - Descrição
  - Quantidade (com máscaras específicas para pares/ímpares)
  - Valor unitário
  - Valor total
- **Cálculo automático** entre valor total e unitário
- **Somatório do pedido** exibido no rodapé
- **Exclusão de itens individualmente**
- **Persistência de dados via JSON Server**
- **Suporte a mais de 100 itens** sem perda de performance
- **Layout responsivo** e construído com Angular Material

---

## Boas Práticas e Padrões

- **Modularização** por features  
- **Standalone Components**  
- **Uso de Services para lógica de negócio**  
- **Validação e mascaramento de campos**  
- **Responsividade com Flex Layout e CSS Grid**  
- **Tratamento de erros e feedback visual**

---

### 1. Clonar o repositório

- Baixar o projeto via zip ou executar o comando **git clone https://github.com/MarceloCabral98sp/desafio-nexuscloud.git** localmente
- **npm i** para baixar as dependências

---

## Como Executar o Projeto

- Executar o comando **ng serve** no terminal do projeto para o Frontend
- Executar o comando **json-server db.json --watch** para a API fake

---

**Autor:** Marcelo Cabral  
**Desafio Técnico — Nexus Cloud**
