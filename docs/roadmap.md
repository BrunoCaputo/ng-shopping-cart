### Home page :heavy_check_mark:

- [x] Deve Apresentar um banner principal onde pode ser uma única imagem ou um carrossel de imagens.
- [x] Uma lista de no mínimo 8 produtos. Podem ser apresentados em uma lista na tela ou em um carrossel de produtos.
- [x] Cada produto será um card onde terá a imagem do produto, nome, preço e o botão de "adicionar no carrinho". Pode alterar a quantidade de produtos ao ser enviada no carrinho através dele, mas não é obrigatório.
- [x] Fique a vontade para deixar o site mais próximo do segmento que você escolheu, e pode apresentar mais de uma lista de produtos (novidades, mais vendidos, etc.). Flexivel a no minumo 4 produtos por seção.

### Cart

- Os mesmos critérios anteriores:
  - [x] O carrinho será uma lista de produtos onde terá imagem, o nome, preço e quantidade de cada produto
  - [x] Também precisa mostrar o **Total** dos valores dos produtos
  - [x] Poderá ter o **Desconto** adicionando através de um cupom (Este cupom é uma string que representa o valor/porcentagem de um desconto. ex: DESCONTO10, DESCONTO50)
  - [x] Enviar esses cupons no README.
  - [x] Se seu carrinho tem _desconto_ então precisa ter **Subtotal** (Total sem desconto)
  - [x] Precisa ter como excluir o produto do carrinho.
  - [x] Precisam ter uma rota para o resumo do pedido (`/cart`), que a lista de produtos adicionados. Nele haverá o botão para ir para a tela de pagamento.
  - [x] Nesta tela será aplicado o cupom de desconto. Então a partir de agora é necessário termos um input para o nome do cupom e o demonstrativo de subtotal, desconto aplicado(valor e/ou porcentagem) e total (total = subtotal - desconto).
- [ ] Precisam ter uma rota para o pagamento do pedido (`/checkout`), onde deve só passar para a próxima após escolher a forma de pagamento. Ou seja, sem ter uma pagamento escohido o botão de _Finalizar Compra_ deverá ficar desabilitado.
  - [ ] Precisam ter uma rota para a confirmação do pedido(`/confirmation`), onde o usuário será avisado que o seu pedido foi realizado com sucesso e logo abaixo terá os detalhes do mesmo:
    - [ ] Lista de itens comprados, com imagem, nome, quantidade e preço em cada
    - [ ] Subtotal, Desconto aplicado e Total.
- [x] Um guarda de rota precisa avisar que o usuário está abandonando a tela do carrinho.

### Header/Footer

Para toda a navegação pode apresentar um `header` e um `footer`, e estes também devem condizer com o segmento escolhido para o seu site.

#### Header

- [x] Logo
- [ ] Menu categorias do site (no mínimo de 3 sessões)
- [x] Ícone para a conta do usuário (cliente)
- [x] Ícone para ir para o carrinho

#### Footer :heavy_check_mark:

- [x] Os links para diferentes partes do site e/ou links externos.
- [x] Powered by Angular e a sua autoria no site.

### My Account

- [ ] Deverá ser protegida e somente acessar quando estiver logado.
- [ ] Caso o usuário não esteja logado, deverá ser avisado que os dados de login não estão corretos.
- [ ] No header o ícone/botão para a conta deverá mudar para o nome do usuário logado.
- [ ] Não precisa ter conteúdo em tela por agora.

### Login

- [ ] Apenas um fluxo explicito ao clicar um botão para logar ou deslogar.
- [ ] A tela de login deverá ter os campos de login e senha mas a lógica de login não precisa ser concluída. Bastar ter apenas a lógica para mudar o status de logado e não logado.
- [ ] redirecionar para a página principal

### Services :heavy_check_mark:

- [x] Pelo menos 1 serviço implementado.

### Tests

Escreva testes em sua aplicação, 2 por cada componente abaixo:

- [ ] home
- [ ] carrinho
- [ ] header
- [ ] footer
- [ ] login
- [ ] service
