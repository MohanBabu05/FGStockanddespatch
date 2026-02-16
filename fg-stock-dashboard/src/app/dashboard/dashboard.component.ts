import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { HeaderComponent } from '../components/header/header.component';
import { KpiCardComponent } from '../components/kpi-card/kpi-card.component';
import { LineChartComponent } from '../components/charts/line-chart/line-chart.component';
import { BarChartComponent } from '../components/charts/bar-chart/bar-chart.component';
import { DataGridComponent } from '../components/data-grid/data-grid.component';
import { AiPanelComponent } from '../components/ai-panel/ai-panel.component';
import { 
  DashboardDataService, 
  KpiData, 
  PendingOrder, 
  StockAgeing, 
  NonMovingItem, 
  FastMovingItem, 
  AiInsight,
  ChartData 
} from '../services/dashboard-data.service';
import { WebSocketService, KpiUpdate } from '../services/websocket.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    KpiCardComponent,
    LineChartComponent,
    BarChartComponent,
    DataGridComponent,
    AiPanelComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  kpiData: KpiData[] = [];
  pendingOrders: PendingOrder[] = [];
  stockAgeing: StockAgeing[] = [];
  nonMovingItems: NonMovingItem[] = [];
  fastMovingItems: FastMovingItem[] = [];
  aiInsights: AiInsight[] = [];
  stockDispatchTrendData!: ChartData;
  stockAgeingChartData!: ChartData;
  
  isConnected: boolean = false;
  notificationCount: number = 0;
  updatingKpis: Set<string> = new Set();

  private subscriptions: Subscription[] = [];

  constructor(
    private dataService: DashboardDataService,
    private wsService: WebSocketService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.initializeWebSocket();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.wsService.disconnect();
  }

  private initializeWebSocket(): void {
    // Connection status
    const statusSub = this.wsService.getConnectionStatus().subscribe(status => {
      this.isConnected = status === 'connected';
      this.cdr.detectChanges();
    });
    this.subscriptions.push(statusSub);

    // KPI Updates
    const kpiSub = this.wsService.getKpiUpdates().subscribe((update: KpiUpdate) => {
      this.handleKpiUpdate(update);
    });
    this.subscriptions.push(kpiSub);

    // AI Insights Updates
    const insightsSub = this.wsService.getAllInsights().subscribe((insights: AiInsight[]) => {
      const hadNewInsight = this.aiInsights.length > 0 && insights[0]?.id !== this.aiInsights[0]?.id;
      this.aiInsights = insights;
      
      if (hadNewInsight) {
        this.notificationCount++;
      }
      this.cdr.detectChanges();
    });
    this.subscriptions.push(insightsSub);

    // Connect to WebSocket
    this.wsService.connect();
  }

  private handleKpiUpdate(update: KpiUpdate): void {
    const kpiIndex = this.kpiData.findIndex(k => k.id === update.kpiId);
    if (kpiIndex !== -1) {
      // Create new KPI object to trigger change detection
      const updatedKpi = { ...this.kpiData[kpiIndex] };
      updatedKpi.value = update.newValue;
      updatedKpi.trend = Math.abs(update.trend);
      updatedKpi.trendDirection = update.trendDirection;
      
      // Update status based on KPI type and trend
      if (['pending-orders', 'slow-moving-value', 'non-moving-value'].includes(update.kpiId)) {
        updatedKpi.status = update.trendDirection === 'up' ? 'warning' : 'healthy';
      }
      
      // Create new array to trigger change detection
      this.kpiData = [
        ...this.kpiData.slice(0, kpiIndex),
        updatedKpi,
        ...this.kpiData.slice(kpiIndex + 1)
      ];
      
      this.cdr.detectChanges();
    }
  }

  loadDashboardData(): void {
    this.dataService.getKpiData().subscribe(data => {
      this.kpiData = data;
      this.cdr.detectChanges();
    });
    
    this.dataService.getPendingOrders().subscribe(data => this.pendingOrders = data);
    this.dataService.getStockAgeing().subscribe(data => this.stockAgeing = data);
    this.dataService.getNonMovingItems().subscribe(data => this.nonMovingItems = data);
    this.dataService.getFastMovingItems().subscribe(data => this.fastMovingItems = data);
    this.dataService.getStockDispatchTrendData().subscribe(data => this.stockDispatchTrendData = data);
    this.dataService.getStockAgeingChartData().subscribe(data => this.stockAgeingChartData = data);
  }

  onDateFilterApplied(filter: { fromDate: string; toDate: string }): void {
    console.log('Date filter applied:', filter);
    // In a real application, this would trigger API calls with the date range
    this.loadDashboardData();
  }

  onRefreshRequested(): void {
    this.loadDashboardData();
    this.notificationCount = 0;
  }

  trackByKpi(index: number, kpi: KpiData): string {
    return kpi.id;
  }
}
