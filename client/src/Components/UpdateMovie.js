import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import axios from 'axios';

//each section that needs to be edited requires its own state

//main function to update the movie card
const UpdateMovie = () => {
  const [ editMovie, setEditMovie ] = useState({
    title: '',
    director: '',
    metascore: '',
    stars: []
  });

  //getting movies from API
  //if you do not grab the movie data, the values for the input fields will be blank! 

  const getMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => {
        setEditMovie(response.data);
      })
      .catch(error => {
      console.log('the data was not returned', error);
    })
  };

  //useEffect - it is essentially { componentDidMount, componentDidUpdate, and componentWillUnmount } combined. We use useEffect when we want to tell React that your component needs to do something after render. Placing useEffect inside the component lets us access any props we need right from the effect. The useEffect runs everytime the component mounts and updates. Because we are setting state after every data fetch, the component updates and the effect runs again - infinite loop. To fix this - add an array as the second argument. 

  //useEffect to display information in component
  //with react router we get a prop called match. 
  //Inside match is another object called params. id of movie is under params.
  
  useEffect(() => {
    getMovie(props.match.params.id);
  }, [props.match.params.id]);

  // Handle change used for adjusting all state items.
  // We are spreading in ...editMovie to SPREAD in already existing data 

  const handleChanges = e => {
    setEditMovie({ ...editMovie, [e.target.name]: e.target.value })
  };

  // updating movie then redirecting (PUSHING) user back to homepage
  // using preventDefault to keep the page from reloading upon submission

  const handleSubmit = e => {
    e.preventDefault();
  }

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

