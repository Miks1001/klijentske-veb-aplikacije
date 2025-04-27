import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SearchComponent } from './search/search.component';
import { ProjectionComponent } from './projection/projection.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'search', component: SearchComponent },
    { path: 'projections', component: ProjectionComponent },
    { path: 'details/:id', component: DetailsComponent },  //: znaci template karatker 
    { path: '**', redirectTo: '' }
];
