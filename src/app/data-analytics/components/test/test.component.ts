import {Component, OnInit} from '@angular/core';
import {RxState} from "@rx-angular/state";
import {DataAnalyticsFacade} from "../../facades/dataAnalytics.facades";
import {COMPUTE_MEAN} from "../../../core/constants/ComputationMethods";


interface TestComponentState {
  isExploratoryConnected: boolean;
  exploratoryAnalysisResult: any;
}

const initTestComponentState: TestComponentState = {
  isExploratoryConnected: false,
  exploratoryAnalysisResult: null,
};
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit{
  exploratoryAnalysisResult: any;
  exploratoryAnalysisResult$ = this.state.select("exploratoryAnalysisResult");
  isExploratoryConnected: boolean= false;
  isExploratoryConnected$ = this.state.select("isExploratoryConnected");
  constructor(private readonly state: RxState<TestComponentState>,
              private readonly dataAnalyticsFacade: DataAnalyticsFacade) {
    this.state.set(initTestComponentState);
this.state.connect("isExploratoryConnected", this.dataAnalyticsFacade.IsExploratoryConnected$);
    this.state.connect("isExploratoryConnected", this.dataAnalyticsFacade.IsExploratoryConnected$);
  }

  ngOnInit(): void {
    this.exploratoryAnalysisResult$.subscribe((result) => {
      this.exploratoryAnalysisResult = result;
    });
    this.isExploratoryConnected$.subscribe((connected) => {
      console.log("inside subs connected", connected );
      this.isExploratoryConnected = connected;
    });
    this.dataAnalyticsFacade.dispatchStartExploratoryConnection();
  }

  computeMean(){
    console.log("connection status before send", this.isExploratoryConnected)
    this.dataAnalyticsFacade.dispatchDoExploratoryAnalysis(COMPUTE_MEAN, {
      "DatasetInfoVersionId":"1234dfg23",
      "ColumnName":"Age",
    })
  }


}
