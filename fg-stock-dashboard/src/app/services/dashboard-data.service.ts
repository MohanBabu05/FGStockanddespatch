import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface KpiData {
  id: string;
  label: string;
  value: string;
  unit: string;
  trend?: number;
  trendDirection?: 'up' | 'down' | 'neutral';
  status?: 'healthy' | 'warning' | 'critical';
}

export interface PendingOrder {
  orderId: string;
  customer: string;
  shade: string;
  quantity: number;
  dueDate: string;
  status: 'pending' | 'urgent' | 'overdue';
  daysRemaining: number;
}

export interface StockAgeing {
  itemCode: string;
  shade: string;
  quantity: number;
  ageInDays: number;
  value: number;
  status: 'healthy' | 'warning' | 'critical';
}

export interface NonMovingItem {
  itemCode: string;
  shade: string;
  quantity: number;
  lastMovement: string;
  daysStagnant: number;
  blockedValue: number;
}

export interface FastMovingItem {
  itemCode: string;
  shade: string;
  avgDispatch: number;
  currentStock: number;
  reorderLevel: number;
  status: 'adequate' | 'low' | 'critical';
}

export interface AiInsight {
  id: string;
  type: 'warning' | 'recommendation' | 'alert' | 'info';
  icon: string;
  message: string;
  value?: string;
  timestamp: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    fill?: boolean;
    tension?: number;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {

  constructor() { }

  getKpiData(): Observable<KpiData[]> {
    const kpiData: KpiData[] = [
      {
        id: 'total-fg-stock',
        label: 'Total FG Stock',
        value: '1,24,580',
        unit: 'Kg',
        trend: 5.2,
        trendDirection: 'up',
        status: 'healthy'
      },
      {
        id: 'total-dispatch',
        label: 'Total Dispatch',
        value: '42,350',
        unit: 'Kg',
        trend: 12.8,
        trendDirection: 'up',
        status: 'healthy'
      },
      {
        id: 'pending-orders',
        label: 'Pending Orders',
        value: '28,750',
        unit: 'Kg',
        trend: 19.3,
        trendDirection: 'up',
        status: 'warning'
      },
      {
        id: 'total-stock-value',
        label: 'Total Stock Value',
        value: '₹ 2.85',
        unit: 'Cr',
        trend: 3.1,
        trendDirection: 'up',
        status: 'healthy'
      },
      {
        id: 'slow-moving-value',
        label: 'Slow-Moving Value',
        value: '₹ 45.2',
        unit: 'Lakhs',
        trend: 8.5,
        trendDirection: 'up',
        status: 'warning'
      },
      {
        id: 'non-moving-value',
        label: 'Non-Moving Value',
        value: '₹ 18.5',
        unit: 'Lakhs',
        trend: 2.3,
        trendDirection: 'down',
        status: 'critical'
      }
    ];
    return of(kpiData);
  }

  getPendingOrders(): Observable<PendingOrder[]> {
    const orders: PendingOrder[] = [
      { orderId: 'ORD-2024-001', customer: 'Arvind Mills', shade: 'Navy Blue', quantity: 2500, dueDate: '2024-01-28', status: 'urgent', daysRemaining: 3 },
      { orderId: 'ORD-2024-002', customer: 'Raymond Ltd', shade: 'Charcoal Grey', quantity: 1800, dueDate: '2024-01-30', status: 'pending', daysRemaining: 5 },
      { orderId: 'ORD-2024-003', customer: 'Welspun India', shade: 'Olive Green', quantity: 3200, dueDate: '2024-01-25', status: 'overdue', daysRemaining: -2 },
      { orderId: 'ORD-2024-004', customer: 'Vardhman Textiles', shade: 'Black', quantity: 1500, dueDate: '2024-02-05', status: 'pending', daysRemaining: 11 },
      { orderId: 'ORD-2024-005', customer: 'Trident Group', shade: 'White', quantity: 4200, dueDate: '2024-02-02', status: 'pending', daysRemaining: 8 },
      { orderId: 'ORD-2024-006', customer: 'Indo Count', shade: 'Beige', quantity: 2100, dueDate: '2024-01-27', status: 'urgent', daysRemaining: 2 }
    ];
    return of(orders);
  }

  getStockAgeing(): Observable<StockAgeing[]> {
    const stockAgeing: StockAgeing[] = [
      { itemCode: 'FG-001', shade: 'Navy Blue', quantity: 8500, ageInDays: 15, value: 425000, status: 'healthy' },
      { itemCode: 'FG-002', shade: 'Charcoal Grey', quantity: 6200, ageInDays: 45, value: 310000, status: 'warning' },
      { itemCode: 'FG-003', shade: 'Olive Green', quantity: 3800, ageInDays: 82, value: 190000, status: 'critical' },
      { itemCode: 'FG-004', shade: 'Black', quantity: 12500, ageInDays: 22, value: 625000, status: 'healthy' },
      { itemCode: 'FG-005', shade: 'White', quantity: 9800, ageInDays: 58, value: 490000, status: 'warning' },
      { itemCode: 'FG-006', shade: 'Burgundy', quantity: 2400, ageInDays: 95, value: 120000, status: 'critical' }
    ];
    return of(stockAgeing);
  }

  getNonMovingItems(): Observable<NonMovingItem[]> {
    const nonMoving: NonMovingItem[] = [
      { itemCode: 'FG-103', shade: 'Salmon Pink', quantity: 1200, lastMovement: '2023-10-15', daysStagnant: 102, blockedValue: 180000 },
      { itemCode: 'FG-087', shade: 'Mustard Yellow', quantity: 850, lastMovement: '2023-11-02', daysStagnant: 84, blockedValue: 127500 },
      { itemCode: 'FG-142', shade: 'Teal', quantity: 620, lastMovement: '2023-09-28', daysStagnant: 119, blockedValue: 93000 },
      { itemCode: 'FG-091', shade: 'Lavender', quantity: 980, lastMovement: '2023-10-22', daysStagnant: 95, blockedValue: 147000 },
      { itemCode: 'FG-156', shade: 'Coral', quantity: 540, lastMovement: '2023-11-10', daysStagnant: 76, blockedValue: 81000 }
    ];
    return of(nonMoving);
  }

  getFastMovingItems(): Observable<FastMovingItem[]> {
    const fastMoving: FastMovingItem[] = [
      { itemCode: 'FG-001', shade: 'Navy Blue', avgDispatch: 2500, currentStock: 8500, reorderLevel: 5000, status: 'adequate' },
      { itemCode: 'FG-004', shade: 'Black', avgDispatch: 3200, currentStock: 12500, reorderLevel: 6000, status: 'adequate' },
      { itemCode: 'FG-008', shade: 'White', avgDispatch: 2800, currentStock: 4200, reorderLevel: 5500, status: 'low' },
      { itemCode: 'FG-012', shade: 'Grey Melange', avgDispatch: 1800, currentStock: 1500, reorderLevel: 3500, status: 'critical' },
      { itemCode: 'FG-015', shade: 'Indigo', avgDispatch: 2100, currentStock: 6800, reorderLevel: 4000, status: 'adequate' }
    ];
    return of(fastMoving);
  }

  getAiInsights(): Observable<AiInsight[]> {
    const insights: AiInsight[] = [
      {
        id: 'insight-1',
        type: 'alert',
        icon: 'alert-triangle',
        message: 'Blocked in FG stock > 75 days',
        value: '₹ 18.5 Lakhs',
        timestamp: '2 mins ago'
      },
      {
        id: 'insight-2',
        type: 'warning',
        icon: 'clock',
        message: 'Shade Navy – Non-moving for 80 days',
        timestamp: '5 mins ago'
      },
      {
        id: 'insight-3',
        type: 'recommendation',
        icon: 'truck',
        message: 'Dispatch FG005 recommended – High demand predicted',
        timestamp: '12 mins ago'
      },
      {
        id: 'insight-4',
        type: 'info',
        icon: 'trending-up',
        message: 'Pending orders increased by 19% this week',
        timestamp: '25 mins ago'
      },
      {
        id: 'insight-5',
        type: 'recommendation',
        icon: 'package',
        message: 'Reorder Grey Melange – Stock below threshold',
        timestamp: '32 mins ago'
      },
      {
        id: 'insight-6',
        type: 'alert',
        icon: 'alert-circle',
        message: 'Order ORD-2024-003 is 2 days overdue',
        timestamp: '45 mins ago'
      }
    ];
    return of(insights);
  }

  getStockDispatchTrendData(): Observable<ChartData> {
    const data: ChartData = {
      labels: ['Jan 1', 'Jan 5', 'Jan 10', 'Jan 15', 'Jan 20', 'Jan 25'],
      datasets: [
        {
          label: 'FG Stock (Kg)',
          data: [118500, 122000, 119800, 125400, 121000, 124580],
          borderColor: '#0F172A',
          backgroundColor: 'rgba(15, 23, 42, 0.1)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Dispatch (Kg)',
          data: [35200, 38500, 41200, 39800, 44500, 42350],
          borderColor: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.4
        }
      ]
    };
    return of(data);
  }

  getStockAgeingChartData(): Observable<ChartData> {
    const data: ChartData = {
      labels: ['0-30 Days', '31-60 Days', '61-90 Days', '90+ Days'],
      datasets: [
        {
          label: 'Stock Quantity (Kg)',
          data: [52000, 38500, 22000, 12080],
          backgroundColor: ['#10B981', '#F59E0B', '#EF4444', '#7C3AED']
        }
      ]
    };
    return of(data);
  }
}
