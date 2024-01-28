import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SharedComponentModule } from '../shared/shared-component/shared-component.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MarketplaceSideBarComponent } from './components/marketplace-side-bar/marketplace-side-bar.component';
import { SideNavBarComponent } from '../shared/shared-component/side-nav-bar/side-nav-bar.component';

@NgModule({
  declarations: [
    HomePageComponent,
    MarketplaceSideBarComponent,
    MarketplaceSideBarComponent,
  ],
  imports: [
    CommonModule,
    MarketplaceRoutingModule,
    SharedModule,
    SharedComponentModule,
  ],
})
export class DataMarketplaceModule {}
