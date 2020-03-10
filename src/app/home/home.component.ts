import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { GitserviceService } from '../gitservice.service';
import { EditorComponent } from '../editor/editor.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: any;
  dataFromFolder: any;
  fileUrl = [];
  actualFileContent = [];
  content: string;
  idCreatedUsingIndex: string;
  @ViewChild('iddd', { static: true }) myVC: any;
  appName="Self-Code";


  constructor(private httpGitService: GitserviceService, private cd: ChangeDetectorRef) { }

  async ngOnInit() {
    this.data = await this.httpGitService.getRepoData();
    console.log(this.data);
  }

  async getContentFromUrl(url, name, i) {
    if (url == null) {
      if(i=='00farman00'){
        console.log(i)
        //means one folder has been opened and if that again contains a folder then it should return folder
        this.content = "A folder within folder";
        this.myVC.setContent(this.content);
      
      }
      else{
      //for type=dir url is none so we have to find them inside
      this.dataFromFolder = await this.httpGitService.getRepoDataWithinFolder(name);
      this.idCreatedUsingIndex = i;
      // console.log(this.idCreatedUsingIndex)
      }
      
    } else if (url.substr(url.length - 3) == "pdf") {
      //if it is a pdf
      this.content = url;
      this.myVC.setContent(this.content);
      
    }
    else {
      
      this.content = await this.httpGitService.getRawDataFromUrl(url);
      //console.log(this.content);
      this.myVC.setContent(this.content);

    }

  }
  changeAppName(){
    this.appName="< Self-Code >"
  }
  changeAppNameBack(){
    this.appName="Self-Code"
  }


}



