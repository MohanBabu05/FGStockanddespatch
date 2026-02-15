import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Sparkles, AlertTriangle, Clock, Truck, TrendingUp, Package, AlertCircle, Info } from 'lucide-angular';
import { AiInsight } from '../../services/dashboard-data.service';

@Component({
  selector: 'app-ai-panel',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './ai-panel.component.html',
  styleUrl: './ai-panel.component.scss'
})
export class AiPanelComponent {
  @Input() insights: AiInsight[] = [];

  readonly SparklesIcon = Sparkles;
  readonly AlertTriangleIcon = AlertTriangle;
  readonly ClockIcon = Clock;
  readonly TruckIcon = Truck;
  readonly TrendingUpIcon = TrendingUp;
  readonly PackageIcon = Package;
  readonly AlertCircleIcon = AlertCircle;
  readonly InfoIcon = Info;

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
}
