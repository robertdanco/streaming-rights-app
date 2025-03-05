# Project Summary

The Sports Viewing Finder is a web application designed to help sports fans locate games that they can watch based on their ZIP code. By entering their location, users can see available games across major sports leagues (MLB, NBA, and NHL) and find out where to stream them. This application not only enhances the experience of sports enthusiasts but also addresses the challenges of discovering regional broadcasts and understanding viewing rights. By integrating various data sources, it provides accurate, up-to-date information on game schedules, viewing rights, and regional broadcasting options, ultimately connecting fans with their favorite sports more effectively.

# Project Module Description

The application consists of several functional modules:

1. **User Input Module**: 
   - **ZipCodeEntry**: This component allows users to enter their ZIP code to fetch local teams and viewing options.

2. **Team Selection Module**:
   - **TeamSelector**: Displays teams based on the user's location, enabling them to select their favorite teams.

3. **Game Schedule Module**:
   - **GameSchedule**: Shows a schedule of upcoming games filtered by date and league, allowing users to explore games based on their interests.

4. **Game Detail Module**:
   - **GameDetail**: Provides detailed information about selected games, including teams, dates, times, and viewing options available.

5. **Geographical Viewing Module**:
   - **ViewingMap**: Visualizes where in the United States a game is streamable, indicating available platforms and blackout regions.

6. **Rights Determination Module**:
   - **RightsService**: Integrates viewing rights information to inform users about where they can legally stream each game based on their location.

# Directory Tree
```
/data/chats/5rg55/workspace
+-- code.ipynb
+-- data_analysis_report.md
+-- react_template
|   +-- README.md
|   +-- eslint.config.js
|   +-- index.html
|   +-- package.json
|   +-- postcss.config.js
|   +-- src
|   |   +-- App.jsx
|   |   +-- index.css
|   |   +-- main.jsx
|   +-- tailwind.config.js
|   +-- template_config.json
|   +-- vite.config.js
+-- sports-viewing-app
|   +-- CODE_OF_CONDUCT.md
|   +-- CONTRIBUTING.md
|   +-- README.md
|   +-- WIKI.md
|   +-- backend
|   |   +-- Dockerfile
|   |   +-- README.md
|   |   +-- api
|   |   |   +-- __init__.py
|   |   |   +-- location.py
|   |   |   +-- rights.py
|   |   |   +-- schedule.py
|   |   |   +-- teams.py
|   |   +-- docker-compose.yml
|   |   +-- main.py
|   |   +-- requirements.txt
|   +-- eslint.config.js
|   +-- index.html
|   +-- package.json
|   +-- postcss.config.js
|   +-- src
|   |   +-- App.jsx
|   |   +-- components
|   |   |   +-- GameDetail.jsx
|   |   |   +-- GameDetailWrapper.jsx
|   |   |   +-- GameSchedule.jsx
|   |   |   +-- TeamSelector.jsx
|   |   |   +-- ViewingMap.jsx
|   |   |   +-- ZipCodeEntry.jsx
|   |   +-- context
|   |   |   +-- LocationContext.jsx
|   |   +-- data
|   |   |   +-- mockData.js
|   |   +-- index.css
|   |   +-- main.jsx
|   |   +-- pages
|   |   |   +-- HomePage.jsx
|   |   |   +-- MapPage.jsx
|   |   |   +-- SchedulePage.jsx
|   |   +-- services
|   |   |   +-- LocationService.js
|   |   |   +-- RightsService.js
|   |   |   +-- ScheduleService.js
|   |   +-- utils
|   |       +-- api.js
|   +-- tailwind.config.js
|   +-- template_config.json
|   +-- test.md
|   +-- vite.config.js
+-- sports_viewing_app_class_diagram.mermaid
+-- sports_viewing_app_sequence_diagram.mermaid
+-- sports_viewing_app_system_design.md
```

# File Description Inventory

- **data_analysis_report.md**: Comprehensive report summarizing the data structure, relationships, and analysis of the application's backend components.
- **src/App.jsx**: Main application component that configures routes for different pages in the application.
- **src/components/**: Directory containing UI components like `ZipCodeEntry`, `TeamSelector`, `GameSchedule`, `GameDetail`, and `ViewingMap`.
- **src/context/**: Contains `LocationContext.jsx`, managing global state related to user’s location and teams.
- **src/data/**: Contains `mockData.js`, which includes sample data for development and testing purposes.
- **src/pages/**: Directory containing page components such as `HomePage`, `SchedulePage`, and `MapPage`.
- **src/services/**: Contains modules for managing business logic, including services for handling location, rights, and schedule functionality.
- **src/utils/**: Contains utility functions for making API requests.
- **README.md**: Overview and guidelines for the React project template.
- **index.html**: HTML file that serves as the entry point for the application.
- **vite.config.js**: Vite configuration file for project setup.
- **tailwind.config.js**: Tailwind CSS configuration file.
- **postcss.config.js**: Configuration file for PostCSS processing.
- **eslint.config.js**: Configuration file for ESLint.

# Technology Stack

- **Frontend**: React 18+, Vite, Tailwind CSS, React Router
- **Backend**: FastAPI, Python 3.9+, SQLite/PostgreSQL
- **Data Processing**: Pandas
- **Data Sources**: Various sports league APIs (MLB, NBA, NHL) along with ESPN for game data
- **Design**: Responsive design principles for mobile and desktop compatibility

# Usage

To get started with the Sports Viewing Finder application, follow these steps:

1. **Install Dependencies**:
   - Navigate to the project directory:
     ```bash
     cd sports-viewing-app
     ```
   - Install the required packages:
     ```bash
     pnpm install
     ```

2. **Build Application**:
   - Build the production version of the application:
     ```bash
     pnpm run build
     ```

3. **Run Application**:
   - Start the development server:
     ```bash
     pnpm run dev
     ```

4. **Testing the Application**:
   - Open the application in a web browser to test its functionality.
   - Enter a valid ZIP code, select teams, view the game schedules, and check out the map view for availability.

By following these instructions, you will be able to set up and run the Sports Viewing Finder application in your local development environment.


# INSTRUCTION
- Project Path:`/data/chats/5rg55/workspace/sports-viewing-app`
- You can search for the file path in the 'Directory Tree';
- After modifying the project files, if this project can be previewed, then you need to reinstall dependencies, restart service and preview;
