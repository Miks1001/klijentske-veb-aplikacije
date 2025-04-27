import { Component } from '@angular/core';
import { ProjectionService } from '../../services/projection.service';
import { ProjectionModel } from '../../models/projection.model';
import { MatTableModule } from '@angular/material/table';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-projection',
  imports: [MatTableModule, NgIf, MatButtonModule],
  templateUrl: './projection.component.html',
  styleUrl: './projection.component.css'
})
export class ProjectionComponent {
  displayedColumns: string[] = ['movieId', 'title', 'startDate', 'runTime', 'actions'];
  dataSource: ProjectionModel[] = ProjectionService.getProjections()
}
