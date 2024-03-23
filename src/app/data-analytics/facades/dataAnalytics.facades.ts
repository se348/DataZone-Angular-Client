import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store'
import {
  StartRegressionConnection,
  CancelRequest,
  StartExploratoryConnection,
  SendExploratoryRequest,
  SendRegressionRequest
} from "../store/dataAnalytics.action";
import {DataAnalyticsSelector} from "../store/dataAnalytics.selector";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataAnalyticsFacade {

  constructor(private store: Store) {}

  exploratoryAnalysisResult$: Observable<any> = this.store.select(
    DataAnalyticsSelector.slices.exploratoryAnalysisResult,
  );
  regressionAnalysisResult$: Observable<any> = this.store.select(
    DataAnalyticsSelector.slices.regressionAnalysisResult,
  );
  IsExploratoryConnected$: Observable<boolean> = this.store.select(
    DataAnalyticsSelector.slices.IsExploratoryConnected,
  );
  IsRegressionConnected$: Observable<boolean> = this.store.select(
    DataAnalyticsSelector.slices.IsRegressionConnected,
  );


  dispatchStartExploratoryConnection(){
    this.store.dispatch(new StartExploratoryConnection());
  }

  dispatchDoExploratoryAnalysis( method: string, payload: any){
    this.store.dispatch(new SendExploratoryRequest(method, payload));
  }

  dispatchDoRegressionAnalysis( method: string, payload: any){
    this.store.dispatch(new SendRegressionRequest(method, payload));
  }
  dispatchStartRegressionConnection(){
    this.store.dispatch(new StartRegressionConnection());
  }

  dispatchCancelRequest(){
    this.store.dispatch(new CancelRequest());
  }

}
