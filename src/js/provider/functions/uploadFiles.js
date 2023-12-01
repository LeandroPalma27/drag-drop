import { URL } from "../url-cloudinary-spring-restfulservice";

export function subirArchivos(archivosCargados) {
    const onlyFiles = archivosCargados.map(e => e.file);
    const formData = new FormData();
    for (const file of onlyFiles) {
        formData.append("files", file);
    }

    fetch(URL.concat('/upload'), {
        method: "POST", 
        mode: "cors",
        cache: "no-cache",
        headers: {
            'Access-Control-Allow-Origin' : 'http://localhost:9000'
        },
        body: formData,

        // TODO: Documentar lo nuevo implementado
    })
}