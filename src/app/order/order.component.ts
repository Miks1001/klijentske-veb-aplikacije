import { NgFor, NgIf, } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MovieModel } from '../../models/movie.model';
import { ProjectionModel } from '../../models/projection.model';
import { ProjectionService } from '../../services/projection.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import { MovieService } from '../../services/movie.service';
import { UserService } from '../../services/user.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-order',
  imports: [NgIf, NgFor, MatButtonModule, MatCardModule, MatInputModule, MatSelectModule, MatFormFieldModule, FormsModule,
    MatDatepickerModule, MatNativeDateModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  public movie: MovieModel | null = null
  public numberOfTickets: number = 1
  public projections: ProjectionModel[] = ProjectionService.getProjections()
  public selectedProjection: number = this.projections[0].id
  public vipStatus: boolean = false
  public movies: MovieModel[] | null = null
  public selectedPrice: number = 100
  public selectedDate: Date | null = null


  public constructor(private route: ActivatedRoute, public utils: UtilsService, private router: Router) {

    route.params.subscribe(params => {
      MovieService.getMoviesById(params['id'])
        .then(rsp => this.movie = rsp.data)
    })
  }

  public findGenre(id: number): string[] {

    const genres: string[] = []

    if (id === this.movie?.movieId) {
      for (let genre of this.movie.movieGenre) {
        genres.push(genre.genre.name)
      }
    }
    return genres
  }
  public findActors(id: number): string[] {

    const actors: string[] = []

    if (id === this.movie?.movieId) {
      for (let actor of this.movie.movieActors) {
        actors.push(actor.actor.name)
      }
    }
    return actors
  }
  public projectionType(id: number): string {
    const projection = this.projections.find(p => p.id === id);
    return projection ? projection.type : 'Not  Exist'
  }


  public getPriceForType(id: number): number | null {


    const projection = this.projections.find(p => p.id === id);

    return projection ? projection.price : null
  }

  public doOrder() {
    const result = UserService.createOrder({
      id: new Date().getTime(),
      movieId: this.movie!.movieId,
      description: this.movie!.description,
      genre: this.findGenre(this.movie!.movieId),
      runTime: this.movie!.runTime,
      director: this.movie!.director.name,
      actors: this.findActors(this.movie!.movieId),
      startDate: this.movie!.startDate,
      pricePerItem: this.selectedPrice,
      reserveDate: this.selectedDate!.toLocaleDateString('sr-RS'),
      status: 'rezervisano',
      rating: null,
      numberOfTickets: this.numberOfTickets,
      title: this.movie!.originalTitle,
      projection: this.projectionType(this.selectedProjection),
      isVip: this.vipStatus
    })
    result ? this.router.navigate(['/user']) : alert('Something went wrong, Try again')
    console.log(result)
    console.log(this.selectedDate)

  }


}
