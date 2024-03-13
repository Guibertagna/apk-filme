import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filmes-component',
  templateUrl: './filmes-component.component.html',
  styleUrls: ['./filmes-component.component.scss'],
})
export class FilmesComponentComponent  implements OnInit {
  @Input() filme: any;

  constructor() { }

  ngOnInit() {}
 
}
