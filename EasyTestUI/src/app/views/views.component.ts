import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-views',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatToolbarModule,
    RouterOutlet
  ],
  templateUrl: './views.component.html',
  styleUrl: './views.component.scss'
})
export class ViewsComponent {

}
