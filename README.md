<<<<<<< HEAD
# nwhacks2025
=======
# FILE: /my-nextjs-app/my-nextjs-app/README.md

# WELCOME!
Cosmic Zoom: Atom to Universe" is a visually immersive, interactive website that takes users on a seamless journey through the scales of the universe. By scrolling, users zoom out from the smallest objects, like atoms and DNA, to larger structures such as the Earth, our solar system, the milky way galaxy, and the observable universe. Each object is presented in stunning 3D with animations (some of which is formed from real geographic and texture data created by NASA), accompanied by fascinating facts, smooth transitions, and a Q&A panel to ask an A.I. for more anytime.

This project bridges education and entertainment, helping users grasp the relative sizes of objects in the universe while fostering curiosity about science and our place in it.


# My Next.js 3D Scrolling App

This project is a Next.js application that features a home page with a title, a placeholder for a 3D scrolling feature, an API route for receiving questions and returning mock AI responses, and a reusable Three.js canvas with ambient lighting and a simple 3D object.

## Project Structure

- **pages/**
  - **api/**
    - `ask.ts`: API route for handling questions and returning mock AI responses.
  - `index.tsx`: Home page of the application.
  - `_app.tsx`: Custom App component for global styles.
  - `[objectId].tsx`: Dynamic route for displaying individual objects.

- **public/**
  - **models/**
    - `placeholder-model.glb`: Placeholder for a 3D model in GLB format.

- **components/**
  - `Header.tsx`: Renders the header of the application.
  - `ThreeCanvas.tsx`: Reusable Three.js canvas component.
  - `AIPanel.tsx`: Displays AI-generated educational content.

- **styles/**
  - `Home.module.css`: CSS styles specific to the home page.
  - `globals.css`: Global CSS styles for the application.

- **utils/**
  - `scrollNavigation.ts`: Implements scrolling logic for navigation.

- `tsconfig.json`: TypeScript configuration file.
- `package.json`: npm configuration file.

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   cd my-nextjs-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## API Route

The API route can be accessed at `/api/ask`. It accepts POST requests with a JSON body containing a question and returns a mock AI response.

## Deploying on Vercel

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and sign in.
3. Import your GitHub repository.
4. Follow the prompts to deploy your application.

Your application will be live on a Vercel URL once the deployment is complete!

>>>>>>> v2
