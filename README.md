# Trinto Teste Back-End
Teste para back-end no squad UOLEdTech.

#### Premissas:
- Criar uma API usando NodeJs;
- O banco de dados pode ser de sua escolha;
- Não é necessário desenvolver front-end, apenas o back-end.

#### Teste:
Desenvolver um serviço que seja capaz de gerar uma venda.
- Uma venda é composta por **id**, **data da venda**, **valor**, **vendedor id** e **vendedor nome**.

#### Sua tarefa é desenvolver os serviços REST abaixo:
- Criar uma venda;
- Retornar ranking dos 10 melhores vendedores da semana com média de vendas diária.

## ✨ Regras de negócio utilizadas

 1. Para login no sistema e cadastro de novos vendedores no sistema não precisa de logar no sistema
 2. **Retornar ranking dos 10 melhores vendedores da semana com média de vendas diária**
    - Precisa ser digitado a **data de inicio** da semana e a **data final**.
 3. Para cadastrar/alterar um vendedor:
    - **CPF** e **Email** precisam ser *válidos* e *únicos*.
    - **senha** de no *mínimo 6 caracteres*.
 4. Para cadastrar/alterar um produto:
    - **cod_produto** é único.
 5. Para cadastrar/alterar uma venda:
    - O **id_produto** do produto precisa existir na tabela produtos.
    - O produto precisa estar disponível.
    - O **id_vendedor** do vendedor precisa existir na tabela vendedores.
    - É *atualizado o estoque do produto* na tabela de produtos (**automaticamente**).
 6. Ao excluir um vendedor:
     - As vendas relacionadas são excluídas.
 7. Ao excluir um produto:
     - É atualizada a data de exclusão do produto na tabela de produtos.
     - O produto se mantém cadastrado, apenas com status de indisponível.
 8. Ao excuir uma venda:
    - É *atualizado o estoque do produto* na tabela de produtos (**automaticamente**).



## ✨ Tecnologias utilizadas

* MariaDB 10.1.44
* Node.js 17.4.0
* Visual Studio code
* Postman for Windows 9.13.1

#### Tenha o node instalado em sua máquina

#### Clone este repositório em uma pasta de sua preferência
```bash
$ git clone https://github.com/KellySoares/Trinto-Teste-Back-End.git

```


#### Acesse a pasta e instale as dependencias
```bash
$ cd Trinto-Teste-Back-End
$ npm i

```

#### Para acesso ao banco e geração de tokens

Renomeie o arquivo _env-exemple para .env e edite as configurações necessárias para acesso ao banco de geração de tokens.



## 🎲 Rodando Back End (servidor)
#### Acesse a pasta raiz
```bash

$ npm run server

```

## ✨ Para teste das rotas poderá utilizar o Postman 

https://www.postman.com

## ✨ Rotas da API

#### Para as rotas que não necessitam de login no sistema.

```bash
 Metodo Post: http://localhost:5000/vendedores
 Metodo Get: http://localhost:5000/login

 ```
 <details><summary> Detalhe Sobre as rotas </summary>
<p>

  #### Cadastro de vendedores
![image](https://user-images.githubusercontent.com/56278384/154096347-15faed9a-4094-4e5f-a2d4-c3abae6ba8e2.png)

  
  #### Login no sistema pelo vendedor
  ![image](https://user-images.githubusercontent.com/56278384/154096468-0465b5d4-9e0e-4203-b6f3-293dc8cd3db4.png)


</details> </p>

 
#### Para as rotas produtos, vendas e algumas rotas de vendedores é necessário login no sistema e geração de token válido por 5 minutos.

#### Rotas Vendedores
```bash

 Metodo Get: http://localhost:5000/vendedores/:id
 Metodo Get: http://localhost:5000/vendedores
 Metodo Put: http://localhost:5000/vendedores/:id
 Metodo Delete: http://localhost:5000/vendedores/:id
 
 ```
  <details><summary> Detalhe Sobre as rotas </summary>
<p>

  #### Busca de vendedor por id

![image](https://user-images.githubusercontent.com/56278384/154097985-6830fa3b-4f4b-4e78-8b2c-81ccf84cf96b.png)

  
  #### Busca de todos os vendedores

  ![image](https://user-images.githubusercontent.com/56278384/154097932-c7995170-698b-4308-b0a5-f29f6c5cddb3.png)


  
  #### Alteração de um vendedor
  
![image](https://user-images.githubusercontent.com/56278384/154097858-4cf32cbc-a1ca-4d41-b3ba-8df30c5af258.png)

  
  #### Exclusão de um vendedor
   
  ![image](https://user-images.githubusercontent.com/56278384/154097903-2fbc6585-4b4c-4e83-842b-b13ffa40d2a4.png)


</details> </p>

 #### Rotas Produtos
 ```bash

 Metodo Post: http://localhost:5000/produtos/
 Metodo Get: http://localhost:5000/produtos/:id
 Metodo Get: http://localhost:5000/produtos/
 Metodo Put: http://localhost:5000/produtos/:id
 Metodo Delete: http://localhost:5000/produtos/:id
 
 ```
   <details><summary> Detalhe Sobre as rotas </summary>
<p>

  
  #### Cadastro de um produto
  
  ![image](https://user-images.githubusercontent.com/56278384/154098578-0afe9b64-7291-4d8d-8474-fd437e4f365d.png)

  
  #### Busca de Produto por id

![image](https://user-images.githubusercontent.com/56278384/154098309-79759eb7-f0dd-43d8-9032-9547c58afc86.png)

  
  #### Busca de todos os Produtos


![image](https://user-images.githubusercontent.com/56278384/154098274-b75f485b-01a8-41b3-9ee5-68ab67f8d429.png)

  
  #### Alteração de um Produto
  
![image](https://user-images.githubusercontent.com/56278384/154098192-1c437b7e-e510-4bf5-96ab-601ce0e25257.png)

  
  #### Exclusão de um Produto
   
![image](https://user-images.githubusercontent.com/56278384/154098233-d139a669-0ea7-4648-ba92-abc93bd84886.png)


</details> </p>

 #### Rotas Vendas
 ```bash
 
 Metodo Get: http://localhost:5000/vendas/rank
 Metodo Post: http://localhost:5000/vendas/
 Metodo Get: http://localhost:5000/vendas/:id
 Metodo Get: http://localhost:5000/vendas/
 Metodo Put: http://localhost:5000/vendas/:id
 Metodo Delete: http://localhost:5000/vendas/:id

 ```

 <details><summary> Detalhe Sobre as rotas </summary>
<p>

  #### Retorna ranking dos 10 melhores vendedores da semana com média de vendas diária.
  
  ![image](https://user-images.githubusercontent.com/56278384/154098877-ef3679b9-7460-4b37-927c-58cee84a5ad3.png)

  
  #### Cadastro de uma venda
  
![image](https://user-images.githubusercontent.com/56278384/154098808-b9d1f91b-869d-4963-9c5d-a76c42c1a2ca.png)

  
  #### Busca de venda por id

![image](https://user-images.githubusercontent.com/56278384/154098969-86bb7380-1450-4ad7-8cec-c8e5dd11c682.png)

  
  #### Busca de todas as vendas

![image](https://user-images.githubusercontent.com/56278384/154098927-fe98ef10-ffbe-4f53-bcda-1906699cbac4.png)


  
  #### Alteração de uma venda
  
![image](https://user-images.githubusercontent.com/56278384/154099019-4107a934-52d2-42f4-9b1b-5eb63f1bf8f2.png)

  
  #### Exclusão de uma venda
   
![image](https://user-images.githubusercontent.com/56278384/154099044-1c82855b-f499-42a1-bcc4-d758b6632d10.png)


</details> </p>
