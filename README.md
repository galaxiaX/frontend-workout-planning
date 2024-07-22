# Workout Planning Web Application - Frontend ✨

## Frontend 🏠

This is the frontend for the Workout Planning Web Application built using
Next.js, TypeScript, and Tailwind CSS.

## Backend 🔧

The backend for this project can be found at
[github.com/galaxiaX/backend-workout-planning](https://github.com/galaxiaX/backend-workout-planning)
It was built with Node.js, Express, and MongoDB.

### Getting Started 💻

To get started with the project, follow these steps:

1.Clone the repository:

```bash
git clone https://github.com/galaxiaX/frontend-workout-planning.git
cd frontend-workout-planning
```

2.Install dependencies:

```bash
npm install
```

3.Set up environment variables: Copy the provided .env.example file to
.env.local and update it with your configuration.

```bash
cp .env.example .env.local
```

Update the NEXT_PUBLIC_BASE_API variable in .env.local with the backend API base
URL.

```env
NEXT_PUBLIC_BASE_API=http://localhost:8000
```

4.Run the development server:

```bash
npm run dev
```

This will start the development server at `http://localhost:3000`.

### Available Scripts 📜

- `npm run dev` : Runs the application in development mode.
- `npm run build` : Builds the application for production.
- `npm run start` : Starts the application in production mode.
- `npm run lint` : Runs ESLint to check for linting errors.

### Project Structure 📂

- `app/` : Contains the Next.js pages.
- `components/` : Contains React components.
- `utils/` : Contains utility functions.

### Contributing 🤝

Feel free to open issues or submit pull requests. For major changes, please open
an issue first to discuss what you would like to change.
