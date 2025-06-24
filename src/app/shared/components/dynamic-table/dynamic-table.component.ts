import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { DataService } from '../../../Features/hub/services/data.service';
import { BookViewModel } from '../../../Features/book/models/book.model';

@Component({
  selector: 'dynamic-table',
  standalone: true,
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss',
  imports: [CommonModule, MatTableModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicTableComponent {
  @Input() data: any[] = [];
  @Input() tableColumns: string[] = [];
  @Input() actions:  { label: string; callback: (action: any, row: any) => void }[] = [];
  dataSource = new MatTableDataSource<any>();
  columns: string[] = [];

  constructor() {}

  ngOnInit() {}

  ngOnChanges(): void {
    this.dataSource.data = this.data;
    this.columns = this.getColumns();
  }

  getColumns(): string[] {
    const dataColumns = this.data.length > 0 ? Object.keys(this.data[0]) : [];
    return [...dataColumns, 'actions']; 
  }

  executeAction(action: any, row: any): void {
    action.callback(action, row);
  }
}
