# 🖥️ Terminal CV - Interactive Resume

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-3.2.10-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.6-38B2AC?logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

**A modern, interactive terminal-style CV/resume website built with React, TypeScript, and TailwindCSS**

*Experience my professional journey through a command-line interface*

[Features](#-features) • [Installation](#-getting-started) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [Project Structure](#-project-structure)

</div>

---

## 📖 About

Terminal CV is an innovative, interactive resume website that presents professional information through a terminal-style interface. Instead of traditional static pages, visitors can explore my experience, skills, education, and projects using familiar command-line commands.

This project showcases not only my professional background but also demonstrates modern web development skills, including React hooks, TypeScript type safety, and responsive design principles.

## ✨ Features

- 🎨 **Terminal Aesthetic** - Beautiful, retro terminal interface with green-on-black theme
- ⌨️ **Interactive Commands** - Navigate through CV sections using command-line style inputs
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- 🔒 **Type-Safe** - Built with TypeScript for enhanced code reliability
- ⚡ **Fast & Lightweight** - Optimized with Vite for lightning-fast performance
- 🎯 **Modern UI/UX** - Smooth animations and hover effects
- 📊 **Comprehensive Info** - Access to experience, skills, education, projects, certifications, and more

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn**

You can check your versions by running:
```bash
node --version
npm --version
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tichzvidzayi/textbased-cv.git
   cd textbased-cv
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application running.

### Build for Production

To create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist` directory. You can preview the production build locally with:

```bash
npm run preview
```

## 💻 Usage

Once the application is running, you can interact with it using various commands:

### Available Commands

| Command | Description |
|---------|-------------|
| `help` | Show all available commands |
| `about` | Display professional summary |
| `contact` | Show contact information |
| `experience` | Display work experience history |
| `skills` | Show technical skills (Frontend, Backend, DevOps, etc.) |
| `education` | Display education background |
| `projects` | List personal projects |
| `certifications` | Show professional certifications |
| `publications` | Display academic publications |
| `softskills` | Show soft skills |
| `interests` | Display personal interests |
| `clear` | Clear the terminal screen |
| `exit` | Show exit message |

### Example Usage

```bash
~ $ help
~ $ about
~ $ experience
~ $ skills
~ $ contact
```

## 🛠️ Tech Stack

This project is built with modern web technologies:

- **React 18** - UI library for building interactive user interfaces
- **TypeScript** - Type-safe JavaScript for better code quality
- **TailwindCSS** - Utility-first CSS framework for rapid UI development
- **Vite** - Next-generation frontend build tool for fast development
- **ESLint** - Code linting and quality assurance

## 📁 Project Structure

```
textbased-cv/
├── src/
│   ├── components/
│   │   └── Terminal.tsx      # Main terminal component
│   ├── data/
│   │   └── cvData.ts          # CV data and content
│   ├── App.tsx                 # Root component
│   ├── main.tsx                # Application entry point
│   └── index.css               # Global styles
├── public/                     # Static assets
├── index.html                  # HTML template
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # TailwindCSS configuration
└── README.md                   # This file
```

## 🎨 Customization

To customize this CV for your own use:

1. **Update CV Data**: Edit `src/data/cvData.ts` with your personal information
2. **Modify Styling**: Adjust colors and themes in `tailwind.config.js` and component files
3. **Add Commands**: Extend the `executeCommand` function in `Terminal.tsx` to add new commands
4. **Update Header**: Modify the header section in `Terminal.tsx` to reflect your information

## 📝 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint to check code quality |

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/tichzvidzayi/textbased-cv/issues).

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Tich Zvidzayi**

- 📧 Email: [tzvidzayi@hotmail.com](mailto:tzvidzayi@hotmail.com)
- 💻 GitHub: [@tichzvidzayi](https://github.com/tichzvidzayi)
- 🔗 LinkedIn: [tichzvidzayi](https://linkedin.com/in/tichzvidzayi)
- 🌐 Website: [Your Website](https://yourwebsite.com)

---

<div align="center">

**⭐ If you find this project interesting, please consider giving it a star! ⭐**

Made with ❤️ by Tich Zvidzayi

</div>
