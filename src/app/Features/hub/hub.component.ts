import { Component, TemplateRef, ViewChild } from '@angular/core';
import { HubService } from './services/hub.service';
import {
  HubInViewModel,
  HubUpdateViewModel,
  HubViewModel,
} from './models/hub.model';
import { CommonModule } from '@angular/common';

import { CardComponent } from './../../shared/components/card/card.component';
import { SharedModule } from './../../shared/shared.module';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogContentComponent } from '../../shared/components/dialog-content/dialog-content.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [CardComponent, CommonModule, SharedModule],
  templateUrl: './hub.component.html',
  styleUrl: './hub.component.scss',
})
export class HubComponent {
  hubs: HubViewModel[] = [];
  hub: HubViewModel = {
    hubId: 0,
    name: '',
    description: '',
    image: '',
    statusId: 0,
    status: {
      id: 0,
      name: '',
    },
    books: [],
  };

  @ViewChild('template') deleteDialog!: TemplateRef<any>;
  @ViewChild('templateEdit') editDialog!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  hubToDelete!: number | string;
  hubToEdit!: HubViewModel;

  constructor(
    private hubService: HubService,
    private router: Router,
    private dialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadHubs();
  }

  loadHubs() {
    this.hubService.getHubs().subscribe((resp) => {
      this.hubs = resp;
    });
  }

  seeHubInDetail(hubId: string | number) {
    this.router.navigate(['/hub-details', hubId]);
  }

  openCreateDialog() {

    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '25%',
      height: '50%',
      data: {
        dialogTitle: 'Create Hub',
        isFromEdit: false,
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newHub: HubInViewModel = {
          name: result.name,
          description: result.description,
          image: result.image,
          statusId: result.statusId,
        };

        this.hubService
          .createHubAsync(newHub)
          .subscribe((hub) => this.hubs.push(hub));
      }
    });
  }

  openEditDialog(hubViewModel: HubViewModel) {
    this.hubToEdit = { ...hubViewModel };

    const dialogRefEdit = this.dialog.open(DialogContentComponent, {
      width: '25%',
      height: '60%',
      data: {
        dialogTitle: 'Edit Hub',
        isFromEdit: true,
        hubToEditViewModel: this.hubToEdit,
      }
    });

    dialogRefEdit.afterClosed().subscribe((result) => {
      if (result) {


        const hubUpdate: HubUpdateViewModel = {
          hubId: result.hubId,
          name: result.name,
          description: result.description,
          image: result.image,
          statusId: result.statusId,
        };
      
        this.hubService.editHubAsync(hubUpdate).subscribe((updatedResult) => {
          if (updatedResult) {
            console.log(updatedResult);
            
            // Actualiza el hub directamente en el array local
            const index = this.hubs.findIndex(h => h.hubId === updatedResult.hubId);
            if (index !== -1) {
              this.hubs[index] = updatedResult;
            }
      
            this.dialogRef.close();
            this.matSnackBar.open('Hub updated successfully!', 'Close', { duration: 3000 });
          } else {
            this.matSnackBar.open('Failed to update hub.', 'Error', { duration: 3000 });
          }
        });
      }
    });

    // this.dialogRef = this.dialog.open(this.editDialog, {
    //   width: '28%',
    //   height: '68%',
    // });
  }

  openDeleteDialog(hubId: number | string): void {

    this.hubToDelete = hubId;
    this.dialogRef = this.dialog.open(this.deleteDialog);
  }

  confirmDelete(): void {


    if (this.hubToDelete == null || this.hubToDelete == undefined) {
      alert('Error boludo');
      return;
    }

    this.hubService.deleteHubAsync(this.hubToDelete).subscribe((resp) => {
      if (resp == true) {
        this.loadHubs();
      }
    });

    this.dialogRef.close();
  }


  // onSaveEdit(form: any) {
  //   const hubUpdate: HubUpdateViewModel = {
  //     hubId: this.hubToEdit.hubId,
  //     name: form.value.name,
  //     description: form.value.description,
  //     image: form.value.image,
  //     statusId: form.value.status,
  //   };
  
  //   this.hubService.editHubAsync(hubUpdate).subscribe((updatedHub) => {
  //     if (updatedHub) {
  //       // Actualiza el hub directamente en el array local
  //       const index = this.hubs.findIndex(h => h.hubId === updatedHub.hubId);
  //       if (index !== -1) {
  //         this.hubs[index] = updatedHub;
  //       }
  
  //       this.dialogRef.close();
  //       this.matSnackBar.open('Hub updated successfully!', 'Close', { duration: 3000 });
  //     } else {
  //       this.matSnackBar.open('Failed to update hub.', 'Error', { duration: 3000 });
  //     }
  //   });
  // }
  
  // onCloseEdit(form: any) {
  //   this.loadHubs();
  //   // this.dialogRef.close();
  // }
}
