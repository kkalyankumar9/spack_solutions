import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubdata } from '../Redux/SubData/action';
import SubscriptionsPlans from './subscribtions';

const DisplayMovies = () => {
  const subData = useSelector((store) => store.SubReducer.subData);
  const isLoading = useSelector((store) => store.SubReducer.isLoading);
  const isError = useSelector((store) => store.SubReducer.isError);
  const [movieData, setMovieData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getSubdata());
  }, [dispatch]);

  useEffect(() => {
    if (subData.length > 0) {
      let plan = subData[0]["plan"];
      let urls = [];

      if (plan === "basic") {
        urls = ["https://ss-server-sec3.onrender.com/2000"];
      } else if (plan === "standard") {
        urls = ["https://ss-server-sec3.onrender.com/2000", "https://ss-server-sec3.onrender.com/2010"];
      } else if (plan === "premium") {
        urls = [
          "https://ss-server-sec3.onrender.com/2000",
          "https://ss-server-sec3.onrender.com/2010",
          "https://ss-server-sec3.onrender.com/2020"
        ];
      }else{
        console.log("Subscribe to any plans");
        return  <div></div>;
      }

      // Fetch data from all specified URLs
      Promise.all(urls.map(url => axios.get(url)))
        .then((responses) => {
          const data = responses.flatMap(response => response.data);
          setMovieData(data);
          setFilteredData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [subData]);

  useEffect(() => {
    if (selectedYear) {
      const filtered = movieData.filter(movie => movie.year === parseInt(selectedYear));
      setFilteredData(filtered);
    } else {
      setFilteredData(movieData);
    }
  }, [selectedYear, movieData]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div>
      <div className="flex justify-center m-4">
        <select value={selectedYear} onChange={handleYearChange} className="p-1 border rounded">
          <option value="">Year</option>
          <option value="2000">2000</option>
          <option value="2010">2010</option>
          <option value="2020">2020</option>
        </select>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
            <div></div>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 m-3">
          {filteredData.length > 0 ? (
            filteredData.map((movie, index) => (
              <div key={index} className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={movie.thumbnail} alt={movie.title} className="h-64 w-full object-cover" />
                <div className="p-4">
                  <h2 className="text-2xl font-bold mb-2">{movie.title} ({movie.year})</h2>
                  <p className="text-lg text-gray-700 mb-2">Cast: {movie.cast.join(', ')}</p>
                  <p className="text-lg text-gray-700 mb-2">Genres: {movie.genres.join(', ')}</p>
                  <p className="text-sm text-gray-700">{movie.extract}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-1 sm:col-span-2 text-center text-xl text-gray-700">
              {subData.length > 0 ? "No movies available for the selected year. Please upgrade your plan for more options." : "Subscribe to any plans"}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DisplayMovies;
