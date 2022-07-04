import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDragdrop]'
})
export class DragdropDirective {

  @Output() fileDropped=new EventEmitter();
 @HostBinding('style.background-color') bgcolor='';
  constructor() { }

  @HostListener('dragover',['$event']) onDragOver(evt:any){
    evt.preventDefault();
    evt.stopPropagation();
    console.log("this is draging");
    this.bgcolor="rgb(184, 255, 255)"
  }
  @HostListener('dragleave',['$event']) onDragLeave(evt:any){
    evt.preventDefault();
    evt.stopPropagation();
    console.log("this is drag leave");
    this.bgcolor="rgb(212, 255, 255)"
  }
  @HostListener('drop',['$event']) onDrop(evt:any){
    evt.preventDefault();
    evt.stopPropagation();
    const files=evt.dataTransfer.files;
    if(files.length>0){
      this.fileDropped.emit(files);
    }
    this.bgcolor="rgb(212, 255, 255)"
    console.log("this is drop");
  }

}
