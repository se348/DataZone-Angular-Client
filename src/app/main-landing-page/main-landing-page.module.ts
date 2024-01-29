import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    ClientsComponent,
    AboutComponent,
  ],
  imports: [CommonModule],
})
export class MainLandingPageModule {}
