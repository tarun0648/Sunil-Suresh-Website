# Sunil Suresh - Electronic Music Artist Portfolio

A modern, responsive portfolio website for Sunil Suresh, an electronic music artist and beatboxer. Built with React, TypeScript, and Tailwind CSS.

## 🌐 Live Demo
**Visit the live website:** [https://sunilupdated.netlify.app/](https://sunilupdated.netlify.app/)



https://github.com/user-attachments/assets/a6d2f081-94aa-43d8-8986-b5a2dedc1aca



## ✨ Features

### 🎵 Music & Entertainment
- **Music Player**: Interactive audio player with playlist functionality
- **Album Showcase**: Display of music albums and tracks
- **Video Gallery**: Collection of performance videos and content
- **Photo Gallery**: Professional photography showcase

### 📅 Tour Management System
- **Tour Dates Display**: Public-facing tour schedule
- **CMS Dashboard**: Admin panel for managing tour dates (`/cms` route)
- **Real-time Updates**: Add, edit, delete, and reorder tour dates
- **Status Management**: Track availability (Available, Limited, Sold Out)

### 🎨 Modern UI/UX
- **Custom Cursor**: Animated orange triangle cursor with hover effects
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Theme**: Theme-aware components
- **Interactive Elements**: Hover effects and micro-interactions

### 🏢 Brand Partnerships
- **Client Showcase**: Extensive list of brand partners and collaborators
- **Interactive Grid**: Expandable brand partner display
- **Logo Integration**: Brand logos with animated glow effects
- **Event Highlights**: Prestigious events and performances

### 🛠 Technical Features
- **TypeScript**: Full type safety
- **React Router**: Client-side routing
- **Context API**: State management for tour dates
- **Local Storage**: Persistent data storage
- **Component Library**: Shadcn/ui components
- **Form Validation**: React Hook Form with Zod
- **Toast Notifications**: User feedback system

## 🚀 How to Run

### Prerequisites
- Node.js (v16 or higher)
- npm, yarn, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sunil-git
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
# or
bun run build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
# or
bun run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── Hero.tsx        # Landing page hero section
│   ├── Navbar.tsx      # Navigation component
│   ├── MusicPlayer.tsx # Audio player
│   ├── PhotoGallery.tsx # Image gallery
│   ├── TourDates.tsx   # Public tour dates display
│   └── TourDatesCMS.tsx # Admin tour management
├── contexts/           # React contexts
├── data/              # Data management
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Page components
└── main.tsx          # App entry point
```

## 🎯 Key Routes

- `/` - Main portfolio page
- `/cms` - Tour dates management system
- `/*` - 404 Not Found page

## 🎨 Customization

### Colors
The project uses an orange theme with the following primary colors:
- Primary: `#D35400` (Orange)
- Accent: `#E67E22` (Lighter Orange)
- Secondary: `#F39C12` (Yellow-Orange)

### Adding Content
1. **Tour Dates**: Use the CMS at `/cms` route
2. **Images**: Add to `public/sunilImages/` directory
3. **Videos**: Add to `public/videos/` directory
4. **Brand Logos**: Add to `public/sunilImages/brandImages/`

## 🔧 Technologies Used

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Forms**: React Hook Form, Zod
- **Build Tool**: Vite
- **Package Manager**: npm/yarn/bun

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is private and proprietary.

