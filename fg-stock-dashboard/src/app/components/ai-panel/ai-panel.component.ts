import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Sparkles, AlertTriangle, Clock, Truck, TrendingUp, Package, AlertCircle, Info, Zap } from 'lucide-angular';
import { AiInsight, NonMovingItem, FastMovingItem } from '../../services/dashboard-data.service';

@Component({
  selector: 'app-ai-panel',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './ai-panel.component.html',
  styleUrl: './ai-panel.component.scss'
})
export class AiPanelComponent implements OnChanges {
  @Input() insights: AiInsight[] = [];
  @Input() nonMovingItems: NonMovingItem[] = [];
  @Input() fastMovingItems: FastMovingItem[] = [];
  @Input() isConnected: boolean = false;

  newInsightId: string = '';

  readonly SparklesIcon = Sparkles;
  readonly AlertTriangleIcon = AlertTriangle;
  readonly ClockIcon = Clock;
  readonly TruckIcon = Truck;
  readonly TrendingUpIcon = TrendingUp;
  readonly PackageIcon = Package;
  readonly AlertCircleIcon = AlertCircle;
  readonly InfoIcon = Info;
  readonly ZapIcon = Zap;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['insights'] && !changes['insights'].firstChange) {
      const prev = changes['insights'].previousValue as AiInsight[];
      const curr = changes['insights'].currentValue as AiInsight[];
      
      if (curr && prev && curr.length > 0 && curr[0].id !== prev[0]?.id) {
        this.newInsightId = curr[0].id;
        setTimeout(() => {
          this.newInsightId = '';
        }, 3000);
      }
    }
  }

  getIconComponent(iconName: string) {
    const iconMap: Record<string, any> = {
      'alert-triangle': this.AlertTriangleIcon,
      'clock': this.ClockIcon,
      'truck': this.TruckIcon,
      'trending-up': this.TrendingUpIcon,
      'package': this.PackageIcon,
      'alert-circle': this.AlertCircleIcon,
      'info': this.InfoIcon
    };
    return iconMap[iconName] || this.InfoIcon;
  }

  getInsightClass(type: string): string {
    return `insight--${type}`;
  }

  isNewInsight(id: string): boolean {
    return this.newInsightId === id;
  }

  getStatusClass(item: NonMovingItem | FastMovingItem): string {
    if ('daysStagnant' in item) {
      if (item.daysStagnant > 100) return 'status--critical';
      if (item.daysStagnant > 75) return 'status--warning';
      return 'status--healthy';
    }
    if ('status' in item) {
      return `status--${item.status === 'adequate' ? 'healthy' : item.status}`;
    }
    return '';
  }

  formatCurrency(value: number): string {
    if (value >= 100000) {
      return '₹' + (value / 100000).toFixed(1) + 'L';
    }
    return '₹' + value.toLocaleString('en-IN');
  }

  trackByInsight(index: number, insight: AiInsight): string {
    return insight.id;
  }
}
