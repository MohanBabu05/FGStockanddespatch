import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, Observable, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { KpiData, AiInsight } from './dashboard-data.service';

export interface WebSocketMessage {
  type: 'kpi_update' | 'insight_update' | 'connection_status';
  payload: any;
  timestamp: string;
}

export interface KpiUpdate {
  kpiId: string;
  newValue: string;
  previousValue: string;
  trend: number;
  trendDirection: 'up' | 'down' | 'neutral';
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService implements OnDestroy {
  private destroy$ = new Subject<void>();
  private connectionStatus$ = new BehaviorSubject<'connected' | 'disconnected' | 'connecting'>('disconnected');
  private kpiUpdates$ = new Subject<KpiUpdate>();
  private insightUpdates$ = new Subject<AiInsight>();
  private allInsights$ = new BehaviorSubject<AiInsight[]>([]);

  // Simulated WebSocket connection (structured for SignalR compatibility)
  private mockConnection: any = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  constructor() {
    this.initializeInsights();
  }

  private initializeInsights(): void {
    const initialInsights: AiInsight[] = [
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
    this.allInsights$.next(initialInsights);
  }

  /**
   * Connect to WebSocket server
   * Structured for future SignalR integration:
   * - Replace mock with: this.hubConnection = new signalR.HubConnectionBuilder().withUrl('/hubs/dashboard').build();
   */
  connect(): void {
    if (this.connectionStatus$.value === 'connected') return;

    this.connectionStatus$.next('connecting');
    console.log('[WebSocket] Connecting to dashboard hub...');

    // Simulate connection delay (replace with actual SignalR connection)
    setTimeout(() => {
      this.mockConnection = true;
      this.connectionStatus$.next('connected');
      this.reconnectAttempts = 0;
      console.log('[WebSocket] Connected successfully');

      // Start simulated real-time updates
      this.startMockUpdates();
    }, 1000);
  }

  /**
   * Disconnect from WebSocket server
   */
  disconnect(): void {
    if (this.mockConnection) {
      this.mockConnection = null;
      this.connectionStatus$.next('disconnected');
      console.log('[WebSocket] Disconnected');
    }
  }

  /**
   * Get connection status observable
   */
  getConnectionStatus(): Observable<'connected' | 'disconnected' | 'connecting'> {
    return this.connectionStatus$.asObservable();
  }

  /**
   * Get KPI updates stream
   */
  getKpiUpdates(): Observable<KpiUpdate> {
    return this.kpiUpdates$.asObservable();
  }

  /**
   * Get new insight updates stream
   */
  getInsightUpdates(): Observable<AiInsight> {
    return this.insightUpdates$.asObservable();
  }

  /**
   * Get all insights (for initial load and updates)
   */
  getAllInsights(): Observable<AiInsight[]> {
    return this.allInsights$.asObservable();
  }

  /**
   * Simulated real-time updates (replace with SignalR event handlers)
   * SignalR equivalent:
   * this.hubConnection.on('ReceiveKpiUpdate', (update) => this.kpiUpdates$.next(update));
   * this.hubConnection.on('ReceiveInsight', (insight) => this.handleNewInsight(insight));
   */
  private startMockUpdates(): void {
    // KPI Updates every 15-30 seconds
    interval(20000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.connectionStatus$.value === 'connected') {
          this.simulateKpiUpdate();
        }
      });

    // New Insights every 25-45 seconds
    interval(30000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.connectionStatus$.value === 'connected') {
          this.simulateNewInsight();
        }
      });
  }

  private simulateKpiUpdate(): void {
    const kpiIds = ['total-fg-stock', 'total-dispatch', 'pending-orders', 'slow-moving-value', 'non-moving-value'];
    const randomKpi = kpiIds[Math.floor(Math.random() * kpiIds.length)];
    
    const updates: Record<string, () => KpiUpdate> = {
      'total-fg-stock': () => ({
        kpiId: 'total-fg-stock',
        newValue: this.randomBetween(120000, 130000).toLocaleString('en-IN'),
        previousValue: '1,24,580',
        trend: this.randomBetween(-3, 8),
        trendDirection: Math.random() > 0.5 ? 'up' : 'down'
      }),
      'total-dispatch': () => ({
        kpiId: 'total-dispatch',
        newValue: this.randomBetween(40000, 50000).toLocaleString('en-IN'),
        previousValue: '42,350',
        trend: this.randomBetween(5, 15),
        trendDirection: 'up'
      }),
      'pending-orders': () => ({
        kpiId: 'pending-orders',
        newValue: this.randomBetween(25000, 35000).toLocaleString('en-IN'),
        previousValue: '28,750',
        trend: this.randomBetween(-5, 25),
        trendDirection: Math.random() > 0.4 ? 'up' : 'down'
      }),
      'slow-moving-value': () => ({
        kpiId: 'slow-moving-value',
        newValue: (this.randomBetween(40, 55)).toFixed(1),
        previousValue: '45.2',
        trend: this.randomBetween(-2, 12),
        trendDirection: Math.random() > 0.6 ? 'up' : 'down'
      }),
      'non-moving-value': () => ({
        kpiId: 'non-moving-value',
        newValue: (this.randomBetween(15, 22)).toFixed(1),
        previousValue: '18.5',
        trend: this.randomBetween(-5, 5),
        trendDirection: Math.random() > 0.5 ? 'up' : 'down'
      })
    };

    const update = updates[randomKpi]();
    console.log('[WebSocket] KPI Update received:', update);
    this.kpiUpdates$.next(update);
  }

  private simulateNewInsight(): void {
    const insightTemplates = [
      { type: 'alert' as const, icon: 'alert-triangle', messages: [
        { message: 'Working capital blockage detected', value: '₹ 22.3 Lakhs' },
        { message: 'Slow-moving stock threshold breach', value: '₹ 15.8 Lakhs' },
        { message: 'FG ageing > 90 days critical level', value: '12,500 Kg' }
      ]},
      { type: 'warning' as const, icon: 'clock', messages: [
        { message: 'Shade Burgundy – Approaching non-moving status' },
        { message: 'Order ORD-2024-007 due in 2 days' },
        { message: 'Stock rotation declining for White shade' }
      ]},
      { type: 'recommendation' as const, icon: 'truck', messages: [
        { message: 'Dispatch FG-012 recommended – Urgent order match' },
        { message: 'Prioritize Navy Blue dispatch – High margin' },
        { message: 'Bundle slow-moving items for clearance sale' }
      ]},
      { type: 'info' as const, icon: 'trending-up', messages: [
        { message: 'Dispatch efficiency improved by 8% today' },
        { message: 'New order received from Arvind Mills' },
        { message: 'Stock replenishment completed for Black shade' }
      ]}
    ];

    const template = insightTemplates[Math.floor(Math.random() * insightTemplates.length)];
    const messageData = template.messages[Math.floor(Math.random() * template.messages.length)];

    const newInsight: AiInsight = {
      id: `insight-${Date.now()}`,
      type: template.type,
      icon: template.icon,
      message: messageData.message,
      value: (messageData as any).value,
      timestamp: 'Just now'
    };

    console.log('[WebSocket] New Insight received:', newInsight);
    
    // Add to beginning of insights array
    const currentInsights = this.allInsights$.value;
    const updatedInsights = [newInsight, ...currentInsights.slice(0, 9)]; // Keep max 10 insights
    this.allInsights$.next(updatedInsights);
    this.insightUpdates$.next(newInsight);
  }

  private randomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.disconnect();
  }
}
