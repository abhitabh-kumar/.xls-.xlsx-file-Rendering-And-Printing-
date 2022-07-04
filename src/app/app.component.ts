import { Binary } from '@angular/compiler';
import { Component } from '@angular/core';
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-dragAndDrop';
  ExcelData:any[][]=[];
  allFiles:any=[];
  arr: any=[];
  sheetNames:any=[];
  fileChange(event:any,k:any){
    if(event.length===k){
      k=0;
      return;  
    }
    const file=event[k];
    let fileReader=new FileReader();
    fileReader.readAsBinaryString(file);

    this.sheetNames[k]=[];
    this.ExcelData[k]=[];
    this.arr[k]=[];
  
    fileReader.onload=(e)=>{
    console.log("andar" +k)
    var workBook =XLSX.read(fileReader.result,{type:'binary'});
    this.sheetNames[k]=workBook.SheetNames;
    let i=0;
    this.sheetNames[k].map((e: string | number)=>{
      let j=0;
      
      this.ExcelData[k][i]=[];
      this.ExcelData[k][i]=XLSX.utils.sheet_to_json(workBook.Sheets[e]);
      
      this.arr[k][i]=[];
      for (let key in this.ExcelData[k][i][0]) {
        this.arr[k][i][j]=key;
        j++;
      }
      i++;
    })
  }
   return;
}
fileStart(event:any){
  this.ExcelData=[];
  for(let i=0;i<event.length;i++){
    console.log(event[i].size)
    var flag=event[i].name.split(".");
    let size=(event[i].size)/1024;
    if(flag[flag.length-1]==="xlsx" || flag[flag.length-1]==="xls"){
      if(size<=1024)
      this.fileChange(event,i);
      else
      alert("Please Select File Less Than 1mb")
    }
    else{
      alert("Only Render .xlsx/.xls Files");
    }
  }
}
}
