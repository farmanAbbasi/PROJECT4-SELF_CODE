import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {


  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;

  ngOnInit() {
    this.myStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
       'background-image': 'linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%)'

    };
    this.myParams = {
      particles: {
        number: {
          value: 150,
        },
        color: {
          value: '#fff'
        },
        shape: {
          type: 'circle',
        },
        line_linked: {
          color: '#3584A7',
        }
      }
    }
  }
}
