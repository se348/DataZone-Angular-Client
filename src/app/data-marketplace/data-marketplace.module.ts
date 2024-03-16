import { NgModule } from '@angular/core';
import { DatasetModule } from './dataset/dataset.module';
import { DataMarketplaceRoutingModule } from './data-marketplace-routing.module';

import { SharedModule } from '../shared/shared.module';
import { SharedComponentModule } from '../shared/shared-component/shared-component.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MarketplaceSideBarComponent } from './components/marketplace-side-bar/marketplace-side-bar.component';
import { DatasetListComponent } from './components/dataset-list/dataset-list.component';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { DatasetReportsModule } from './dataset-reports/dataset-reports.module';
@NgModule({
  declarations: [
    HomePageComponent,
    MarketplaceSideBarComponent,
    MarketplaceSideBarComponent,
    DatasetListComponent
  ],
  imports: [
    DataMarketplaceRoutingModule,
    DatasetModule,
    DatasetReportsModule,
    //TODO: Add State,
    RatingModule,
    SharedModule,
    SharedComponentModule,
    FormsModule,
    DataViewModule
  ],
})
export class DataMarketplaceModule {}
