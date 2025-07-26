# ManageAssets Backend

This is the backend for the ManageAssets application, a comprehensive system for managing organizational assets.

## Technologies Used

- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [TypeORM](https://typeorm.io/)
- **API Documentation**: [Swagger](https://swagger.io/)
- **Authentication**: JWT (JSON Web Tokens)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- A running PostgreSQL database instance

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/ManageAssets.git
   cd ManageAssets/backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the `backend` directory by copying the `.env.example` file:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your database credentials and other environment-specific settings.

### Running the Application

- **Development mode:**

  ```bash
  npm run start:dev
  ```

  This will start the application with hot-reloading enabled.

- **Production mode:**
  ```bash
  npm start
  ```

### Available Scripts

- `start`: Starts the application in production mode.
- `start:dev`: Starts the application in development mode with hot-reloading.
- `test`: Runs the test suite.
- `seed`: Seeds the database with initial data.
