import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modals',
  imports: [],
  templateUrl: './modals.html',
  styleUrl: './modals.css',
})
export class ModalsDeleteProduct {
  @Input() productName = '';

  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  closeModal() {
    this.cancel.emit();
  }

  onConfirmDelete() {
    this.confirm.emit();
  }
}
