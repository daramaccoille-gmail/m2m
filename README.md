# Mizen to Malin Charity Cycle Planner

This is a comprehensive planning application for the Mizen Head to Malin Head 400-mile charity cycle. It's designed to help organizers and participants manage training, track fundraising efforts, follow a project timeline, and view the route.

The application is built with React, TypeScript, and Vite, and styled with Tailwind CSS. It is fully containerized with Docker for easy deployment.

![image](https://github.com/user-attachments/assets/a8e8b8e8-8e8e-4e8e-8e8e-a8e8b8e8e8e8) <!--- TODO: Replace with a real screenshot -->

## ✨ Features

- **Dynamic Training Schedule:** Generates a progressive, multi-week training plan based on the event date, scaling from base-building to peak and taper weeks.
- **Fundraising Tracker:** An interactive dashboard to set fundraising goals, input current totals, and visualize progress with a dynamic progress bar.
- **Interactive Timeline:** A Gantt-chart-like view of key project tasks, with color-coded status indicators for completed, current, and overdue items.
- **Route Maps:** Embedded, interactive maps for each of the four daily stages of the cycle.

## 🛠️ Tech Stack

- **Frontend:** [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Containerization:** [Docker](https://www.docker.com/) & [Nginx](https://www.nginx.com/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (or your preferred package manager)

### Installation & Development

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd cyclingFundraiser
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or the next available port).

---

## 📦 Building for Production

To create a production-ready build of the application, run:

```bash
npm run build
```

This command will generate a `dist` directory containing the optimized static assets.

---

## 🐳 Docker Deployment

This project includes a multi-stage `Dockerfile` to create a lightweight, production-ready container using Nginx.

### Prerequisites

- Docker installed and running.

### Build the Docker Image

From the project root, run the following command to build the image:

```bash
docker build -t mizen-malin-planner .
```

### Run the Docker Container

Once the image is built, you can run it as a container:

```bash
docker run -d -p 8080:80 mizen-malin-planner
```

The application will now be accessible at `http://localhost:8080`.

---

## 📜 License

This project is licensed under the ISC License. See the `package.json` for more details.
