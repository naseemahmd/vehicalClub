import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-import-file',
  templateUrl: './import-file.component.html',
  styleUrls: ['./import-file.component.css']
})
export class ImportFileComponent implements OnInit  {

  fileName = '';

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    
  }


  private file: File | undefined

    onFileSelected(event:Event){

        const target = event.target as HTMLInputElement;
        const fileInput = target.files as FileList;
        console.log(fileInput[0], "file");
        this.file = fileInput[0];
        this.fileName = fileInput[0].name;
    }

    async sendFileData() {
      if(!this.file){
        alert("please selte the file")
      }else{
        alert("file uplod started")
        let formData = new FormData();
      formData.append("file", this.file!, this.file!.name!);
      console.log("here ");
      this.http.post("http://localhost:3000/file",formData
      )
      .subscribe((res) => {
        this.ngOnInit();
        this.fileName = ''
        console.log(res,"res");
      })
      
      }
      
    }

}
