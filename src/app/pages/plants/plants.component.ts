import { Component } from '@angular/core';
import { PlantsService } from '../../plants.service';
import { Post } from '../../entities';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plants',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plants.component.html',
  styleUrl: './plants.component.css'
})
export class PlantsComponent {
  plants: Post[]=[];
  constructor(private plantsService: PlantsService){
    this.plantsService.getAll().subscribe(
      (plants)=> this.plants = plants
    )
  }

}
