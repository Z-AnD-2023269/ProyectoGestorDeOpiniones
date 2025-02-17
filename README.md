# ProyectoGestorDeOpiniones

## 📌 Descripción del Proyecto
Este proyecto es una API web en **Node.js** con **Express.js** y **MongoDB**, diseñada para gestionar publicaciones y opiniones de los usuarios.

### 🎭 **Roles del sistema**
- **Usuario** 🧑‍💻
  - Se registra e inicia sesión.
  - Publica y edita sus propias opiniones.
  - Comenta en publicaciones de otros usuarios.
  - No puede eliminar su cuenta, para garantizar la integridad de los datos.

- **Administrador** 🔧
  - Gestiona las categorías de las publicaciones.
  - Puede crear, editar y eliminar categorías.
  - No puede modificar ni eliminar publicaciones de usuarios.

## 🏗 **Tecnologías utilizadas**
- **Node.js** con **Express.js** como framework web.
- **MongoDB** con **Mongoose** como base de datos.
- **JWT (jsonwebtoken)** para autenticación.
- **Helmet** y **Express Rate Limit** para seguridad.
- **Swagger** para documentación de la API.

## 🔥 **Flujo de interacción**
1. Un usuario crea una cuenta o inicia sesión.
2. Puede realizar publicaciones y editarlas si es necesario.
3. Puede comentar en publicaciones de otros usuarios.
4. El administrador gestiona las categorías.
5. Los usuarios pueden explorar publicaciones por categoría.

---

## 🔐 **Seguridad y Autenticación**
- **argon2** → Para hashear y verificar contraseñas de los usuarios de manera segura.
  - 📌 Uso: Cuando un usuario se registra, su contraseña se cifra antes de guardarla en la base de datos.

- **jsonwebtoken** → Para manejar autenticación con JWT (JSON Web Tokens).
  - 📌 Uso: Se genera un token cuando un usuario inicia sesión y se usa para autenticar sus solicitudes.

- **helmet** → Añade capas de seguridad HTTP a Express.
  - 📌 Uso: Protege contra ataques como XSS, Clickjacking y Sniffing añadiendo cabeceras HTTP seguras.

---

## 🌐 **Middleware y Control de Solicitudes**
- **cors** → Permite controlar qué dominios pueden acceder a la API.
  - 📌 Uso: Se habilita para permitir peticiones desde el frontend o clientes externos.

- **express-rate-limit** → Limita la cantidad de peticiones por IP para evitar ataques de fuerza bruta o DDoS.
  - 📌 Uso: Se configura para limitar, por ejemplo, a 100 solicitudes por minuto por usuario.

- **express-validator** → Facilita la validación de datos en las solicitudes.
  - 📌 Uso: Se usa para asegurarse de que los datos enviados (email, contraseña, etc.) sean correctos antes de procesarlos.

---

## 🛢 **Base de Datos**
- **mongoose** → Biblioteca para interactuar con MongoDB usando modelos y esquemas.
  - 📌 Uso: Definir y manejar modelos como Usuarios, Publicaciones, Categorías, Comentarios.

---

## 📝 **Logging y Gestión de Datos**
- **morgan** → Registra las solicitudes HTTP en la terminal para depuración.
  - 📌 Uso: Muestra detalles de cada petición como método, URL, tiempo de respuesta, etc.

- **multer** → Permite subir archivos como imágenes.
  - 📌 Uso: Se usa si se implementa la opción de agregar imágenes a las publicaciones.

- **date-fns** → Manejo avanzado de fechas y tiempos.
  - 📌 Uso: Para calcular tiempos en publicaciones, mostrar fechas en comentarios, etc.

---

## 📄 **Documentación de la API**
- **swagger-jsdoc** → Genera documentación OpenAPI a partir de comentarios en el código.
  - 📌 Uso: Define los endpoints y parámetros de la API en un formato estructurado.

- **swagger-ui-express** → Permite mostrar la documentación Swagger en una URL amigable.
  - 📌 Uso: Los desarrolladores pueden probar la API en `http://localhost:3000/getionDeOpiniones`.

---

