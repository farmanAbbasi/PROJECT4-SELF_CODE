import { Component, OnInit } from '@angular/core';
import { GitserviceService} from './../gitservice.service';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
 
  constructor(public gitService:GitserviceService){

  }

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
      'background-color': '#021A32'
    };
    this.myParams = {
      particles: {
        number: {
          value: 250,
        },
        color: {
          value: '#fff'
        },
        shape: {
          type: 'star',
        },
        line_linked: {
          color: '#021A32',
        }
      }
    }
  }

  enteringFirstTime(userrepo){
    if(userrepo==null || userrepo.length==0){
      //normal flow nothing to be done use your given repo and user 
    }else{
        this.gitService.ownerName=userrepo.split('/')[0];
        this.gitService.repoName=userrepo.split('/')[1];
    }
    

  }
}
