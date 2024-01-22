import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GitserviceService {

  BASE_URL: string = "https://api.github.com/";
  BASE_URL_COMPILER:string="https://api.jdoodle.com/";
  ownerName: string = "farmanAbbasi";
  repoName: string = "farmanAbbasi-pythonAll3";
  corsBASEURL:string="https://cors-anywhere.herokuapp.com/"
  

  constructor(private http: HttpClient) { }

  getRepoData() {
    return this.http.get(this.BASE_URL + "repos/" + this.ownerName + "/" + this.repoName + "/contents").toPromise();
  }
  getRepoDataWithinFolder(folderName){
    return this.http.get(this.BASE_URL + "repos/" + this.ownerName + "/" + this.repoName + "/contents"+"/"+folderName)
    .toPromise();
  }

  getRawDataFromUrl(url) {
    return this.http.get(url, { responseType: 'text' }).toPromise();
  }
  runAndCompileCode(data){
    var d={
      script : data.script,
      language: data.language,
      versionIndex:data.vserionIndex,
      clientId: data.clientId,
      clientSecret : data.clientSecret
    }
    console.log(d);
      return this.http.post(this.corsBASEURL+this.BASE_URL_COMPILER+"v1/execute",d).toPromise();
    }

    getHitCountFromJDoodle(data){
      var d={
        clientId: data.clientId,
        clientSecret : data.clientSecret
      }
        return this.http.post(this.corsBASEURL+this.BASE_URL_COMPILER+"v1/credit-spent",d).toPromise();
    }
 
  

}
