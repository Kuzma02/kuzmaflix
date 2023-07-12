import React, { useEffect, useState } from 'react'
import { Card } from '../components/Card'
import { useSearchParams } from 'react-router-dom';

export const Search = ({ apiPath }) => {
  
  const [ searchParams ] = useSearchParams();
  const queryTerm = searchParams.get("q");
  const [ movies, setMovies ] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `${process.env.REACT_APP_API_KEY}`
      }
    };
    
    
    fetch(`https://api.themoviedb.org/3/${apiPath}?query=${queryTerm}&include_adult=true&language=en-US&page=1`, options)
      .then(response => response.json())
      .then(data => setMovies(data.results))
      .catch(err => console.error(err));
  }, [apiPath, queryTerm]);


  useEffect(() => {
    document.title = `Search for ${queryTerm} / Kuzmaflix`;
  });

  return (
    <main>
      <section className='py-7'>
        <p className="text-3xl text-gray-700 dark:text-white">{ movies.length === 0 ? `No results for ${queryTerm}` : `Results for ${queryTerm}` }</p>
      </section>
      <section className="max-w-7xl mx-auto py-7">
        <div className="flex justify-start flex-wrap">
          {movies.map((movie, index) => (
            <Card key={movie.id} movie={movie} />
          ))
          }
        </div>
      </section>
    </main>
  )
}
