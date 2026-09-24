import React, { useState } from 'react';
import { PROJECTS } from '../../data/portfolioData';
import { Project, ProjectCategory } from '../../types';
import { ManilaFolderIcon, RenderWinIcon } from '../common/Win98Icons';
import { soundFX } from '../../utils/sound';
import { ExternalLink, Github, ArrowLeft, ArrowUp, Folder, HardDrive, Monitor } from 'lucide-react';

interface ExplorerAppProps {
  initialCategory?: ProjectCategory | 'Root';
}

export const ExplorerApp: React.FC<ExplorerAppProps> = ({ initialCategory = 'Root' }) => {
  const [currentFolder, setCurrentFolder] = useState<ProjectCategory | 'Root'>(initialCategory);
  const [history, setHistory] = useState<(ProjectCategory | 'Root')[]>([initialCategory]);
  const [historyIdx, setHistoryIdx] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'large' | 'details'>('large');

  const categories: ProjectCategory[] = [
    'Cybersecurity',
    'Full-Stack',
    'Machine-Learning',
    'Data-Visualization',
  ];

  const navigateTo = (folder: ProjectCategory | 'Root') => {
    soundFX.playClick();
    const newHistory = history.slice(0, historyIdx + 1);
    newHistory.push(folder);
    setHistory(newHistory);
    setHistoryIdx(newHistory.length - 1);
    setCurrentFolder(folder);
    setSelectedProject(null);
  };

  const handleBack = () => {
    if (historyIdx > 0) {
      soundFX.playClick();
      const prev = history[historyIdx - 1];
      setHistoryIdx(historyIdx - 1);
      setCurrentFolder(prev);
      setSelectedProject(null);
    }
  };

  const handleUp = () => {
    if (currentFolder !== 'Root') {
      navigateTo('Root');
    }
  };

  const currentProjects = currentFolder === 'Root'
    ? []
    : PROJECTS.filter(p => p.category === currentFolder);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#c0c0c0] text-[12px] overflow-hidden select-none">
      {/* Explorer Menu Bar */}
      <div className="flex items-center gap-1 border-b border-[#808080] bg-[#c0c0c0] px-1 py-[2px] text-[11px]">
        {['File', 'Edit', 'View', 'Go', 'Favorites', 'Help'].map((item) => (
          <span
            key={item}
            className="px-2 py-[2px] cursor-default hover:bg-[#000080] hover:text-white"
            onClick={() => soundFX.playClick()}
          >
            <u>{item[0]}</u>{item.slice(1)}
          </span>
        ))}
      </div>

      {/* Explorer Standard Buttons Toolbar */}
      <div className="flex items-center gap-1 px-1 py-1 border-b border-[#808080] bg-[#c0c0c0] text-[11px] overflow-x-auto">
        <button
          type="button"
          disabled={historyIdx === 0}
          onClick={handleBack}
          className={`win98-btn flex items-center gap-1 py-1 px-2 ${
            historyIdx === 0 ? 'opacity-40 cursor-not-allowed' : ''
          }`}
          title="Back"
        >
          <ArrowLeft size={13} className="text-[#008000]" />
          <span>Back</span>
        </button>

        <button
          type="button"
          disabled={currentFolder === 'Root'}
          onClick={handleUp}
          className={`win98-btn flex items-center gap-1 py-1 px-2 ${
            currentFolder === 'Root' ? 'opacity-40 cursor-not-allowed' : ''
          }`}
          title="Up one level"
        >
          <ArrowUp size={13} className="text-[#000080]" />
          <span>Up</span>
        </button>

        <div className="w-[1px] h-5 bg-[#808080] border-r border-white mx-1" />

        <button
          type="button"
          onClick={() => {
            soundFX.playClick();
            setViewMode('large');
          }}
          className={`win98-btn px-2 py-1 ${viewMode === 'large' ? 'active' : ''}`}
        >
          Large Icons
        </button>

        <button
          type="button"
          onClick={() => {
            soundFX.playClick();
            setViewMode('details');
          }}
          className={`win98-btn px-2 py-1 ${viewMode === 'details' ? 'active' : ''}`}
        >
          Details
        </button>
      </div>

      {/* Address Bar */}
      <div className="flex items-center gap-2 px-2 py-1 border-b border-[#dfdfdf] bg-[#c0c0c0] text-[11px]">
        <span className="text-[#555] font-sans">Address</span>
        <div className="flex-1 win98-sunken px-2 py-0.5 bg-white text-black font-mono text-[11px] truncate flex items-center gap-1">
          <RenderWinIcon name="folder" size={14} />
          <span>
            C:\Ken\Projects{currentFolder !== 'Root' ? `\\${currentFolder}` : ''}
          </span>
        </div>
      </div>

      {/* Main Workspace: Left Folder Tree + Right Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Tree Explorer Bar */}
        <div className="w-48 border-r border-[#808080] bg-white p-2 overflow-y-auto text-[11px] font-sans hidden sm:block win98-sunken m-1">
          <div className="font-bold text-[#333] mb-1.5 flex items-center gap-1">
            <Monitor size={14} className="text-[#555]" />
            <span>Desktop</span>
          </div>

          <div className="pl-3 space-y-1">
            <div className="flex items-center gap-1 text-[#333]">
              <HardDrive size={13} className="text-[#666]" />
              <span>Drive C: (System)</span>
            </div>

            <div className="pl-3 space-y-1">
              <div
                className={`flex items-center gap-1 cursor-pointer px-1 py-0.5 rounded-none ${
                  currentFolder === 'Root' ? 'bg-[#000080] text-white' : 'hover:bg-[#dfdfdf] text-black'
                }`}
                onClick={() => navigateTo('Root')}
              >
                <Folder size={12} className={currentFolder === 'Root' ? 'text-white' : 'text-[#d97706]'} />
                <span className="font-semibold">Projects</span>
              </div>

              <div className="pl-3 space-y-0.5">
                {categories.map((cat) => (
                  <div
                    key={cat}
                    className={`flex items-center gap-1 cursor-pointer px-1 py-0.5 text-[11px] truncate ${
                      currentFolder === cat ? 'bg-[#000080] text-white' : 'hover:bg-[#dfdfdf] text-[#333]'
                    }`}
                    onClick={() => navigateTo(cat)}
                  >
                    <Folder size={12} className={currentFolder === cat ? 'text-white' : 'text-[#d97706]'} />
                    <span>{cat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Content / Files View */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white win98-sunken m-1 p-2">
          {/* If at Root: show the 4 Manila Folders */}
          {currentFolder === 'Root' ? (
            <div className="flex-1 overflow-y-auto">
              <div className="text-[11px] text-[#666] mb-3 px-1">
                Select a department folder to explore Ken Cherian&apos;s engineered systems:
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2">
                {categories.map((cat) => {
                  const count = PROJECTS.filter(p => p.category === cat).length;
                  return (
                    <div
                      key={cat}
                      onDoubleClick={() => navigateTo(cat)}
                      onClick={() => {
                        soundFX.playClick();
                      }}
                      className="flex flex-col items-center p-3 cursor-pointer hover:bg-[#e0e8f5] border border-transparent hover:border-[#000080]/30 rounded group text-center"
                    >
                      <ManilaFolderIcon size={48} className="transition-transform group-hover:scale-105" />
                      <span className="mt-2 font-bold text-[12px] text-black group-hover:text-[#000080] underline">
                        {cat}
                      </span>
                      <span className="text-[10px] text-[#777] mt-0.5">
                        {count} project{count > 1 ? 's' : ''}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateTo(cat);
                        }}
                        className="win98-btn mt-2 text-[10px] px-2 py-0.5"
                      >
                        Open Folder
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Inside a Category Folder: Show Projects */
            <div className="flex-1 flex flex-col overflow-hidden">
              {viewMode === 'large' ? (
                /* Large Icons Grid */
                <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-1">
                  {currentProjects.map((project) => {
                    const isSelected = selectedProject?.id === project.id;
                    return (
                      <div
                        key={project.id}
                        onClick={() => {
                          soundFX.playClick();
                          setSelectedProject(project);
                        }}
                        className={`win98-outset p-2 cursor-pointer flex flex-col justify-between ${
                          isSelected ? 'ring-2 ring-[#000080]' : ''
                        }`}
                      >
                        <div>
                          <div className="flex items-start gap-2 mb-2">
                            <RenderWinIcon
                              name={project.category === 'Cybersecurity' ? 'terminal' : project.category === 'Data-Visualization' ? 'ie' : 'folder'}
                              size={28}
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-[12px] text-[#000080] truncate leading-tight">
                                {project.title}
                              </h4>
                              <div className="text-[10px] text-[#666]">
                                Size: {project.fileSize}
                              </div>
                            </div>
                          </div>

                          <p className="text-[11px] text-[#333] leading-snug line-clamp-3 mb-2">
                            {project.description}
                          </p>

                          {/* Tech Tags */}
                          <div className="flex flex-wrap gap-1 mb-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="win98-well px-1.5 py-[1px] text-[10px] bg-[#dfdfdf] text-[#111]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Links: GitHub & Live Demo */}
                        <div className="pt-2 border-t border-[#dfdfdf] flex items-center justify-between gap-1">
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => {
                              e.stopPropagation();
                              soundFX.playClick();
                            }}
                            className="win98-btn flex-1 text-[10px] flex items-center justify-center gap-1 font-bold"
                          >
                            <Github size={11} />
                            <span>Repository</span>
                          </a>

                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => {
                                e.stopPropagation();
                                soundFX.playClick();
                              }}
                              className="win98-btn flex-1 text-[10px] flex items-center justify-center gap-1 font-bold text-[#000080]"
                            >
                              <ExternalLink size={11} />
                              <span>Live App</span>
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Details Table View */
                <div className="flex-1 overflow-auto">
                  <table className="w-full text-[11px] text-left border-collapse">
                    <thead className="bg-[#c0c0c0] sticky top-0 text-[#222]">
                      <tr className="border-b border-[#808080]">
                        <th className="win98-outset-thin p-1 font-semibold">Name</th>
                        <th className="win98-outset-thin p-1 font-semibold">Size</th>
                        <th className="win98-outset-thin p-1 font-semibold">Type</th>
                        <th className="win98-outset-thin p-1 font-semibold">Date Modified</th>
                        <th className="win98-outset-thin p-1 font-semibold text-center">Links</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentProjects.map((p) => {
                        const isSelected = selectedProject?.id === p.id;
                        return (
                          <tr
                            key={p.id}
                            onClick={() => {
                              soundFX.playClick();
                              setSelectedProject(p);
                            }}
                            className={`border-b border-[#e5e5e5] cursor-pointer ${
                              isSelected ? 'bg-[#000080] text-white' : 'hover:bg-[#f0f4f8]'
                            }`}
                          >
                            <td className="p-1.5 flex items-center gap-1.5 font-bold">
                              <RenderWinIcon name="folder" size={16} />
                              <span className="truncate">{p.title}</span>
                            </td>
                            <td className="p-1.5">{p.fileSize}</td>
                            <td className="p-1.5">{p.category} System</td>
                            <td className="p-1.5">{p.dateModified}</td>
                            <td className="p-1.5 text-center whitespace-nowrap">
                              <a
                                href={p.repoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className={`underline mr-2 ${isSelected ? 'text-yellow-300' : 'text-[#000080]'}`}
                              >
                                GitHub
                              </a>
                              {p.liveUrl && (
                                <a
                                  href={p.liveUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className={`underline ${isSelected ? 'text-yellow-300' : 'text-[#008000]'}`}
                                >
                                  Demo
                                </a>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Explorer Status Bar */}
      <div className="grid grid-cols-12 gap-1 px-1 py-[2px] bg-[#c0c0c0] text-[11px] border-t border-[#dfdfdf]">
        <div className="col-span-6 win98-well px-2 py-[1px] text-[#444] truncate">
          {currentFolder === 'Root'
            ? '4 Department Folder(s) in C:\\Ken\\Projects'
            : `${currentProjects.length} Project object(s) in \\${currentFolder}`}
        </div>
        <div className="col-span-3 win98-well px-2 py-[1px] text-center truncate">
          {selectedProject ? selectedProject.title : 'Free Space: 4.12 GB'}
        </div>
        <div className="col-span-3 win98-well px-2 py-[1px] text-center flex items-center justify-center gap-1">
          <RenderWinIcon name="computer" size={12} />
          <span>Local intranet zone</span>
        </div>
      </div>
    </div>
  );
};
