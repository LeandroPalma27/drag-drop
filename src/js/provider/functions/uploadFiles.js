// Importamos la URL del servicio para consumirlo
import { URL } from "../url-cloudinary-spring-restfulservice";

// Exportamos la funcion "subirArchivos"
/*
* Como parametro recibe al array de archivos principal
*/
export async function subirArchivos(archivosCargados) {
    // Filtramos solo la parte File del input de la funcion, utilizando un map
    const onlyFiles = archivosCargados.map(e => e.file);
    // Usamos un formData para cargar cada uno de los archivos existentes en nuestro "onlyFiles"
    const formData = new FormData();
    for (const file of onlyFiles) {
        // Cargamos cada uno de los archivos
        formData.append("files", file);
    }
    // A traves de un fetch, hacemos una peticion POST a la siguiente URL:
    const res = await fetch(URL.concat('/upload'), {
        method: "POST", 
        mode: "cors",
        cache: "no-cache",
        headers: {
            'Access-Control-Allow-Origin' : `http://${window.location.hostname}:9000`
        },
        // En el body mandamos nuestro form data
        body: formData,
    })
    // Retornamos la promesa obtenida
    return res;
}