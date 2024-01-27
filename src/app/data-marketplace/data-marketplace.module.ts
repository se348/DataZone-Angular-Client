import { NgModule } from '@angular/core';
import { DatasetModule } from './dataset/dataset.module';
import { DataMarketplaceRoutingModule } from './data-marketplace-routing.module';


@NgModule({
  declarations: [],
  imports: [
    DataMarketplaceRoutingModule,
    DatasetModule,
    //TODO: Add State
  ]
})
export class DataMarketplaceModule { }
