# Shadcn Registry Kit

A template for building and publishing your own custom shadcn registry components. Includes documentation, landing page, and everything you need to deploy your component registry.

## Features

- 📦 **Ready-to-use template** - Fork and start building immediately
- 📚 **Documentation site** - Beautiful docs powered by Fumadocs
- 🚀 **Deploy ready** - Deploy anywhere
- 🎨 **Shadcn registry compatible** - Works with `npx shadcn add`

## Quick Start

1. **Use this template** - Click "Use this template" on GitHub

2. **Install dependencies**:
```bash
pnpm install
```

3. **Replace the placeholder component** at `registry/new-york/your-component.tsx`

4. **Update `registry.json`** with your component details

5. **Build the registry**:
```bash
pnpm registry:build
```

6. **Start development**:
```bash
pnpm dev
```

7. **Deploy** and share your component!

## Usage

Once deployed, users can install your component with:

```bash
npx shadcn@latest add https://your-domain.com/r/your-component.json
```

## Project Structure

```
├── registry/
│   └── new-york/           # Your components go here
│       └── your-component.tsx
├── registry.json           # Component registry manifest
├── content/docs/           # Documentation (MDX)
├── app/                    # Next.js app
└── public/r/               # Built registry files (auto-generated)
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm registry:build` - Rebuild the component registry

## License

MIT - Free to use for personal and commercial projects.
