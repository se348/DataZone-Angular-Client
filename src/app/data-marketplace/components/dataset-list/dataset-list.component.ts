import { Component } from '@angular/core';
import { DatasetListModel } from '../../models/dataset.model';
import {formatDistanceToNow} from "date-fns";
import { DatasetSelector } from '../../store/dataset.selector';
import { Observable } from 'rxjs';
import { PaginatedList } from 'src/app/core/models/paginated_list';
import { Select, Store } from '@ngxs/store';
@Component({
  selector: 'app-dataset-list',
  templateUrl: './dataset-list.component.html',
  styleUrl: './dataset-list.component.scss',
})
export class DatasetListComponent {
  datasets: DatasetListModel[] = [];
  @Select(DatasetSelector.datasetList) datasets$!: Observable<PaginatedList<DatasetListModel>>;
  constructor(public store: Store) {
    this.datasets$.subscribe((data) => {
      this.datasets = data.items;
      this.datasets.forEach((dataset) => {
        dataset.createdAt = formatDistanceToNow(new Date(dataset.createdAt), { addSuffix: true });
      });
    });
  }
}
