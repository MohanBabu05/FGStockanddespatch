# FG Stock & Dispatch Optimizer – Kalsofte Intelligence

## Product Requirements Document (PRD)

### Last Updated: Jan 2026

---

## Original Problem Statement
Design and generate a modern ERP-style Angular dashboard UI for a textile industry application that visualizes Finished Goods (FG) stock, dispatch performance, pending orders, and AI-generated insights.

---

## User Choices & Decisions
- **Framework**: Angular (standalone project)
- **Charts**: Chart.js integration via ng2-charts
- **Data Layer**: JSON data service structure (mock data, ready for backend integration)
- **Theme**: ERP Professional (Deep Blue, White, Light Grey)
- **Responsive**: Desktop + Tablet (768px+)

---

## Architecture

### Tech Stack
- **Frontend**: Angular 21.x (standalone components)
- **Styling**: SCSS with CSS variables
- **Charts**: Chart.js with ng2-charts wrapper
- **Icons**: Lucide Angular
- **Typography**: Manrope (headings), DM Sans (body), JetBrains Mono (data)

### Project Structure
```
/app/fg-stock-dashboard/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/
│   │   │   ├── kpi-card/
│   │   │   ├── charts/
│   │   │   │   ├── line-chart/
│   │   │   │   └── bar-chart/
│   │   │   ├── data-grid/
│   │   │   └── ai-panel/
│   │   ├── dashboard/
│   │   ├── services/
│   │   │   └── dashboard-data.service.ts
│   │   ├── app.ts
│   │   └── app.config.ts
│   ├── styles.scss
│   └── main.ts
└── angular.json
```

---

## What's Been Implemented ✅

### Core Features (Jan 2026)
1. **Header Component**
   - Logo with Kalsofte Intelligence branding
   - Title: "Finished Goods (FG) Stock & Dispatch Optimizer"
   - Date range filters (From/To with date pickers)
   - Apply button with filter functionality
   - Last updated timestamp
   - Action buttons (Refresh, Notifications, Settings)

2. **KPI Summary Strip (6 Cards)**
   - Total FG Stock (Kg)
   - Total Dispatch (Kg)
   - Pending Orders (Kg)
   - Total Stock Value (₹ Cr)
   - Slow-Moving Value (₹ Lakhs)
   - Non-Moving Value (₹ Lakhs)
   - Each card shows: value, unit, trend percentage, status indicator

3. **Charts Section**
   - Stock vs Dispatch Trend (Line Chart)
   - Stock Ageing Distribution (Bar Chart)
   - Interactive tooltips, responsive sizing

4. **Data Grids**
   - Pending Orders (Order ID, Customer, Shade, Qty, Due Date, Status)
   - FG Stock Ageing (Item Code, Shade, Qty, Age, Value, Status)
   - Non-Moving Items (Item Code, Shade, Qty, Last Movement, Stagnant Days, Blocked Value)
   - Fast-Moving Items (Item Code, Shade, Avg Dispatch, Current Stock, Reorder Level, Status)

5. **AI Insights Panel**
   - Real-time insights with Live indicator
   - Alert/Warning/Recommendation/Info cards
   - Icons, timestamps, and value highlights
   - View All Insights button

6. **Design System**
   - ERP Professional Theme
   - Status colors: Healthy (Green), Warning (Amber), Critical (Red)
   - Responsive layout (Desktop + Tablet)
   - Micro-animations on hover states
   - Scrollable data grids

---

## Data Service Interface
The `DashboardDataService` provides Observable-based methods for:
- `getKpiData()` - KPI card data
- `getPendingOrders()` - Pending orders list
- `getStockAgeing()` - Stock ageing data
- `getNonMovingItems()` - Non-moving inventory
- `getFastMovingItems()` - Fast-moving inventory
- `getAiInsights()` - AI-generated insights
- `getStockDispatchTrendData()` - Line chart data
- `getStockAgeingChartData()` - Bar chart data

---

## Prioritized Backlog

### P0 (Critical - Future Backend Integration)
- [ ] Connect to real backend API
- [ ] Implement date filter API calls
- [ ] Real-time data refresh

### P1 (High Priority)
- [ ] Export data to Excel/PDF
- [ ] Drill-down on KPI cards
- [ ] Order details modal
- [ ] Stock item detail view

### P2 (Medium Priority)
- [ ] Dashboard customization (drag & drop widgets)
- [ ] User preferences storage
- [ ] Dark mode toggle
- [ ] Multi-language support

### Future Enhancements
- [ ] Push notifications for alerts
- [ ] Advanced AI recommendations engine
- [ ] Predictive analytics charts
- [ ] Mobile responsive layout

---

## Next Action Items
1. Backend API development for real data integration
2. Add data export functionality
3. Implement drill-down views for KPIs and insights
4. Add user authentication
