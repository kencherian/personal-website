import React, { useState } from 'react';
import { KEN_BIO, KEN_CONTACT, PROJECTS, RESUME_DATA } from '../../data/portfolioData';
import { ProjectCategory } from '../../types';
import { soundFX } from '../../utils/sound';
import {
  Monitor,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  GraduationCap,
  ShieldCheck,
  Users,
  Copy,
  Check,
  Send,
  Code2,
} from 'lucide-react';

interface ClassicResumeViewProps {
  onSwitchToDesktopOS: () => void;
}

export const ClassicResumeView: React.FC<ClassicResumeViewProps> = ({ onSwitchToDesktopOS }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'All'>('All');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [contactSubject, setContactSubject] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [msgSent, setMsgSent] = useState(false);

  const categories: (ProjectCategory | 'All')[] = [
    'All',
    'Cybersecurity',
    'Full-Stack',
    'Machine-Learning',
    'Data-Visualization',
  ];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(KEN_CONTACT.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail || !contactMsg) return;
    const mailto = `mailto:${KEN_CONTACT.email}?subject=${encodeURIComponent(
      contactSubject || 'Portfolio Inquiry'
    )}&body=${encodeURIComponent(
      `From: ${contactEmail}\n\n${contactMsg}`
    )}`;
    window.open(mailto, '_blank');
    setMsgSent(true);
    setTimeout(() => setMsgSent(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-900 font-sans-modern antialiased selection:bg-blue-900 selection:text-white pb-20">
      {/* Top Bar Contract: 3 zones */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Zone 1: Single element brand */}
          <a href="#hero" className="font-bold tracking-tight text-stone-950 text-lg sm:text-xl">
            Ken Cherian
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
            <a href="#about" className="hover:text-stone-950 transition-colors">About</a>
            <a href="#projects" className="hover:text-stone-950 transition-colors">Projects</a>
            <a href="#education" className="hover:text-stone-950 transition-colors">Education & Certs</a>
            <a href="#skills" className="hover:text-stone-950 transition-colors">Skills</a>
            <a href="#contact" className="hover:text-stone-950 transition-colors">Contact</a>
          </nav>

          {/* Zone 3: Primary Action (Switch to Web OS) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                onSwitchToDesktopOS();
              }}
              className="px-3 sm:px-4 py-2 text-xs font-semibold text-white bg-[#008080] hover:bg-[#006666] active:scale-95 transition-all shadow-sm flex items-center gap-2 whitespace-nowrap"
            >
              <Monitor size={14} className="shrink-0" />
              <span>Launch Windows 98 OS</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 space-y-20">
        {/* Hero Section */}
        <section id="hero" className="border-b border-stone-200 pb-16 pt-4">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-widest">
                <span>Nagpur, Maharashtra</span>
                <span aria-hidden="true">·</span>
                <span>SVPCET Computer Engineering</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-bold">Available for Opportunities</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-950 leading-tight">
                Software Engineer, Full-Stack Developer &amp; Cybersecurity Researcher
              </h1>

              <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl">
                Driven by a passion for creating impactful, high-performance software. Specializing in full-stack web development, zero-trust cybersecurity operations, and practical machine learning integrations.
              </p>

              {/* Quick Connect & Action bar */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${KEN_CONTACT.email}`}
                  className="px-5 py-2.5 bg-stone-950 text-white text-xs font-semibold hover:bg-stone-800 transition-colors flex items-center gap-2"
                >
                  <Mail size={14} />
                  <span>Get in Touch</span>
                </a>

                <a
                  href={KEN_CONTACT.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium transition-colors flex items-center gap-2 border border-stone-300"
                >
                  <Github size={14} />
                  <span>GitHub</span>
                  <ExternalLink size={11} className="opacity-60" />
                </a>

                <a
                  href={KEN_CONTACT.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium transition-colors flex items-center gap-2 border border-stone-300"
                >
                  <Linkedin size={14} />
                  <span>LinkedIn</span>
                  <ExternalLink size={11} className="opacity-60" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium transition-colors flex items-center gap-2 border border-stone-300"
                >
                  {copiedEmail ? <Check size={14} className="text-emerald-700" /> : <Copy size={14} />}
                  <span>{copiedEmail ? 'Email Copied' : 'Copy Email'}</span>
                </button>
              </div>
            </div>

            {/* Quick Profile Summary Card */}
            <div className="w-full lg:w-80 bg-white p-6 border border-stone-200 shadow-sm shrink-0">
              <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
                <div className="w-12 h-12 bg-stone-900 text-white font-bold text-lg flex items-center justify-center">
                  KC
                </div>
                <div>
                  <h3 className="font-bold text-stone-950 text-sm">{KEN_CONTACT.name}</h3>
                  <div className="text-xs text-stone-500">Student &amp; Developer</div>
                </div>
              </div>

              <div className="pt-4 space-y-3 text-xs">
                <div>
                  <span className="text-stone-400 block mb-0.5">Education</span>
                  <span className="font-medium text-stone-800">B.Tech Computer Engineering (2023–2028)</span>
                </div>
                <div>
                  <span className="text-stone-400 block mb-0.5">College</span>
                  <span className="font-medium text-stone-800">SVPCET, Nagpur</span>
                </div>
                <div>
                  <span className="text-stone-400 block mb-0.5">Key Credentials</span>
                  <span className="font-medium text-stone-800">Qualys VMDR · Google Cybersecurity</span>
                </div>
                <div>
                  <span className="text-stone-400 block mb-0.5">Student Chapter</span>
                  <span className="font-medium text-stone-800">ACM Tech Team · Aster Coordinator</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="space-y-6">
          <div>
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest">
              Executive Summary
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-950 mt-1">
              About Ken Cherian
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-stone-700 text-sm sm:text-base leading-relaxed">
            <p>
              Hello People, my name is Ken Cherian! I am a Computer Engineering student at St. Vincent Pallotti College of Engineering &amp; Technology (SVPCET) in Nagpur, Maharashtra. Driven by a passion for creating impactful, high-performance software, I specialize in full-stack web development, cybersecurity operations, and practical machine learning integrations.
            </p>
            <p>
              My core technical toolkit includes React, Next.js, TypeScript, Node.js, Python, and cloud services. Through hands-on projects, I have built systems ranging from zero-trust network monitoring tools and automated SIEM threat-detection platforms to dynamic web applications.
            </p>
            <p>
              Alongside my technical work, I actively contribute to our student community. I serve as a technical team member for the ACM student chapter and as a Coordinator for Aster, the soft-skills club under our department&apos;s Zenith Forum. Under Aster club, I have hosted sessions on public speaking, debates, and professional development, helping fellow students bridge the gap between technical expertise and effective communication.
            </p>
            <p>
              When I am not writing code or analyzing security telemetry, I am an avid reader and history enthusiast. I spend much of my free time reading non-fiction books focused on historical paradigms, societal evolution, and human systems. Studying the past gives me a broader perspective that directly enriches my analytical approach to modern software architecture and problem-solving.
            </p>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section id="projects" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest">
                Production Architectures
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-950 mt-1">
                Featured Projects
              </h2>
            </div>

            {/* Interactive Category Filter Tabs (Clean Segmented Buttons) */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-stone-100 rounded-lg">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    selectedCategory === cat
                      ? 'bg-white text-stone-950 shadow-sm'
                      : 'text-stone-600 hover:text-stone-950'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white border border-stone-200 p-6 flex flex-col justify-between hover:border-stone-400 transition-colors shadow-sm"
              >
                <div>
                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                    <span className="font-semibold text-stone-900">{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.fileSize}</span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-950 mb-2 leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-sm text-stone-600 leading-normal mb-4">
                    {project.description}
                  </p>

                  <div className="space-y-1 mb-4 text-xs text-stone-700">
                    {project.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <span className="text-stone-400 font-bold">›</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Clean unboxed tags */}
                  <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-stone-500 mb-6 font-mono">
                    {project.tags.map((tag, i) => (
                      <span key={tag}>
                        #{tag}{i < project.tags.length - 1 ? ' ' : ''}
                      </span>
                    ))}
                  </div>
                </div>

                {/* External links */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3 text-xs font-medium">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-stone-900 hover:underline flex items-center gap-1.5"
                  >
                    <Github size={14} />
                    <span>View Repository</span>
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-700 hover:underline flex items-center gap-1.5 font-semibold"
                    >
                      <ExternalLink size={14} />
                      <span>Live Deployment</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Certifications Section */}
        <section id="education" className="space-y-8">
          <div>
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest">
              Background &amp; Credentials
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-950 mt-1">
              Education &amp; Certifications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education Box */}
            <div className="bg-white border border-stone-200 p-6 space-y-4">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-base border-b border-stone-100 pb-2">
                <GraduationCap size={18} className="text-stone-700" />
                <span>Academic Education</span>
              </div>
              {RESUME_DATA.education.map((edu, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-stone-950 text-sm">{edu.degree}</h4>
                    <span className="text-xs font-mono text-stone-500">{edu.period}</span>
                  </div>
                  <div className="text-xs font-medium text-stone-700">{edu.institution}</div>
                  <p className="text-xs text-stone-500">{edu.score}</p>
                </div>
              ))}

              <div className="pt-4 border-t border-stone-100 space-y-3">
                <div className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Users size={14} />
                  <span>Student Leadership Roles</span>
                </div>
                {RESUME_DATA.leadership.map((lead, idx) => (
                  <div key={idx} className="text-xs text-stone-700">
                    <span className="font-semibold text-stone-900">{lead.role}</span>
                    <span className="text-stone-400"> — </span>
                    <span className="text-stone-600">{lead.organization}</span>
                    <p className="text-stone-500 mt-0.5 leading-snug">{lead.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Box */}
            <div className="bg-white border border-stone-200 p-6 space-y-4">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-base border-b border-stone-100 pb-2">
                <ShieldCheck size={18} className="text-stone-700" />
                <span>Professional Certifications</span>
              </div>
              <div className="space-y-4">
                {RESUME_DATA.certifications.map((cert, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-stone-950 text-sm">{cert.title}</h4>
                      <span className="text-xs font-mono text-stone-500 font-bold">{cert.year}</span>
                    </div>
                    <div className="text-xs text-stone-600 font-medium">Issuer: {cert.issuer}</div>
                    <p className="text-xs text-stone-500 leading-snug">{cert.badge}</p>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-stone-100">
                <a
                  href={`mailto:${KEN_CONTACT.email}?subject=Resume Request - Ken Cherian`}
                  className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-stone-300"
                >
                  <Download size={14} />
                  <span>Request Full PDF Curriculum Vitae</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Skills Matrix */}
        <section id="skills" className="space-y-6">
          <div>
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest">
              Core Competencies
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-950 mt-1">
              Technical Tooling &amp; Stack
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 border border-stone-200">
              <h4 className="font-bold text-stone-950 text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Code2 size={14} />
                <span>Languages</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {RESUME_DATA.skills.languages.map(l => (
                  <li key={l}>• {l}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-5 border border-stone-200">
              <h4 className="font-bold text-stone-950 text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Code2 size={14} />
                <span>Frameworks</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {RESUME_DATA.skills.frameworks.map(f => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-5 border border-stone-200">
              <h4 className="font-bold text-stone-950 text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <ShieldCheck size={14} />
                <span>Cybersecurity &amp; Cloud</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {RESUME_DATA.skills.securityAndCloud.map(s => (
                  <li key={s}>• {s}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-5 border border-stone-200">
              <h4 className="font-bold text-stone-950 text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Code2 size={14} />
                <span>Databases &amp; Tools</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {RESUME_DATA.skills.databasesAndTools.map(t => (
                  <li key={t}>• {t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Form & Dispatch Section */}
        <section id="contact" className="border-t border-stone-200 pt-12 space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest">
              Direct Inquiries
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-950 mt-1">
              Connect with Ken Cherian
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Interested in full-stack engineering, cybersecurity pipelines, or student collaboration? Reach out directly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form onSubmit={handleSendMessage} className="lg:col-span-7 bg-white border border-stone-200 p-6 space-y-4 shadow-sm">
              {msgSent && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <Check size={16} />
                  <span>Email client opened! Message transmission ready for dispatch.</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Your Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="recruiter@company.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 focus:outline-none focus:border-stone-900 bg-stone-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="Role Opportunity / Discussion"
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 focus:outline-none focus:border-stone-900 bg-stone-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Hello Ken, I saw your portfolio projects..."
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 focus:outline-none focus:border-stone-900 bg-stone-50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-stone-950 text-white text-xs font-semibold hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
              >
                <Send size={14} />
                <span>Send Dispatch to Ken Cherian</span>
              </button>
            </form>

            <div className="lg:col-span-5 space-y-4 text-xs text-stone-700">
              <div className="bg-white border border-stone-200 p-5 space-y-3">
                <h4 className="font-bold text-stone-950 text-xs uppercase tracking-wider">
                  Contact Coordinates
                </h4>
                <div>
                  <span className="text-stone-400 block mb-0.5">Direct Email</span>
                  <a href={`mailto:${KEN_CONTACT.email}`} className="text-blue-700 font-semibold hover:underline">
                    {KEN_CONTACT.email}
                  </a>
                </div>
                <div>
                  <span className="text-stone-400 block mb-0.5">LinkedIn Profile</span>
                  <a href={KEN_CONTACT.linkedin} target="_blank" rel="noreferrer" className="text-blue-700 font-semibold hover:underline">
                    linkedin.com/in/ken-cherian
                  </a>
                </div>
                <div>
                  <span className="text-stone-400 block mb-0.5">GitHub Repositories</span>
                  <a href={KEN_CONTACT.github} target="_blank" rel="noreferrer" className="text-blue-700 font-semibold hover:underline">
                    github.com/kencherian
                  </a>
                </div>
                <div>
                  <span className="text-stone-400 block mb-0.5">Campus Location</span>
                  <span className="font-medium text-stone-800">Nagpur, Maharashtra, India</span>
                </div>
              </div>

              <div className="p-4 bg-stone-100 border border-stone-200 text-stone-600 text-xs">
                💡 Want the nostalgic 1990s experience? Click the button below to return to the interactive Windows 98 desktop with movable windows, Notepad, MS-DOS prompt, and Minesweeper.
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playClick();
                    onSwitchToDesktopOS();
                  }}
                  className="mt-3 w-full py-2 bg-[#008080] text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#006666] transition-colors"
                >
                  <Monitor size={14} />
                  <span>Return to Windows 98 Web OS</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 text-center text-xs text-stone-400 border-t border-stone-200 mt-20">
        <div>© 2026 Ken Cherian · SVPCET Nagpur · Built with React, TypeScript &amp; Tailwind CSS</div>
      </footer>
    </div>
  );
};
