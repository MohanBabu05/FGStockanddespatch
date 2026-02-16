import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, TrendingUp, TrendingDown, Minus } from 'lucide-angular';
import { KpiData } from '../../services/dashboard-data.service';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.scss'
})
export class KpiCardComponent implements OnChanges {
  @Input() kpi!: KpiData;
  @Input() isUpdating: boolean = false;

  hasRecentUpdate: boolean = false;
  previousValue: string = '';

  readonly TrendingUpIcon = TrendingUp;
  readonly TrendingDownIcon = TrendingDown;
  readonly MinusIcon = Minus;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['kpi'] && !changes['kpi'].firstChange) {
      const prev = changes['kpi'].previousValue;
      const curr = changes['kpi'].currentValue;
      
      if (prev && curr && prev.value !== curr.value) {
        this.previousValue = prev.value;
        this.hasRecentUpdate = true;
        
        // Remove highlight after animation
        setTimeout(() => {
          this.hasRecentUpdate = false;
        }, 2000);
      }
    }
  }

  getTrendIcon() {
    switch (this.kpi.trendDirection) {
      case 'up': return this.TrendingUpIcon;
      case 'down': return this.TrendingDownIcon;
      default: return this.MinusIcon;
    }
  }

  getTrendClass(): string {
    if (!this.kpi.trendDirection) return '';
    
    // For certain KPIs, up is bad
    const negativeUpKpis = ['pending-orders', 'slow-moving-value', 'non-moving-value'];
    const isNegativeKpi = negativeUpKpis.includes(this.kpi.id);
    
    if (this.kpi.trendDirection === 'up') {
      return isNegativeKpi ? 'trend--negative' : 'trend--positive';
    } else if (this.kpi.trendDirection === 'down') {
      return isNegativeKpi ? 'trend--positive' : 'trend--negative';
    }
    return 'trend--neutral';
  }

  getStatusClass(): string {
    return this.kpi.status ? `status--${this.kpi.status}` : '';
  }
}
