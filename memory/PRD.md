# FG Stock & Dispatch Optimizer – Kalsofte Intelligence

## Product Requirements Document (PRD)

### Last Updated: Feb 2026 (Layout Refinement)

---

## Original Problem Statement
Design and generate a modern ERP-style Angular dashboard UI for a textile industry application that visualizes Finished Goods (FG) stock, dispatch performance, pending orders, and AI-generated insights with real-time WebSocket updates.

---

## User Choices & Decisions
- **Framework**: Angular (standalone project)
- **Charts**: Chart.js integration via ng2-charts
- **Data Layer**: JSON data service structure (mock data, ready for backend integration)
- **Theme**: ERP Professional (Deep Blue, White, Light Grey)
- **Responsive**: Desktop + Tablet (768px+)
- **Real-time**: WebSocket-based updates (SignalR compatible architecture)

---

## Architecture

### Tech Stack
- **Frontend**: Angular 21.x (standalone components)
- **Styling**: SCSS with CSS variables
- **Charts**: Chart.js with ng2-charts wrapper
- **Icons**: Lucide Angular
- **Typography**: Manrope (headings), DM Sans (body), JetBrains Mono (data)
- **Real-time**: WebSocket service (SignalR-ready architecture)

### Project Structure
```
/app/fg-stock-dashboard/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/          # Header + Filter toolbar
│   │   │   ├── kpi-card/        # KPI cards with real-time updates
│   │   │   ├── charts/
│   │   │   │   ├── line-chart/
│   │   │   │   └── bar-chart/
│   │   │   ├── data-grid/       # Data tables
│   │   │   └── ai-panel/        # AI sidebar with mini grids
│   │   ├── dashboard/           # Main dashboard container
│   │   ├── services/
│   │   │   ├── dashboard-data.service.ts
│   │   │   └── websocket.service.ts  # Real-time updates
│   │   ├── app.ts
│   │   └── app.config.ts
│   ├── styles.scss
│   └── main.ts
└── angular.json
```

---

## What's Been Implemented ✅

### Phase 1: Core Dashboard (Jan 2026)
1. **Header Component**
   - Logo with Kalsofte Intelligence branding
   - Title: "FG Stock & Dispatch Optimizer"
   - Date range filters with proper date pickers
   - Apply/Reset buttons with date validation
   - Action buttons (Refresh, Notifications, Settings)
   - Live connection status indicator

2. **KPI Summary Strip (6 Cards)**
   - Total FG Stock (Kg)
   - Total Dispatch (Kg)
   - Pending Orders (Kg)
   - Total Stock Value (₹ Cr)
   - Slow-Moving Value (₹ Lakhs)
   - Non-Moving Value (₹ Lakhs)
   - Real-time update animations

3. **Charts Section**
   - Stock vs Dispatch Trend (Line Chart)
   - Stock Ageing Distribution (Bar Chart)

4. **Data Grids**
   - Pending Orders
   - FG Stock Ageing

### Phase 2: Real-Time & UI Refinement (Feb 2026)
1. **WebSocket Service (SignalR Compatible)**
   - Connection status management
   - KPI real-time updates (every 20s)
   - AI Insight real-time updates (every 30s)
   - Smooth transition animations
   - Non-intrusive update indicators

2. **AI Insights Sidebar**
   - Real-time insights with Live badge
   - Insight cards with type-based styling (alert/warning/recommendation/info)
   - Non-Moving Items mini grid (4 items)
   - Fast-Moving Items mini grid (4 items)
   - "View All Analytics" button

3. **Date Filter Improvements**
   - Proper date picker controls (type="date")
   - Validation: From date ≤ To date
   - Inline error messages
   - Reset to default functionality

4. **Update Animations**
   - Subtle glow effect on KPI updates
   - Slide-in animation for new insights
   - "NEW" badge on fresh insights
   - "was [previous_value]" indicator

---

## WebSocket Architecture (SignalR Ready)

### Current Implementation (Mock)
```typescript
// Simulated updates - replace with SignalR
interval(20000).subscribe(() => this.simulateKpiUpdate());
interval(30000).subscribe(() => this.simulateNewInsight());
```

### SignalR Integration (Future)
```typescript
// Replace mock with:
this.hubConnection = new signalR.HubConnectionBuilder()
  .withUrl('/hubs/dashboard')
  .build();

this.hubConnection.on('ReceiveKpiUpdate', (update) => {
  this.kpiUpdates$.next(update);
});

this.hubConnection.on('ReceiveInsight', (insight) => {
  this.handleNewInsight(insight);
});
```

---

## Prioritized Backlog

### P0 (Critical - Backend Integration)
- [ ] Connect WebSocket to ASP.NET Core SignalR hub
- [ ] Real backend API for dashboard data
- [ ] Implement date filter API calls

### P1 (High Priority)
- [ ] Export data to Excel/PDF
- [ ] Drill-down on KPI cards
- [ ] Order details modal
- [ ] Stock item detail view
- [ ] Push notifications for critical alerts

### P2 (Medium Priority)
- [ ] Dashboard customization (drag & drop widgets)
- [ ] User preferences storage
- [ ] Dark mode toggle
- [ ] Multi-language support

### Future Enhancements
- [ ] Predictive analytics charts
- [ ] Mobile responsive layout
- [ ] Advanced AI recommendations engine
- [ ] Historical trend analysis

---

## Next Action Items
1. ASP.NET Core SignalR hub development
2. Backend API integration for real data
3. Implement alert/notification system
4. Add data export functionality
