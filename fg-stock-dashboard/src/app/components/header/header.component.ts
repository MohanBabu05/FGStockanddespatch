import { Component, Output, EventEmitter, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Calendar, Bell, Settings, RefreshCw, Filter, AlertCircle } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() dateFilterApplied = new EventEmitter<{ fromDate: string; toDate: string }>();
  @Output() refreshRequested = new EventEmitter<void>();
  @Input() notificationCount: number = 3;

  fromDate: string = this.getDefaultFromDate();
  toDate: string = this.getDefaultToDate();
  lastUpdated: string = this.formatTime(new Date());
  isDateValid: boolean = true;
  isConnected: boolean = false;
  isConnecting: boolean = false;

  private subscriptions: Subscription[] = [];

  // Lucide icons
  readonly CalendarIcon = Calendar;
  readonly BellIcon = Bell;
  readonly SettingsIcon = Settings;
  readonly RefreshIcon = RefreshCw;
  readonly FilterIcon = Filter;
  readonly AlertCircleIcon = AlertCircle;

  constructor(private wsService: WebSocketService) {}

  ngOnInit(): void {
    const statusSub = this.wsService.getConnectionStatus().subscribe(status => {
      this.isConnected = status === 'connected';
      this.isConnecting = status === 'connecting';
    });
    this.subscriptions.push(statusSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private getDefaultFromDate(): string {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split('T')[0];
  }

  private getDefaultToDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  private formatTime(date: Date): string {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  }

  validateDates(): void {
    if (this.fromDate && this.toDate) {
      this.isDateValid = new Date(this.fromDate) <= new Date(this.toDate);
    } else {
      this.isDateValid = true;
    }
  }

  applyFilter(): void {
    if (this.isDateValid) {
      this.dateFilterApplied.emit({ fromDate: this.fromDate, toDate: this.toDate });
      this.lastUpdated = this.formatTime(new Date());
    }
  }

  resetFilters(): void {
    this.fromDate = this.getDefaultFromDate();
    this.toDate = this.getDefaultToDate();
    this.isDateValid = true;
    this.applyFilter();
  }

  refreshData(): void {
    this.lastUpdated = this.formatTime(new Date());
    this.refreshRequested.emit();
  }
}
