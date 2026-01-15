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
}

const Terminal = () => {
  const BOX_WIDTH = 70;
  
  const createBox = (title: string, lines: string[]): string[] => {
    const separator = '─'.repeat(BOX_WIDTH);
    
    return [
      separator,
      `  ${title}`,
      separator,
      ...lines.map(line => `  ${line}`),
      separator
    ];
  };


  const [history, setHistory] = useState<CommandOutput[]>([
    { type: 'output', content: '' },
    ...createBox('QUICK INFO', [
      'Full-Stack Software Engineer with 6+ years experience, specializing in',
      'micro-frontends and scalable solutions across multiple industries.'
    ]).map(content => ({ type: 'output' as const, content })),
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
      terminalRef.current.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: 'smooth'
      });
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
        ]).map(content => ({ type: 'output' as const, content }));

      case 'about':
        const summaryLines = cvData.summary.split('\n').filter(line => line.trim());
        return createBox('ABOUT', summaryLines).map(content => ({ type: 'output' as const, content }));

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
        return createBox('CONTACT INFORMATION', contactLines).map(content => ({ type: 'output' as const, content }));

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
        return createBox('WORK EXPERIENCE', experienceLines).map(content => ({ type: 'output' as const, content }));

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
        return createBox('TECHNICAL SKILLS', skillsLines).map(content => ({ type: 'output' as const, content }));

      case 'education':
        const educationLines = cvData.education.flatMap((edu, idx) => [
          '',
          `[${idx + 1}] ${edu.degree}`,
          `    Institution: ${edu.institution}, ${edu.location}`,
          `    Period: ${edu.dates}`
        ]);
        return createBox('EDUCATION', educationLines).map(content => ({ type: 'output' as const, content }));

      case 'projects':
        const projectLines = cvData.projects.flatMap((project, idx) => [
          '',
          `[${idx + 1}] ${project.name}`,
          `    Description: ${project.description}`,
          ...(project.github ? [`    GitHub: ${project.github}`] : []),
          ...(project.live ? [`    Live: ${project.live}`] : [])
        ]);
        return createBox('PROJECTS', projectLines).map(content => ({ type: 'output' as const, content }));

      case 'certifications':
        const certLines = cvData.certifications.map((cert, idx) => 
          `[${idx + 1}] ${cert.platform}: ${cert.name}`
        );
        return createBox('CERTIFICATIONS', certLines).map(content => ({ type: 'output' as const, content }));

      case 'publications':
        const pubLines = cvData.publications.map(pub => `• ${pub}`);
        return createBox('PUBLICATIONS', pubLines).map(content => ({ type: 'output' as const, content }));

      case 'softskills':
        const softSkillsLines = cvData.softSkills.map(skill => `• ${skill}`);
        return createBox('SOFT SKILLS', softSkillsLines).map(content => ({ type: 'output' as const, content }));

      case 'interests':
        return createBox('INTERESTS', [cvData.interests.join(', ')]).map(content => ({ type: 'output' as const, content }));

      case 'clear':
        return [];

      case 'exit':
        return [
          { type: 'output', content: 'Thanks for visiting! Refresh the page to restart.' }
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
    
    // Handle clear command specially - immediately clear all history
    if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    }

    const commandOutput: CommandOutput = { type: 'command', content: cmd };
    const results = executeCommand(cmd);

    setHistory(prev => [...prev, commandOutput, ...results, { type: 'output', content: '' }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const trimmedInput = input.trim().toLowerCase();
    
    // Handle clear command specially - immediately clear all history
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
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-green-500/30 rounded-full animate-pulse" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-500/30 rounded-full animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-green-400/20 rounded-full animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
      </div>
      {/* Fixed Header */}
      <div className="border-b border-green-500/30 bg-gradient-to-b from-black/95 via-gray-900/60 to-black/95 backdrop-blur-xl p-4 shadow-2xl relative z-10">
        <div className="max-w-5xl mx-auto space-y-3">
          {/* Profile Banner */}
          <div className="text-center">
            <div className="relative border-2 border-green-500/60 rounded-xl p-5 bg-gradient-to-br from-black/60 via-gray-900/30 to-black/60 backdrop-blur-md shadow-[0_0_25px_rgba(34,197,94,0.2)] hover:shadow-[0_0_35px_rgba(34,197,94,0.3)] hover:border-green-400/80 transition-all duration-300 group">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/0 via-green-500/4 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10 flex items-center gap-5">
                {/* Profile Picture */}
                <div className="flex-shrink-0">
                  <img 
                    src="/images/profpic.png" 
                    alt="Tich Zvidzayi" 
                    className="w-20 h-20 rounded-full border-3 border-green-500/60 shadow-[0_0_18px_rgba(34,197,94,0.35)] object-cover hover:border-green-400/80 transition-all duration-300 hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const placeholder = target.nextElementSibling as HTMLElement;
                      if (placeholder) placeholder.style.display = 'flex';
                    }}
                  />
                  <div className="w-20 h-20 rounded-full border-3 border-green-500/60 shadow-[0_0_18px_rgba(34,197,94,0.35)] bg-gradient-to-br from-green-500/20 to-cyan-500/20 items-center justify-center text-3xl text-green-400 hidden">
                    <FaUser className="m-auto" />
                  </div>
                </div>
                
                {/* Name and Title */}
                <div className="flex-1 text-left">
                  <h1 className="text-3xl font-bold mb-1 font-mono tracking-tight">
                    <span className="bg-gradient-to-r from-green-400 via-cyan-300 to-green-400 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]">
                      Tich Zvidzayi
                    </span>
                  </h1>
                  <p className="text-cyan-300 text-base mb-1 font-mono font-medium">
                    Full-Stack Software Engineer
                  </p>
                  <p className="text-green-400/70 text-xs font-mono italic">
                    Led Agile teams, architected solutions for Insurance & Public Health
                  </p>
                </div>
                
                {/* Quick Info Icons */}
                <div className="flex-shrink-0 flex items-center gap-4 text-sm text-green-300/95 font-mono">
                  <div className="flex items-center gap-2">
                    <FaGraduationCap className="text-green-400" />
                    <span className="hidden sm:inline">Masters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBriefcase className="text-green-400" />
                    <span className="hidden sm:inline">6+ yrs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-green-400" />
                    <span className="hidden md:inline">Gauteng</span>
                  </div>
                </div>
                
                {/* Contact Links */}
                <div className="flex-shrink-0 flex items-center gap-3">
                  <a href="mailto:tzvidzayi@hotmail.com" className="text-green-400 hover:text-green-300 transition-all duration-200 hover:shadow-[0_0_8px_rgba(34,197,94,0.3)] hover:scale-110" title="Email">
                    <FaEnvelope className="text-lg" />
                  </a>
                  <a href="https://github.com/tichzvidzayi" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition-all duration-200 hover:shadow-[0_0_8px_rgba(34,197,94,0.3)] hover:scale-110" title="GitHub">
                    <FaGithub className="text-lg" />
                  </a>
                  <a href="https://linkedin.com/in/tichzvidzayi" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition-all duration-200 hover:shadow-[0_0_8px_rgba(34,197,94,0.3)] hover:scale-110" title="LinkedIn">
                    <FaLinkedin className="text-lg" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Command Reference Table */}
          <div className="relative border border-green-500/40 rounded-lg p-3 bg-gradient-to-br from-black/40 via-gray-900/20 to-black/40 backdrop-blur-sm shadow-[0_0_15px_rgba(34,197,94,0.1)]">
            <div className="text-xs text-green-400/80 mb-2 font-semibold tracking-wider uppercase text-center">Quick Commands</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
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
                  className="px-2 py-1.5 text-xs font-mono text-green-300/90 bg-gradient-to-r from-green-500/10 to-cyan-500/5 rounded border border-green-500/30 hover:border-green-400/60 hover:bg-green-500/20 hover:text-green-200 transition-all duration-200 hover:scale-105 hover:shadow-[0_0_8px_rgba(34,197,94,0.2)] cursor-pointer group active:scale-95"
                  title={item.desc}
                >
                  <div className="font-semibold text-green-400 group-hover:text-green-300 transition-colors">{item.cmd}</div>
                  <div className="text-[10px] text-green-400/60 group-hover:text-green-400/80 mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Terminal Area - Centered */}
      <div className="flex-1 overflow-y-auto terminal-scrollbar relative z-10" ref={terminalRef}>
        <div className="max-w-3xl mx-auto px-6 py-6">
          {history.map((item, idx) => (
            <div 
              key={idx} 
              className="mb-1 animate-fade-in-smooth"
              style={{ animationDelay: `${idx * 0.02}s` }}
            >
              {item.type === 'command' && (
                <div className="text-cyan-300/90 animate-slide-in-left drop-shadow-[0_0_3px_rgba(34,211,238,0.4)]">
                  <span className="text-blue-400 font-bold">{currentPath}</span>
                  <span className="text-yellow-400 mx-1">$</span> 
                  <span className="text-cyan-300">{item.content}</span>
                </div>
              )}
              {item.type === 'output' && (
                <div className="whitespace-pre text-green-300/90 leading-relaxed font-mono text-sm tracking-normal animate-fade-in-smooth drop-shadow-[0_0_2px_rgba(34,197,94,0.3)]">
                  {item.content}
                </div>
              )}
              {item.type === 'error' && (
                <div className="text-red-400 bg-red-900/20 px-3 py-2 rounded-lg border border-red-500/30 animate-shake flex items-center gap-2">
                  <FaExclamationTriangle className="text-red-500" />
                  <span>{item.content}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Input Area - Centered */}
      <div className="border-t border-green-500/30 bg-gradient-to-t from-black/90 via-gray-900/50 to-transparent backdrop-blur-sm relative z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-6 py-4 flex items-center">
          <span className="text-blue-400 font-bold mr-2 animate-pulse-slow">{currentPath}</span>
          <span className="text-yellow-400 mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-green-300 placeholder-green-600/50 focus:placeholder-green-600/30 transition-all duration-300 focus:text-green-200"
            placeholder="Type a command..."
            autoFocus
          />
          <span className="cursor-blink text-green-400 ml-2 text-lg">█</span>
        </form>
      </div>
    </div>
  );
};

export default Terminal;
