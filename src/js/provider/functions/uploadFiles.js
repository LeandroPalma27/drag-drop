import { URL } from "../url-cloudinary-spring-restfulservice";

export function subirArchivos(archivosCargados) {
    const onlyFiles = archivosCargados.map(e => e.file);
    const formData  = new FormData();
    for(const file of onlyFiles) {
        formData.append(file.name, file);
      }
    
    fetch(URL.concat('/upload'), {
        method: "POST", 
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            "Content-Type": "multipart/form-data"
        },
        body: formData,

        // TODO: Investigar sobre como enviar varios archivos en un formData (LINK MARCADO EN GOOGLE)
    })
}