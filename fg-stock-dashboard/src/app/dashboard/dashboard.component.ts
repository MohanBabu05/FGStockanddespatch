import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
export class DashboardComponent implements OnInit {
  kpiData: KpiData[] = [];
  pendingOrders: PendingOrder[] = [];
  stockAgeing: StockAgeing[] = [];
  nonMovingItems: NonMovingItem[] = [];
  fastMovingItems: FastMovingItem[] = [];
  aiInsights: AiInsight[] = [];
  stockDispatchTrendData!: ChartData;
  stockAgeingChartData!: ChartData;

  constructor(private dataService: DashboardDataService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.dataService.getKpiData().subscribe(data => this.kpiData = data);
    this.dataService.getPendingOrders().subscribe(data => this.pendingOrders = data);
    this.dataService.getStockAgeing().subscribe(data => this.stockAgeing = data);
    this.dataService.getNonMovingItems().subscribe(data => this.nonMovingItems = data);
    this.dataService.getFastMovingItems().subscribe(data => this.fastMovingItems = data);
    this.dataService.getAiInsights().subscribe(data => this.aiInsights = data);
    this.dataService.getStockDispatchTrendData().subscribe(data => this.stockDispatchTrendData = data);
    this.dataService.getStockAgeingChartData().subscribe(data => this.stockAgeingChartData = data);
  }

  onDateFilterApplied(filter: { fromDate: string; toDate: string }): void {
    console.log('Date filter applied:', filter);
    // In a real application, this would trigger API calls with the date range
    this.loadDashboardData();
  }
}
