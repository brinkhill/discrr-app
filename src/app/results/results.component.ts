import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent {
  discName: string = '';
  constructor(private http: HttpClient) {}
  response: any;
  skeleton: boolean = true;
  fdLink: string = '';
  public search() {
    this.http
      .get('https://discitapi.herokuapp.com/disc/name/' + this.discName)
      .subscribe((response) => {
        this.response = [];
        this.response = response;
        console.log(this.response);
        this.skeleton = false;
        this.fdLink =
          'https://foundationdiscs.com/collections/discraft/products/' +
          this.response[0].name;
      });
  }
}
