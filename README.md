# AeroPredict - Predictive Analytics for Aircraft Maintenance

A sophisticated predictive analytics platform for aircraft maintenance that leverages AI-powered insights, real-time monitoring, and automated workflows to optimize maintenance operations and reduce unplanned downtime.

## 🌟 Overview

AeroPredict is a comprehensive web application designed to revolutionize aircraft maintenance through predictive analytics. The platform uses machine learning models to predict potential component failures, monitors real-time sensor data, manages maintenance alerts, and provides automated runbook procedures for maintenance operations.

## ✨ Key Features

### 📊 Dashboard Overview
- **Real-time KPI Monitoring**: Track critical metrics including Mean Time To Repair (MTTR), unplanned downtime, and active predictions
- **Interactive Charts**: Visualize trends in MTTR and downtime over customizable time periods
- **Active Predictions Display**: View AI-powered failure predictions with severity levels and precision scores

### 🔮 Predictive Analytics
- **ML-Powered Failure Prediction**: Advanced anomaly detection with 89% precision score
- **Risk Assessment**: Categorize components into high, medium, and low risk levels
- **Failure Timeline**: Visualize predicted failure times for proactive maintenance planning
- **Model Performance Metrics**: Monitor precision vs anomaly score relationships

### 🚨 Alert Management
- **Multi-Level Alerts**: Critical, high, medium, and low severity alerts
- **Alert Filtering**: Search and filter by status (active, acknowledged, resolved)
- **Alert Workflow**: Acknowledge and resolve alerts with detailed tracking
- **Aircraft Integration**: View alerts in context of specific aircraft and components

### 📡 Sensor Monitoring
- **Real-time Data**: Monitor temperature, pressure, and vibration metrics
- **Anomaly Detection**: Automatic flagging of abnormal sensor readings
- **Historical Trends**: View time-series data for individual sensors
- **Multi-Parameter Tracking**: Simultaneous monitoring of multiple sensor parameters

### 📖 Automated Runbooks
- **Step-by-Step Procedures**: Detailed maintenance procedures for different component types
- **Execution Tracking**: Monitor progress through runbook steps
- **Success Metrics**: View success rates and estimated completion times
- **Action Automation**: Execute individual steps or entire procedures

## 🛠 Technology Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### UI Components
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Lucide React](https://lucide.dev/)** - Modern icon library
- **[Recharts](https://recharts.org/)** - Data visualization library

### Development Tools
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[ESLint](https://eslint.org/)** - Code linting and quality
- **[Vercel Analytics](https://vercel.com/analytics)** - Performance monitoring

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **pnpm** 8.x or higher (or npm/yarn)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/johaankjis/Predictive-Analytics-for-Aircraft-Maintenance.git
cd Predictive-Analytics-for-Aircraft-Maintenance
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
pnpm build
pnpm start
```

## 📁 Project Structure

```
.
├── app/                    # Next.js App Router pages
│   ├── alerts/            # Alert management page
│   ├── analytics/         # Predictive analytics page
│   ├── runbooks/          # Automated runbooks page
│   ├── sensors/           # Sensor monitoring page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Dashboard homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── nav-sidebar.tsx   # Navigation sidebar
│   ├── stat-card.tsx     # Statistics card component
│   └── theme-provider.tsx # Theme configuration
├── lib/                   # Utility functions and data
│   ├── mock-data.ts      # Mock data for demonstration
│   ├── types.ts          # TypeScript type definitions
│   └── utils.ts          # Utility functions
├── hooks/                 # Custom React hooks
├── public/               # Static assets
├── styles/               # Additional stylesheets
├── next.config.mjs       # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies
```

## 📊 Data Models

### Core Entities

- **SensorReading**: Real-time sensor data with anomaly detection
- **MaintenancePrediction**: AI-generated failure predictions
- **Alert**: Maintenance alerts with severity and status tracking
- **Runbook**: Automated maintenance procedures
- **Aircraft**: Aircraft fleet information
- **MaintenanceKPI**: Key performance indicators for maintenance operations

See [`lib/types.ts`](./lib/types.ts) for complete type definitions.

## 🎨 Features in Detail

### Predictive Analytics Engine
The platform uses anomaly detection algorithms to identify potential component failures before they occur. Each prediction includes:
- Anomaly score (0-1 scale)
- Predicted failure time
- Model precision score
- Severity classification
- Component and aircraft identification

### Alert Workflow
1. **Alert Generation**: Automatic creation based on prediction thresholds
2. **Acknowledgment**: Team members acknowledge alerts they're investigating
3. **Resolution**: Mark alerts as resolved after maintenance completion
4. **Tracking**: Complete audit trail of alert lifecycle

### Runbook Automation
Standardized maintenance procedures with:
- Component-specific instructions
- Expected outcomes for each step
- Success rate tracking
- Estimated completion times
- Step-by-step execution guidance

## 🌐 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 📈 Performance Metrics

The platform tracks several key performance indicators:
- **Mean Time To Repair (MTTR)**: Average time to complete repairs
- **Unplanned Downtime**: Hours of unexpected aircraft downtime
- **Model Precision**: Accuracy of predictive models
- **Alert Resolution Rate**: Percentage of alerts successfully resolved
- **Runbook Success Rate**: Effectiveness of automated procedures

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [v0.app](https://v0.app) by Vercel
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

## 📧 Contact

For questions or support, please open an issue in the GitHub repository.

---

**Note**: This application currently uses mock data for demonstration purposes. In a production environment, it would be connected to real-time data sources, machine learning models, and aircraft maintenance databases.
