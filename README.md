# Instalación

* En la carpeta ***topTelematicaProject01***, ejecutar:

  `$ npm install`
  
  `$ npm run dev`
  
* En la carpeta ***topTelematicaProject01/frontend***, ejecutar en otra terminal:

  `$ npm install`
  
  `$ npm start`
  
# Acerca del proyecto

### 4.1 TECNOLOGÍA DE DESARROLLO EN EL BACKEND

* 7MongoDB

* Express

* Node js

* Mongoose

* Morgan

* Json Web Token

* Bcrypt

### 4.2 TECNOLOGÍA DE DESARROLLO EN EL FRONTEND

* Angular CLI

* Angular Material

### 5 ESPECIFICACIÓN DE LOS SERVICIOS API REST DEL BACKEND

Para la autenticación de los servicios API REST se utilizó bcrypt para encriptar las contraseñas de los usuarios en la base de datos y Json Web Token para generar un token único por usuario para navegar libremente por las distintas secciones de la página.
	
### 6 AUTENTICACIÓN DE LOS SERVICIOS API REST DEL FRONTEND

El token generado por cada usuario se utiliza en el proceso de autorización de envío de datos por medio de un dispositivo arduino.
