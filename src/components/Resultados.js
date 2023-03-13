import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function Resultados() {
  let query = new URLSearchParams(window.location.search);
  let keyword = query.get("palabra-clave");
  // https://api.themoviedb.org/3/search/movie?api_key=291df7c7a5b8101ef8c6e54198884ab3&language=en-US&page=1&include_adult=false

  const [moviesResults, setMoviesResults] = useState([]);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=291df7c7a5b8101ef8c6e54198884ab3&language=es-ES&query=${keyword}`;
    axios
      .get(endPoint)
      .then((response) => {
        const moviesArray = response.data.results;
        setMoviesResults(moviesArray);
        if (moviesArray.length === 0) {
          swal(
            <div>
              <h3>Ups! Tu busqueda no ha tenido resultados</h3>
              <h4>Por favor intenta con otra palabra</h4>
            </div>
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [moviesResults]);

  return (
    <>
      <h2>Resultados con: "{keyword}" </h2>

      <div className="row">
        {moviesResults.map((moviesResults, indice) => {
          return (
            <div className="col-md-3" key={indice}>
              <div className="card my-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${moviesResults.poster_path}`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{moviesResults.title}</h5>
                  <p>Estreno: {moviesResults.release_date}</p>

                  <Link
                    to={`/detalle?movieID=${moviesResults.id}`}
                    className="btn btn-primary"
                  >
                    Conoce más
                  </Link>
                </div>
              </div>
            </div> // my-4 es margen de arriba y de abajo, 4 rem.
          );
        })}
      </div>
    </>
  );
}

export default Resultados;
