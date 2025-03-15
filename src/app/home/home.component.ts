import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { AxiosError } from 'axios';
import { MovieModel } from '../../models/movie.model'
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  imports: [JsonPipe, NgIf, NgFor, MatButtonModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public movies: MovieModel[] | null = null
  public error: string | null = null


  constructor() {
    MovieService.getMovies(0, 3)
      .then(rsp => this.movies = rsp.data)
      .catch((e: AxiosError) => this.error = '${e.code}: ${e.message}')
  }
  formatDate(iso: string) {
    return new Date(iso).toLocaleString('sr-RS')
  }

  public generateDestinationImage(dest: string) {
    return 'https://img.pequla.com/destination/${dest.split('; ')[0].toLowerCase()}.jpg'
  }
}
