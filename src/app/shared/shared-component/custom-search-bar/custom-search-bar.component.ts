import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-custom-search-bar',
  templateUrl: './custom-search-bar.component.html',
  styleUrl: './custom-search-bar.component.scss',
})
export class CustomSearchBarComponent {
  searchText = new FormControl('', []);

  onChange() {}
}
