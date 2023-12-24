import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';

import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { JwtInterceptor } from './auth/services/jwt.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptors/error.inteceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent
  ],
  imports: [
    NgxsModule.forRoot([]),
    BrowserAnimationsModule, 
    NgxsStoragePluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
