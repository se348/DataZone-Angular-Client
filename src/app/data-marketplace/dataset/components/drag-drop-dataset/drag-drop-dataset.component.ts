import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-drag-drop-dataset',
  templateUrl: './drag-drop-dataset.component.html',
  styleUrls: ['./drag-drop-dataset.component.scss'],
})
export class DragDropDatasetComponent implements OnInit {
  fileObj: File | undefined;
  @Output() uploadedFile = new EventEmitter<File | undefined>();

  fileMeta: { name: string; url: string } = { name: '', url: '' };
  isDragOver: boolean = false;

  constructor(public fb: FormBuilder, private sanitizer: DomSanitizer) {}

  ngOnInit() {}

  upload(e: any) {
    const file = e.target.files[0];
    if (file) {
      this.fileMeta.name = file.name;
      this.fileMeta.url = URL.createObjectURL(file);
      this.fileObj = file;
    }
    this.uploadedFile.emit(this.fileObj);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileObj = file;
      this.fileMeta.name = file.name;
    }
  }

  sanitize(url?: string) {
    if (url) return this.sanitizer.bypassSecurityTrustUrl(url);
    return;
  }
  // preview() {
  //   window.open(this.fileMeta.url, '_blank');
  // }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;

  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    console.log("LEAVE")
  }

  async onDrop(event: DragEvent) {
    console.log("DROP")
    event.preventDefault();
    event.stopPropagation();

    const file = await event.dataTransfer?.files;
    if (file) {
      this.fileObj = file[0];
      this.fileMeta = {
        name: file[0].name,
        url: URL.createObjectURL(file[0])
      }
    }
    this.uploadedFile.emit(this.fileObj);
    this.isDragOver = false;
  }
  removeFile(){
    this.fileMeta = {
      name: '',
      url:''
    }
    this.fileObj = undefined;
    this.uploadedFile.emit(this.fileObj);
  }
}
