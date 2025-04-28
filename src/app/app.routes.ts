import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SearchComponent } from './search/search.component';
import { ProjectionComponent } from './projection/projection.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OrderComponent } from './order/order.component';


export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'search', component: SearchComponent },
    { path: 'projections', component: ProjectionComponent },
    { path: 'details/:id/order', component: OrderComponent },
    { path: 'details/:id', component: DetailsComponent },  //: znaci template karatker 
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '**', redirectTo: '' }
];
