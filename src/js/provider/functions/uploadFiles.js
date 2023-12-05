import { URL } from "../url-cloudinary-spring-restfulservice";

export async function subirArchivos(archivosCargados) {
    const onlyFiles = archivosCargados.map(e => e.file);
    const formData = new FormData();
    for (const file of onlyFiles) {
        formData.append("files", file);
    }

    const res = await fetch(URL.concat('/upload'), {
        method: "POST", 
        mode: "cors",
        cache: "no-cache",
        headers: {
            'Access-Control-Allow-Origin' : `http://${window.location.hostname}:9000`
        },
        body: formData,

        // TODO: Documentar lo nuevo implementado
    })
    return res;
}