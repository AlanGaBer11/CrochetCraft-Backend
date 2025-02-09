# CrochetCraft
# Requisitos Previos
Antes de comenzar, asegúrate de tener instalado:
* Node.js
* MongoDB

## Dependecias
Instalar las siguientes dependencias para su funcionamiento:
* `npm install express` - Framework web para Node.js (GET, POST, DELETE, PUT, PATCH)
* `npm install cors` - Permite solicitudes desde distintos dispositivos
* `npm install nodemon -D` - Recarga automáticamente el servidor en desarrollo
* `npm install mongoose` - Para hacer la conexión a la base de datos
* `npm install mongoose-unique-validator --legacy-peer-deps` -  Plugin para Mongoose que mejora los mensajes de error en campos unique.
* `npm install body-parser` - Convierte datos a JSON
* `npm install dotenv --save` - Manejo de variables de entorno
* `npm install bcryptjs` - Encriptación de contraseñas
* `npm install jsonwebtoken` - Generación de tokens JWT

## Endpoints
### Users
| Método | Endpoint | Descripción |
|--------|---------|-------------|
| GET    | `/api/users` | Obtiene todos los usuarios |
| GET    | `/api/users/:id` | Obtiene un usuario por ID |
| POST   | `/api/users` | Crea un nuevo usuario |
| PATCH  | `/api/users/:id` | Actualiza un usuario |
| DELETE | `/api/users/:id` | Elimina un usuario |

### Products
| Método | Endpoint | Descripción |
|--------|---------|-------------|
| GET    | `/api/products` | Obtiene todos los productos |
| GET    | `/api/products/:id` | Obtiene un producto por ID |
| POST   | `/api/products` | Crea un nuevo producto |
| PATCH  | `/api/products/:id` | Actualiza un producto |
| DELETE | `/api/products/:id` | Elimina un producto |

## Seguridad
* Se usa **bcrypt** para encriptar contraseñas.
* Se usa **JWT (jsonwebtoken)** para autenticar usuarios.
