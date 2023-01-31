# PROJECT ROADMAP

## WEEK 2

### Home page :white_check_mark:

- [x] Deve Apresentar um banner principal onde pode ser uma única imagem ou um carrossel de imagens.
- [x] Uma lista de no mínimo 8 produtos. Podem ser apresentados em uma lista na tela ou em um carrossel de produtos.
- [x] Cada produto será um card onde terá a imagem do produto, nome, preço e o botão de "adicionar no carrinho". Pode alterar a quantidade de produtos ao ser enviada no carrinho através dele, mas não é obrigatório.
- [x] Fique a vontade para deixar o site mais próximo do segmento que você escolheu, e pode apresentar mais de uma lista de produtos (novidades, mais vendidos, etc.). Flexivel a no minumo 4 produtos por seção.

### Cart :white_check_mark:

- [x] O carrinho será uma lista de produtos onde terá imagem, o nome, preço e quantidade de cada produto
- [x] Também precisa mostrar o **Total** dos valores dos produtos
- [x] Poderá ter o **Desconto** adicionando através de um cupom (Este cupom é uma string que representa o valor/porcentagem de um desconto. ex: DESCONTO10, DESCONTO50)
- [x] Enviar esses cupons no README.
- [x] Se seu carrinho tem _desconto_ então precisa ter **Subtotal** (Total sem desconto)
- [x] Precisa ter como excluir o produto do carrinho.
- [x] Precisam ter uma rota para o resumo do pedido (`/cart`), que a lista de produtos adicionados. Nele haverá o botão para ir para a tela de pagamento.
- [x] Nesta tela será aplicado o cupom de desconto. Então a partir de agora é necessário termos um input para o nome do cupom e o demonstrativo de subtotal, desconto aplicado(valor e/ou porcentagem) e total (total = subtotal - desconto).
- [x] Precisam ter uma rota para o pagamento do pedido (`/checkout`), onde deve só passar para a próxima após escolher a forma de pagamento. Ou seja, sem ter uma pagamento escohido o botão de _Finalizar Compra_ deverá ficar desabilitado.
- [x] Precisam ter uma rota para a confirmação do pedido(`/confirmation`), onde o usuário será avisado que o seu pedido foi realizado com sucesso e logo abaixo terá os detalhes do mesmo:
  - [x] Lista de itens comprados, com imagem, nome, quantidade e preço em cada
  - [x] Subtotal, Desconto aplicado e Total.
- [x] Um guarda de rota precisa avisar que o usuário está abandonando a tela do carrinho.

### Header/Footer :white_check_mark:

Para toda a navegação pode apresentar um `header` e um `footer`, e estes também devem condizer com o segmento escolhido para o seu site.

#### Header :heavy_check_mark:

- [x] Logo
- [x] Menu categorias do site (no mínimo de 3 sessões)
- [x] Ícone para a conta do usuário (cliente)
- [x] Ícone para ir para o carrinho

#### Footer :heavy_check_mark:

- [x] Os links para diferentes partes do site e/ou links externos.
- [x] Powered by Angular e a sua autoria no site.

### My Account :white_check_mark:

- [x] Deverá ser protegida e somente acessar quando estiver logado.
- [x] Caso o usuário não esteja logado, deverá ser avisado que os dados de login não estão corretos.
- [x] No header o ícone/botão para a conta deverá mudar para o nome do usuário logado.
- [x] Não precisa ter conteúdo em tela por agora.

### Login :white_check_mark:

- [x] Apenas um fluxo explicito ao clicar um botão para logar ou deslogar.
- [x] A tela de login deverá ter os campos de login e senha mas a lógica de login não precisa ser concluída. Bastar ter apenas a lógica para mudar o status de logado e não logado.
- [x] redirecionar para a página principal

### Services :white_check_mark:

- [x] Pelo menos 1 serviço implementado.

### Tests :white_check_mark:

Escreva testes em sua aplicação, 2 por cada componente abaixo:

- [x] home
- [x] carrinho
- [x] header
- [x] footer
- [x] login
- [x] service

## WEEK 3

### PDP (Product Details Page) :white_check_mark:

- [x] Deverá abrir o produto com a imagem mais ampliada.
- [x] Se puder, ter uma galeria dessas imagens deste produto. (Não obrigatório)
- [x] Informações Obrigatórias:
  - [x] Nome do produto.
  - [x] Imagem
  - [x] Preço
  - [x] Quantidade a ser lançada no carrinho.
  - [x] Botão para adicionar este produto ao carrinho.

### PLP (Product List Page) e Busca de Produtos :white_check_mark:

- [x] Para se ter uma página de lista de produtos, antes precisamos ter as 3 opções no menu, como solicitado anteriormente e que cada uma seja para uma categoria de produtos. Logo os seus produtos deverão ter uma categoria associada a eles.
- [x] Ao clicar nessa categoria no menu, deverá ser redirecionado para PLP que irá carregar somente os produtos dessa categoria.
- [x] Precisa também permitir que na home exista um input para pesquisar produtos, onde poderá usar os poderes do rxjs para fazer essas buscas, conforme ensinado esta semana.

### Login :white_check_mark:

- [x] A tela de login deverá ter os campos de login e senha.
- [x] Agora é necessário existir uma lógica e será mais fácil usando um serviço http para o site [DummyJson](https://dummyjson.com/docs/auth) ou alguma _API fake_ que faça algo similar.
- [x] Criar um interceptor para enviar o token nas próximas requests.
- [x] Após o login, redirecionar para a página principal

### Serviço :white_check_mark:

- [x] Pelo menos organizar e separar as responsabilidade dos serviços, regras de negócios e serviços externos (HTTP e afins, por exemplo) não devem ficar juntos.

### Testes :white_check_mark:

- [x] É necessario que os testes cubram uma margem de 40% de linhas e funcões em seu código. Devem sintetizar com a aplicação e os testes existentes quando os componentes/recursos forem criados serão ignorados.

## FINAL WEEK

### Criação do usuário

- [ ] A tela deverá ser acessível pela tela de login com um botão que leve a tela de cadastro quando o usuário ainda não é cadastrado.
- [ ] Os campos do formulário de cadastro, devem ser:
  - [ ] Nome completo
  - [ ] Email
  - [ ] Telefone
  - [ ] Endereço:
    - [ ] CEP (Com consulta a uma API de sua escolha para preencher os dados do endereço do cliente, conforme o CEP consultado)
    - [ ] Rua, Avenida, travessa, etc. (logradouro)
    - [ ] Número. Precisa ter alguma indicação do que preencher quando não tiver número
    - [ ] Complemento
    - [ ] Bairro
    - [ ] Cidade
    - [ ] Estado
    - [ ] Campo para senha
    - [ ] Campo para repetir e confirmar a senha
  - [ ] Checkbox aceitando as politicas de privacidade. Não precisa existir a página de politica de privacidade, mas pode apresentar como link
  - [ ] Checkbox aceitando o compartilhamento dos dados para uso interno do ecommerce. Pode apresentar o link que vá para a LGPD ou algo do tipo.
  - [ ] Botão de salvar o cadastro
- [ ] Após o cadastro o usuário deverá ser redirecionado para a tela de login para realizar o cadastro
- [ ] **ATENÇÃO**: A partir de agora nenhuma compra deverá ser concluida sem o usuário ser cadastrado. Então ele deverá se identificar por login ou se cadastrar, antes de concluir a compra.

### Minha Conta (Área do cliente)

- [ ] Deverá ser protegida e somente acessar quando estiver logado.
- [ ] No header o ícone/botão para a conta deverá mudar para o nome do usuário logado.
- [ ] O conteúdo desta tela deverá ser os dados do cliente e devem permitir que sejam editados pelo mesmo:
  - [ ] Nome completo
  - [ ] Email
  - [ ] Endereço. Nessa parte deverá ter um botão que permita que este cadastre um novo endereço além de poder editar o já existente.
  - [ ] Telefone
  - [ ] Um checkbox que aceita assinar a newsletter do site
- [ ] Botão para logout do site

### Admin

- [ ] Deverá ser protegida e somente acessar quando estiver logado.
- [ ] Este usuário deve ser identificado como admin para ter acesso.
- [ ] O acesso deverá ser dado somente através da rota `/admin` e caso o usuário não esteja logado, seja redirecionado para a tela de login
- [ ] esta tela terá duas opções em forma de botão:
  - [ ] Lista de produtos cadastrado e cadastro de produtos
  - [ ] Lista de usuários, onde permita editar marcando algum usuário como admin também.
- [ ] Um dos dois cadastros deverão existir e se conseguir realizar os dois será adicionado pontuação extra para a nota.

### Testes

- [ ] É necessario que os testes cubram uma margem de 40% de linhas e funcões em seu código. Devem sintetizar com a aplicação e os testes existentes quando os componentes/recursos forem criados serão ignorados.
