document.addEventListener("DOMContentLoaded", () => {

    const elementos = document.querySelectorAll(".info-item");

    function mostrarElementos() {
        elementos.forEach((elemento) => {
            const posicion = elemento.getBoundingClientRect().top;
            const pantalla = window.innerHeight;

            if (posicion < pantalla - 100) {
                elemento.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", mostrarElementos);
    mostrarElementos();

    document.querySelectorAll(".proyecto").forEach(proyecto => {
        proyecto.addEventListener("click", () => {

            document.querySelectorAll(".proyecto").forEach(item => {
                if(item !== proyecto){
                    item.classList.remove("activo");
                }
            });

            proyecto.classList.toggle("activo");
        });
    });

});

const visor = document.getElementById("visor-imagen");
const imagenGrande = document.getElementById("imagen-grande");

document.querySelectorAll(".imagenes-extra img").forEach(img => {

    img.addEventListener("mouseenter", () => {
        imagenGrande.src = img.src;
        visor.classList.add("activo");
    });

});

visor.addEventListener("mouseleave", () => {
    visor.classList.remove("activo");
});