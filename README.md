# CrochetCraft

# Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js
- MongoDB

## Dependecias

En la terminal de este proyecto hacer `npm install` para instalar las dependencias del proyecto para así obtener su funcionamiento.

- `npm express` - Framework web para Node.js (GET, POST, DELETE, PUT, PATCH)
- `npm cors` - Permite solicitudes desde distintos dispositivos
- `npm nodemon -D` - Recarga automáticamente el servidor en desarrollo
- `npm mongoose` - Para hacer la conexión a la base de datos
- `npm mongoose-unique-validator --legacy-peer-deps` - Plugin para Mongoose que mejora los mensajes de error en campos unique.
- `npm body-parser` - Convierte datos a JSON
- `npm dotenv --save` - Manejo de variables de entorno
- `npm bcryptjs` - Encriptación de contraseñas
- `npm crypto-js` - Cifrado de datos sensibles
- `npm jsonwebtoken` - Generación de tokens JWT
- `npm express-validator` - Validaciones de datos
- `npm express-rate-limit` - Limita el número de peticiones a la API
- `npm helmet` - Protege la APP de vulnerabilidades de XSS
- `npm audit` - Identifica vulberabilidades
- `npm standard --save-dev` - Asegura la consistncia y calidad del código
- `npm nodemailer` - Enviar correos electrónicos
- `npm https` -
- `npm fs` -

## Endpoints

### User (ADMIN)

| Método | Endpoint                    | Descripción                |
| ------ | --------------------------- | -------------------------- |
| GET    | `/api/user/getUsers`        | Obtiene todos los usuarios |
| GET    | `/api/user/getUserById/:id` | Obtiene un usuario por ID  |
| POST   | `/api/user/createUser`      | Crea un nuevo usuario      |
| PATCH  | `/api/user/updateUser/:id`  | Actualiza un usuario       |
| DELETE | `/api/user/deleteUser/:id`  | Elimina un usuario         |

### Auth

| Método | Endpoint                          | Descripción                            |
| ------ | --------------------------------- | -------------------------------------- |
| POST   | `/api/auth/register`              | Registra un usuario                    |
| POST   | `api/auth/login`                  | Logea un usuario                       |
| POST   | `api/auth/send-verification-code` | Envia un código de verificación        |
| POST   | `api/auth/verify-code`            | Verifica el código de verificación     |
| POST   | `api/auth/request-password-reset` | Envia enlace para recuperar contraseña |
| POST   | `api/auth/reset-password`         | Recuperar contraseña                   |

### Product

| Método | Endpoint                                        | Descripción                                 |
| ------ | ----------------------------------------------- | ------------------------------------------- |
| GET    | `/api/product/getProducts`                      | Obtiene todos los productos                 |
| GET    | `/api/product/getProductById/:id`               | Obtiene un producto por ID                  |
| GET    | `/api/product/getProductByName/:nombre`         | Obtiene un producto por nombre del producto |
| GET    | `/api/product/getProductsByCategory/:categoria` | Obtiene los productos por categoría         |
| POST   | `/api/product/createProduct`                    | Crea un nuevo producto                      |
| PATCH  | `/api/product/updateProduct/:id`                | Actualiza un producto                       |
| DELETE | `/api/product/deleteProduct/:id`                | Elimina un producto                         |

### Cart

| Método | Endpoint           | Descripción                      |
| ------ | ------------------ | -------------------------------- |
| GET    | `/api/cart`        | Obtiene el carrito de un usuario |
| POST   | `/api/cart/add`    | Agrega un producto al carrito    |
| DELETE | `/api/cart/remove` | Elimina un producto del carrito  |
| DELETE | `/api/cart/clear`  | Vacía el carrito                 |

### Order

| Método | Endpoint                      | Descripción               |
| ------ | ----------------------------- | ------------------------- |
| GET    | `/api/order/getOrders`        | Obtiene todas las ordenes |
| GET    | `/api/order/getOrderById/:id` | Obtiene una orden por ID  |
| POST   | `/api/order/createOrder`      | Crea una nueva orden      |
| PATCH  | `/api/order/updtaeOrder/:id`  | Actualiza una orden       |
| DELETE | `/api/order/deleteOrder/:id`  | Elimina una orden         |

### Review

| Método | Endpoint                                              | Descripción                                |
| ------ | ----------------------------------------------------- | ------------------------------------------ |
| GET    | `/api/review/getReviews`                              | Obtiene todos las reseñas                  |
| GET    | `/api/review/getReviewById/:id`                       | Obtiene una reseña por ID                  |
| GET    | `/api/review/getReviewByProductId/:productId`         | Obtiene una reseña por ID de un producto   |
| GET    | `/api/review/getReviewsByProductName/:nombreProducto` | Obtiene una reseña por nombre del producto |
| POST   | `/api/review/createReview`                            | Crea una nueva reseña                      |
| PATCH  | `/api/review/updateReview/:id`                        | Actualiza una reseña                       |
| DELETE | `/api/review/deleteReview/:id`                        | Elimina una reseña                         |

### Search

## Seguridad

- Se usa **bcryptjs** para encriptar contraseñas.
- se usa **crypto-js** para cifrar datos sensibles.
- Se usa **JWT (jsonwebtoken)** para autenticar usuarios.
- Se usa **helmet** para proteger la app de ataques XSS.
- Se usa **express-rate-limit** para limitar el número de peticiones a la API.
- se usa **https\*** para
- se usa **fs** para
