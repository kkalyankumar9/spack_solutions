import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const DisplayMovies = () => {
    const subData = useSelector((store) => store.SubReducer.subData);
    const [movieData,setMovieData]=useState([])
    console.log(subData)
    const dispatch=useDispatch()
   
  useEffect(() => {
    let url;
    if (subData === "Basic") {
      url = "https://ss-server-sec3.onrender.com/2000";
    } else if (subData === "Standard") {
      url = "https://ss-server-sec3.onrender.com/2010";
    } else {
      url = "https://ss-server-sec3.onrender.com/2020";
    }

    axios.get(url)
      .then((res) => {
        setMovieData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [subData]);
  return (
    <>
    <div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {movieData.map((movie, index) => (
        <div key={index} className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
          <img src={movie.thumbnail} alt={movie.title} className="h-64 w-full object-cover" />
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">{movie.title} ({movie.year})</h2>
            <p className="text-xl text-gray-700 mb-2">Cast: {movie.cast.join(', ')}</p>
            <p className="text-xl text-gray-700 mb-2">Genres: {movie.genres.join(', ')}</p>
            <p className="text-sm text-gray-700">{movie.extract}</p>
          </div>
        </div>
      ))}
    </div>

    </div>
    </>
  )
}

export default DisplayMovies