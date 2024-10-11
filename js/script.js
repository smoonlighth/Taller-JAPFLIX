
let moviesData = []; 
let search_movies = []; 

function showMovies(array) {
    document.getElementById("lista").innerHTML = ""; 

    for (const movie of array) {
        let stars = ""; 

        for (let i = 0; i < parseInt(movie.vote_average / 2); i++) {
            stars += `<span class="fa fa-star checked"></span>`; 
        }

        for (let i = 0; i < (5 - parseInt(movie.vote_average / 2)); i++) {
            stars += `<span class="fa fa-star"></span>`; 
        }

        let genres = ""; 
        for (const genero of movie.genres) {
            genres += genero.name + " - ";
        }
        genres = genres.slice(0, genres.length - 3);

        document.getElementById("lista").innerHTML += `
            <li class="list-group-item bg-dark text-white"> <!-- Estilo de lista con fondo oscuro y texto blanco -->
                <!-- Elemento de la lista que actúa como botón para abrir un panel lateral con más detalles -->
                <div type="button" data-bs-toggle="offcanvas" data-bs-target="#oc${movie.id}" aria-controls="offcanvasTop">
                    <div class="fw-bold">${movie.title} <span class="float-end">${stars}</span></div> <!-- Título y estrellas -->
                    <div class="text-muted fst-italic">${movie.tagline}</div> <!-- Subtítulo de la película -->
                </div>
                <!-- Panel lateral que se muestra al hacer clic en la película, contiene más información -->
                <div class="offcanvas offcanvas-top text-dark" tabindex="-1" id="oc${movie.id}" aria-labelledby="offcanvasTopLabel">
                    <div class="offcanvas-header">
                        <h3 class="offcanvas-title" id="offcanvasTopLabel">${movie.title}</h3> <!-- Título en el panel lateral -->
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button> <!-- Botón de cierre -->
                    </div>
                    <div class="offcanvas-body">
                        <p>${movie.overview}</p> <!-- Descripción o resumen de la película -->
                        <hr>
                        <span class="text-muted">
                            ${genres} <!-- Muestra los géneros de la película -->
                            <!-- Botón con un menú desplegable que muestra más información (año, duración, presupuesto, ingresos) -->
                            <button class="float-end btn btn-secondary dropdown-toggle" type="button" id="dd${movie.id}" data-bs-toggle="dropdown" aria-expanded="false">More</button>
                            <ul class="dropdown-menu" aria-labelledby="dd${movie.id}">
                                <li><span class="dropdown-item">Year: <span class="float-end ps-1"> ${movie.release_date.slice(0, 4)}</span></span></li> <!-- Año de lanzamiento -->
                                <li><span class="dropdown-item">Runtime: <span class="float-end ps-1"> ${movie.runtime} mins</span></span></li> <!-- Duración -->
                                <li><span class="dropdown-item">Budget: <span class="float-end ps-1"> $${movie.budget.toLocaleString()}</span></span></li> <!-- Presupuesto -->
                                <li><span class="dropdown-item">Revenue: <span class="float-end ps-1"> $${movie.revenue.toLocaleString()}</span></span></li> <!-- Ingresos -->
                            </ul>
                        </span>
                    </div>
                </div>
            </li>
        `;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    fetch("https://japceibal.github.io/japflix_api/movies-data.json")
        .then(response => response.json())
        .then(data => {
            movies = data;
            document.getElementById("btnBuscar").addEventListener("click", function () {
                search_movies = [];
                if (document.getElementById("inputBuscar").value) {
                    search_movies = movies.filter(movie => {
                        return movie.title.toLowerCase().includes(document.getElementById("inputBuscar").value.toLowerCase()) ||
                        movie.tagline.toLowerCase().includes(document.getElementById("inputBuscar").value.toLowerCase()) ||
                        movie.overview.toLowerCase().includes(document.getElementById("inputBuscar").value.toLowerCase());
                    });
                }
                showMovies(search_movies);
            });
        });
});
