import { Routes } from '@angular/router';
import { HubDetailsComponent } from './Features/hub/components/hub-details/hub-details.component';
import { HubComponent } from './Features/hub/hub.component';
import { DialogContentComponent } from './shared/components/dialog-content/dialog-content.component';
import { BookComponent } from './Features/book/book.component';

export const routes: Routes = [
    {
    path: '',
    component: HubComponent,
    title: 'Home page',
  },
  { path: 'hub-details/:id', 
    component: HubDetailsComponent,
    title: 'Details'
  },
  { path: 'book', 
    component: BookComponent,
    title: 'Books'
  },
  // { path: 'dialog-create', 
  //   component: DialogContentComponent,
  //   title: 'Create'
  // },
  
  // {
  //   path: '',
  //   component: HubListComponent,
  //   title: 'Home page',
  // },
  // {
  //   path: 'details/:id',
  //   component: HubDetailsComponent,
  //   title: 'Hub details',
  // },
];
