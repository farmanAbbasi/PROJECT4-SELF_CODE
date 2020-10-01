import { Component, OnInit } from '@angular/core';
import { GitserviceService } from './../gitservice.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(public gitService: GitserviceService,
    public activatedRoute: ActivatedRoute,
    private router: Router) {

  }


  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;

  ngOnInit() {
    //if url has username and reponame take from it
    this.activatedRoute.queryParams.subscribe(params => {
      this.gitService.ownerName = params['username'] || this.gitService.ownerName;
      this.gitService.repoName = params['repo'] || this.gitService.repoName;
      console.log(this.gitService.ownerName + "/" + this.gitService.repoName);
      if (this.gitService.ownerName != "" && this.gitService.repoName != "") {
        this.router.navigate(['home']);
      }

    });

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

  enteringFirstTime(userrepo) {
    if (userrepo == null || userrepo.length == 0) {
      //as not got the value from url and also from the text input so use my account

    } else {
      this.gitService.ownerName = userrepo.split('/')[0];
      this.gitService.repoName = userrepo.split('/')[1];
    }


  }
}
