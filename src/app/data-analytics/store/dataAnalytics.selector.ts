import {createPropertySelectors} from "@ngxs/store";
import {DataAnalyticsState, DataAnalyticsStateModel} from "./dataAnalytics.state";

export class DataAnalyticsSelector {
  static slices =
    createPropertySelectors<DataAnalyticsStateModel>(DataAnalyticsState);
}
