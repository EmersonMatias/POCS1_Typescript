## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Configure the `.env` file using the `.env.example` file

4. Run the back-end in a development environment:

```bash
npm run dev
```

## Building and starting for production

```bash
npm run build
npm start
```


## Documentation

- **GET** `/product`
    
    Deve enviar uma resposta no formato:
    
    ```jsx
    {
    	"name": "Coca-Cola 500ml",
    	"price": 600,
    	"category":"Bebidas" ,
    	"type": "Refrigerante",
    	"description": `Abertos pro Melhor. Nossos padrões são o que nos diferencia,
    	 e nossa qualidade é o que nos mantém estocando despensas, frigoríficos e 
    	congeladoras com o melhor valor.`,
    	"ingredients": `Água gaseificada, açúcar, extrato de noz de cola, cafeína,
    	 corante caramelo IV, acidulante ácido fosfórico e aroma natural`
    }
    ```
    
- **POST** `/product`
    
    Receber um body no formato:
    
    ```jsx
    //price em centavos
    {
    	"name": "Coca-Cola 500ml",
    	"price": 600,
    	"categoryId": 2,
    	"typeId": 1,
    	"description": `Abertos pro Melhor. Nossos padrões são o que nos diferencia,
    	 e nossa qualidade é o que nos mantém estocando despensas, frigoríficos e 
    	congeladoras com o melhor valor.`,
    	"available": true,
    	"ingredients": `Água gaseificada, açúcar, extrato de noz de cola, cafeína,
    	 corante caramelo IV, acidulante ácido fosfórico e aroma natural`
    }
    ```
    
    - ***Regras de Negócio:***
        - Somente `description` e `ingredients` podem eventualmente estar vazios, caso outros estejam, responder com  **status 400**
        - `price` deve ser maior que 0, caso não, responder com **status 400**
        - `categoryId` e `typeId` devem ser Id’s de categorias e tipos existentes, caso não, responder com **status 400**
        - `name` não pode ser um nome de um produto já existente, caso exista, responder com **status 409**
    - ***Response Sucess:* status 201**
- **DELETE** `/product/:id`
    - ***Regras de Negócio:***
        - Ao excluir um produto, deve verificar se o `id` fornecido existe. Se não, deve responder com **status 404.**
    - ***Response Sucess:* status 200**
- **PUT** `/product/:id`
    
    Recebe um body no formato:
    
    ```jsx
    //Dados a serem atualizados, deve conter ao menos 1 dado
    {
    	"price": 699
    }
    ```
    
    - ***Regras de Negócio:***
        - Body não pode estár vazio. Se sim, deve responder com **status 400**
        - Verificar se `id` do produto existe. Se não, deve responder com **status 404**
    - ***Response Sucess:* status 200**
- **Categorias e Tipos existentes**
   
- Categorias
    
    | id | category_name |
    | --- | --- |
    | 1 | Bebidas |
    | 2 | Lanches |
    | 3 | Pizzas |
    | 4 | Doces |
    | 5 | Massas |
- Tipos
    
    | id | type_name |
    | --- | --- |
    | 1 | Refrigerante |
    | 2 | Suco |
    | 3 | Pizza Doce |
    | 4 | Pizza Salgada |
    | 5 | Lanche Gourmet |
    | 6 | Calabresa |
    | 7 | Mussarela |
    | 8 | Presunto |

## TABLE STRUCTE 

- Products
    
    ```jsx
    CREATE TABLE products(
    	id serial primary key,
    	product_name varchar(150) NOT NULL UNIQUE  ,
    	price INT NOT NULL,
    	description varcahr(250),
    	available BOOLEAN CHECK (available IN ('true','false')) NOT NULL,
    	ingredients varcahr(250)
    );
    ```

- Category
    
    ```jsx
    CREATE TABLE category (
    	id SERIAL PRIMARY KEY,
    	category_name varchar(50) NOT NULL UNIQUE
    )
    ```

- Type
    
    ```jsx
    CREATE TABLE type(
    	id SERIAL PRIMARY KEY,
    	type_name varchar(50) NOT NULL UNIQUE
    )
    ```

- Product_Category
    
    ```jsx
    CREATE TABLE product_category(
    	id SERIAL PRIMARY KEY,
    	product_id INT,
    	category_id INT,
    	FOREIGN KEY (product_id) REFERENCES products(id),
    	FOREIGN KEY (category_id) REFERENCES category(id)
    )
    ```
    
- Product_Type
    ```jsx
    CREATE TABLE product_type(
        id SERIAL PRIMARY KEY,
        product_id INT,
        type_id INT,
        FOREIGN KEY (product_id) REFERENCES products(id),
        FOREIGN KEY (type_id) REFERENCES type(id)
    )
    ```
