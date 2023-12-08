# Drag and drop project (FRONTEND)

Proyecto para la subida de imagenes a un servidor a traves la consulta de una api.
Solo sera la parte frontend, desarrollada con JS vanilla y webpack.

## Partes del proyecto
1. Parte visual: Consta de los compenentes visuales HTML-CSS, mas codigo javascript para el funcionamiento de algunas caracteristicas como la de arrastrar archivos o carga de ventanas.
2. Conexion al servicio de subida de archivos: Consta de archivos javascript usados para la conexion e intercambio de informacion entre el cliente y el servidor.

## ¿Commo ejecutar el proyecto?
No olvidar que debera ejecutar los comandos en el respectivo orden.
1. Clonar repositorio de github
2. Instalar paquetes de node con el comando "npm install"
3. Ejecutar el comando "npm install webpack --save-dev" para instalar la ultima dependencia necesaria
4. Ejecutar el proyecto con el comando "npx webpack serve"
5. En caso de dar error, borrar todo lo instalado y clonado, para posteriormente repetir el proceso.
6. Antes de probar la aplicacion, recodar tener el servicio backend ejecutandose, el cual puedes encontrar en el siguiente repositorio [https://github.com/LeandroPalma27/images-upload-cloudinary](https://github.com/LeandroPalma27/images-upload-cloudinary)