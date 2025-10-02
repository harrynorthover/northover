# Northover

A modern blog built with Next.js 15, TypeScript, and Contentful CMS.

## Features

- 🚀 Next.js 15 with App Router
- 📝 Content management with Contentful
- 🎨 Tailwind CSS for styling
- 🔍 SEO optimized with structured data
- 📱 Responsive design
- ⚡ Fast performance with Vercel Analytics
- 🎯 TypeScript for type safety

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd northover
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Fill in your Contentful credentials and other required environment variables.

4. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Environment Variables

See `.env.example` for all required environment variables. Key variables include:

- `CONTENTFUL_SPACE_ID` - Your Contentful space ID
- `CONTENTFUL_ACCESS_TOKEN` - Content Delivery API access token
- `CONTENTFUL_PREVIEW_ACCESS_TOKEN` - Content Preview API access token
- `NEXT_PUBLIC_SITE_URL` - Your site's public URL

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Auto-fix ESLint issues

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── articles/          # Article pages
│   └── ...
├── components/            # React components
├── lib/                   # Utility functions
└── types/                 # TypeScript type definitions
```

## Content Management

This project uses Contentful as a headless CMS. Articles and global content are fetched via the Contentful GraphQL API.

## License

See [LICENSE](LICENSE) file for details.
