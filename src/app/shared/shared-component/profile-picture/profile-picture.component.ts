import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss']
})
export class ProfilePictureComponent implements OnInit {
  @Input() imageUrl: string = '';
  @Input() initials: string = '';
  private _size: string | number = 100;

  @Input()
  set size(value: string | number) {
    this._size = typeof value === 'string' ? parseInt(value, 10) : value;
  }

  get size(): string | number {
    return this._size;
  }

  @Output() imageSelected = new EventEmitter<File>();

  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageUrl = URL.createObjectURL(file);
      this.imageSelected.emit(event.target.files[0]);
    }
  }
}
