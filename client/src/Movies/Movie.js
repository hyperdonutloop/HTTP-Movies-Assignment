import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  //url has to be an interpolated string so that we can identify the exact movie being deleted?
  //after movie has been deleted routing user back to movies-list
  deleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
      .then(response => {
        this.props.history.push('/movies');
        console.log('movie deleted son', response);
      })
      .catch(error => {
        console.log('deleting movie did not work', error);
      })
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }
    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <button onClick={() => 
          this.props.history.push(`/update-movie/${this.state.movie.id}`)
        }>Update</button>
        <button onClick={this.deleteMovie}>Delete</button>
      </div>
    );
  }
}
