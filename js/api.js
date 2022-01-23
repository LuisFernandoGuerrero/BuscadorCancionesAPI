import * as UI from './interfaz.js';


class API {
    constructor(artista, cancion) {
        this.artista = artista;
        this.cancion = cancion;
    }

    consultarAPI() {
        const url = `https://api.lyrics.ovh/v1/${this.artista}/${this.cancion}`
        spinner();
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => {
                if (resultado.lyrics) {
                    const { lyrics } = resultado;

                    UI.divResultado.textContent = lyrics;
                    UI.headingResultado.textContent = `Canción: ${this.cancion} - ${this.artista}`
                } else {
                    UI.divMensajes.textContent = 'La canción no existe, prueba con otra búsqueda.'
                    UI.divMensajes.classList.add('error')

                    setTimeout(() => {
                        UI.divMensajes.textContent = ''
                        UI.divMensajes.classList.remove('error')
                    }, 2000);
                }
            })
    }
}

export default API;

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function spinner() {
    limpiarHTML();

    const divSpinner = document.createElement('DIV');
    divSpinner.classList.add('spinner');

    divSpinner.innerHTML = `
    <div class="double-bounce1"></div>
    <div class="double-bounce2"></div>
    `;

    UI.divResultado.appendChild(divSpinner)
}