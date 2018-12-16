import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Http, URLSearchParams} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { QnAAuthKey,QnAEndpointURL,QnAGetCnt } from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;
  panelOpenState = false;

  states: any[] = [];
  state: any[] = [
    {
      name: '',
    },
    {
      name: '',
    },
    {
      name: '',
    },
  ];
  Answerdatas = new Array<Answerdata>();

  constructor(private http: HttpClient) {
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
        .startWith(null)
        .map(state => state ? this.filterStates(state) : this.states.slice());
  }

  httpflag = false;

  filterStates(inputwords: string) {

    if (inputwords.length < 3) {
    } else {
        this.httpflag = true;
        const inputtext = inputwords;
        const body = { 'question': inputtext , 'top': QnAGetCnt};
        this.http.post( QnAEndpointURL,

         body, {
          headers: {
            'Authorization': 'EndpointKey ' + QnAAuthKey,
            'Content-Type': 'application/json'
            }
          })
          .subscribe(
            response => {
              const answers = response['answers'];
              const Answerdatastemp = new Array<Answerdata>();

              answers.forEach(function( value ) {
                Answerdatastemp.push({
                  question: value['questions'][0],
                  score: value['score'],
                  answer: value['answer'],
                });
               });

               this.Answerdatas = Answerdatastemp;

              this.httpflag = false;
            },
            error => {
              console.log('通信失敗：' + error.statusText);
            }
          );
      }

      return this.states;
  }

}

class Suggests {
  suggest: string;
}

class Answerdata {
  question: string;
  score: number;
  answer: string;
}
