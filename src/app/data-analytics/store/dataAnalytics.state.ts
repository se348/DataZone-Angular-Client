import { Injectable } from '@angular/core';
import { StateToken, State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import {DataAnalyticsService} from "../services/data-analytics.service";
import {
  GetExploratoryResult,
  SendExploratoryRequest,
  SendRegressionRequest,
  StartExploratoryConnection,
  StartRegressionConnection
} from "./dataAnalytics.action";

export interface DataAnalyticsStateModel {
 regressionAnalysisResult: any;
 exploratoryAnalysisResult: any;
 IsExploratoryConnected: boolean;
 IsRegressionConnected: boolean;
}

const DATA_ANALYTICS_STATE_TOKEN = new StateToken<DataAnalyticsStateModel>(
  'DataAnalyticsState',
);

const defaults: DataAnalyticsStateModel = {
  regressionAnalysisResult: null,
  exploratoryAnalysisResult: null,
  IsExploratoryConnected: false,
  IsRegressionConnected: false,
};

@State<DataAnalyticsStateModel>({
  name: DATA_ANALYTICS_STATE_TOKEN,
  defaults: defaults,
})
@Injectable()
export class DataAnalyticsState {
  constructor(private dataAnalyticsService: DataAnalyticsService) {}


  @Action(StartExploratoryConnection)
  startExploratoryConnection(
    { patchState }: StateContext<DataAnalyticsStateModel>,
    { }: StartExploratoryConnection,
  ) {
    this.dataAnalyticsService.startExploratoryConnection().then(() => {
      patchState({IsExploratoryConnected: true});
    });
  }

  @Action(StartRegressionConnection)
  startRegressionConnection(
    { patchState }: StateContext<DataAnalyticsStateModel>,
    { }: StartRegressionConnection,
  ) {
    this.dataAnalyticsService.startRegressionConnection().then(() => {
      patchState({IsRegressionConnected: true});
    });
  }

  @Action(SendExploratoryRequest)
  sendExploratoryRequest(
    { patchState }: StateContext<DataAnalyticsStateModel>,
    { methodName, payload }: SendExploratoryRequest,
  ) {
    this.dataAnalyticsService.sendExploratoryRequest(methodName, payload);

  }

  @Action(SendRegressionRequest)
  sendRegressionRequest(
    { patchState }: StateContext<DataAnalyticsStateModel>,
    { methodName, payload }: SendRegressionRequest,
  ) {
    this.dataAnalyticsService.sendRegressionRequest(methodName, payload);
  }


  @Action(GetExploratoryResult)
  getExploratoryResult(
    { patchState }: StateContext<DataAnalyticsStateModel>,
    { }: GetExploratoryResult,
  ) {
      this.dataAnalyticsService.registerExploratoryEvent(
        "ExploratoryResult",
        (n: { exploratoryAnalyticsResult: any }) => {
          patchState({ exploratoryAnalysisResult:n.exploratoryAnalyticsResult });
        },
      );
  }

  @Action(GetExploratoryResult)
  getRegressionResult(
    { patchState }: StateContext<DataAnalyticsStateModel>,
    { }: GetExploratoryResult,
  ) {
      this.dataAnalyticsService.registerRegressionEvent(
        "RegressionResult",
        (n: { regressionAnalysisResult: any }) => {
          patchState({ regressionAnalysisResult: n.regressionAnalysisResult });
        },
      );
  }
}
