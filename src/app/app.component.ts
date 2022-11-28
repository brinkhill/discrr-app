import { Component, OnInit } from '@angular/core';
import { environment } from './../environments/environment';

import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  countryData: any = null;
  constructor(private api: ApiService) {}
  ngOnInit() {
    this.api.getCountries().subscribe((data) => {
      this.countryData = data;
    });
  }

  title = 'discrr-app';
}
