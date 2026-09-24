import React, { useState, useRef, useEffect } from 'react';
import { KEN_BIO, KEN_CONTACT, PROJECTS } from '../../data/portfolioData';
import { soundFX } from '../../utils/sound';

interface HistoryItem {
  command?: string;
  output: React.ReactNode;
}

interface DosPromptAppProps {
  onClose?: () => void;
  onOpenWindow?: (id: 'resume' | 'mail' | 'explorer' | 'notepad') => void;
}

export const DosPromptApp: React.FC<DosPromptAppProps> = ({ onClose, onOpenWindow }) => {
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      output: (
        <div className="text-[#a0a0a0] mb-2 leading-tight">
          <div>Microsoft(R) Windows 98</div>
          <div>(C)Copyright Microsoft Corp 1981-1998.</div>
          <div className="mt-2 text-[#00ff66]">
            Ken Cherian Personal Telemetry & Terminal Environment.
          </div>
          <div>Type <span className="text-white font-bold">&apos;help&apos;</span> to inspect available subsystem commands.</div>
        </div>
      ),
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) {
      setHistory(prev => [...prev, { command: '', output: null }]);
      return;
    }

    soundFX.playClick();
    setCmdHistory(prev => [...prev, trimmed]);
    setHistoryIdx(-1);

    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    let outputNode: React.ReactNode = null;

    switch (mainCmd) {
      case 'help':
        outputNode = (
          <div className="space-y-1 text-[#cccccc] my-1 font-mono text-[12px]">
            <div className="text-[#ffff55] font-bold">AVAILABLE COMMANDS:</div>
            <div className="grid grid-cols-12 gap-1 text-[11px]">
              <span className="col-span-4 text-white font-bold">HELP</span>
              <span className="col-span-8 text-[#aaa]">Displays list of supported terminal commands</span>
              <span className="col-span-4 text-white font-bold">CLS</span>
              <span className="col-span-8 text-[#aaa]">Clears the MS-DOS screen</span>
              <span className="col-span-4 text-white font-bold">TYPE ABOUT.TXT</span>
              <span className="col-span-8 text-[#aaa]">Prints Ken Cherian&apos;s biography</span>
              <span className="col-span-4 text-white font-bold">DIR [PROJECTS]</span>
              <span className="col-span-8 text-[#aaa]">Lists directory tree of projects</span>
              <span className="col-span-4 text-white font-bold">CONTACT</span>
              <span className="col-span-8 text-[#aaa]">Outputs encrypted transmission & social handles</span>
              <span className="col-span-4 text-white font-bold">GITHUB</span>
              <span className="col-span-8 text-[#aaa]">Launches Ken&apos;s GitHub in a new browser tab</span>
              <span className="col-span-4 text-white font-bold">LINKEDIN</span>
              <span className="col-span-8 text-[#aaa]">Launches Ken&apos;s LinkedIn in a new browser tab</span>
              <span className="col-span-4 text-white font-bold">SUDO</span>
              <span className="col-span-8 text-[#aaa]">Elevated privilege access attempt</span>
              <span className="col-span-4 text-white font-bold">RESUME</span>
              <span className="col-span-8 text-[#aaa]">Opens Acrobat Reader with Ken&apos;s resume</span>
              <span className="col-span-4 text-white font-bold">VER</span>
              <span className="col-span-8 text-[#aaa]">Displays Windows 98 kernel version</span>
              <span className="col-span-4 text-white font-bold">EXIT</span>
              <span className="col-span-8 text-[#aaa]">Terminates the command prompt session</span>
            </div>
          </div>
        );
        break;

      case 'cls':
        setHistory([]);
        return;

      case 'type':
        if (arg === 'about.txt' || arg === 'about') {
          outputNode = (
            <div className="my-2 p-2 bg-[#111111] border border-[#333333] text-[#e0e0e0] leading-relaxed whitespace-pre-line font-mono text-[12px]">
              {KEN_BIO}
            </div>
          );
        } else {
          outputNode = (
            <div className="text-[#ff5555]">
              File not found - {parts.slice(1).join(' ') || 'Specify file name (e.g., TYPE ABOUT.TXT)'}
            </div>
          );
        }
        break;

      case 'dir':
        outputNode = (
          <div className="my-1 font-mono text-[11px] leading-tight space-y-1">
            <div className="text-[#888]"> Volume in drive C has no label.</div>
            <div className="text-[#888]"> Volume Serial Number is 1998-KC01</div>
            <div className="text-[#ffff55] my-1"> Directory of C:\KEN\PROJECTS</div>
            <div className="border-t border-[#444] pt-1">
              {['Cybersecurity', 'Full-Stack', 'Machine-Learning', 'Data-Visualization'].map((cat) => {
                const catProjects = PROJECTS.filter(p => p.category.toLowerCase() === cat.toLowerCase());
                return (
                  <div key={cat} className="mb-2">
                    <div className="text-[#00ffff] font-bold">&lt;DIR&gt; \{cat}</div>
                    {catProjects.map((p) => (
                      <div key={p.id} className="pl-4 flex justify-between text-[#ccc] hover:text-white">
                        <span>{p.title.padEnd(28, ' ')} [{(p.fileSize || '1024 KB').padStart(10, ' ')}]</span>
                        <span className="text-[#888]">{p.category}</span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
            <div className="border-t border-[#444] pt-1 text-[#aaa]">
              <div>10 File(s)       32,475,136 bytes</div>
              <div> 4 Dir(s)        4,194,304,000 bytes free</div>
            </div>
          </div>
        );
        break;

      case 'sudo':
        soundFX.playDing();
        outputNode = (
          <div className="text-[#ff5555] font-bold my-1">
            Bad command or file name. Security Event Logged!
            <div className="text-[10px] text-[#ffaaaa] font-normal">
              Incident reported to SOC administrator (/var/log/audit.log).
            </div>
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="my-2 p-2 border border-[#00ff66] bg-[#002200] text-[#00ff66] font-mono text-[12px] space-y-1">
            <div className="text-white font-bold pb-1 border-b border-[#00aa44]">
              [TRANSMISSION INCOMING: KEN CHERIAN CONTACT DISPATCH]
            </div>
            <div>Name: {KEN_CONTACT.name}</div>
            <div>Institution: {KEN_CONTACT.institution}</div>
            <div>Location: {KEN_CONTACT.location}</div>
            <div>Email: <a href={`mailto:${KEN_CONTACT.email}`} className="text-yellow-300 underline">{KEN_CONTACT.email}</a></div>
            <div>LinkedIn: <a href={KEN_CONTACT.linkedin} target="_blank" rel="noreferrer" className="text-yellow-300 underline">{KEN_CONTACT.linkedin}</a></div>
            <div>GitHub: <a href={KEN_CONTACT.github} target="_blank" rel="noreferrer" className="text-yellow-300 underline">{KEN_CONTACT.github}</a></div>
          </div>
        );
        break;

      case 'github':
        window.open(KEN_CONTACT.github, '_blank');
        outputNode = <div className="text-[#00ff66]">Opening {KEN_CONTACT.github} in browser...</div>;
        break;

      case 'linkedin':
        window.open(KEN_CONTACT.linkedin, '_blank');
        outputNode = <div className="text-[#00ff66]">Opening {KEN_CONTACT.linkedin} in browser...</div>;
        break;

      case 'resume':
        onOpenWindow?.('resume');
        outputNode = <div className="text-[#00ff66]">Spawning Adobe Acrobat Reader (Resume_Ken_Cherian.pdf)...</div>;
        break;

      case 'mail':
        onOpenWindow?.('mail');
        outputNode = <div className="text-[#00ff66]">Spawning Outlook Express to kencherian16@gmail.com...</div>;
        break;

      case 'ver':
        outputNode = <div className="text-[#ccc]">Microsoft Windows 98 [Version 4.10.1998] (Kernel 2.0.4)</div>;
        break;

      case 'date':
        outputNode = <div className="text-[#ccc]">Current system date is: {new Date().toLocaleDateString()}</div>;
        break;

      case 'time':
        outputNode = <div className="text-[#ccc]">Current system time is: {new Date().toLocaleTimeString()}</div>;
        break;

      case 'exit':
        onClose?.();
        return;

      default:
        outputNode = (
          <div className="text-[#ff5555]">
            Bad command or file name &apos;{trimmed}&apos;. Type &apos;help&apos; for list of commands.
          </div>
        );
        break;
    }

    setHistory(prev => [...prev, { command: trimmed, output: outputNode }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInputVal(cmdHistory[nextIdx]);
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (historyIdx === -1) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= cmdHistory.length) {
        setHistoryIdx(-1);
        setInputVal('');
      } else {
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
      e.preventDefault();
    }
  };

  return (
    <div
      className="flex-1 flex flex-col h-full bg-[#000000] text-[#c0c0c0] font-mono text-[12px] p-2 overflow-y-auto cursor-text selection:bg-[#c0c0c0] selection:text-black"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Output Stream */}
      <div className="flex-1 space-y-1">
        {history.map((item, idx) => (
          <div key={idx} className="leading-tight">
            {item.command !== undefined && (
              <div className="flex items-center text-white">
                <span className="text-[#aaaaaa] mr-2">C:\KEN&gt;</span>
                <span>{item.command}</span>
              </div>
            )}
            {item.output}
          </div>
        ))}

        {/* Active Command Input Line */}
        <div className="flex items-center text-white pt-1">
          <span className="text-[#aaaaaa] mr-2 shrink-0">C:\KEN&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 bg-transparent text-white outline-none border-none p-0 font-mono text-[12px] caret-transparent"
          />
          <span className="w-2 h-3.5 bg-white animate-pulse shrink-0 inline-block -ml-1" />
        </div>

        <div ref={terminalBottomRef} />
      </div>
    </div>
  );
};
