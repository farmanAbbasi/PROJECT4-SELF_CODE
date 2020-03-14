import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
//themes
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/theme-monokai';


import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';
import { GitserviceService } from '../gitservice.service';

const THEME = 'ace/theme/github';
const THEME2 = 'ace/theme/twilight';
const THEME3='ace/theme/dracula';
const THEME4='ace/theme/solarized_light';
const THEME5='ace/theme/monokai';

const LANG = 'ace/mode/python';
const LANG2 = 'ace/mode/java';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  private codeEditor: ace.Ace.Editor;
  private editorBeautify;
  @ViewChild('codeEditor', { static: true })
  private codeEditorElmRef: ElementRef;
  contentFromHome="";
  resultOfCompilation:any;
  runClicked:boolean=false;
  lang:string="python3";
  errorOccured:boolean=false;
  runCountJDoodle:number;


  constructor( private httpGitService:GitserviceService) { }

  ngOnInit() {
    ace.require('ace/ext/language_tools');
    const element = this.codeEditorElmRef.nativeElement;
    const editorOptions = this.getEditorOptions();
    this.codeEditor = ace.edit(element, editorOptions);
    this.codeEditor.setTheme(THEME);
    this.codeEditor.getSession().setMode(LANG);
    this.codeEditor.setShowFoldWidgets(true);
    this.codeEditor.setOption("showPrintMargin", false)
    this.codeEditor.setOption("fontSize",15);
    this.codeEditor.setOption("autoScrollEditorIntoView",true)
    // hold reference to beautify extension
    this.editorBeautify = ace.require('ace/ext/beautify');
  }

  // missing propery on EditorOptions 'enableBasicAutocompletion' so this is a wolkaround still using ts
  private getEditorOptions(): Partial<ace.Ace.EditorOptions> & { enableBasicAutocompletion?: boolean; } {
    const basicEditorOptions: Partial<ace.Ace.EditorOptions> = {
      highlightActiveLine: true,
      minLines: 24,
      maxLines: Infinity,
    };
    const extraEditorOptions = { enableBasicAutocompletion: true };
    return Object.assign(basicEditorOptions, extraEditorOptions);
  }

  private createCodeEditor(element: Element, options: any): ace.Ace.Editor {
    const editor = ace.edit(element, options);
    editor.setTheme(THEME);
    editor.getSession().setMode(LANG);
    editor.setShowFoldWidgets(true);
    return editor;
  }
  onItemChange(valueForTheme){
    if(valueForTheme==1){
      //dark
      this.codeEditor.setTheme(THEME);
    }
    else if(valueForTheme==2){
      //light
      this.codeEditor.setTheme(THEME2);
    }
    else if(valueForTheme==3){
      this.codeEditor.setTheme(THEME3);
    }
    else if(valueForTheme==4){
      this.codeEditor.setTheme(THEME4);
    }
    else{
      this.codeEditor.setTheme(THEME5);
    }
 }
 onLanguageChange(language){
   if (language == 1) {
     this.codeEditor.getSession().setMode(LANG);
     this.lang="python3";
   }
   else {
     this.codeEditor.getSession().setMode(LANG2);
     this.lang="java";
   }
 }
  
  /**
   * @returns - the current editor's content.
   */
  public getContent() {
    if (this.codeEditor) {
      const code = this.codeEditor.getValue();
      return code;
    }
  }
  async getResultOfCodeRun(){
    let typedCode=this.getContent()
    if(typedCode.length==0 || typedCode==null){
      return;
    }
    let postData={
      script : typedCode,
      language: this.lang,
      clientId: "afc751fc18ad19bc8ae8c27335f929d4",
      clientSecret:"e4668c407d23cc41dc2b252c1f84bb931a56fbb9a073600c7a4669926dba528f"
    }
    this.runClicked=true;
    this.resultOfCompilation=await this.httpGitService.runAndCompileCode(postData);
    this.runClicked=false;
    if(this.resultOfCompilation.output.toLowerCase().includes("Traceback (most recent call last):")
    || this.resultOfCompilation.output.toLowerCase().includes("error")){
      this.errorOccured=true;
    }else{
      this.errorOccured=false;
    }
    console.log(this.resultOfCompilation);
    //after running
    let postDataForHits={
      clientId: "afc751fc18ad19bc8ae8c27335f929d4",
      clientSecret:"e4668c407d23cc41dc2b252c1f84bb931a56fbb9a073600c7a4669926dba528f"
    }
    let d:any=await this.httpGitService.getHitCountFromJDoodle(postDataForHits);
    this.runCountJDoodle=d.used;
    
  }


  /**
* @param content - set as the editor's content.
*/
  public setContent(content: string): void {
    this.contentFromHome=content;
    if (this.codeEditor) {
      this.codeEditor.setValue(content);
    }
  }

  public clearContent(){
    this.codeEditor.setValue("");
    this.resultOfCompilation="";
  }
  /**
   * @event OnContentChange - a proxy event to Ace 'change' event - adding additional data.
   * @param callback - recive the corrent content and 'change' event's original parameter.
   */
  public OnContentChange(callback: (content: string, delta: ace.Ace.Delta) => void): void {
    this.codeEditor.on('change', (delta) => {
      const content = this.codeEditor.getValue();
      callback(content, delta);
    });
  }

  /**
   * @description
   *  beautify the editor content, rely on Ace Beautify extension.
   */
  public beautifyContent(): void {
      if (this.codeEditor && this.editorBeautify) {
        const session = this.codeEditor.getSession();
        this.editorBeautify.beautify(session);
      
    }
  }
}

