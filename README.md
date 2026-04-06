# FinSight

**FinSight** is a modern, responsive personal finance dashboard designed to help users track expenses, manage custom wallets, and achieve saving goals with absolute clarity. Built with a focus on premium UI/UX, it features dynamic charts, smooth animations, and a sleek dark/light mode experience.

## ✨ Key Features

* **Dynamic Dashboard:** Real-time calculation of total balance, income, and expenses across multiple custom wallets (Credit Cards, UPI, Cash).
* **Visual Analytics:** Interactive money flow bar charts and expense-by-category donut charts powered by Recharts.
* **Goal Tracking:** Create customized saving goals, deposit funds, and track progress visually with animated progress bars.
* **Mock Authentication:** Fully functional frontend sign-up and login flow utilizing `sessionStorage` to persist user profiles and sessions across page reloads.
* **State Management:** Global state handled seamlessly via Zustand, ensuring the UI updates instantly when transactions or wallets are added.
* **Premium UI:** Custom-styled components, frosted glass aesthetics, gradient pills, and fluid animations built with Tailwind CSS.

## 🛠️ Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **State Management:** [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
* **Charts:** [Recharts](https://recharts.org/)
* **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Cards, Dialogs, Tables, Inputs, Selects)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Theming:** `next-themes` (Light/Dark mode)

## 🚀 Getting Started

### Prerequisites
Ensure you have Node.js (v18 or higher) and npm installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/finsight.git](https://github.com/your-username/finsight.git)
   cd finsight
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install required shadcn components (if not already present):**
   ```bash
   npx shadcn-ui@latest add button card dialog input label select table progress
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📁 Project Structure

```text
├── app/
│   ├── auth/                 # Login and Signup pages
│   ├── dashboard/            # Protected application routes
│   │   ├── analytics/        # Detailed charting views
│   │   ├── profile/          # User profile management
│   │   ├── settings/         # App preferences and data clearing
│   │   ├── transactions/     # Filterable transaction history
│   │   ├── layout.tsx        # Global dashboard navigation & header
│   │   └── page.tsx          # Main dashboard overview
│   ├── page.tsx              # Landing page
├── components/
│   ├── ui/                   # Shadcn UI components
│   └── theme-toggle.tsx      # Dark mode toggle component
├── store/
│   └── useFinanceStore.ts    # Zustand global state (Wallets, Txs, Goals)
└── public/                   # Static assets (logos, images)
```

## 📝 Architecture Notes

* **Local Storage Over Backend:** For demonstration purposes, this application relies on browser `sessionStorage` for user authentication and Zustand for managing session state. If the browser tab is closed, the session is cleared. 
* **Data Privacy:** Personal finance is inherently private. Instead of implementing a standard "Admin vs. Viewer" Role-Based Access Control (RBAC), this application gives the authenticated user full control over their own isolated, custom wallets, mimicking a secure, real-world finance tracker.