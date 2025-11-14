# GEMINI.md - Your AI Assistant's Guide to the Project

**Project:** Bedroom Director
**Version:** 1.0
**Last Updated:** November 14, 2025

---

## 🚀 Project Overview

**Bedroom Director** is a comprehensive discovery and education platform for AI creative tools, with a primary focus on filmmakers and content creators. The project aims to be "The Complete Platform for AI Filmmakers & Content Creators," helping users discover the right tools, learn how to use them effectively, and create professional work.

The project consists of three main components:

1.  **A Next.js Web Application (`bedroom-director-web`):** The main user-facing platform, providing a curated database of AI models, along with educational content and community features.
2.  **A Comprehensive Database (`data/ai_video_image_models.csv`):** A detailed CSV file containing information on over 150 AI models, including their capabilities, pricing, and platform availability.
3.  **A Suite of Python Scripts (`scripts/`):** A collection of scripts for maintaining, updating, and reorganizing the AI model database.

The project is well-documented, with a clear positioning strategy and a detailed roadmap for future development.

---

## 🛠️ Building and Running the Project

The main component of the project is the `bedroom-director-web` Next.js application. Here are the key commands for building and running it:

*   **Install Dependencies:**
    ```bash
    npm install
    ```

*   **Run the Development Server:**
    ```bash
    npm run dev
    ```
    This will start the development server at `http://localhost:3000`.

*   **Build for Production:**
    ```bash
    npm run build
    ```
    This will create a static build of the application in the `out` directory.

*   **Start the Production Server:**
    ```bash
    npm run start
    ```
    This will start a production server for the statically generated site.

*   **Lint the Code:**
    ```bash
    npm run lint
    ```
    This will run the ESLint code linter to check for any code quality issues.

---

## 💻 Development Conventions

*   **Framework:** The web application is built with [Next.js](https://nextjs.org/) and [React](https://reactjs.org/).
*   **Language:** The project uses [TypeScript](https://www.typescriptlang.org/) for type safety.
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) is used for styling, with components from [shadcn/ui](https://ui.shadcn.com/).
*   **Data:** The AI model data is stored in a CSV file (`data/ai_video_image_models.csv`) and parsed at build time. The parsed data is then made available to the application as a JSON file.
*   **Scripts:** Python scripts are used for data management tasks. These scripts are located in the `scripts/` directory.
*   **Documentation:** The project is extensively documented in Markdown files, located in the `docs/` directory. The `master-todo.md` file serves as the central project management document.

---

## 📂 Directory Overview

*   `bedroom-director-web/`: The Next.js web application.
    *   `src/`: The source code for the web application.
    *   `public/`: Public assets, including the `ai_video_image_models.csv` file.
    *   `package.json`: The project's dependencies and scripts.
    *   `website/`: Contains content for the website.
*   `data/`: The AI model database and its backups.
*   `docs/`: Project documentation, including the technical architecture, data schema, and user guides.
*   `research/`: Research materials, including competitive analysis.
*   `scripts/`: Python scripts for data management.
*   `creative/`: Creative assets, including branding, design, and marketing materials.
    *   `bedroom-director-universe/`: A fictional "universe" for the brand, with a 90s/early 2000s aesthetic.
    *   `partners/`: Documents related to creative partners.

---

## 🔑 Key Files

*   `readme.md`: The main project overview.
*   `master-todo.md`: The project's task tracker and roadmap.
*   `bedroom-director-web/package.json`: The web application's dependencies and scripts.
*   `data/ai_video_image_models.csv`: The core database of AI models.
*   `docs/technical-architecture.md`: The technical design of the web application.
*   `creative/positioning-strategy.md`: The project's market goals and positioning.
*   `creative/bedroom-director-universe/readme.md`: An overview of the brand's fictional universe.
*   `creative/partners/creative-partners-index.md`: Index of creative partner documents.
