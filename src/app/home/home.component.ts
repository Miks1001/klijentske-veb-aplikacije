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


@Component({
  selector: 'app-home',
  imports: [NgIf, NgFor, MatButtonModule, MatCardModule, LoadingComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public movies: MovieModel[] | null = null
  public error: string | null = null



  constructor(public utils: UtilsService) {
    MovieService.getMovies(0, 3)
      .then(rsp => this.movies = rsp.data) //.content na kraju
      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
  }
  public generateDestinationImage(dest: string) { //ovdje vidi za home.component.html
    return `https://s3proxygw.cineplexx.at/cms-live/asset/_default_upload_bucket/${dest.split(' ')[0].toLowerCase()}.jpg`
  }

  public openDetails(id: number) {

  }
}
