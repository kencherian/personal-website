import React, { useState } from 'react';
import { RESUME_DATA, KEN_CONTACT } from '../../data/portfolioData';
import { soundFX } from '../../utils/sound';
import { Download, Printer, ZoomIn, ZoomOut, Mail, GraduationCap, Award, Users, Code, ShieldCheck } from 'lucide-react';

export const ResumePdfApp: React.FC = () => {
  const [zoom, setZoom] = useState(100);

  const handlePrint = () => {
    soundFX.playClick();
    window.print();
  };

  const handleDownloadText = () => {
    soundFX.playClick();
    const resumeText = `=====================================================
KEN CHERIAN - CURRICULUM VITAE
Computer Engineering Student | Full-Stack & Cyber Defense
=====================================================
Email: ${KEN_CONTACT.email}
LinkedIn: ${KEN_CONTACT.linkedin}
GitHub: ${KEN_CONTACT.github}
Institution: ${KEN_CONTACT.institution}
Location: ${KEN_CONTACT.location}

1. EDUCATION
-----------------------------------------------------
${RESUME_DATA.education.map(e => `${e.degree}
${e.institution} (${e.period})
${e.score}`).join('\n\n')}

2. CERTIFICATIONS
-----------------------------------------------------
${RESUME_DATA.certifications.map(c => `• ${c.title} - ${c.issuer} (${c.year})
  Focus: ${c.badge}`).join('\n\n')}

3. LEADERSHIP & COMMUNITY INVOLVEMENT
-----------------------------------------------------
${RESUME_DATA.leadership.map(l => `• ${l.role} - ${l.organization}
  ${l.description}`).join('\n\n')}

4. TECHNICAL SKILLS
-----------------------------------------------------
• Languages: ${RESUME_DATA.skills.languages.join(', ')}
• Frameworks: ${RESUME_DATA.skills.frameworks.join(', ')}
• Security & Cloud: ${RESUME_DATA.skills.securityAndCloud.join(', ')}
• Tools & DBs: ${RESUME_DATA.skills.databasesAndTools.join(', ')}

=====================================================`;

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Resume_Ken_Cherian.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#525659] text-[12px] overflow-hidden select-none">
      {/* Acrobat Reader 4.0 Header Toolbar */}
      <div className="bg-[#c0c0c0] border-b border-[#808080] p-1 flex items-center justify-between text-[11px] gap-2 flex-wrap shrink-0">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleDownloadText}
            className="win98-btn flex items-center gap-1 font-bold text-[#000080]"
            title="Save Target As..."
          >
            <Download size={13} />
            <span>[ Save Target As... ]</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="win98-btn flex items-center gap-1"
            title="Print Resume"
          >
            <Printer size={13} />
            <span>Print</span>
          </button>
        </div>

        {/* Acrobat Zoom Controls */}
        <div className="flex items-center gap-1 bg-[#dfdfdf] px-2 py-0.5 win98-well text-[11px]">
          <button
            type="button"
            onClick={() => setZoom(Math.max(75, zoom - 10))}
            className="win98-btn px-1.5 py-0"
          >
            <ZoomOut size={12} />
          </button>
          <span className="w-12 text-center font-mono font-bold">{zoom}%</span>
          <button
            type="button"
            onClick={() => setZoom(Math.min(130, zoom + 10))}
            className="win98-btn px-1.5 py-0"
          >
            <ZoomIn size={12} />
          </button>
          <span className="text-[#666] ml-2">Page 1 / 1</span>
        </div>
      </div>

      {/* PDF Viewport Canvas with Realistic Paper Document */}
      <div className="flex-1 overflow-auto p-4 flex justify-center bg-[#525659]">
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
            width: '740px',
            minHeight: '960px',
          }}
          className="bg-white text-black p-8 shadow-2xl transition-transform duration-150 font-sans"
        >
          {/* Resume Header */}
          <div className="border-b-2 border-[#000080] pb-4 mb-5">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-[#000080]">
                  KEN CHERIAN
                </h1>
                <p className="text-[13px] font-semibold text-gray-700 mt-0.5">
                  Computer Engineering Student · Full-Stack Developer & Cybersecurity Specialist
                </p>
                <p className="text-[11px] text-gray-600 mt-1">
                  {KEN_CONTACT.institution} · {KEN_CONTACT.location}
                </p>
              </div>

              <div className="text-right text-[11px] space-y-1">
                <div>
                  <a href={`mailto:${KEN_CONTACT.email}`} className="text-[#000080] hover:underline flex items-center justify-end gap-1">
                    <Mail size={12} />
                    <span>{KEN_CONTACT.email}</span>
                  </a>
                </div>
                <div>
                  <a href={KEN_CONTACT.linkedin} target="_blank" rel="noreferrer" className="text-[#000080] hover:underline">
                    linkedin.com/in/ken-cherian
                  </a>
                </div>
                <div>
                  <a href={KEN_CONTACT.github} target="_blank" rel="noreferrer" className="text-[#000080] hover:underline">
                    github.com/kencherian
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Education */}
          <div className="mb-5">
            <h2 className="text-[13px] font-bold text-[#000080] uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 flex items-center gap-1.5">
              <GraduationCap size={15} />
              <span>Education</span>
            </h2>
            {RESUME_DATA.education.map((edu, idx) => (
              <div key={idx} className="mb-2">
                <div className="flex justify-between font-bold text-[12px] text-gray-900">
                  <span>{edu.degree}</span>
                  <span className="text-gray-600 font-mono text-[11px]">{edu.period}</span>
                </div>
                <div className="text-[12px] text-gray-700 font-medium">
                  {edu.institution}
                </div>
                <div className="text-[11px] text-gray-600 italic">
                  {edu.score}
                </div>
              </div>
            ))}
          </div>

          {/* Section: Certifications */}
          <div className="mb-5">
            <h2 className="text-[13px] font-bold text-[#000080] uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 flex items-center gap-1.5">
              <ShieldCheck size={15} />
              <span>Professional Certifications</span>
            </h2>
            <div className="space-y-2">
              {RESUME_DATA.certifications.map((cert, idx) => (
                <div key={idx} className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-[12px] text-gray-900">{cert.title}</span>
                    <span className="text-gray-500 text-[11px]"> — {cert.issuer}</span>
                    <div className="text-[11px] text-gray-600">{cert.badge}</div>
                  </div>
                  <span className="text-gray-600 font-mono text-[11px] font-bold">{cert.year}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Leadership & Student Community */}
          <div className="mb-5">
            <h2 className="text-[13px] font-bold text-[#000080] uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 flex items-center gap-1.5">
              <Users size={15} />
              <span>Leadership & Student Community</span>
            </h2>
            <div className="space-y-3">
              {RESUME_DATA.leadership.map((item, idx) => (
                <div key={idx}>
                  <div className="font-bold text-[12px] text-gray-900">
                    {item.role} · <span className="text-gray-700 font-semibold">{item.organization}</span>
                  </div>
                  <p className="text-[11.5px] text-gray-600 leading-snug mt-0.5">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Technical Skills */}
          <div className="mb-5">
            <h2 className="text-[13px] font-bold text-[#000080] uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 flex items-center gap-1.5">
              <Code size={15} />
              <span>Technical Skills & Tooling</span>
            </h2>
            <div className="space-y-1.5 text-[11.5px]">
              <div>
                <span className="font-bold text-gray-900">Programming Languages: </span>
                <span className="text-gray-700">{RESUME_DATA.skills.languages.join(' · ')}</span>
              </div>
              <div>
                <span className="font-bold text-gray-900">Frameworks & Libraries: </span>
                <span className="text-gray-700">{RESUME_DATA.skills.frameworks.join(' · ')}</span>
              </div>
              <div>
                <span className="font-bold text-gray-900">Cybersecurity & Cloud: </span>
                <span className="text-gray-700">{RESUME_DATA.skills.securityAndCloud.join(' · ')}</span>
              </div>
              <div>
                <span className="font-bold text-gray-900">Databases & Developer Tools: </span>
                <span className="text-gray-700">{RESUME_DATA.skills.databasesAndTools.join(' · ')}</span>
              </div>
            </div>
          </div>

          {/* Section: Key Projects Summary */}
          <div>
            <h2 className="text-[13px] font-bold text-[#000080] uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 flex items-center gap-1.5">
              <Award size={15} />
              <span>Selected Project Architectures</span>
            </h2>
            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div className="p-2 border border-gray-200 rounded">
                <div className="font-bold text-gray-900">Aegis SIEM-SOAR</div>
                <div className="text-gray-600">Centralized threat monitoring & automated remediation pipelines.</div>
              </div>
              <div className="p-2 border border-gray-200 rounded">
                <div className="font-bold text-gray-900">OmniVault</div>
                <div className="text-gray-600">End-to-end encrypted cloud storage workspace & access control.</div>
              </div>
              <div className="p-2 border border-gray-200 rounded">
                <div className="font-bold text-gray-900">Distributed SOC Telemetry</div>
                <div className="text-gray-600">Network threat ingestion pipeline with real-time log anomaly scoring.</div>
              </div>
              <div className="p-2 border border-gray-200 rounded">
                <div className="font-bold text-gray-900">GNN Gene Disease Prediction</div>
                <div className="text-gray-600">Graph Neural Network analyzing heterogeneous biomedical graph data.</div>
              </div>
            </div>
          </div>

          {/* Footer watermark */}
          <div className="mt-8 pt-3 border-t border-gray-200 text-center text-[10px] text-gray-400">
            Document generated from Ken Cherian Web OS Portfolio · SVPCET Nagpur
          </div>
        </div>
      </div>
    </div>
  );
};
