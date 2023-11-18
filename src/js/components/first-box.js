// Componente HTML para el mainBox de zona de dropeo sin ningun archivo
export const firstBox = `<div class="box_border">
                        <div class="box">
                            <aside class="box_1">
                                <i class="fa-solid fa-cloud-arrow-down"></i>
                            </aside>
                            <section class="box_2">
                                <span>Arrastra y suelta un archivo JPG o JPGE (max 5mb.) o</span>
                                <input type="file" id="fileElem" multiple accept="image/*" hidden>
                                <input id="btnSelectFile" class="select-file_button" type="button" placeholder="" value="Seleccionalo">
                            </section>
                        </div>
                    </div>'`;