import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CardComponent } from './shared/components/card/card.component';
import { HubComponent } from './Features/hub/hub.component';
import { HeaderMenuComponent } from './shared/components/header-menu/header-menu.component';

@Component({
  standalone: true,
  imports: 
  [ RouterModule, 
    HeaderMenuComponent
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Shelve Hubs';
}
