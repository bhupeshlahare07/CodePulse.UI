import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit {

  id: string | null = null;
  
  constructor(private route:ActivatedRoute){

  }
  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.id = 'id';
    })
  }

}
