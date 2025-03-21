# CrochetCraft

# Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js
- MongoDB

## Dependecias

Instalar las siguientes dependencias para su funcionamiento:

- `npm i express` - Framework web para Node.js (GET, POST, DELETE, PUT, PATCH)
- `npm i cors` - Permite solicitudes desde distintos dispositivos
- `npm i nodemon -D` - Recarga automáticamente el servidor en desarrollo
- `npm i mongoose` - Para hacer la conexión a la base de datos
- `npm i mongoose-unique-validator --legacy-peer-deps` - Plugin para Mongoose que mejora los mensajes de error en campos unique.
- `npm i body-parser` - Convierte datos a JSON
- `npm i dotenv --save` - Manejo de variables de entorno
- `npm i bcryptjs` - Encriptación de datos
- `npm i jsonwebtoken` - Generación de tokens JWT
- `npm i express-validator` - Validaciones de datos
- `npm i express-rate-limit` - Limita el número de peticiones a la API
- `npm i helmet` - Protege la APP de vulnerabilidades de XSS
- `npm i audit` - Identifica vulberabilidades
- `npm i standard --save-dev` - Asegura la consistncia y calidad del código
- `npm i nodemailer` - Enviar correos electrónicos

## Endpoints

### User (ADMIN)

| Método | Endpoint               | Descripción                |
| ------ | ---------------------- | -------------------------- |
| GET    | `/api/getUsers`        | Obtiene todos los usuarios |
| GET    | `/api/getUserById/:id` | Obtiene un usuario por ID  |
| POST   | `/api/createUser`      | Crea un nuevo usuario      |
| PATCH  | `/api/updateUser/:id`  | Actualiza un usuario       |
| DELETE | `/api/deleteUser/:id`  | Elimina un usuario         |

### Auth

| Método | Endpoint                          | Descripción                            |
| ------ | --------------------------------- | -------------------------------------- |
| POST   | `/api/auth/register`              | Registra un usuario                    |
| POST   | `api/auth/login`                  | Logea un usuario                       |
| POST   | `api/auth/send-verification-code` | Envia un código de verificación        |
| POST   | `api/auth/verify-code`            | Verifica el código de verificación     |
| POST   | `api/auth/request-password-reset` | Envia enlace para recuperar contraseña |
| POST   | `api/auth/reset-password/:token`  | Recuperar contraseña                   |

### Product

| Método | Endpoint                                | Descripción                         |
| ------ | --------------------------------------- | ----------------------------------- |
| GET    | `/api/getProducts`                      | Obtiene todos los productos         |
| GET    | `/api/getProductById/:id`               | Obtiene un producto por ID          |
| GET    | `/api/getProductsByCategory/:categoria` | Obtiene los productos por categoría |
| POST   | `/api/createProduct`                    | Crea un nuevo producto              |
| PATCH  | `/api/updateProduct/:id`                | Actualiza un producto               |
| DELETE | `/api/deleteProduct/:id`                | Elimina un producto                 |

### Cart

| Método | Endpoint           | Descripción                      |
| ------ | ------------------ | -------------------------------- |
| GET    | `/api/cart`        | Obtiene el carrito de un usuario |
| POST   | `/api/cart/add`    | Agrega un producto al carrito    |
| DELETE | `/api/cart/remove` | Elimina un producto del carrito  |
| DELETE | `/api/cart/clear`  | Vacía el carrito                 |

### Order

| Método | Endpoint                | Descripción               |
| ------ | ----------------------- | ------------------------- |
| GET    | `/api/getOrders`        | Obtiene todas las ordenes |
| GET    | `/api/getOrderById/:id` | Obtiene una orden por ID  |
| POST   | `/api/createOrder`      | Crea una nueva orden      |
| PATCH  | `/api/updtaeOrder/:id`  | Actualiza una orden       |
| DELETE | `/api/deleteOrder/:id`  | Elimina una orden         |

### Review

| Método | Endpoint                 | Descripción               |
| ------ | ------------------------ | ------------------------- |
| GET    | `/api/getReviews`        | Obtiene todos las reseñas |
| GET    | `/api/getReviewById/:id` | Obtiene una reseña por ID |
| POST   | `/api/createReview`      | Crea una nueva reseña     |
| PATCH  | `/api/updateReview/:id`  | Actualiza una reseña      |
| DELETE | `/api/deleteReview/:id`  | Elimina una reseña        |

### Search

## Seguridad

- Se usa **bcryptjs** para encriptar contraseñas.
- Se usa **JWT (jsonwebtoken)** para autenticar usuarios.
- Se usa **helmet** para proteger la app de ataques XSS.
- Se usa **express-rate-limit** para limitar el número de peticiones a la API.
