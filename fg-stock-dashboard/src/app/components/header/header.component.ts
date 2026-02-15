import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Calendar, Search, Bell, Settings, RefreshCw } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() dateFilterApplied = new EventEmitter<{ fromDate: string; toDate: string }>();

  fromDate: string = this.getDefaultFromDate();
  toDate: string = this.getDefaultToDate();
  lastUpdated: string = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  // Lucide icons
  readonly CalendarIcon = Calendar;
  readonly SearchIcon = Search;
  readonly BellIcon = Bell;
  readonly SettingsIcon = Settings;
  readonly RefreshIcon = RefreshCw;

  private getDefaultFromDate(): string {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split('T')[0];
  }

  private getDefaultToDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  applyFilter(): void {
    this.dateFilterApplied.emit({ fromDate: this.fromDate, toDate: this.toDate });
    this.lastUpdated = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  }

  refreshData(): void {
    this.lastUpdated = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  }
}
