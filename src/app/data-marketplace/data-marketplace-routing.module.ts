import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DATASET_ROUTE } from '../core/constants/routes';

const routes: Routes = [
    {
        path: DATASET_ROUTE,
        loadChildren: () =>
          import('./dataset/dataset.module').then((m) => m.DatasetModule),
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataMarketplaceRoutingModule {}
