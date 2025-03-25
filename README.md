# CrochetCraft

# Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js
- MongoDB

## Dependecias

En la terminal de este proyecto hacer `npm instal` para instalar las dependencias del proyecto para así obtener su funcionamiento.

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
- se usa **crypto-js** para cifrar datos sensibles.
- Se usa **JWT (jsonwebtoken)** para autenticar usuarios.
- Se usa **helmet** para proteger la app de ataques XSS.
- Se usa **express-rate-limit** para limitar el número de peticiones a la API.
- se usa **https\*** para
- se usa **fs** para
