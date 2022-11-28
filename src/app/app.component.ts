import { Component, OnInit } from '@angular/core';
import { environment } from './../environments/environment';

import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'discrr-app';
}
