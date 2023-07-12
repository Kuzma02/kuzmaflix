
import { useEffect, useState } from "react";
import { Card } from "../components/Card";


export const MovieList = ({ apiPath, title }) => {
  const [ movies, setMovies ] = useState([]);


  useEffect(() => {
    document.title = `${title} / Kuzmaflix`;
  });

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `${process.env.REACT_APP_API_KEY}`
      }
    };

    //movie/popular
    
    fetch(`https://api.themoviedb.org/3/${apiPath}?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(data => setMovies(data.results))
      .catch(err => console.error(err));
  }, [apiPath]);
  

  return (
    <main>
      <section className="max-w-7xl mx-auto py-7">
        <div className="flex justify-start flex-wrap max-xl:justify-evenly">
          {movies.map((movie, index) => (
            <Card key={movie.id} movie={movie} />
          ))
          }
        </div>
      </section>
    </main>
  );
};
