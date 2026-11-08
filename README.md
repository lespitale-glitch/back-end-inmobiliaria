# API RESTful Inmobiliaria - "Nuevo Techo Propiedades & Hogar"

**Curso:** Backend Developer - Centro de e-Learning UTN BA  
**Trabajo Práctico Final**  
**Autor:** Leandro Spitale

---

## 1. Descripción del Proyecto

Este proyecto es la API RESTful del sistema de gestión interna y back-office de la inmobiliaria **"Nuevo Techo Propiedades & Hogar"**.

La API permite administrar el catálogo de inmuebles (venta y alquiler), gestionar las categorías de propiedades, autenticar al personal de la inmobiliaria (agentes y administradores) con JSON Web Tokens y guardar las solicitudes de contacto y tasación que llegan desde el formulario del sitio web en React.

El desarrollo sigue una **arquitectura en capas con separación de responsabilidades**: las rutas definen los endpoints, los controladores manejan la solicitud y la respuesta HTTP, y los servicios contienen la lógica de negocio y las consultas a MongoDB.

---

## 2. Tecnologías Utilizadas

* **Node.js**: entorno de ejecución de JavaScript en el servidor.
* **Express.js**: framework web para construir la API RESTful.
* **MongoDB y Mongoose**: base de datos NoSQL y ODM para modelar los datos y hacer las consultas.
* **jsonwebtoken (JWT)**: generación y verificación de tokens para las rutas protegidas.
* **bcrypt**: hashing de contraseñas mediante un hook `pre('save')` en el modelo de usuario.
* **dotenv**: variables de entorno.
* **cors**: habilita peticiones de origen cruzado desde la app en React.
* **nodemon** (desarrollo): reinicia el servidor al detectar cambios.

---

## 3. Arquitectura y Estructura del Proyecto

```
back-end-inmobiliaria/
├── package.json
├── .env
├── .env.example
├── .gitignore
├── index.js                  # Punto de entrada / servidor Express
├── DOCS/                     # Documentación del trabajo intermedio
└── src/
    ├── config/
    │   └── db.js             # Conexión a MongoDB con Mongoose
    ├── models/               # Esquemas Mongoose
    │   ├── userModel.js
    │   ├── tipoPropiedadModel.js
    │   ├── propiedadModel.js
    │   └── contactoModel.js
    ├── services/             # Lógica de negocio y consultas a la base
    │   ├── userService.js
    │   ├── tipoPropiedadService.js
    │   ├── propiedadService.js
    │   └── contactoService.js
    ├── controllers/          # Manejo de request / response HTTP
    │   ├── userController.js
    │   ├── tipoPropiedadController.js
    │   ├── propiedadController.js
    │   └── contactoController.js
    ├── routes/               # Definición de endpoints REST
    │   ├── userRoute.js
    │   ├── tipoPropiedadRoute.js
    │   ├── propiedadRoute.js
    │   └── contactoRoute.js
    └── middleware/
        └── verifyToken.js    # Protección de rutas con JWT
```

---

## 4. Esquema de Base de Datos (MongoDB / Mongoose)

El modelo tiene 4 colecciones, basadas en el trabajo intermedio (v7). Todas incluyen `createdAt` y `updatedAt` automáticos (`timestamps: true`).

1. **`Usuarios`**: personal autorizado (agentes y administradores).
   * `_id` (ObjectId, PK)
   * `nombre` (String, requerido)
   * `email` (String, requerido, único, se guarda en minúsculas)
   * `password` (String, requerido; se hashea con bcrypt antes de guardar y no se devuelve en las consultas)
   * `rol` (String, enum: `["administrador", "agente"]`, default: `"agente"`)
2. **`Tipos_Propiedad`**: catálogo de categorías (entidad referenciada).
   * `_id` (ObjectId, PK)
   * `nombre_tipo` (String, requerido, único; ej.: "Departamento", "Casa", "Oficina", "PH")
3. **`Propiedades`**: catálogo principal de inmuebles (entidad principal).
   * `_id` (ObjectId, PK)
   * `direccion` (String, requerido)
   * `zona` (String, requerido)
   * `ambientes` (Number, requerido)
   * `metros_cuadrados` (Number, requerido)
   * `precio` (Number, requerido)
   * `operacion` (String, requerido, enum: `["Venta", "Alquiler"]`)
   * `caracteristicas` (Array de Strings; ej.: `["Jardín", "Balcón", "Pileta"]`)
   * `imagenes` (Array de Strings: URLs o rutas de imágenes)
   * `agente_id` (ObjectId, requerido, referencia a `Usuarios`)
   * `tipo_id` (ObjectId, requerido, referencia a `Tipos_Propiedad`)
4. **`Contactos`**: consultas y pedidos de tasación del formulario de React.
   * `_id` (ObjectId, PK)
   * `nombre` (String, requerido)
   * `email` (String, requerido)
   * `telefono` (String)
   * `zona` (String)
   * `metros_cuadrados` (Number)
   * `mensaje` (String, requerido)
   * `acepta_novedades` (Boolean, default: `false`)
   * `fecha` (Date, default: `Date.now`)
   * `tipo_id` (ObjectId, referencia a `Tipos_Propiedad`)

Las consultas de propiedades y contactos usan `populate()` para devolver los datos del agente y del tipo de propiedad en lugar de solo el ID.

---

## 5. Instalación y Ejecución

### Requisitos

* Node.js **v20.19 o superior** (lo requiere Mongoose 9)
* MongoDB (instancia local o cluster de MongoDB Atlas)
* Git

### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/lespitale-glitch/back-end-inmobiliaria.git
   cd back-end-inmobiliaria
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Variables de entorno:** el repositorio incluye el archivo `.env`. Si se usa otra base, editar sus valores (ver `.env.example`):
   ```
   PORT=3001
   MONGO_URI=mongodb://127.0.0.1:27017/db_inmobiliaria
   JWT_SECRET=una_clave_secreta
   ```

4. **Levantar MongoDB.** En macOS con Homebrew:
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   brew services start mongodb-community
   ```

5. **Iniciar el servidor:**
   ```bash
   npm run dev     # desarrollo, con nodemon
   npm start       # producción
   ```

   Si todo está bien, la consola muestra:
   ```
   Servidor corriendo en el puerto 3001
   MongoDB Conectado: 127.0.0.1
   ```

---

## 6. Endpoints

URL base: `http://localhost:3001`

Las rutas marcadas con 🔒 requieren el header:
```
Authorization: Bearer <token>
```
El token se obtiene en `POST /api/usuarios/login` y vence a las 2 horas.

### Usuarios — `/api/usuarios`

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/api/usuarios/register` | Registra un usuario (la contraseña se hashea con bcrypt) | Pública |
| POST | `/api/usuarios/login` | Inicia sesión y devuelve un JWT | Pública |
| GET | `/api/usuarios` | Lista los usuarios | 🔒 |

### Tipos de propiedad — `/api/tipos-propiedad`

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/api/tipos-propiedad` | Lista los tipos | Pública |
| POST | `/api/tipos-propiedad` | Crea un tipo | 🔒 |
| DELETE | `/api/tipos-propiedad/:id` | Elimina un tipo | 🔒 |

### Propiedades — `/api/propiedades`

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/api/propiedades` | Lista las propiedades (acepta filtros por query, ej.: `?operacion=Venta&zona=Palermo`) | Pública |
| GET | `/api/propiedades/:id` | Detalle de una propiedad | Pública |
| POST | `/api/propiedades` | Crea una propiedad | 🔒 |
| PUT | `/api/propiedades/:id` | Actualiza una propiedad | 🔒 |
| DELETE | `/api/propiedades/:id` | Elimina una propiedad | 🔒 |

### Contactos — `/api/contactos`

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/api/contactos` | Envía una consulta desde el formulario web | Pública |
| GET | `/api/contactos` | Lista las consultas recibidas | 🔒 |

### Códigos de respuesta

* `200` OK · `201` Creado · `400` Datos inválidos · `401` Sin token, token inválido o credenciales incorrectas · `404` No encontrado · `500` Error del servidor

---

## 7. Ejemplos JSON (mock)

### Registro — `POST /api/usuarios/register`
```json
{
  "nombre": "Laura Gómez",
  "email": "laura.gomez@nuevotecho.com",
  "password": "agente123",
  "rol": "agente"
}
```

### Login — `POST /api/usuarios/login`
```json
{
  "email": "laura.gomez@nuevotecho.com",
  "password": "agente123"
}
```
Respuesta:
```json
{
  "user": {
    "_id": "6650a1f2c3b4d5e6f7a8b901",
    "nombre": "Laura Gómez",
    "email": "laura.gomez@nuevotecho.com",
    "rol": "agente"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Tipo de propiedad — `POST /api/tipos-propiedad` 🔒
```json
{
  "nombre_tipo": "Departamento"
}
```

### Propiedad — `POST /api/propiedades` 🔒
```json
{
  "direccion": "Av. Santa Fe 3450, 5° B",
  "zona": "Palermo",
  "ambientes": 3,
  "metros_cuadrados": 72,
  "precio": 145000,
  "operacion": "Venta",
  "caracteristicas": ["Balcón", "Cochera", "Amenities"],
  "imagenes": ["https://ejemplo.com/img/santafe-1.jpg"],
  "agente_id": "6650a1f2c3b4d5e6f7a8b901",
  "tipo_id": "6650a2a1c3b4d5e6f7a8b902"
}
```

### Contacto — `POST /api/contactos`
```json
{
  "nombre": "Martín Pérez",
  "email": "martin.perez@gmail.com",
  "telefono": "11 5555-1234",
  "zona": "Caballito",
  "metros_cuadrados": 55,
  "mensaje": "Quisiera tasar mi departamento de 2 ambientes.",
  "acepta_novedades": true,
  "tipo_id": "6650a2a1c3b4d5e6f7a8b902"
}
```

---

## 8. Funcionalidades

* Registro y login de usuarios con contraseñas hasheadas (bcrypt) y autenticación con JWT.
* Middleware `verifyToken` que protege las rutas de escritura y las de datos internos.
* CRUD completo de propiedades, con filtros por query y `populate` de agente y tipo.
* Alta, listado y baja de tipos de propiedad.
* Recepción de consultas y tasaciones desde el sitio web, con listado protegido para el personal.
* Manejo de errores con `try/catch` y códigos HTTP estándar.
