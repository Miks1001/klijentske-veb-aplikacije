import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MovieModel } from '../../models/movie.model';
import { NgIf } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { MatButtonModule } from '@angular/material/button';
import { UtilsService } from '../../services/utils.service';
import { LoadingComponent } from "../loading/loading.component";


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-search',
  imports: [MatTableModule, NgIf, MatButtonModule, LoadingComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  displayedColumns: string[] = ['movieId', 'title', 'startDate', 'runTime', 'actions'];
  dataSource: MovieModel[] | null = null
  utils: any;
  runTime: any;

  public connstructor(utils: UtilsService) {
    MovieService.getMovies(0, 8)
      .then(rsp => this.dataSource = rsp.data.content)
  }
}


