import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { DatasetListComponent } from './components/dataset-list/dataset-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: 'list',
        component: DatasetListComponent,
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./dataset-reports/dataset-reports.module').then(
            (m) => m.DatasetReportsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataMarketplaceRoutingModule {}
