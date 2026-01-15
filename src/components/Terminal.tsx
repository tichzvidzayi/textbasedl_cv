import { useState, useRef, useEffect } from 'react';
import { cvData } from '../data/cvData';
import { 
  FaGraduationCap, 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaGithub, 
  FaLinkedin,
  FaUser,
  FaExclamationTriangle
} from 'react-icons/fa';

interface CommandOutput {
  type: 'command' | 'output' | 'error';
  content: string;
  className?: string;
}

const Terminal = () => {
  const [boxWidth, setBoxWidth] = useState(70);
  
  useEffect(() => {
    const updateBoxWidth = () => {
      if (window.innerWidth < 640) {
        setBoxWidth(40);
      } else if (window.innerWidth < 768) {
        setBoxWidth(50);
      } else if (window.innerWidth < 1024) {
        setBoxWidth(60);
      } else {
        setBoxWidth(70);
      }
    };
    
    updateBoxWidth();
    window.addEventListener('resize', updateBoxWidth);
    return () => window.removeEventListener('resize', updateBoxWidth);
  }, []);
  
  const createBox = (title: string, lines: string[]): CommandOutput[] => {
    const separator = '─'.repeat(boxWidth);
    
    return [
      { type: 'output', content: separator },
      { type: 'output', content: `  ${title}`, className: 'font-bold text-base' },
      { type: 'output', content: separator },
      ...lines.map(line => ({ type: 'output' as const, content: `  ${line}` })),
      { type: 'output', content: separator }
    ];
  };



  const [history, setHistory] = useState<CommandOutput[]>([
    { type: 'output', content: '' },
    ...createBox('QUICK INFO', [
      'Full-Stack Software Engineer with 6+ years experience, specializing in',
      'micro-frontends and scalable solutions across multiple industries.'
    ]),
    { type: 'output', content: '' },
    { type: 'output', content: 'Type "help" to see all available commands.' },
    { type: 'output', content: '' }
  ]);
  const [input, setInput] = useState('');
  const [currentPath] = useState('~');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      if (history.length <= 5) {
        terminalRef.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        terminalRef.current.scrollTo({
          top: terminalRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const executeCommand = (cmd: string): CommandOutput[] => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const parts = trimmedCmd.split(' ');
    const command = parts[0];

    switch (command) {
      case 'help':
        return createBox('AVAILABLE COMMANDS', [
          'help          Show this help message',
          'about         Display professional summary',
          'contact       Show contact information',
          'experience    Show work experience',
          'skills        Display technical skills',
          'education     Show education background',
          'projects      List personal projects',
          'certifications Show certifications',
          'publications  Display academic publications',
          'softskills    Show soft skills',
          'interests     Show personal interests',
          'clear         Clear the terminal',
          'exit          Close terminal (just refresh page)'
        ]);

      case 'about':
        const summaryLines = cvData.summary.split('\n').filter(line => line.trim());
        const separator = '─'.repeat(boxWidth);
        return [
          { type: 'output', content: separator },
          { type: 'output', content: `  ABOUT`, className: 'font-bold text-base' },
          { type: 'output', content: separator },
          ...summaryLines.map(line => ({ 
            type: 'output' as const, 
            content: `  ${line.trim()}`, 
            className: 'break-words' 
          })),
          { type: 'output', content: separator }
        ];

      case 'contact':
        const contactLines = [
          `Name:     ${cvData.contact.name}`,
          `Title:    ${cvData.contact.title}`,
          `Location: ${cvData.contact.location}`,
          `Phone:    ${cvData.contact.phone}`,
          `Email:    ${cvData.contact.email}`,
          `Website:  ${cvData.contact.website}`,
          `GitHub:   ${cvData.contact.github}`,
          `LinkedIn: ${cvData.contact.linkedin}`
        ];
        return createBox('CONTACT INFORMATION', contactLines);

      case 'experience':
        const experienceLines = cvData.experience.flatMap((exp, idx) => [
          '',
          `[${idx + 1}] ${exp.title}`,
          `    Company: ${exp.company}, ${exp.location}`,
          `    Period: ${exp.dates}`,
          '    Responsibilities:',
          ...exp.responsibilities.map(resp => `      • ${resp}`),
          `    Technologies: ${exp.technologies.join(', ')}`
        ]);
        return createBox('WORK EXPERIENCE', experienceLines);

      case 'skills':
        const skillsLines = [
          'Frontend Core:',
          `  ${cvData.skills.frontend.join(', ')}`,
          '',
          'UI/UX Tools:',
          `  ${cvData.skills.uiux.join(', ')}`,
          '',
          'APIs & Communication:',
          `  ${cvData.skills.apis.join(', ')}`,
          '',
          'Backend & Integration:',
          `  ${cvData.skills.backend.join(', ')}`,
          '',
          'DevOps & Tools:',
          `  ${cvData.skills.devops.join(', ')}`,
          '',
          'Authorization & Security:',
          `  ${cvData.skills.security.join(', ')}`,
          '',
          'Optimization:',
          `  ${cvData.skills.optimization.join(', ')}`
        ];
        return createBox('TECHNICAL SKILLS', skillsLines);

      case 'education':
        const educationLines = cvData.education.flatMap((edu, idx) => [
          '',
          `[${idx + 1}] ${edu.degree}`,
          `    Institution: ${edu.institution}, ${edu.location}`,
          `    Period: ${edu.dates}`
        ]);
        return createBox('EDUCATION', educationLines);

      case 'projects':
        const projectLines = cvData.projects.flatMap((project, idx) => [
          '',
          `[${idx + 1}] ${project.name}`,
          `    Description: ${project.description}`,
          ...(project.github ? [`    GitHub: ${project.github}`] : []),
          ...(project.live ? [`    Live: ${project.live}`] : [])
        ]);
        return createBox('PROJECTS', projectLines);

      case 'certifications':
        const certLines = cvData.certifications.map((cert, idx) => 
          `[${idx + 1}] ${cert.platform}: ${cert.name}`
        );
        return createBox('CERTIFICATIONS', certLines);

      case 'publications':
        const pubLines = cvData.publications.map(pub => `• ${pub}`);
        return createBox('PUBLICATIONS', pubLines);

      case 'softskills':
        const softSkillsLines = cvData.softSkills.map(skill => `• ${skill}`);
        return createBox('SOFT SKILLS', softSkillsLines);

      case 'interests':
        return createBox('INTERESTS', [cvData.interests.join(', ')]);

      case 'clear':
        return [];

      case 'exit':
        return [
          { type: 'output', content: 'Thanks for visiting! Refresh the page to restart.' }
        ];

      case 'ls':
      case 'dir':
        return [
          { type: 'output', content: '┌─────────────────────────────────────────────────────────────┐' },
          { type: 'output', content: '│  😄 Lol, we don\'t do that here!                            │' },
          { type: 'output', content: '│                                                             │' },
          { type: 'output', content: '│  I can\'t expose my file directory.                         │' },
          { type: 'output', content: '└─────────────────────────────────────────────────────────────┘' }
        ];

      case 'cd':
        return [
          { type: 'output', content: '┌─────────────────────────────────────────────────────────────┐' },
          { type: 'output', content: '│  🚫 Nice try! But there\'s nowhere to navigate to.          │' },
          { type: 'output', content: '│                                                             │' },
          { type: 'output', content: '│  You\'re already in the                                     │' },
          { type: 'output', content: '│  best directory - exploring my professional journey! 🚀     │' },
          { type: 'output', content: '└─────────────────────────────────────────────────────────────┘' }
        ];

      case 'rm':
      case 'del':
      case 'delete':
        return [
          { type: 'output', content: '┌─────────────────────────────────────────────────────────────┐' },
          { type: 'output', content: '│  ⚠️  Whoa there! No deleting allowed!                       │' },
          { type: 'output', content: '│                                                             │' },
          { type: 'output', content: '│  You can\'t delete anything │' },
          { type: 'output', content: '│  here. My data is safe! 🔒                                   │' },
          { type: 'output', content: '└─────────────────────────────────────────────────────────────┘' }
        ];

      case 'cat':
      case 'type':
      case 'less':
      case 'more':
        return [
          { type: 'output', content: '┌─────────────────────────────────────────────────────────────┐' },
          { type: 'output', content: '│  📄 File reading? Not in this terminal!                     │' },
          { type: 'output', content: '│                                                             │' },
          { type: 'output', content: '│  Use commands like "about", "skills", or "experience" to    │' },
          { type: 'output', content: '│  view my information instead! 📚                              │' },
          { type: 'output', content: '└─────────────────────────────────────────────────────────────┘' }
        ];

      case 'pwd':
        return [
          { type: 'output', content: '┌─────────────────────────────────────────────────────────────┐' },
          { type: 'output', content: '│  📍 You are here: Tich Zvidzayi\'s CV Terminal                │' },
          { type: 'output', content: '│                                                             │' },
          { type: 'output', content: '│  Current path: ~/professional-journey                      │' },
          { type: 'output', content: '│  Status: Exploring awesome developer stuff! 🎯              │' },
          { type: 'output', content: '└─────────────────────────────────────────────────────────────┘' }
        ];

      case 'mkdir':
      case 'rmdir':
        return [
          { type: 'output', content: '┌─────────────────────────────────────────────────────────────┐' },
          { type: 'output', content: '│  🚧 Directory operations? Nope!                              │' },
          { type: 'output', content: '│                                                             │' },
          { type: 'output', content: '│  This terminal doesn\'t support file system operations.    │' },
          { type: 'output', content: '│  It\'s all about showcasing my CV! Try "projects" instead.   │' },
          { type: 'output', content: '└─────────────────────────────────────────────────────────────┘' }
        ];

      case 'touch':
        return [
          { type: 'output', content: '┌─────────────────────────────────────────────────────────────┐' },
          { type: 'output', content: '│  👆 Touch? This isn\'t a real file system!                  │' },
          { type: 'output', content: '│                                                             │' },
          { type: 'output', content: '│  You can\'t create files here. But you can explore my      │' },
          { type: 'output', content: '│  projects with the "projects" command! 💻                  │' },
          { type: 'output', content: '└─────────────────────────────────────────────────────────────┘' }
        ];

      case 'sudo':
        return [
          { type: 'output', content: '┌─────────────────────────────────────────────────────────────┐' },
          { type: 'output', content: '│  🔐 Sudo? You don\'t have admin privileges here!             │' },
          { type: 'output', content: '│                                                             │' },
          { type: 'output', content: '│  This is my CV terminal - I\'m the only admin! 😎          │' },
          { type: 'output', content: '│  But you can explore freely with "help" command.           │' },
          { type: 'output', content: '└─────────────────────────────────────────────────────────────┘' }
        ];

      case 'git':
        return [
          { type: 'output', content: '┌─────────────────────────────────────────────────────────────┐' },
          { type: 'output', content: '│  🌳 Git? Not available in this terminal!                     │' },
          { type: 'output', content: '│                                                             │' },
          { type: 'output', content: '│  But you can check out my GitHub:                          │' },
          { type: 'output', content: '│  github.com/tichzvidzayi                                    │' },
          { type: 'output', content: '│                                                             │' },
          { type: 'output', content: '│  Or use "contact" to see all my links! 🔗                  │' },
          { type: 'output', content: '└─────────────────────────────────────────────────────────────┘' }
        ];

      case 'vim':
      case 'vi':
      case 'nano':
      case 'emacs':
        return [
          { type: 'output', content: '┌─────────────────────────────────────────────────────────────┐' },
          { type: 'output', content: '│  ✏️  Text editor? This terminal is read-only!                 │' },
          { type: 'output', content: '│                                                             │' },
          { type: 'output', content: '│  You can\'t edit files here. But you can read my            │' },
          { type: 'output', content: '│  professional info with commands like "about" or "skills"! │' },
          { type: 'output', content: '└─────────────────────────────────────────────────────────────┘' }
        ];

      case 'ping':
        return [
          { type: 'output', content: '┌─────────────────────────────────────────────────────────────┐' },
          { type: 'output', content: '│  🏓 PING! PONG! 🏓                                          │' },
          { type: 'output', content: '│                                                             │' },
          { type: 'output', content: '│  I\'m here and ready! This terminal is alive and kicking!   │' },
          { type: 'output', content: '│  Try "help" to see what you can explore. 🚀                 │' },
          { type: 'output', content: '└─────────────────────────────────────────────────────────────┘' }
        ];

      case '':
        return [];

      default:
        return [
          { type: 'error', content: `Command not found: ${command}. Type "help" for available commands.` }
        ];
    }
  };

  const executeCommandDirectly = (cmd: string) => {
    if (!cmd.trim()) return;

    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    }

    setHistory([]);
    
    setTimeout(() => {
      const commandOutput: CommandOutput = { type: 'command', content: cmd };
      const results = executeCommand(cmd);
      
      setHistory([commandOutput, ...results, { type: 'output', content: '' }]);
    }, 150);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const trimmedInput = input.trim().toLowerCase();
    
    if (trimmedInput === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    executeCommandDirectly(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 text-green-400 font-mono overflow-hidden flex flex-col relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-green-500/30 rounded-full animate-pulse" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-500/30 rounded-full animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-green-400/20 rounded-full animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
      </div>
      <div className="border-b border-green-500/30 bg-gradient-to-b from-black/95 via-gray-900/60 to-black/95 backdrop-blur-xl p-3 sm:p-4 shadow-2xl relative z-10">
        <div className="max-w-5xl mx-auto space-y-2 sm:space-y-3">
          <div className="text-center">
            <div className="relative border-2 border-green-500/60 rounded-xl p-3 sm:p-4 md:p-5 bg-gradient-to-br from-black/60 via-gray-900/30 to-black/60 backdrop-blur-md shadow-[0_0_25px_rgba(34,197,94,0.2)] hover:shadow-[0_0_35px_rgba(34,197,94,0.3)] hover:border-green-400/80 transition-all duration-300 group">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/0 via-green-500/4 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10 flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4 md:gap-5">
                <div className="flex-shrink-0">
                  <img 
                    src="/images/profpic.png" 
                    alt="Tich Zvidzayi" 
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-3 border-green-500/60 shadow-[0_0_18px_rgba(34,197,94,0.35)] object-cover hover:border-green-400/80 transition-all duration-300 hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const placeholder = target.nextElementSibling as HTMLElement;
                      if (placeholder) placeholder.style.display = 'flex';
                    }}
                  />
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-3 border-green-500/60 shadow-[0_0_18px_rgba(34,197,94,0.35)] bg-gradient-to-br from-green-500/20 to-cyan-500/20 items-center justify-center text-2xl sm:text-3xl text-green-400 hidden">
                    <FaUser className="m-auto" />
                  </div>
                </div>
                
                <div className="flex-1 text-center sm:text-left min-w-0 w-full sm:w-auto">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-1 font-mono tracking-tight break-words">
                    <span className="bg-gradient-to-r from-green-400 via-cyan-300 to-green-400 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]">
                      Tich Zvidzayi
                    </span>
                  </h1>
                  <p className="text-cyan-300 text-sm sm:text-base mb-1 font-mono font-medium break-words">
                    Full-Stack Software Engineer
                  </p>
                  <p className="text-green-400/70 text-[10px] sm:text-xs font-mono italic break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    Led Agile teams, architected solutions for Insurance & Public Health
                  </p>
                </div>
                
                <div className="flex-shrink-0 flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-green-300/95 font-mono w-full sm:w-auto">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <FaGraduationCap className="text-green-400 text-sm sm:text-base" />
                    <span className="hidden sm:inline">Masters</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <FaBriefcase className="text-green-400 text-sm sm:text-base" />
                    <span className="hidden sm:inline">6+ yrs</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <FaMapMarkerAlt className="text-green-400 text-sm sm:text-base" />
                    <span className="hidden md:inline">Gauteng</span>
                  </div>
                </div>
                
                <div className="flex-shrink-0 flex items-center justify-center gap-3 sm:gap-3 w-full sm:w-auto">
                  <a href="mailto:tzvidzayi@hotmail.com" className="text-green-400 hover:text-green-300 transition-all duration-200 hover:shadow-[0_0_8px_rgba(34,197,94,0.3)] hover:scale-110" title="Email">
                    <FaEnvelope className="text-base sm:text-lg" />
                  </a>
                  <a href="https://github.com/tichzvidzayi" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition-all duration-200 hover:shadow-[0_0_8px_rgba(34,197,94,0.3)] hover:scale-110" title="GitHub">
                    <FaGithub className="text-base sm:text-lg" />
                  </a>
                  <a href="https://linkedin.com/in/tichzvidzayi" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition-all duration-200 hover:shadow-[0_0_8px_rgba(34,197,94,0.3)] hover:scale-110" title="LinkedIn">
                    <FaLinkedin className="text-base sm:text-lg" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="relative border border-green-500/40 rounded-lg p-2 sm:p-3 bg-gradient-to-br from-black/40 via-gray-900/20 to-black/40 backdrop-blur-sm shadow-[0_0_15px_rgba(34,197,94,0.1)]">
            <div className="text-[10px] sm:text-xs text-green-400/80 mb-1.5 sm:mb-2 font-semibold tracking-wider uppercase text-center">Quick Commands</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1.5 sm:gap-2">
              {[
                { cmd: 'help', desc: 'Show help' },
                { cmd: 'about', desc: 'About me' },
                { cmd: 'contact', desc: 'Contact info' },
                { cmd: 'experience', desc: 'Work exp' },
                { cmd: 'skills', desc: 'Tech skills' },
                { cmd: 'education', desc: 'Education' },
                { cmd: 'projects', desc: 'Projects' },
                { cmd: 'certifications', desc: 'Certs' },
                { cmd: 'publications', desc: 'Publications' },
                { cmd: 'softskills', desc: 'Soft skills' },
                { cmd: 'interests', desc: 'Interests' },
                { cmd: 'clear', desc: 'Clear' }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    executeCommandDirectly(item.cmd);
                  }}
                  className="px-2 py-2 sm:py-1.5 text-[10px] sm:text-xs font-mono text-green-300/90 bg-gradient-to-r from-green-500/10 to-cyan-500/5 rounded border border-green-500/30 hover:border-green-400/60 hover:bg-green-500/20 hover:text-green-200 transition-all duration-200 hover:scale-105 hover:shadow-[0_0_8px_rgba(34,197,94,0.2)] cursor-pointer group active:scale-95 break-words min-w-0 touch-manipulation"
                  title={item.desc}
                >
                  <div className="font-semibold text-green-400 group-hover:text-green-300 transition-colors break-words">{item.cmd}</div>
                  <div className="text-[9px] sm:text-[10px] text-green-400/60 group-hover:text-green-400/80 mt-0.5 break-words" style={{ wordBreak: 'break-word' }}>{item.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto terminal-scrollbar relative z-10" ref={terminalRef}>
        <div className="max-w-3xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 overflow-x-hidden">
          {history.map((item, idx) => (
            <div 
              key={idx} 
              className="mb-1 animate-fade-in-smooth"
              style={{ animationDelay: `${idx * 0.02}s` }}
            >
              {item.type === 'command' && (
                <div className="text-cyan-300/90 animate-slide-in-left drop-shadow-[0_0_3px_rgba(34,211,238,0.4)] break-words text-xs sm:text-sm" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <span className="text-blue-400 font-bold">{currentPath}</span>
                  <span className="text-yellow-400 mx-1">$</span> 
                  <span className="text-cyan-300">{item.content}</span>
                </div>
              )}
              {item.type === 'output' && (
                <div className={`${item.content.includes('┌') || item.content.includes('│') || item.content.includes('└') ? 'whitespace-pre overflow-x-auto' : 'whitespace-pre-wrap break-words'} text-green-300/90 leading-relaxed font-mono text-xs sm:text-sm tracking-normal animate-fade-in-smooth drop-shadow-[0_0_2px_rgba(34,197,94,0.3)] ${item.className || ''}`} style={item.content.includes('┌') || item.content.includes('│') || item.content.includes('└') ? {} : { wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  {item.content}
                </div>
              )}
              {item.type === 'error' && (
                <div className="text-red-400 bg-red-900/20 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-red-500/30 animate-shake flex items-center gap-2 break-words text-xs sm:text-sm" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <FaExclamationTriangle className="text-red-500 flex-shrink-0 text-sm sm:text-base" />
                  <span className="break-words">{item.content}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t border-green-500/30 bg-gradient-to-t from-black/90 via-gray-900/50 to-transparent backdrop-blur-sm relative z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center min-w-0">
          <span className="text-blue-400 font-bold mr-1 sm:mr-2 animate-pulse-slow flex-shrink-0 text-sm sm:text-base">{currentPath}</span>
          <span className="text-yellow-400 mr-1 sm:mr-2 flex-shrink-0 text-sm sm:text-base">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 min-w-0 bg-transparent border-none outline-none text-green-300 placeholder-green-600/50 focus:placeholder-green-600/30 transition-all duration-300 focus:text-green-200 text-sm sm:text-base"
            placeholder="Type a command..."
            autoFocus
            autoComplete="off"
          />
          <span className="cursor-blink text-green-400 ml-1 sm:ml-2 text-base sm:text-lg flex-shrink-0">█</span>
        </form>
      </div>

      <footer className="relative z-10 mt-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-green-500/60 to-transparent shadow-[0_0_10px_rgba(34,197,94,0.3)]"></div>
        
        <div className="bg-gradient-to-b from-gray-950/95 via-black/98 to-black border-t-2 border-green-500/40 backdrop-blur-md shadow-[0_-5px_30px_rgba(0,0,0,0.8)]">
          <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4">
            <div className="mb-3 sm:mb-4 flex items-center justify-center">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-green-500/30 to-green-500/30"></div>
              <div className="px-2 sm:px-3">
                <span className="text-green-500/40 text-[10px] sm:text-xs font-mono select-none">◆</span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-green-500/30 via-green-500/30 to-transparent"></div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-[10px] sm:text-xs font-mono">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-green-400/80 break-words">
                <span className="flex items-center gap-1 sm:gap-1.5 break-words">
                  <span className="text-green-500">©</span>
                  <span className="break-words">{new Date().getFullYear()} Tich Zvidzayi</span>
                </span>
                <span className="hidden sm:inline text-green-500/40">|</span>
                <span className="text-green-400/70 break-words text-center sm:text-left" style={{ wordBreak: 'break-word' }}>Built with React & TypeScript</span>
              </div>
              
              <div className="flex items-center gap-3 sm:gap-4">
                <a 
                  href="https://github.com/tichzvidzayi" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-green-400/80 hover:text-green-300 transition-all duration-200 hover:scale-110 hover:shadow-[0_0_8px_rgba(34,197,94,0.3)] touch-manipulation"
                  title="GitHub"
                >
                  <FaGithub className="text-sm sm:text-base" />
                </a>
                <a 
                  href="https://linkedin.com/in/tichzvidzayi" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-green-400/80 hover:text-green-300 transition-all duration-200 hover:scale-110 hover:shadow-[0_0_8px_rgba(34,197,94,0.3)] touch-manipulation"
                  title="LinkedIn"
                >
                  <FaLinkedin className="text-sm sm:text-base" />
                </a>
                <a 
                  href="mailto:tzvidzayi@hotmail.com" 
                  className="text-green-400/80 hover:text-green-300 transition-all duration-200 hover:scale-110 hover:shadow-[0_0_8px_rgba(34,197,94,0.3)] touch-manipulation"
                  title="Email"
                >
                  <FaEnvelope className="text-sm sm:text-base" />
                </a>
              </div>
            </div>
            
            <div className="mt-2 sm:mt-3 text-center">
              <p className="text-green-400/60 text-[9px] sm:text-[10px] font-mono break-words px-2" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                Type <span className="text-green-400/90 font-semibold">help</span> to see available commands
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Terminal;
