Este es un proyecto de backend realizado con arquitectura hexagonal.

Se han instalado las siguientes dependencias: 
•	mongoose
•	express
•	dotenv
•	cors
•	config-yml
•	bcrypt
•	cloudinary
•	compression
•	jsonwebtoken
•	multer
•	multer-storage-cloudinary

Además, como dependencias de desarrollo hemos instalado: 
•	eslint
•	eslint-config-prettier
•	prettier
•	nodemon
•	jest
•	supertest

Configuración de scripts:
"scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest --runInBand --detectOpenHandles --forceExit",
    "format:check": "prettier --check .",
    "format:write": "prettier --write .",
    "lint:check": "eslint .",
    "lint:fix": "eslint src --fix --cache"
  },


Comandos necesarios para arrancar el proyecto: 
npm run dev  (para levantar el proyecto con nodemon)
npm run start (para levantar el proyecto con node) 

Estructura de carpetas propia de la arquitectura hexagonal. 
	Controller:
Tenemos las rutas definidas asociadas a cada función de CRUD.
En algunas de ellas existen también middlewares (de autenticación, comprobación del role del usuario que hace la petición y subida de ficheros a Cloudinary).
	Domain: 
      o	Entities: Los esquemas y modelos de cada colección, en este ejemplo: cities, comments, places, users. 
      o	Orm: Funciones CRUD básicas de cada colección + algunas propias como búsqueda por parámetros… etc.
      o	Repositories: Conexión a la BD.
      o	Services: Manejo de las peticiones al servidor y respuestas de éste.

	Helpers: Configuración para la conexión a la cuenta de Cloudinary asociada.
	Middlewares: Una función de autenticación basada en la existencia de token y otra basada en el rol del usuario que lanza la petición (admin). Además, otra función que ejecuta la subida de ficheros de tipo imagen a Cloudinary. 
	Routes: Definición de la ruta principal. 
	Server: Ejecución de CORS y Gzipped. Implementación el servidor a todas las rutas previamente creadas.
	Test: Test de la función POST sobre la ruta users. 
      o	Comando necesario: npm run test
	Utils: función setError para control de errores.


Carpeta Seed.
Instalación de: 
    -	puppeteer
    -	mongoose 
    -	express
    -	dotenv
    -	cors
Web scraping de Wikipedia para generar un objeto, en este caso, para el modelo City. Conexión con la BD para borrar todo lo que había en dicha colección y guardar el nuevo objeto. 
Comando necesario: npm run dev 
