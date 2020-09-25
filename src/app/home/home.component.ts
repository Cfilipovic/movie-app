import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  movies;
  searchTerm;
  searchCount = -1;
  checked = true;

  constructor(private apiService: ApiService) { }

  //Request the top popular movies by default on the homepage
  ngOnInit() {
    this.apiService.getPopularMovies().subscribe((data) => {
      this.movies = data['results'];

      this.checkForOwnedMovies(this.movies);
    });    
  }

  /**
   * Returns search results for movies
   * @param form
   */
  getSearchResults(form) {
    this.searchTerm = form.value.searchTerm;
    this.apiService.searchForMovie(this.searchTerm).subscribe((data) => {
      this.movies = data['results'];

      //Check to see if the user owns any of the resulting movies
      this.checkForOwnedMovies(this.movies);

      this.searchCount = data['total_results'];
    })
  }

  /**
   * Toggles the owned status of the selected movie
   * @param movie
   * @param form
   */
  toggleOwnedMovie(movie, checked) {
    let toggle = checked;

    //Update the value stored in local storage
    //Values are stored by movie id as the key and a string boolean value
    //Ex) 12345 "true"
    localStorage.setItem(movie.id, JSON.stringify(toggle));

    //Update the value for the ui
    movie.owned = toggle;
  }

  /**
   * Check every movie and see if it was marked "owned" by the user
   * @param movieList - the list of movie objects to iterate over
   */
  checkForOwnedMovies(movieList) {
    movieList.forEach(movie => {      
      movie.owned = this.isOwnedMovie(movie);
    });
  }

  /**
   * Checks user localstorage to see if the user has previously
   * marked this movie as "owned"
   * @param movie
   */
  isOwnedMovie(movie) {
    //If there is no entry in local storage assume false
    if (movie === null || movie.id === null || localStorage === null || localStorage.getItem(movie.id) === null) {
      return false;
    }
    else {
      //check local storage to see if the movie is owned
      if (JSON.parse(localStorage.getItem(movie.id)) === true) {
        return true;
      }
      else {
        return false;
      }
    }
  }
}
