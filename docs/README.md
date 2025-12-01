Rápido & Seguro Logística – API Backend
Sistema backend desenvolvido em Node.js utilizando arquitetura MVC com o objetivo de automatizar o cadastro de clientes, registro de pedidos e cálculo do valor das entregas.

Arquitetura do sistema:
O sistema foi organizado seguindo o padrão MVC: Models para armazenamento de dados, Controllers para regras de negócio e Routes para mapeamento dos endpoints da API.

Regras comerciais para cálculo do frete:

O valor da distância é calculado multiplicando a distância em km pelo valor base por km. O valor do peso é calculado multiplicando o peso em kg pelo valor base por kg. Se a entrega for urgente, é aplicado um acréscimo de 20% sobre a soma dos valores de distância e peso. Se o peso for maior que 100kg, é aplicado um desconto de 5% sobre a soma dos valores de distância e peso. Caso o valor base por km seja maior que 2 reais, é adicionada uma taxa extra fixa de 15 reais. O valor final da entrega é a soma do valor distância e valor peso, mais acréscimo, menos desconto, mais taxa extra se houver, e a entrega é registrada com status inicial calculado.

EndPoints disponíveis na API:
Cadastro de clientes é realizado pelo endpoint POST /clientes, enviando no corpo da requisição: nome completo, CPF, telefone, e-mail e endereço completo.
Registro de pedidos é realizado pelo endpoint POST /pedidos, enviando no corpo da requisição: ID do cliente, data do pedido, tipo de entrega (normal ou urgente), distância em km, peso da carga em kg, valor base por km e valor base por kg.
O cálculo da entrega é realizado em POST /entregas/calcular, enviando o ID do pedido. O retorno inclui: valor da distância, valor do peso, acréscimo aplicado, desconto aplicado, taxa extra, valor final e status calculado.
Atualização do status da entrega é realizada pelo endpoint PATCH /entregas/status, enviando ID da entrega e o novo status. Os status permitidos são: calculado, em transito, entregue ou cancelado.
Listagem de dados pode ser feita pelos endpoints GET /clientes, GET /pedidos e GET /entregas.

Documentos obrigatórios no projeto:
O modelo de entidade relacionamento foi salvo como imagem na pasta docs/mer.png. O arquivo de testes das rotas foi exportado do Insomnia e salvo em docs/insomnia.json. Toda a documentação da API está contida exclusivamente neste arquivo README.md, conforme exigido.

Execução do servidor:
Para rodar o sistema, instale as dependências com npm install e inicie o servidor com node server.js. O serviço roda na porta 3000.