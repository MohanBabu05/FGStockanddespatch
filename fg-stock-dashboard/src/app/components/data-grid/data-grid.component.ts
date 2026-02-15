import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingOrder, StockAgeing, NonMovingItem, FastMovingItem } from '../../services/dashboard-data.service';

type TableType = 'pending-orders' | 'stock-ageing' | 'non-moving' | 'fast-moving';

@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.scss'
})
export class DataGridComponent {
  @Input() title: string = '';
  @Input() type: TableType = 'pending-orders';
  @Input() pendingOrders: PendingOrder[] = [];
  @Input() stockAgeing: StockAgeing[] = [];
  @Input() nonMovingItems: NonMovingItem[] = [];
  @Input() fastMovingItems: FastMovingItem[] = [];

  getStatusClass(status: string): string {
    const statusMap: Record<string, string> = {
      'pending': 'status--pending',
      'urgent': 'status--urgent',
      'overdue': 'status--overdue',
      'healthy': 'status--healthy',
      'warning': 'status--warning',
      'critical': 'status--critical',
      'adequate': 'status--healthy',
      'low': 'status--warning'
    };
    return statusMap[status] || '';
  }

  formatCurrency(value: number): string {
    if (value >= 100000) {
      return '₹ ' + (value / 100000).toFixed(2) + ' L';
    }
    return '₹ ' + value.toLocaleString('en-IN');
  }

  formatQuantity(value: number): string {
    return value.toLocaleString('en-IN') + ' Kg';
  }
}
