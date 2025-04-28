import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { MovieService } from '../../services/movie.service';
import { OrderModel } from '../../models/order.model';

@Component({
  selector: 'app-user',
  imports: [NgFor, NgIf, MatButtonModule, MatCardModule, MatTableModule,
    RouterLink, MatExpansionModule, MatAccordion, MatFormFieldModule,
    MatInputModule, FormsModule, MatSelectModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  public displayColumns: string[] = ['id', 'title', 'projection', 'genre', 'date', 'vip', 'price', 'tickets', 'total', 'status', 'actions']
  public user: UserModel | null = null
  public userCopy: UserModel | null = null
  public genreList: any[] = []
  public stars: number[] = [1, 2, 3, 4, 5];
  public selectedRating = 0

  public oldPass = ''
  public newPass = ''
  public repeatPass = ''

  constructor(private router: Router) {
    if (!UserService.getActiveUser()) {
      router.navigate(['/home'])
      return
    }
    this.user = UserService.getActiveUser()
    this.userCopy = UserService.getActiveUser()
    MovieService.getGenres()
      .then(rsp => {
        this.genreList = rsp.data
      })
  }

  public doChangePassword() {
    if (this.oldPass == '' || this.newPass == null) {
      alert('Password fields are empty')
      return
    }
    if (this.newPass !== this.repeatPass) {
      alert("Passwords don't match")
    }
    if (this.oldPass !== this.user?.password) {
      alert('Incorrect old password')
      return
    }
    alert(
      UserService.changePassword(this.newPass) ?
        'Password has been changed' : 'Failed to change password'
    )
    this.oldPass = ''
    this.newPass = ''
    this.repeatPass = ''

  }

  public doUpdateUser() {
    if (this.userCopy == null) {
      alert('User not exist')
      return
    }
    UserService.updateUser(this.userCopy)
    this.user = UserService.getActiveUser()
    alert('User profile updated')
  }



  public doPay(order: OrderModel) {
    if (UserService.changeOrderStatus(('gledano'), order.id)) {
      this.user = UserService.getActiveUser()
    }
  }

  public doCancel(order: OrderModel) {
    if (UserService.changeOrderStatus(('otkazano'), order.id)) {
      this.user = UserService.getActiveUser()
    }
  }

  public doRating(order: OrderModel) {
    const r = this.selectedRating
    if (UserService.changeRating(r, order.id)) {
      this.user = UserService.getActiveUser()
    }

  }
}
