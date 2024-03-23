import { Component, OnInit } from '@angular/core';
import { DatasetFacade } from '../../facades/dataset.facades';
import { RxState } from '@rx-angular/state';

interface DatasetPreviewComponentState {
  dataset: any;
}

const initDatasetPreviewComponentState: DatasetPreviewComponentState = {
  dataset: null,
};

@Component({
  selector: 'app-dataset-preview',
  templateUrl: './dataset-preview.component.html',
  styleUrl: './dataset-preview.component.scss',
  providers: [RxState],
})
export class DatasetPreviewComponent implements OnInit {
  dataSet$ = this.state.select('dataset');
  constructor(
    private readonly datasetFacade: DatasetFacade,
    private readonly state: RxState<DatasetPreviewComponentState>
  ) {
    this.state.set(initDatasetPreviewComponentState);
    this.state.connect('dataset', this.datasetFacade.dataset$);
  }

  ngOnInit(): void {
    this.dataSet$.subscribe((dataset) => {
      if (dataset) {
        this.getDataset(dataset.id);
      }
    });
  }

  getDataset(id: string) {
    this.datasetFacade.dispatchGetDataset(id);
  }
}
