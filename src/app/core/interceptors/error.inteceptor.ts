// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpInterceptor,
//   HttpErrorResponse,
// } from '@angular/common/http';
// import { catchError, of, retry, throwError, timer } from 'rxjs';
// import { OperationStatusService } from '../services/operation-status/operation-status.service';
// import { NGXLogger } from 'ngx-logger';
// import { errorStyle } from '../services/operation-status/status-style-names';
// import { ProgressStatusFacade } from '../facades/progress-status.facade';
// import { Store } from '@ngxs/store';
// import { AuthSelector } from 'src/app/auth/store/auth.selector';
// import { RefreshToken, Logout } from 'src/app/auth/store/auth.actions';
// import {REFRESH_TOKEN_URL } from 'src/app/core/constants/api-endpoints';


// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {
//   constructor(
//     private store: Store,
//     private operationStatusService: OperationStatusService,
//     private logger: NGXLogger,
//     private progressStatusFacade: ProgressStatusFacade,
//   ) {}

//   shouldRetry(error: any, retryCount: number) {
//     if (error.status >= 500) {
//       return timer(retryCount * 500);
//     }
//     throw error;
//   }

//   intercept(request: HttpRequest<any>, next: HttpHandler) {
//     return next.handle(request).pipe(
//       retry({
//         count: 2,
//         delay: this.shouldRetry,
//       }),
//       catchError((error) => {
//         this.logger.error(error);

//         this.progressStatusFacade.dispatchSetProgessOff();

//         if (error instanceof HttpErrorResponse) {
//           if (error.status === 0) {
//             this.operationStatusService.displayStatus(
//               `Something went wrong, ${error.error.title}`,
//               errorStyle,
//             );
//           } else if (error.status == 401 || error.status == 403) {
//             if(error.url?.includes(REFRESH_TOKEN_URL)){
//               this.store.dispatch(new Logout());
//             }else if(error.statusText == "Unauthorized"){
//                 let tokens = this.store.selectSnapshot(AuthSelector.tokens);
//                 if (tokens.refreshToken) {
//                   this.store.dispatch(new RefreshToken({refreshToken: tokens.refreshToken}));
//                   tokens = this.store.selectSnapshot(AuthSelector.tokens);
//                   return next.handle(
//                     request.clone({
//                       setHeaders: {
//                         Authorization: `Bearer ${tokens.accessToken}`,
//                       },
//                     }),
//                   );
//                 }
//                 else{
//                   this.store.dispatch(new Logout());
//                 }
//             }else{
//               this.operationStatusService.displayStatus(
//                 error.error.title,
//                 errorStyle,
//                 0,
//               );
//             }
//           } else if (error.status == 400) {
//             // handling "One or more validation errors" error,
//             if (error.error.errors) {
//               for (var key in error.error.errors) {
//                 this.operationStatusService.displayStatus(
//                   error.error.errors[key][0],
//                   errorStyle,
//                   0,
//                 );
//                 break;
//               }
//             } else {
//               this.operationStatusService.displayStatus(
//                 error.error.title,
//                 errorStyle,
//                 0,
//               );
//             }
//           } else {
//             if (error.error instanceof Blob && error.headers.get('content-type')?.includes('application/problem+json')) {
//               const reader = new FileReader();
//               reader.onload = () => {
//                 try {
//                   const jsonError = JSON.parse(reader.result as string);
//                   this.operationStatusService.displayStatus(
//                     jsonError.title,
//                     errorStyle,
//                     0,
//                   );
//                 } catch (parseError) {
//                   this.operationStatusService.displayStatus(
//                     error.error.title,
//                     errorStyle,
//                     0,
//                   );
//                 }
//               }
//               reader.readAsText(error.error);
//             }
//             else{
//               this.operationStatusService.displayStatus(
//                 error.error.title,
//                 errorStyle,
//                 0,
//               );
//             }
//           }
//           return of();
//         }
//         return throwError(() => {
//           this.operationStatusService.displayStatus(
//             error.error.title,
//             errorStyle,
//             0,
//           );
//         });
//       }),
//     );
//   }
// }