import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { AxiosError } from 'axios';
import { MovieModel } from '../../models/movie.model'
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UtilsService } from '../../services/utils.service';
import { LoadingComponent } from "../loading/loading.component";
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-home',
  imports: [NgIf, NgFor, MatButtonModule, MatCardModule, LoadingComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public movies: MovieModel[] | null = null
  public error: string | null = null
  public service = UserService


  constructor(public utils: UtilsService) {
    MovieService.getMovies(0, 3)
      .then(rsp => {
        this.movies = this.getRandomMovies(rsp.data, 3)
      }) //.content na kraju
      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
  }


  public getRandomMovies(movies: MovieModel[], num: number) {
    const randomIndexes: number[] = []
    while (randomIndexes.length < num) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }
    return randomIndexes.map(index => movies[index]);
  }
}
