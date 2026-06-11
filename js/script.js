
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