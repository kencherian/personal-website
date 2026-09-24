import React, { useState, useEffect } from 'react';
import {
  WALLPAPER_OPTIONS,
  TITLE_BAR_OPTIONS,
  SCHEME_PRESETS,
  WallpaperOption,
  TitleBarOption,
} from '../../data/displayThemes';
import { soundFX } from '../../utils/sound';
import { Monitor, Palette, Sparkles, Check, RotateCcw } from 'lucide-react';

interface DisplayPropertiesAppProps {
  currentWallpaperColor: string;
  currentTitleBar: TitleBarOption;
  onApplyChanges: (wallpaperColor: string, titleBar: TitleBarOption) => void;
  onClose: () => void;
}

export const DisplayPropertiesApp: React.FC<DisplayPropertiesAppProps> = ({
  currentWallpaperColor,
  currentTitleBar,
  onApplyChanges,
  onClose,
}) => {
  // Tabs: 'appearance' | 'background' | 'schemes'
  const [activeTab, setActiveTab] = useState<'appearance' | 'background' | 'schemes'>('appearance');

  // Preview state (what's currently selected in the dialog)
  const [selectedWallpaperId, setSelectedWallpaperId] = useState<string>(() => {
    const matched = WALLPAPER_OPTIONS.find(w => w.color.toLowerCase() === currentWallpaperColor.toLowerCase());
    return matched ? matched.id : 'custom';
  });

  const [previewWallpaperColor, setPreviewWallpaperColor] = useState<string>(currentWallpaperColor);
  const [selectedTitleBarId, setSelectedTitleBarId] = useState<string>(currentTitleBar.id);
  const [livePreview, setLivePreview] = useState<boolean>(true);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  // Derive current TitleBarOption
  const previewTitleBar = TITLE_BAR_OPTIONS.find(t => t.id === selectedTitleBarId) || currentTitleBar;

  // On initial mount or when props change, ensure sync
  useEffect(() => {
    const matched = WALLPAPER_OPTIONS.find(w => w.color.toLowerCase() === currentWallpaperColor.toLowerCase());
    if (matched) {
      setSelectedWallpaperId(matched.id);
    } else {
      setSelectedWallpaperId('custom');
    }
    setPreviewWallpaperColor(currentWallpaperColor);
    setSelectedTitleBarId(currentTitleBar.id);
    setIsDirty(false);
  }, [currentWallpaperColor, currentTitleBar]);

  // When livePreview is true, sync changes directly to parent as user tweaks dropdowns
  const handleWallpaperChange = (color: string, optionId?: string) => {
    setPreviewWallpaperColor(color);
    if (optionId) {
      setSelectedWallpaperId(optionId);
    } else {
      const match = WALLPAPER_OPTIONS.find(w => w.color.toLowerCase() === color.toLowerCase());
      setSelectedWallpaperId(match ? match.id : 'custom');
    }
    setIsDirty(true);

    if (livePreview) {
      onApplyChanges(color, previewTitleBar);
    }
  };

  const handleTitleBarChange = (id: string) => {
    setSelectedTitleBarId(id);
    setIsDirty(true);
    const targetTitleBar = TITLE_BAR_OPTIONS.find(t => t.id === id) || currentTitleBar;

    if (livePreview) {
      onApplyChanges(previewWallpaperColor, targetTitleBar);
    }
  };

  const handlePresetChange = (presetId: string) => {
    const preset = SCHEME_PRESETS.find(p => p.id === presetId);
    if (!preset) return;

    const wp = WALLPAPER_OPTIONS.find(w => w.id === preset.wallpaperId);
    const tb = TITLE_BAR_OPTIONS.find(t => t.id === preset.titleBarId);

    if (wp && tb) {
      soundFX.playClick();
      setSelectedWallpaperId(wp.id);
      setPreviewWallpaperColor(wp.color);
      setSelectedTitleBarId(tb.id);
      setIsDirty(true);

      if (livePreview) {
        onApplyChanges(wp.color, tb);
      }
    }
  };

  const handleApply = () => {
    soundFX.playClick();
    onApplyChanges(previewWallpaperColor, previewTitleBar);
    setIsDirty(false);
  };

  const handleOK = () => {
    soundFX.playClick();
    onApplyChanges(previewWallpaperColor, previewTitleBar);
    onClose();
  };

  const handleCancel = () => {
    soundFX.playClick();
    // Revert back to original props if user made live changes
    if (isDirty || livePreview) {
      onApplyChanges(currentWallpaperColor, currentTitleBar);
    }
    onClose();
  };

  const handleResetDefaults = () => {
    soundFX.playClick();
    const defaultWp = WALLPAPER_OPTIONS[0]; // Classic Teal
    const defaultTb = TITLE_BAR_OPTIONS[0]; // Windows Standard
    setSelectedWallpaperId(defaultWp.id);
    setPreviewWallpaperColor(defaultWp.color);
    setSelectedTitleBarId(defaultTb.id);
    setIsDirty(true);
    if (livePreview) {
      onApplyChanges(defaultWp.color, defaultTb);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#c0c0c0] p-2 text-[11px] select-none">
      {/* Authentic Windows 98 Tab Control */}
      <div className="flex border-b border-[#808080] pl-1 gap-1">
        <button
          type="button"
          onClick={() => {
            soundFX.playClick();
            setActiveTab('appearance');
          }}
          className={`px-3 py-1 -mb-[1px] border-t border-l border-r border-white border-b-0 cursor-pointer ${
            activeTab === 'appearance'
              ? 'bg-[#c0c0c0] font-bold text-black border-t-2 border-t-[#ffffff] shadow-[-1px_-1px_0px_#dfdfdf]'
              : 'bg-[#b0b0b0] text-[#404040] hover:bg-[#b8b8b8]'
          }`}
          style={{
            borderTopLeftRadius: '3px',
            borderTopRightRadius: '3px',
            boxShadow: activeTab === 'appearance' ? 'inset 1px 1px #ffffff, inset -1px 0 #808080' : 'none',
          }}
        >
          Appearance
        </button>

        <button
          type="button"
          onClick={() => {
            soundFX.playClick();
            setActiveTab('background');
          }}
          className={`px-3 py-1 -mb-[1px] border-t border-l border-r border-white border-b-0 cursor-pointer ${
            activeTab === 'background'
              ? 'bg-[#c0c0c0] font-bold text-black border-t-2 border-t-[#ffffff] shadow-[-1px_-1px_0px_#dfdfdf]'
              : 'bg-[#b0b0b0] text-[#404040] hover:bg-[#b8b8b8]'
          }`}
          style={{
            borderTopLeftRadius: '3px',
            borderTopRightRadius: '3px',
            boxShadow: activeTab === 'background' ? 'inset 1px 1px #ffffff, inset -1px 0 #808080' : 'none',
          }}
        >
          Background
        </button>

        <button
          type="button"
          onClick={() => {
            soundFX.playClick();
            setActiveTab('schemes');
          }}
          className={`px-3 py-1 -mb-[1px] border-t border-l border-r border-white border-b-0 cursor-pointer ${
            activeTab === 'schemes'
              ? 'bg-[#c0c0c0] font-bold text-black border-t-2 border-t-[#ffffff] shadow-[-1px_-1px_0px_#dfdfdf]'
              : 'bg-[#b0b0b0] text-[#404040] hover:bg-[#b8b8b8]'
          }`}
          style={{
            borderTopLeftRadius: '3px',
            borderTopRightRadius: '3px',
            boxShadow: activeTab === 'schemes' ? 'inset 1px 1px #ffffff, inset -1px 0 #808080' : 'none',
          }}
        >
          Themes & Presets
        </button>
      </div>

      {/* Main Tab Content Panel */}
      <div className="flex-1 win98-outset p-2.5 flex flex-col justify-between overflow-y-auto">
        {/* CRT Monitor Interactive Preview Display */}
        <div className="flex flex-col items-center justify-center mb-2">
          {/* CRT Monitor Housing */}
          <div className="w-[240px] bg-[#d4d0c8] p-2 border-t-2 border-l-2 border-white border-r-2 border-b-2 border-[#404040] rounded-sm shadow-md">
            {/* Monitor Screen Frame */}
            <div className="w-full bg-[#1a1a1a] p-1.5 rounded-sm border-2 border-[#808080] shadow-inner">
              {/* Virtual CRT Screen Display */}
              <div
                className="w-full h-[120px] relative overflow-hidden flex flex-col p-1 transition-colors duration-150"
                style={{ backgroundColor: previewWallpaperColor }}
              >
                {/* Scanline CRT overlay effect */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-15"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)',
                    backgroundSize: '100% 3px',
                  }}
                />

                {/* Sample Inactive Window in background */}
                <div className="absolute top-1.5 left-2 w-[130px] win98-outset text-[8px] opacity-90 shadow">
                  <div className="win98-title-inactive px-1 py-[1px] flex justify-between items-center text-white">
                    <span className="truncate">Inactive Window</span>
                    <span className="text-[7px]">✕</span>
                  </div>
                  <div className="bg-[#c0c0c0] p-1 text-[7px] text-[#555]">
                    Inactive Client Area
                  </div>
                </div>

                {/* Sample Active Window in foreground */}
                <div className="absolute top-6 left-8 w-[150px] win98-outset text-[9px] shadow-lg z-10">
                  {/* Dynamic Active Title Bar Preview */}
                  <div
                    className="px-1 py-[2px] flex justify-between items-center text-white font-bold"
                    style={{
                      background: `linear-gradient(90deg, ${previewTitleBar.start} 0%, ${previewTitleBar.end} 100%)`,
                      color: previewTitleBar.textColor || '#ffffff',
                    }}
                  >
                    <span className="truncate flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-yellow-300 inline-block rounded-xs" />
                      Active Window
                    </span>
                    <div className="flex gap-[1px]">
                      <span className="w-2.5 h-2 bg-[#c0c0c0] text-black text-[6px] flex items-center justify-center font-bold">_</span>
                      <span className="w-2.5 h-2 bg-[#c0c0c0] text-black text-[6px] flex items-center justify-center font-bold">□</span>
                      <span className="w-2.5 h-2 bg-[#c0c0c0] text-black text-[6px] flex items-center justify-center font-bold">✕</span>
                    </div>
                  </div>

                  {/* Menu bar */}
                  <div className="bg-[#c0c0c0] px-1 text-[7px] border-b border-[#808080] flex gap-1 text-black">
                    <span><u>F</u>ile</span>
                    <span><u>E</u>dit</span>
                    <span><u>V</u>iew</span>
                  </div>

                  {/* Window Content */}
                  <div className="bg-white m-[2px] p-1 border border-[#808080] text-[8px] text-black space-y-0.5">
                    <div>Window Text / Palette</div>
                    <div className="flex items-center justify-between text-[7px] text-gray-500">
                      <span>Status: Normal</span>
                      <button type="button" className="px-1 bg-[#c0c0c0] border border-black text-[6px]">OK</button>
                    </div>
                  </div>
                </div>

                {/* Sample Message Box floating */}
                <div className="absolute bottom-1 right-2 win98-outset p-1 text-[8px] shadow z-20 bg-[#c0c0c0]">
                  <div className="text-[7px] font-bold text-center">Sample Box</div>
                  <div className="flex justify-center mt-1">
                    <span className="px-2 py-[1px] bg-[#c0c0c0] border border-[#0a0a0a] text-[6px] font-bold">OK</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Monitor Bezel controls & Stand */}
            <div className="flex justify-between items-center px-2 pt-1 text-[8px] text-gray-600">
              <span className="font-mono font-bold tracking-widest text-[9px] text-[#444]">SONY Trinitron</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="w-2 h-1 bg-[#888] rounded-xs" />
              </div>
            </div>
          </div>
          {/* Monitor Base Stand */}
          <div className="w-16 h-2 bg-[#b8b4a8] border-l border-r border-[#808080] mx-auto" />
          <div className="w-28 h-2 bg-[#c0c0c0] win98-outset mx-auto" />
        </div>

        {/* TAB 1: APPEARANCE (Main requirement: dropdowns for wallpaper & active title bar) */}
        {activeTab === 'appearance' && (
          <div className="space-y-2.5">
            {/* 1. Desktop Wallpaper Dropdown Selection */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="wallpaper-select" className="font-bold flex items-center gap-1">
                  <Palette size={13} className="text-[#000080]" />
                  <span>Desktop Wallpaper Color:</span>
                </label>
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-4 h-4 border border-black inline-block shadow-sm"
                    style={{ backgroundColor: previewWallpaperColor }}
                    title={previewWallpaperColor}
                  />
                  <span className="font-mono text-[10px] text-gray-700">{previewWallpaperColor.toUpperCase()}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <select
                  id="wallpaper-select"
                  value={selectedWallpaperId}
                  onChange={(e) => {
                    const chosen = WALLPAPER_OPTIONS.find(w => w.id === e.target.value);
                    if (chosen) {
                      soundFX.playClick();
                      handleWallpaperChange(chosen.color, chosen.id);
                    }
                  }}
                  className="win98-sunken-field flex-1 px-2 py-1 bg-white text-[11px] outline-none cursor-pointer"
                >
                  {WALLPAPER_OPTIONS.map((wp) => (
                    <option key={wp.id} value={wp.id}>
                      {wp.name} ({wp.color}) - {wp.description}
                    </option>
                  ))}
                  {selectedWallpaperId === 'custom' && (
                    <option value="custom">Custom Color ({previewWallpaperColor})</option>
                  )}
                </select>

                {/* Custom Color Picker input */}
                <input
                  type="color"
                  value={previewWallpaperColor.startsWith('#') && previewWallpaperColor.length === 7 ? previewWallpaperColor : '#008080'}
                  onChange={(e) => handleWallpaperChange(e.target.value)}
                  className="w-7 h-6 cursor-pointer win98-outset p-0"
                  title="Choose custom wallpaper color"
                />
              </div>
            </div>

            {/* 2. Window Active Title Bar Colors Dropdown Selection */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="titlebar-select" className="font-bold flex items-center gap-1">
                  <Monitor size={13} className="text-[#000080]" />
                  <span>Window Active Title Bar Color:</span>
                </label>
                <div className="flex items-center gap-1">
                  <span
                    className="w-12 h-3.5 border border-black inline-block shadow-sm"
                    style={{
                      background: `linear-gradient(90deg, ${previewTitleBar.start} 0%, ${previewTitleBar.end} 100%)`,
                    }}
                    title={`${previewTitleBar.start} to ${previewTitleBar.end}`}
                  />
                </div>
              </div>

              <select
                id="titlebar-select"
                value={selectedTitleBarId}
                onChange={(e) => {
                  soundFX.playClick();
                  handleTitleBarChange(e.target.value);
                }}
                className="win98-sunken-field w-full px-2 py-1 bg-white text-[11px] outline-none cursor-pointer"
              >
                {TITLE_BAR_OPTIONS.map((tb) => (
                  <option key={tb.id} value={tb.id}>
                    {tb.name} ({tb.description})
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Scheme Dropdown */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="scheme-select" className="font-bold flex items-center gap-1 text-gray-700">
                  <Sparkles size={13} className="text-amber-600" />
                  <span>Theme Scheme Preset:</span>
                </label>
              </div>

              <select
                id="scheme-select"
                onChange={(e) => handlePresetChange(e.target.value)}
                defaultValue=""
                className="win98-sunken-field w-full px-2 py-1 bg-white text-[11px] outline-none cursor-pointer"
              >
                <option value="" disabled>-- Select a coordinated vintage theme scheme --</option>
                {SCHEME_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Options Checkbox */}
            <div className="pt-1 flex items-center justify-between">
              <label className="flex items-center gap-1.5 cursor-pointer text-[10px]">
                <input
                  type="checkbox"
                  checked={livePreview}
                  onChange={(e) => {
                    setLivePreview(e.target.checked);
                    if (e.target.checked) {
                      onApplyChanges(previewWallpaperColor, previewTitleBar);
                    }
                  }}
                  className="accent-[#000080]"
                />
                <span>Instant live desktop preview while choosing</span>
              </label>

              <button
                type="button"
                onClick={handleResetDefaults}
                className="win98-btn text-[10px] py-0.5 px-2 flex items-center gap-1 text-gray-700"
                title="Reset to classic Windows 98 Teal and Standard Navy"
              >
                <RotateCcw size={10} />
                <span>Reset Defaults</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: BACKGROUND (Visual Grid of Color Swatches) */}
        {activeTab === 'background' && (
          <div className="space-y-2">
            <div className="font-bold">Select Desktop Background Color:</div>
            <div className="grid grid-cols-2 gap-1.5 max-h-[160px] overflow-y-auto win98-sunken p-1.5 bg-white">
              {WALLPAPER_OPTIONS.map((wp) => {
                const isSelected = selectedWallpaperId === wp.id || previewWallpaperColor.toLowerCase() === wp.color.toLowerCase();
                return (
                  <div
                    key={wp.id}
                    onClick={() => {
                      soundFX.playClick();
                      handleWallpaperChange(wp.color, wp.id);
                    }}
                    className={`flex items-center gap-2 p-1 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#000080] text-white border-[#000080]'
                        : 'hover:bg-[#e2e2e2] text-black border-transparent'
                    }`}
                  >
                    <span
                      className="w-5 h-5 border border-black shrink-0"
                      style={{ backgroundColor: wp.color }}
                    />
                    <div className="truncate text-[10px] leading-tight">
                      <div className="font-semibold">{wp.name}</div>
                      <div className={isSelected ? 'text-[#80d0ff]' : 'text-gray-500'}>{wp.color}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-[10px] text-gray-600 leading-snug">
              Tip: You can also specify any custom hex color using the color picker in the Appearance tab.
            </div>
          </div>
        )}

        {/* TAB 3: THEMES & PRESETS */}
        {activeTab === 'schemes' && (
          <div className="space-y-2">
            <div className="font-bold">Retro Windows 98 Color Schemes:</div>
            <div className="space-y-1.5 max-h-[160px] overflow-y-auto win98-sunken p-1.5 bg-white">
              {SCHEME_PRESETS.map((p) => {
                const wp = WALLPAPER_OPTIONS.find(w => w.id === p.wallpaperId);
                const tb = TITLE_BAR_OPTIONS.find(t => t.id === p.titleBarId);
                const isCurrent = previewWallpaperColor.toLowerCase() === wp?.color.toLowerCase() && selectedTitleBarId === tb?.id;

                return (
                  <div
                    key={p.id}
                    onClick={() => handlePresetChange(p.id)}
                    className={`p-1.5 border flex items-center justify-between cursor-pointer ${
                      isCurrent
                        ? 'bg-[#000080] text-white border-[#000080]'
                        : 'hover:bg-[#e8e8e8] text-black border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1 items-center">
                        <span
                          className="w-4 h-4 border border-black inline-block"
                          style={{ backgroundColor: wp?.color }}
                          title={`Wallpaper: ${wp?.name}`}
                        />
                        <span
                          className="w-8 h-4 border border-black inline-block"
                          style={{
                            background: `linear-gradient(90deg, ${tb?.start} 0%, ${tb?.end} 100%)`,
                          }}
                          title={`Title Bar: ${tb?.name}`}
                        />
                      </div>
                      <span className="font-bold text-[11px]">{p.name}</span>
                    </div>

                    {isCurrent && (
                      <span className="text-[10px] font-bold text-yellow-300 flex items-center gap-1">
                        <Check size={12} />
                        Active
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Dialog Action Buttons (Classic Windows 98: OK | Cancel | Apply) */}
      <div className="flex justify-end items-center gap-2 pt-2.5">
        <button
          type="button"
          onClick={handleOK}
          className="win98-btn min-w-[70px] font-bold"
        >
          OK
        </button>

        <button
          type="button"
          onClick={handleCancel}
          className="win98-btn min-w-[70px]"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleApply}
          disabled={!isDirty}
          className={`win98-btn min-w-[70px] ${!isDirty ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Apply
        </button>
      </div>
    </div>
  );
};
