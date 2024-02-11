import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';

import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { JwtInterceptor } from './auth/services/jwt.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ToastState } from './core/store/toast.state';
import { UserProfileModule } from './user-profile/user-profile.module';
import { CompanyProfileModule } from './company-profile/company-profile.module';
import { DataMarketplaceModule } from './data-marketplace/data-marketplace.module';
import { MainLandingPageModule } from './main-landing-page/main-landing-page.module';
import { ErrorInterceptor } from './core/interceptors/error.inteceptor';
import { CoreModule } from './core/core.module';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { ButtonModule } from 'primeng/button';
@NgModule({
  declarations: [AppComponent, LandingPageComponent],
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
    },
  ],
  bootstrap: [AppComponent],
  imports: [
    NgxsModule.forRoot([ToastState]),
    NgxsStoragePluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    LoggerModule.forRoot({
      // serverLoggingUrl: '/api/v1/logs',
      level: NgxLoggerLevel.DEBUG,
      // serverLogLevel: NgxLoggerLevel.ERROR,
    }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    AuthModule,
    DataMarketplaceModule,
    AppRoutingModule,
    UserProfileModule,
    CompanyProfileModule,
    MainLandingPageModule,
    ButtonModule,
  ],
})
export class AppModule {}
