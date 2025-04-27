import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MovieModel } from '../../models/movie.model';
import { UtilsService } from '../../services/utils.service';
import { MovieService } from '../../services/movie.service';
import { AxiosError } from 'axios';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { LoadingComponent } from '../loading/loading.component';


@Component({
  selector: 'app-search',
  imports: [MatCardModule, NgIf, NgFor, RouterLink, MatFormFieldModule, MatInputModule, FormsModule, MatSelectModule, MatButtonModule, LoadingComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  public movies: MovieModel[] | null = null
  public error: string | null = null
  public service = UserService


  genreList: any[] = []
  selectedGenre: string | null = null
  userInput: string = ''
  allData: MovieModel[] | null = null
  dataSource: MovieModel[] | null = null
  selectedGenre2: string | null = null
  start: string | null = null
  end: string | null = null

  constructor(public utils: UtilsService) {
    MovieService.getMovies()
      .then(rsp => {
        this.allData = rsp.data
        this.dataSource = rsp.data
      })
      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)

    MovieService.getGenres()
      .then(rsp =>
        this.genreList = rsp.data
      )
  }


  public doReset() {
    this.userInput = ''
    this.selectedGenre = null
    this.selectedGenre2 = null
    this.dataSource = this.allData
  }

  public doFilterChain() {
    if (this.allData == null) return

    this.dataSource = this.allData
      .filter(obj => {
        if (this.userInput == '') return true
        return obj.originalTitle.toLowerCase().includes(this.userInput) ||
          obj.director.name.toLowerCase().includes(this.userInput)
      })
      .filter(obj => {
        if (this.selectedGenre == null) return true
        return obj.movieGenre.some(genre => genre.genre.name === this.selectedGenre)
      })
      .filter((obj => {
        if (this.selectedGenre2 == null) return true
        return obj.movieGenre.some(genre => genre.genre.name === this.selectedGenre2)
      }))



  }


}
