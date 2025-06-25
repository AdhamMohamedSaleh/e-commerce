# 🛍️ ShoeStore - Modern E-commerce Frontend

A complete, full-featured e-commerce website for shoes built with React, Vite, and modern web technologies. This project demonstrates a scalable, feature-sliced architecture ready for production use.

## ✨ Features

### 🏠 Core E-commerce Features

- **Home Page**: Hero banner, featured categories, product carousel
- **Shop Page**: Product grid with advanced filtering and sorting
- **Product Details**: Image gallery, size/color selection, add to cart
- **Shopping Cart**: Item management, quantity controls, total calculation
- **Checkout**: Shipping form, payment integration, order placement
- **User Authentication**: Login/Register with form validation
- **Admin Panel**: Product management, order tracking, inventory

### 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach, works on all devices
- **Dark/Light Theme**: Toggle between themes with persistent storage
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

### 🔧 Technical Features

- **State Management**: Zustand for cart, React Context for app state
- **Form Validation**: react-hook-form + zod for type-safe forms
- **Routing**: React Router v6 with nested routes
- **Type Safety**: Full TypeScript support (converted from JS)
- **Performance**: Code splitting, lazy loading, optimized images

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with functional components and hooks
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Zustand + React Context API
- **Form Handling**: react-hook-form + zod validation
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui components
│   ├── layout/       # Header, Footer
│   └── common/       # Shared components
├── features/
│   ├── auth/         # Authentication logic
│   ├── cart/         # Cart state management
│   ├── products/     # Product state and filtering
│   ├── checkout/     # Checkout process
│   └── admin/        # Admin panel features
├── pages/            # Route components
├── hooks/            # Custom React hooks
├── contexts/         # React Context providers
├── data/             # Mock data and constants
└── lib/              # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd shoe-store
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔌 API Integration

The app is designed to work with RESTful APIs. Replace the TODO comments with actual API calls:

### Authentication

```javascript
// TODO: Replace with POST /api/auth/login
const response = await fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
```

### Products

```javascript
// TODO: Replace with GET /api/products
const response = await fetch("/api/products");
const products = await response.json();
```

### Cart

```javascript
// TODO: Replace with POST /api/cart/add
const response = await fetch("/api/cart/add", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ productId, quantity, size }),
});
```

### Orders

```javascript
// TODO: Replace with POST /api/orders
const response = await fetch("/api/orders", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ items, shipping, payment }),
});
```

## 🎨 Customization

### Adding New Components

1. Create component in appropriate directory
2. Import shadcn/ui components from `@/components/ui`
3. Use Tailwind classes for styling
4. Export and use in pages

### Theme Customization

Modify `tailwind.config.js` to customize colors, fonts, and other design tokens:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#your-color",
          // ... other shades
        },
      },
    },
  },
};
```

### Adding New Pages

1. Create page component in `src/pages/`
2. Add route in `src/App.jsx`
3. Update navigation in Header component

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Netlify

1. Build the project: `npm run build`
2. Upload `dist` folder to Netlify
3. Configure redirects for SPA routing

### Other Platforms

The app can be deployed to any static hosting service that supports SPAs.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide](https://lucide.dev/) for icons
- [Vite](https://vitejs.dev/) for fast build tooling

## 📞 Support

For questions or support, please open an issue on GitHub or contact the development team.

---

**Happy coding! 🎉**
