import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MovieService } from '../../services/movie.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  imports: [MatCardModule, NgFor, RouterLink, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatSelectModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  public genreList: any[] = []
  public email = ''
  public password = ''
  public repeatPassword = ''
  public first_name = ''
  public last_name = ''
  public phone = ''
  public address = ''
  public genre = ''

  public constructor(private router: Router) {
    MovieService.getGenres()
      .then(rsp => this.genreList = rsp.data)
  }



  public doSignUp() {
    if (this.email == '' || this.password == '') {
      alert('Email and password cannot be empty fields!')
      return
    }
    if (this.password !== this.repeatPassword) {
      alert('Passwords dont match!')
      return
    }

    const result = UserService.createUser({
      email: this.email,
      password: this.password,
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone,
      address: this.address,
      favouriteGenre: this.genre,
      orders: []
    })

    result ? this.router.navigate(['/login']) : alert('Email is already taken!')
  }
}
