# Agent Guidelines

## Build/Test Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Auto-fix ESLint issues
- No test framework configured

## Code Style

- **TypeScript**: Strict mode enabled, use proper types (avoid `any`)
- **Imports**: Group and alphabetize imports (builtin/external, internal, relative) with newlines between groups
- **Formatting**: Use Prettier for consistent formatting
- **Components**: Use functional components with TypeScript interfaces
- **Naming**: camelCase for variables/functions, PascalCase for components/types
- **Files**: Use `.tsx` for React components, `.ts` for utilities
- **Paths**: Use `@/` alias for src imports
- **Fonts**: Use Next.js font optimization with CSS variables
- **Error Handling**: Use try/catch for async operations, handle fetch errors properly
- **No Comments**: Avoid adding comments unless specifically requested
- **Unused Variables**: Prefix with underscore if intentionally unused

## Architecture

- Next.js 15 App Router with TypeScript
- Contentful CMS for content management
- Tailwind CSS for styling
- React 19 RC
