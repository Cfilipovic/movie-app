import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_KEY = '91c2376a3d8260ba138e5a283ce34a35';

  constructor(private httpClient: HttpClient) { }

  public getPopularMovies() {
    return this.httpClient.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}&language=en-US&page=1`);
  }

  public searchForMovie(searchInput) {
    return this.httpClient.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&language=en-US&page=1&include_adult=false&query=${searchInput}`);
  }
}
