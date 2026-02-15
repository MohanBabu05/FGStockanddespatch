import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { ChartData } from '../../services/dashboard-data.service';

interface DatasetInput {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor?: string | string[];
  fill?: boolean;
  tension?: number;
}

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements OnInit {
  @Input() chartData!: ChartData;
  @Input() title: string = 'Chart';

  public barChartType: ChartType = 'bar';
  public barChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: []
  };

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#0F172A',
        titleFont: {
          family: "'Manrope', sans-serif",
          size: 13,
          weight: 600
        },
        bodyFont: {
          family: "'JetBrains Mono', monospace",
          size: 12
        },
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            const value = context.parsed?.y ?? 0;
            return value.toLocaleString() + ' Kg';
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: "'DM Sans', sans-serif",
            size: 11
          },
          color: '#64748B'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#F1F5F9'
        },
        ticks: {
          font: {
            family: "'JetBrains Mono', monospace",
            size: 11
          },
          color: '#64748B',
          callback: function(value) {
            return value.toLocaleString();
          }
        }
      }
    }
  };

  ngOnInit(): void {
    if (this.chartData) {
      this.barChartData = {
        labels: this.chartData.labels,
        datasets: this.chartData.datasets.map((ds: DatasetInput) => ({
          ...ds,
          borderRadius: 6,
          borderSkipped: false,
          maxBarThickness: 50
        }))
      };
    }
  }
}
