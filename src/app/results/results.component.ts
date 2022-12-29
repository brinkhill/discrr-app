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
  errorTruth: boolean;
  rand: any;

  ngOnInit() {
    this.http.get('https://discit-api.fly.dev/disc').subscribe((response) => {
      this.response = [];
      this.response = response;
      this.rand = getRandomInt(931);
      this.response = this.response[this.rand];
      this.skeleton = true;
      this.fdLink =
        'https://foundationdiscs.com/collections/discraft/products/' +
        this.response[0].name_slug;
    });
    function getRandomInt(max: any) {
      return Math.floor(Math.random() * max);
    }
  }

  public search() {
    this.http
      .get(
        'https://discit-api.fly.dev/disc?name=' +
          this.discName.replace(/\s+/g, '-').toLowerCase()
      )
      .subscribe(
        (response) => {
          this.response = [];
          this.response = response;
          console.log(this.response);
          this.skeleton = false;
          this.fdLink =
            'https://foundationdiscs.com/collections/discraft/products/' +
            this.response[0].name_slug;
          if (response) {
            this.errorTruth = false;
          }
        },
        (error) => {
          //Error callback
          this.errorTruth = true;
          console.log(this.errorTruth);
          throw error; //You can also throw the error to a global error handler
        }
      );
  }
  public hideKeyboard() {
    (document.activeElement as HTMLElement).blur();
  }
  public copyContent() {
    let copytext =
      'Brand: ' +
      this.response.brand +
      ';' +
      'Name: ' +
      this.response.name +
      ';' +
      'Category: ' +
      this.response.category +
      ';' +
      'Speed: ' +
      this.response.speed +
      ';' +
      'Glide: ' +
      this.response.glide +
      ';' +
      'Fade: ' +
      this.response.fade +
      ';' +
      'Turn: ' +
      this.response.turn +
      ';' +
      'Stability: ' +
      this.response.stability +
      ';';
    try {
      navigator.clipboard.writeText(copytext);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
}
