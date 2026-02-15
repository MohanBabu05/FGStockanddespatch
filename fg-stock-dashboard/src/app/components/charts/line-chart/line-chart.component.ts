import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { ChartData } from '../../services/dashboard-data.service';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnInit {
  @Input() chartData!: ChartData;
  @Input() title: string = 'Chart';

  public lineChartType: ChartType = 'line';
  public lineChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index'
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            family: "'DM Sans', sans-serif",
            size: 12
          }
        }
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
        displayColors: true
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
          color: '#94A3B8'
        }
      },
      y: {
        beginAtZero: false,
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
      this.lineChartData = {
        labels: this.chartData.labels,
        datasets: this.chartData.datasets.map(ds => ({
          ...ds,
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 2
        }))
      };
    }
  }
}
