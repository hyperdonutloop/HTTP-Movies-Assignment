import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import axios from 'axios';

const UpdateMovie = () => {
  const [ editMovie, setEditMovie ] = useState({
    title: '',
    director: '',
    metascore: '',
    stars: []
  });



  return (
    <div>
      <h1>Update Movie</h1>
      <form>
        <input
          type="text"
          name="title"
          placeholder="movie title" 
        />
        <input
          type="text"
          name="director"
          placeholder="director" 
        />
        <input
          type="text"
          name="metascore"
          placeholder="metascore" 
        />
        <input
          type="text"
          name="stars"
          placeholder="stars" 
        />
      </form>
    </div>
  )
}