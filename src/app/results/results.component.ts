import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent {
  discName: string = '';
  constructor(private http: HttpClient) {}
  response: any;
  similarResponse: any;
  similarDisc: any;
  similarFadeResponses: any;
  skeleton: boolean = true;
  similarDiscsActive: boolean = false;
  fdLink: string = '';
  errorTruth: boolean;
  rand: any;

  ngOnInit() {
    let queryString = window.location.search;
    queryString = queryString.split('=')[1];

    if (queryString) {
      console.log(queryString);
      this.http
        .get('https://discit-api.fly.dev/disc?name=' + queryString)
        .subscribe((response) => {
          this.response = [];
          this.response = response;
          console.log(this.response);
          this.response = this.response[0];

          this.fdLink =
            'https://foundationdiscs.com/collections/discraft/products/' +
            this.response[0]?.name_slug;
        });
    } else {
      this.http.get('https://discit-api.fly.dev/disc').subscribe((response) => {
        this.response = [];
        this.response = response;
        this.rand = getRandomInt(931);
        this.response = this.response[this.rand];
        this.skeleton = true;
        this.fdLink =
          'https://foundationdiscs.com/collections/discraft/products/' +
          this.response[0]?.name_slug;
      });
    }
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
            this.response[0]?.name_slug;
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
  public copyLink() {
    let name: string = this.response?.name_slug;
    console.log(name);
    let copyLink = 'https://discrr.com/?name=' + name;
    document.getElementById('search-bar').classList.toggle('green-fade');

    navigator.clipboard.writeText(copyLink);
    console.log('Content copied to clipboard');
  }
  public clearField() {
    (document.getElementById('search-input') as HTMLInputElement).value = '';
    document.getElementById('search-input').focus();
  }
  public getSimilar() {
    let similarFade = this.response.fade;
    let similarSpeed = this.response.speed;
    let similarGlide = this.response.glide;
    let similarTurn = this.response.turn;

    //get similar fade
    this.http
      .get(
        'https://discit-api.fly.dev/disc?fade=' +
          Number(similarFade) +
          '&speed=' +
          Number(similarSpeed) +
          '&turn=' +
          Number(similarTurn) +
          '&glide=' +
          Number(similarGlide)
      )
      .subscribe((similarResponse) => {
        this.similarResponse = [];
        this.similarResponse = similarResponse;
        console.log(this.similarResponse);
        if (this.similarResponse.length == 1) {
          // this.errorTruth = false;
          console.log('error');
        }
      });
    this.similarDiscsActive = true;
    this.similarDisc = this.similarResponse[0].item;
  }
}
