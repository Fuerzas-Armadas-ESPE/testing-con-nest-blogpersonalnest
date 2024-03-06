# Proyecto de Ejemplo con Nest.js

Este es un proyecto de ejemplo creado con Nest.js que incluye la funcionalidad básica de autenticación de usuarios, publicación de cursos y temas asociados a dichos cursos.

## Instalación

Antes de comenzar, asegúrate de tener [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/) instalados en tu máquina.

```bash
npm install -g @nestjs/cli
git clone https://github.com/tu_usuario/nestjs-example.git
cd nestjs-example
npm install
```

## Iniciar la Aplicación

Para ejecutar la aplicación en modo de desarrollo, utiliza el siguiente comando:

```bash
npm run start:dev
```

Esto iniciará el servidor en http://localhost:3000.

## Autenticación

Abre Postman y crea una solicitud POST a http://localhost:3000/auth/login con el siguiente cuerpo en formato JSON:

```bash
{
  "username": "tu_usuario",
  "password": "tu_contraseña"
}
```

Esta solicitud generará un token que necesitarás para autenticar otras solicitudes.

## Crear Cursos

Crea una solicitud POST a http://localhost:3000/courses para ingresar un curso se debe ingresar con el siguiente cuerpo en formato JSON:

```bash
 {
    "id": "ea009ccb-f92a-4c40-86fc-75259895ec82",
    "course": "Matematicas",
    "content": "Matematicas avanzadas"
}

```

## Obtener y Listar Cursos

Crea una solicitud GET a http://localhost:3000/courses para obtener todos los cursos. Asegúrate de incluir el token de autenticación en los encabezados.

## Comentarios en Temas

Crea una solicitud POST a http://localhost:3000/courses/"courseId"/topics (puedes cambiar el "courseId" según el post al que quieras agregar un tema) con el siguiente cuerpo en formato JSON:

```bash
{
  "id": "123",
  "topicId": "456",
  "teacher": "Profe",
  "subject": "Matematicas avanzadas"
}
```

## Obtener y Listar Temas

Para ver los temas asociados a un curso, realiza una solicitud GET a http://localhost:3000/courses/"courseId"/topics (nuevamente, ajusta el número según el curso deseado).

## Pruebas

Ingresar el comando "npm test -- --config=jest.config.js" para realizar las pruebas en la raiz del proyecto.

Espero que esta estructura sea clara y que encuentres útil y fácil de entender este proyecto de ejemplo. ¡Disfruta explorando Nest.js!
