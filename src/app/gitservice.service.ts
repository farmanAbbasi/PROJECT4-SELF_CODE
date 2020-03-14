import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GitserviceService {

  BASE_URL: string = "https://api.github.com/";
  BASE_URL_COMPILER:string="https://api.jdoodle.com/";
  ownerName: string = "farmanAbbasi";
  repoName: string = "pythonAll2";
  

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
      return this.http.post("https://cors-anywhere.herokuapp.com/"+this.BASE_URL_COMPILER+"execute/",data)
      .toPromise();
    }

    getHitCountFromJDoodle(data){
      return this.http.post("https://cors-anywhere.herokuapp.com/"+this.BASE_URL_COMPILER+"v1/credit-spent",data).toPromise();
    }
 
  

}
