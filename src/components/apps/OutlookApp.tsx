import React, { useState } from 'react';
import { KEN_CONTACT } from '../../data/portfolioData';
import { soundFX } from '../../utils/sound';
import { Mail, Send, Paperclip, Check, AlertCircle } from 'lucide-react';

interface OutlookAppProps {
  onClose?: () => void;
}

export const OutlookApp: React.FC<OutlookAppProps> = ({ onClose }) => {
  const [fromEmail, setFromEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendProgress, setSendProgress] = useState(0);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromEmail.trim() || !fromEmail.includes('@')) {
      soundFX.playDing();
      setErrorMsg('Please specify a valid sender email address.');
      return;
    }
    if (!subject.trim()) {
      soundFX.playDing();
      setErrorMsg('Please enter a subject line for your message.');
      return;
    }
    if (!body.trim()) {
      soundFX.playDing();
      setErrorMsg('Please write your message body.');
      return;
    }

    setErrorMsg('');
    setIsSending(true);
    setSendProgress(10);
    soundFX.playClick();

    // Vintage SMTP transmission progress simulation
    const interval = setInterval(() => {
      setSendProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            setIsSending(false);
            setSentSuccess(true);
            soundFX.playMailSent();

            // Also prepare mailto draft for user's email client
            const mailtoUrl = `mailto:${KEN_CONTACT.email}?subject=${encodeURIComponent(
              subject
            )}&body=${encodeURIComponent(
              `From: ${senderName || 'Visitor'} <${fromEmail}>\n\n${body}`
            )}`;
            window.open(mailtoUrl, '_blank');
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 180);
  };

  const handleReset = () => {
    setFromEmail('');
    setSenderName('');
    setSubject('');
    setBody('');
    setSentSuccess(false);
    setErrorMsg('');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#c0c0c0] text-[12px] overflow-hidden select-none relative">
      {/* Outlook Menu Bar */}
      <div className="flex items-center gap-1 border-b border-[#808080] bg-[#c0c0c0] px-1 py-[2px] text-[11px]">
        {['File', 'Edit', 'View', 'Insert', 'Format', 'Tools', 'Message', 'Help'].map((item) => (
          <span
            key={item}
            className="px-2 py-[2px] cursor-default hover:bg-[#000080] hover:text-white"
            onClick={() => soundFX.playClick()}
          >
            <u>{item[0]}</u>{item.slice(1)}
          </span>
        ))}
      </div>

      {/* Outlook Express Toolbar */}
      <div className="flex items-center gap-1 px-1 py-1 border-b border-[#808080] bg-[#c0c0c0] text-[11px] overflow-x-auto">
        <button
          type="button"
          onClick={handleSend}
          className="win98-btn flex items-center gap-1 py-1 px-2.5 font-bold text-[#000080]"
          title="Send Mail"
        >
          <Send size={13} className="text-[#000080]" />
          <span>Send</span>
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="win98-btn flex items-center gap-1 py-1 px-2"
          title="Clear Form"
        >
          <span>Clear</span>
        </button>

        <div className="w-[1px] h-5 bg-[#808080] border-r border-white mx-1" />

        <button
          type="button"
          onClick={() => {
            soundFX.playClick();
            alert('Attachment simulation: File "Resume_Ken_Cherian.pdf" attached.');
          }}
          className="win98-btn flex items-center gap-1 py-1 px-2"
        >
          <Paperclip size={12} />
          <span>Attach</span>
        </button>

        <span className="text-[10px] text-[#666] ml-auto pr-2">
          Direct SMTP Dispatch to {KEN_CONTACT.email}
        </span>
      </div>

      {/* Email Header Fields */}
      <form onSubmit={handleSend} className="flex-1 flex flex-col p-2 space-y-1 overflow-hidden">
        {errorMsg && (
          <div className="win98-sunken p-1.5 bg-[#ffebee] border border-[#d32f2f] text-[#c62828] text-[11px] flex items-center gap-2">
            <AlertCircle size={14} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="flex items-center text-[11px]">
          <label className="w-16 text-[#333] font-bold text-right pr-2"><u>T</u>o:</label>
          <div className="flex-1 win98-sunken px-2 py-0.5 bg-[#f0f0f0] text-black font-semibold truncate flex items-center justify-between">
            <span>Ken Cherian &lt;{KEN_CONTACT.email}&gt;</span>
            <span className="text-[10px] text-[#666]">[Primary Inbox]</span>
          </div>
        </div>

        <div className="flex items-center text-[11px]">
          <label className="w-16 text-[#333] font-bold text-right pr-2"><u>F</u>rom:</label>
          <input
            type="email"
            placeholder="your-email@domain.com"
            value={fromEmail}
            onChange={(e) => setFromEmail(e.target.value)}
            required
            className="flex-1 win98-sunken px-2 py-0.5 bg-white text-black outline-none font-sans text-[11px]"
          />
        </div>

        <div className="flex items-center text-[11px]">
          <label className="w-16 text-[#333] font-bold text-right pr-2"><u>N</u>ame:</label>
          <input
            type="text"
            placeholder="Recruiter or Visitor Name"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="flex-1 win98-sunken px-2 py-0.5 bg-white text-black outline-none font-sans text-[11px]"
          />
        </div>

        <div className="flex items-center text-[11px]">
          <label className="w-16 text-[#333] font-bold text-right pr-2"><u>S</u>ubject:</label>
          <input
            type="text"
            placeholder="Role Opportunity / Collaboration / Inquiry"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="flex-1 win98-sunken px-2 py-0.5 bg-white text-black outline-none font-sans text-[11px]"
          />
        </div>

        {/* Mail Body Area */}
        <div className="flex-1 pt-1 flex flex-col">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Dear Ken,&#10;&#10;I came across your Windows 98 Web OS portfolio and project systems..."
            spellCheck={false}
            className="w-full flex-1 win98-sunken p-3 text-[12px] leading-relaxed font-sans outline-none resize-none bg-white text-black selection:bg-[#000080] selection:text-white"
          />
        </div>

        {/* Send Action Footer */}
        <div className="pt-1 flex items-center justify-between">
          <span className="text-[10px] text-[#666]">
            Encrypted with 128-bit SSL simulation
          </span>
          <button
            type="submit"
            className="win98-btn px-6 py-1 font-bold text-[11px]"
          >
            Send Message Now
          </button>
        </div>
      </form>

      {/* Sending Progress Dialog */}
      {isSending && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
          <div className="win98-outset w-80 p-3 shadow-2xl">
            <div className="win98-title-active flex items-center justify-between px-2 py-1 mb-3">
              <span className="font-bold text-white text-[11px]">Outlook Express - Sending</span>
            </div>
            <div className="px-2 py-2 space-y-2">
              <div className="flex items-center gap-2">
                <Mail size={24} className="text-[#000080] animate-bounce" />
                <div className="text-[11px]">
                  Connecting to mail.kencherian.com (SMTP)...
                  <div className="text-[10px] text-[#666]">Transmitting packet 1 of 1</div>
                </div>
              </div>
              {/* Retro Progress Bar */}
              <div className="win98-sunken h-5 p-[2px] bg-white">
                <div
                  style={{ width: `${sendProgress}%` }}
                  className="h-full bg-[#000080] transition-all duration-150 flex items-center justify-center"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Dialog */}
      {sentSuccess && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
          <div className="win98-outset w-80 p-3 shadow-2xl">
            <div className="win98-title-active flex items-center justify-between px-2 py-1 mb-2">
              <span className="font-bold text-white text-[11px]">Message Dispatched</span>
              <button
                type="button"
                className="win98-ctrl-btn"
                onClick={() => setSentSuccess(false)}
              >
                ✕
              </button>
            </div>
            <div className="p-3 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-green-100 border border-green-500 mx-auto flex items-center justify-center">
                <Check size={20} className="text-green-700" />
              </div>
              <div className="font-bold text-[12px] text-green-900">
                Transmission Successful!
              </div>
              <p className="text-[11px] text-gray-700">
                Your message has been queued for Ken Cherian ({KEN_CONTACT.email}).
                Your default email client has also opened to finalize the delivery.
              </p>
            </div>
            <div className="flex justify-center gap-2 pt-2">
              <button
                type="button"
                className="win98-btn px-6 font-bold"
                onClick={() => {
                  setSentSuccess(false);
                  onClose?.();
                }}
              >
                Close Mailer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
