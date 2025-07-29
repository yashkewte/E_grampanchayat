# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


@layer base {
  :root {
    /* Government-appropriate color scheme */
    --background: 210 20% 98%;
    --foreground: 220 27% 8%;

    --card: 0 0% 100%;
    --card-foreground: 220 27% 8%;

    --popover: 0 0% 100%;
    --popover-foreground: 220 27% 8%;

    /* Official blue primary */
    --primary: 210 89% 32%;
    --primary-foreground: 0 0% 100%;
    --primary-hover: 210 89% 28%;

    /* Government green secondary */
    --secondary: 142 52% 96%;
    --secondary-foreground: 142 52% 15%;

    --muted: 210 20% 96%;
    --muted-foreground: 220 15% 46%;

    /* Accent green for highlights */
    --accent: 142 76% 36%;
    --accent-foreground: 0 0% 100%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    --border: 210 20% 90%;
    --input: 210 20% 98%;
    --ring: 210 89% 32%;

    --radius: 0.5rem;

    /* Success and warning colors */
    --success: 142 76% 36%;
    --success-foreground: 0 0% 100%;
    --warning: 45 93% 47%;
    --warning-foreground: 0 0% 100%;

    /* Gradients for hero sections */
    --gradient-primary: linear-gradient(135deg, hsl(210 89% 32%), hsl(210 89% 28%));
    --gradient-hero: linear-gradient(135deg, hsl(210 89% 32%) 0%, hsl(142 76% 36%) 100%);

    /* Shadows */
    --shadow-elegant: 0 4px 20px -4px hsl(210 89% 32% / 0.15);
    --shadow-soft: 0 2px 10px -2px hsl(220 27% 8% / 0.1);

    /* Sidebar colors */
    --sidebar-background: 210 24% 16%;
    --sidebar-foreground: 210 20% 98%;
    --sidebar-primary: 210 89% 32%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 210 24% 20%;
    --sidebar-accent-foreground: 210 20% 98%;
    --sidebar-border: 210 24% 20%;
    --sidebar-ring: 210 89% 32%;
  }

  .dark {
    --background: 220 27% 8%;
    --foreground: 210 20% 98%;

    --card: 220 24% 12%;
    --card-foreground: 210 20% 98%;

    --popover: 220 24% 12%;
    --popover-foreground: 210 20% 98%;

    --primary: 210 89% 45%;
    --primary-foreground: 0 0% 100%;
    --primary-hover: 210 89% 40%;

    --secondary: 220 24% 16%;
    --secondary-foreground: 210 20% 98%;

    --muted: 220 24% 16%;
    --muted-foreground: 220 15% 65%;

    --accent: 142 76% 42%;
    --accent-foreground: 0 0% 100%;

    --destructive: 0 84% 65%;
    --destructive-foreground: 0 0% 100%;

    --border: 220 24% 16%;
    --input: 220 24% 16%;
    --ring: 210 89% 45%;

    --success: 142 76% 42%;
    --success-foreground: 0 0% 100%;
    --warning: 45 93% 52%;
    --warning-foreground: 0 0% 100%;

    --gradient-primary: linear-gradient(135deg, hsl(210 89% 45%), hsl(210 89% 40%));
    --gradient-hero: linear-gradient(135deg, hsl(210 89% 45%) 0%, hsl(142 76% 42%) 100%);

    --shadow-elegant: 0 4px 20px -4px hsl(210 89% 45% / 0.25);
    --shadow-soft: 0 2px 10px -2px hsl(0 0% 0% / 0.2);

    --sidebar-background: 220 27% 8%;
    --sidebar-foreground: 210 20% 98%;
    --sidebar-primary: 210 89% 45%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 220 24% 12%;
    --sidebar-accent-foreground: 210 20% 98%;
    --sidebar-border: 220 24% 12%;
    --sidebar-ring: 210 89% 45%;
  }
} 