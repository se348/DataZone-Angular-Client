import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, of, retry, throwError, timer } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { Store } from '@ngxs/store';
import { AuthSelector } from 'src/app/auth/store/auth.selector';
import {ToasterService} from "../service/toast.service";
import {REFRESH_TOKEN_URL} from "../constants/api-endpoints";
import {Logout} from "../../auth/store/auth.actions";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private store: Store,
    private toasterService: ToasterService,
    private logger: NGXLogger,
  ) {}

  shouldRetry(error: any, retryCount: number) {
    if (error.status >= 500) {
      return timer(retryCount * 500);
    }
    throw error;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      retry({
        count: 2,
        delay: this.shouldRetry,
      }),
      catchError((error) => {
        this.logger.error(error);
        this.toasterService.closehToast();
        if (error instanceof HttpErrorResponse) {
          if (error.status === 0) {
            this.toasterService.showErrorToast(
              `Something went wrong, ${error.error.title}`,
            );
          } else if (error.status == 401 || error.status == 403) {
            if(error.url?.includes(REFRESH_TOKEN_URL)){
              this.store.dispatch(new Logout());
            }else if(error.statusText == "Unauthorized"){
              this.toasterService.showErrorToast("unauthorized");
                let tokens = this.store.selectSnapshot(AuthSelector.tokens);
                if (tokens.refreshToken) {
                  //this.store.dispatch(new RefreshToken({refreshToken: tokens.refreshToken}));
                  tokens = this.store.selectSnapshot(AuthSelector.tokens);
                  return next.handle(
                    request.clone({
                      setHeaders: {
                        Authorization: `Bearer ${tokens.accessToken}`,
                      },
                    }),
                  );
                }
                else{
                  this.store.dispatch(new Logout());
                }
            }else{
              this.toasterService.showErrorToast(
                error.error.title,
              );
            }
          } else if (error.status == 400) {
            // handling "One or more validation errors" error,
            if (error.error.errors) {
              for (var key in error.error.errors) {
                this.toasterService.showErrorToast(
                  error.error.errors[key][0],
                );
                break;
              }
            } else {
              this.toasterService.showErrorToast(
                error.error.title,
              );
            }
          } else {
            if (error.error instanceof Blob && error.headers.get('content-type')?.includes('application/problem+json')) {
              const reader = new FileReader();
              reader.onload = () => {
                try {
                  const jsonError = JSON.parse(reader.result as string);
                  this.toasterService.showErrorToast(
                    jsonError.title,
                  );
                } catch (parseError) {
                  this.toasterService.showErrorToast(
                    error.error.title,
                  );
                }
              }
              reader.readAsText(error.error);
            }
            else{
              this.toasterService.showErrorToast(
                error.error.title,
              );
            }
          }
          return of();
        }
        return throwError(() => {
          this.toasterService.showErrorToast(
            error.error.title,
          );
        });
      }),
    );
  }
}
