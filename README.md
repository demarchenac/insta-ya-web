# InstaYa - Cliente Web

## Dependencias:

Esta aplicación web se encuentra desarrollada con las siguientes tecnologías:

- [vite](https://www.npmjs.com/package/vite), para compilar nuestro proyecto
- [vite-plugin-svgr](https://www.npmjs.com/package/vite-plugin-svgr), para añadir iconos en formato .svg
- [react](https://www.npmjs.com/package/react), para definir la interfaz en forma de componentes reutilizables
- [react-router](https://www.npmjs.com/package/react-router-dom), para definir las rutas y navegación de nuestras vistas
- [react-toastify](https://www.npmjs.com/package/react-toastify), para generar "notificaciones" en nuestras vistas
- [lottie-react](https://www.npmjs.com/package/lottie-react), para añadir animaciones en formato [lottie](https://airbnb.design/lottie/)
- [@datepicker-react/hooks](https://www.npmjs.com/package/@datepicker-react/hooks), para extrapolar la lógica de un calendario y solo preocuparnos en construir los componentes visuales
- [axios](https://www.npmjs.com/package/axios), para consumir recursos REST por medio de peticiones http
- [zod](https://www.npmjs.com/package/zod), para validar objetos json de una forma rápida y sencilla

Y también cuenta con otras tecnologías para facilitar la experiencia como desarrollador:

- [eslint](https://www.npmjs.com/package/eslint), para validar estándares y reglas de formato en nuestro código
- [prettier](https://www.npmjs.com/package/prettier), para darle formato a nuestro código de forma automática
- [tailwindcss](https://www.npmjs.com/package/tailwindcss), para estilizar nuestra interfaz gráfica
- [husky](https://www.npmjs.com/package/husky), para ejecutar comandos antes de hacer commit con nuestros cambios
- [lint-staged](https://www.npmjs.com/package/lint-staged), para ejecutar comandos tomando en cuenta solo los archivos en el área de stage

## Comandos

Este proyecto cuenta con los siguientes comandos:

- `dev`
- `build`
- `preview`
- `lint`
- `lint:fix`
- `prettier:fix`
- `prettier:check`

Para ejecutar algún, por lo general usaremos `npm run <comando>`, estaremos trabajando la mayor parte del tiempo con el comando `npm run dev`.

## Configuración

### Entorno Local

Es necesario configurar las variables de entorno del proyecto para que este pueda funcionar adecuadamente en un entorno local. Para esto, crearemos el archivo `.env.development.local` en la carpeta raíz del proyecto con el siguiente contenido:

```env
# .env.development

VITE_API_URL=<Url a nuestra API>
```

### Entorno productivo

Una vez realizado el paso de [despliegue](#despliegue), debemos de configurar las variables de entorno en nuestro proyecto, para esto podemos ejecutar el comando `netlify env:set VITE_API_URL <host_de_nuestra_api>`.

## Despliegue

Para realizar el despliegue estaremos siguiendo paso a paso las [instrucciones en la página de vite](https://vitejs.dev/guide/static-deploy.html#netlify).

1. Necesitaremos crear una cuenta en [Netlify](https://www.netlify.com/), se puede usar una cuenta de Google o una cuenta de Github
2. Descargaremos el cliente por consola de Netlify ([Netlify CLI](https://cli.netlify.com/))
   - Esto lo podemos hacer ejecutando el comando `npm install netlify-cli -g`
3. Crearemos un nuevo sitio en Netlify con el comando `ntl init`, con esto Netlify CLI nos preguntara un par de cosas como:
   - Nuestro usuario de Netlify, hará un proceso de inicio de sesión automatizado con nuestro navegador web, en el cual solo deberemos de seguir el paso a paso
   - Nos va a preguntar si queremos actualizar un sitio o crear un sitio, por lo que aquí seleccionaremos **Create & configure a new site**
   - El nombre de nuestro sitio, en este caso yo use: _insta-ya_
   - El comando para compilar el proyecto: _npm run build_
   - La carpeta donde se encuentran nuestros archivos compilados: _dist_
4. Por ultimo, desplegaremos nuestro sitio con el comando `ntl deploy`, para esto seguiremos los siguientes pasos:
   - Se nos generara una URL de borrador donde se encuentra nuestro sitio.
   - Si todo se ve bien en nuestro borrador entonces ejecutaremos el comando `netlify deploy --prod`, con el motivo de realizar una entrega o release de nuestros cambios a productivo.
