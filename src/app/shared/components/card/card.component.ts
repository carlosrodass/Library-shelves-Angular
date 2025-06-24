import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { SharedModule } from './../../shared.module';
import { HubViewModel } from '../../../Features/hub/models/hub.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() hub!: HubViewModel;
  @Output() actionClick = new EventEmitter<string | number>();
  @Output() actionClickDelete = new EventEmitter<string | number>();
  @Output() actionClickEdit = new EventEmitter<string | number>();

  isHovered = false;

  constructor() {}

  ngOnInit() {
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isHovered = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHovered = false;
  }

  onSeeMore() {
    this.actionClick.emit(this.hub.hubId);
  }
  onDelete() {
    this.actionClickDelete.emit(this.hub.hubId);
  }

  onEdit() {
    this.actionClickEdit.emit(this.hub.hubId);
  }

  showFullDescription = false;

  getShortDescription(description: string): string {
    const words = description.split(' ');
    return words.length > 10 ? words.slice(0, 10).join(' ') : description;
  }

  toggleDescription(): void {
    this.showFullDescription = !this.showFullDescription;
  }
}
