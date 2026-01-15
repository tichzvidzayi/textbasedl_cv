import { useState, useRef, useEffect } from 'react';
import { cvData } from '../data/cvData';

interface CommandOutput {
  type: 'command' | 'output' | 'error';
  content: string;
}

const Terminal = () => {
  const calculateExperience = () => {
    const startDate = new Date('2019-11-01'); // Nov 2019
    const now = new Date();
    const years = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365));
    return years;
  };

  const [history, setHistory] = useState<CommandOutput[]>([
    { type: 'output', content: '' },
    { type: 'output', content: '┌─────────────────────────────────────────────────────────────────────────────┐' },
    { type: 'output', content: '│  🚀 QUICK INFO                                                                │' },
    { type: 'output', content: '├─────────────────────────────────────────────────────────────────────────────┤' },
    { type: 'output', content: '│  Full-Stack Software Engineer with 6+ years experience, specializing in      │' },
    { type: 'output', content: '│  micro-frontends and scalable solutions across multiple industries.           │' },
    { type: 'output', content: '└─────────────────────────────────────────────────────────────────────────────┘' },
    { type: 'output', content: '' },
    { type: 'output', content: '💡 Type "help" to see all available commands.' },
    { type: 'output', content: '' }
  ]);
  const [input, setInput] = useState('');
  const [currentPath, setCurrentPath] = useState('~');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const executeCommand = (cmd: string): CommandOutput[] => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const parts = trimmedCmd.split(' ');
    const command = parts[0];
    const args = parts.slice(1);

    switch (command) {
      case 'help':
        return [
          { type: 'output', content: '┌─────────────────────────────────────────────────────────────────────────────┐' },
          { type: 'output', content: '│  📋 AVAILABLE COMMANDS                                                       │' },
          { type: 'output', content: '├─────────────────────────────────────────────────────────────────────────────┤' },
          { type: 'output', content: '│  help          💡 Show this help message                                     │' },
          { type: 'output', content: '│  about         📖 Display professional summary                                │' },
          { type: 'output', content: '│  contact       📞 Show contact information                                   │' },
          { type: 'output', content: '│  experience    💼 Show work experience                                       │' },
          { type: 'output', content: '│  skills        🛠️  Display technical skills                                   │' },
          { type: 'output', content: '│  education     🎓 Show education background                                  │' },
          { type: 'output', content: '│  projects      🚀 List personal projects                                     │' },
          { type: 'output', content: '│  certifications 🏆 Show certifications                                       │' },
          { type: 'output', content: '│  publications  📚 Display academic publications                              │' },
          { type: 'output', content: '│  softskills    🤝 Show soft skills                                           │' },
          { type: 'output', content: '│  interests     ⭐ Show personal interests                                     │' },
          { type: 'output', content: '│  clear         🧹 Clear the terminal                                         │' },
          { type: 'output', content: '│  exit          👋 Close terminal (just refresh page)                         │' },
          { type: 'output', content: '└─────────────────────────────────────────────────────────────────────────────┘' }
        ];

      case 'about':
        return [
          { type: 'output', content: '═══════════════════════════════════════════════════════════════' },
          { type: 'output', content: cvData.summary },
          { type: 'output', content: '═══════════════════════════════════════════════════════════════' }
        ];

      case 'contact':
        return [
          { type: 'output', content: '┌─────────────────────────────────────────────────────────────────────────────┐' },
          { type: 'output', content: '│  📞 CONTACT INFORMATION                                                      │' },
          { type: 'output', content: '├─────────────────────────────────────────────────────────────────────────────┤' },
          { type: 'output', content: `│  👤 Name:     ${cvData.contact.name}` },
          { type: 'output', content: `│  💼 Title:    ${cvData.contact.title}` },
          { type: 'output', content: `│  📍 Location: ${cvData.contact.location}` },
          { type: 'output', content: `│  📱 Phone:    ${cvData.contact.phone}` },
          { type: 'output', content: `│  📧 Email:    ${cvData.contact.email}` },
          { type: 'output', content: `│  🌐 Website:  ${cvData.contact.website}` },
          { type: 'output', content: `│  💻 GitHub:   ${cvData.contact.github}` },
          { type: 'output', content: `│  🔗 LinkedIn: ${cvData.contact.linkedin}` },
          { type: 'output', content: '└─────────────────────────────────────────────────────────────────────────────┘' }
        ];

      case 'experience':
        return [
          { type: 'output', content: '═══════════════════════════════════════════════════════════════' },
          ...cvData.experience.flatMap((exp, idx) => [
            { type: 'output', content: '' },
            { type: 'output', content: `[${idx + 1}] ${exp.title}` },
            { type: 'output', content: `    Company: ${exp.company}, ${exp.location}` },
            { type: 'output', content: `    Period: ${exp.dates}` },
            { type: 'output', content: '    Responsibilities:' },
            ...exp.responsibilities.map(resp => ({
              type: 'output' as const,
              content: `      • ${resp}`
            })),
            { type: 'output', content: `    Technologies: ${exp.technologies.join(', ')}` }
          ]),
          { type: 'output', content: '' },
          { type: 'output', content: '═══════════════════════════════════════════════════════════════' }
        ];

      case 'skills':
        return [
          { type: 'output', content: '═══════════════════════════════════════════════════════════════' },
          { type: 'output', content: 'Frontend Core:' },
          { type: 'output', content: `  ${cvData.skills.frontend.join(', ')}` },
          { type: 'output', content: '' },
          { type: 'output', content: 'UI/UX Tools:' },
          { type: 'output', content: `  ${cvData.skills.uiux.join(', ')}` },
          { type: 'output', content: '' },
          { type: 'output', content: 'APIs & Communication:' },
          { type: 'output', content: `  ${cvData.skills.apis.join(', ')}` },
          { type: 'output', content: '' },
          { type: 'output', content: 'Backend & Integration:' },
          { type: 'output', content: `  ${cvData.skills.backend.join(', ')}` },
          { type: 'output', content: '' },
          { type: 'output', content: 'DevOps & Tools:' },
          { type: 'output', content: `  ${cvData.skills.devops.join(', ')}` },
          { type: 'output', content: '' },
          { type: 'output', content: 'Authorization & Security:' },
          { type: 'output', content: `  ${cvData.skills.security.join(', ')}` },
          { type: 'output', content: '' },
          { type: 'output', content: 'Optimization:' },
          { type: 'output', content: `  ${cvData.skills.optimization.join(', ')}` },
          { type: 'output', content: '═══════════════════════════════════════════════════════════════' }
        ];

      case 'education':
        return [
          { type: 'output', content: '═══════════════════════════════════════════════════════════════' },
          ...cvData.education.flatMap((edu, idx) => [
            { type: 'output', content: '' },
            { type: 'output', content: `[${idx + 1}] ${edu.degree}` },
            { type: 'output', content: `    Institution: ${edu.institution}, ${edu.location}` },
            { type: 'output', content: `    Period: ${edu.dates}` }
          ]),
          { type: 'output', content: '' },
          { type: 'output', content: '═══════════════════════════════════════════════════════════════' }
        ];

      case 'projects':
        return [
          { type: 'output', content: '═══════════════════════════════════════════════════════════════' },
          ...cvData.projects.flatMap((project, idx) => [
            { type: 'output', content: '' },
            { type: 'output', content: `[${idx + 1}] ${project.name}` },
            { type: 'output', content: `    Description: ${project.description}` },
            ...(project.github ? [{ type: 'output' as const, content: `    GitHub: ${project.github}` }] : []),
            ...(project.live ? [{ type: 'output' as const, content: `    Live: ${project.live}` }] : [])
          ]),
          { type: 'output', content: '' },
          { type: 'output', content: '═══════════════════════════════════════════════════════════════' }
        ];

      case 'certifications':
        return [
          { type: 'output', content: '═══════════════════════════════════════════════════════════════' },
          ...cvData.certifications.flatMap((cert, idx) => [
            { type: 'output', content: `[${idx + 1}] ${cert.platform}: ${cert.name}` }
          ]),
          { type: 'output', content: '═══════════════════════════════════════════════════════════════' }
        ];

      case 'publications':
        return [
          { type: 'output', content: '═══════════════════════════════════════════════════════════════' },
          ...cvData.publications.map(pub => ({
            type: 'output' as const,
            content: `• ${pub}`
          })),
          { type: 'output', content: '═══════════════════════════════════════════════════════════════' }
        ];

      case 'softskills':
        return [
          { type: 'output', content: '═══════════════════════════════════════════════════════════════' },
          ...cvData.softSkills.map(skill => ({
            type: 'output' as const,
            content: `• ${skill}`
          })),
          { type: 'output', content: '═══════════════════════════════════════════════════════════════' }
        ];

      case 'interests':
        return [
          { type: 'output', content: '═══════════════════════════════════════════════════════════════' },
          { type: 'output', content: cvData.interests.join(', ') },
          { type: 'output', content: '═══════════════════════════════════════════════════════════════' }
        ];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const commandOutput: CommandOutput = { type: 'command', content: input };
    const results = executeCommand(input);

    setHistory(prev => [...prev, commandOutput, ...results, { type: 'output', content: '' }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-green-400 font-mono overflow-hidden flex flex-col">
      {/* Fixed Header */}
      <div className="border-b border-green-500/30 bg-gradient-to-b from-black via-gray-900/50 to-black backdrop-blur-xl p-6 shadow-2xl">
        <div className="max-w-5xl mx-auto">
          {/* Quote Outside Banner */}
          <div className="text-center mb-5">
            <p className="text-green-400 text-sm italic font-mono tracking-wider relative inline-block">
              <span className="absolute -left-6 top-0 text-green-500 animate-pulse">⚡</span>
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Writing the future, one commit at a time
              </span>
              <span className="absolute -right-6 top-0 text-green-500">📜➡️💾</span>
            </p>
          </div>
          
          {/* Banner */}
          <div className="text-center">
            <div className="relative border-2 border-green-500/60 rounded-2xl p-8 bg-gradient-to-br from-black/60 via-gray-900/30 to-black/60 backdrop-blur-md shadow-[0_0_30px_rgba(34,197,94,0.2)] hover:shadow-[0_0_40px_rgba(34,197,94,0.3)] hover:border-green-400/80 transition-all duration-500 group">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <h1 className="text-5xl font-bold mb-3 font-mono tracking-tight">
                  <span className="bg-gradient-to-r from-green-400 via-cyan-300 to-green-400 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]">
                    Tich Zvidzayi
                  </span>
                </h1>
                <p className="text-cyan-300 text-xl mb-2 font-mono font-medium tracking-wide">
                  Full-Stack Software Engineer
                </p>
                <p className="text-green-400/70 text-sm mb-6 font-mono italic">
                  Led Agile teams, architected solutions for Insurance & Public Health
                </p>
                
                <div className="space-y-3 text-sm text-green-300/95 font-mono">
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-lg">🎓</span>
                    <span className="font-medium">Masters in CS</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-lg">💼</span>
                    <span className="font-medium">6+ years exp</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-lg">📍</span>
                    <span className="font-medium">Gauteng, South Africa</span>
                  </div>
                  
                  {/* Industries */}
                  <div className="pt-4 mt-4 border-t border-green-500/30">
                    <div className="text-xs text-green-400/80 mb-3 font-semibold tracking-wider uppercase">Industries</div>
                    <div className="flex flex-wrap justify-center gap-2.5 text-xs">
                      <span className="px-3 py-1.5 bg-gradient-to-r from-green-500/15 to-cyan-500/10 rounded-lg border border-green-500/30 text-green-300 hover:bg-green-500/20 hover:border-green-400/50 transition-all duration-200 cursor-default shadow-sm">
                        Public Health
                      </span>
                      <span className="px-3 py-1.5 bg-gradient-to-r from-green-500/15 to-cyan-500/10 rounded-lg border border-green-500/30 text-green-300 hover:bg-green-500/20 hover:border-green-400/50 transition-all duration-200 cursor-default shadow-sm">
                        Smart Logistics
                      </span>
                      <span className="px-3 py-1.5 bg-gradient-to-r from-green-500/15 to-cyan-500/10 rounded-lg border border-green-500/30 text-green-300 hover:bg-green-500/20 hover:border-green-400/50 transition-all duration-200 cursor-default shadow-sm">
                        Automotive
                      </span>
                      <span className="px-3 py-1.5 bg-gradient-to-r from-green-500/15 to-cyan-500/10 rounded-lg border border-green-500/30 text-green-300 hover:bg-green-500/20 hover:border-green-400/50 transition-all duration-200 cursor-default shadow-sm">
                        Insurance
                      </span>
                    </div>
                  </div>
                  
                  {/* Contact Links */}
                  <div className="pt-4 mt-4 border-t border-green-500/30 space-y-2.5">
                    <div>
                      <a href="mailto:tzvidzayi@hotmail.com" className="text-green-400 hover:text-green-300 transition-all duration-200 hover:underline hover:shadow-[0_0_8px_rgba(34,197,94,0.3)] inline-block">
                        📧 tzvidzayi@hotmail.com
                      </a>
                    </div>
                    <div>
                      <a href="https://github.com/tichzvidzayi" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition-all duration-200 hover:underline hover:shadow-[0_0_8px_rgba(34,197,94,0.3)] inline-block">
                        💻 github.com/tichzvidzayi
                      </a>
                    </div>
                    <div>
                      <a href="https://linkedin.com/in/tichzvidzayi" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition-all duration-200 hover:underline hover:shadow-[0_0_8px_rgba(34,197,94,0.3)] inline-block">
                        🔗 linkedin.com/in/tichzvidzayi
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Terminal Area */}
      <div className="flex-1 overflow-y-auto terminal-scrollbar p-4" ref={terminalRef}>
        {history.map((item, idx) => (
          <div key={idx} className="mb-1">
            {item.type === 'command' && (
              <div className="text-cyan-300">
                <span className="text-blue-400 font-bold">{currentPath}</span>
                <span className="text-yellow-400 mx-1">$</span> 
                <span className="text-cyan-300">{item.content}</span>
              </div>
            )}
            {item.type === 'output' && (
              <div className="whitespace-pre-wrap text-green-300 leading-relaxed font-mono text-sm">{item.content}</div>
            )}
            {item.type === 'error' && (
              <div className="text-red-400 bg-red-900/20 px-2 py-1 rounded">{item.content}</div>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center mt-2 border-t border-green-500/30 pt-2">
        <span className="text-blue-400 font-bold mr-2">{currentPath}</span>
        <span className="text-yellow-400 mr-2">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-green-300 placeholder-green-600"
          placeholder="Type a command..."
          autoFocus
        />
        <span className="cursor-blink text-green-400 ml-1 text-lg">█</span>
      </form>
    </div>
  );
};

export default Terminal;
