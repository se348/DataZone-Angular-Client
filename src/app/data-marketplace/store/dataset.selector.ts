import {Selector,  createPropertySelectors } from '@ngxs/store';
import {
  DatasetState,
  DatasetStateModel
} from './dataset.state';
import { PaginatedList } from 'src/app/core/models/paginated_list';
import { DatasetListModel } from '../models/dataset.model';

export class DatasetSelector {
  static slices =
    createPropertySelectors<DatasetStateModel>(DatasetState);
    
    @Selector([DatasetState])
    static datasetList(state: DatasetStateModel): PaginatedList<DatasetListModel> {
      return state.datasetList!;
    }

    @Selector([DatasetState])
    static dataset(state: DatasetStateModel): DatasetListModel {
      return state.dataset!;
    }
  }
