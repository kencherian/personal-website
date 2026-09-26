import React, { useState, useEffect, useRef } from 'react';
import {
  WALLPAPER_OPTIONS,
  TITLE_BAR_OPTIONS,
  SCHEME_PRESETS,
  WallpaperOption,
  TitleBarOption,
} from '../../data/displayThemes';
import { soundFX } from '../../utils/sound';
import { Monitor, Palette, Sparkles, Check, RotateCcw, Type, Moon, Clock, Play, Zap } from 'lucide-react';
import { StarfieldCanvas, StarBlinkSpeed } from '../common/StarfieldCanvas';
import { ScreenSaverMode } from '../desktop/ScreenSaverOverlay';

export type FontSizeOption = 'standard' | 'large' | 'extralarge';

interface DisplayPropertiesAppProps {
  currentWallpaperColor: string;
  currentTitleBar: TitleBarOption;
  currentFontSize?: FontSizeOption;
  currentScreenSaverMode?: ScreenSaverMode;
  currentScreenSaverWait?: number;
  onApplyChanges: (
    wallpaperColor: string,
    titleBar: TitleBarOption,
    fontSize?: FontSizeOption,
    screenSaverMode?: ScreenSaverMode,
    screenSaverWait?: number
  ) => void;
  onPreviewScreenSaver?: (
    mode: ScreenSaverMode,
    starSettings?: {
      starTrailing: boolean;
      blinkSpeed: StarBlinkSpeed;
      speed: number;
      starCount: number;
    }
  ) => void;
  onClose: () => void;
}

export const DisplayPropertiesApp: React.FC<DisplayPropertiesAppProps> = ({
  currentWallpaperColor,
  currentTitleBar,
  currentFontSize = 'standard',
  currentScreenSaverMode = 'stars',
  currentScreenSaverWait = 2,
  onApplyChanges,
  onPreviewScreenSaver,
  onClose,
}) => {
  // Tabs: 'appearance' | 'screensaver' | 'background' | 'schemes'
  const [activeTab, setActiveTab] = useState<'appearance' | 'screensaver' | 'background' | 'schemes'>('appearance');

  // Preview state (what's currently selected in the dialog)
  const [selectedWallpaperId, setSelectedWallpaperId] = useState<string>(() => {
    const matched = WALLPAPER_OPTIONS.find(w => w.color.toLowerCase() === currentWallpaperColor.toLowerCase());
    return matched ? matched.id : 'custom';
  });

  const [previewWallpaperColor, setPreviewWallpaperColor] = useState<string>(currentWallpaperColor);
  const [selectedTitleBarId, setSelectedTitleBarId] = useState<string>(currentTitleBar.id);
  const [fontSize, setFontSize] = useState<FontSizeOption>(currentFontSize);
  const [screenSaverMode, setScreenSaverMode] = useState<ScreenSaverMode>(currentScreenSaverMode);
  const [screenSaverWait, setScreenSaverWait] = useState<number>(currentScreenSaverWait);
  const [showStarSettings, setShowStarSettings] = useState<boolean>(true);
  const [starTrailing, setStarTrailing] = useState<boolean>(() => {
    const saved = localStorage.getItem('win98_star_trailing');
    return saved !== null ? saved === 'true' : true;
  });
  const [starBlink, setStarBlink] = useState<StarBlinkSpeed>(() => {
    return (localStorage.getItem('win98_star_blink') as StarBlinkSpeed) || 'normal';
  });
  const [starSpeed, setStarSpeed] = useState<number>(() => {
    const saved = localStorage.getItem('win98_star_speed');
    return saved ? Number(saved) : 4;
  });
  const [starCount, setStarCount] = useState<number>(() => {
    const saved = localStorage.getItem('win98_star_count');
    return saved ? Number(saved) : 200;
  });

  const [livePreview, setLivePreview] = useState<boolean>(true);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [isStrobing, setIsStrobing] = useState<boolean>(false);
  const strobeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (strobeTimerRef.current) {
        window.clearTimeout(strobeTimerRef.current);
      }
    };
  }, []);

  const handleTriggerResetPulse = () => {
    soundFX.playClick();
    if (strobeTimerRef.current) {
      window.clearTimeout(strobeTimerRef.current);
    }
    setIsStrobing(false);
    requestAnimationFrame(() => {
      setIsStrobing(true);
      strobeTimerRef.current = window.setTimeout(() => {
        setIsStrobing(false);
      }, 700);
    });
  };

  // Derive current TitleBarOption
  const previewTitleBar = TITLE_BAR_OPTIONS.find(t => t.id === selectedTitleBarId) || currentTitleBar;

  const handleStarTrailingToggle = (checked: boolean) => {
    setStarTrailing(checked);
    try {
      localStorage.setItem('win98_star_trailing', String(checked));
    } catch {
      // ignore
    }
  };

  const handleStarBlinkChange = (blink: StarBlinkSpeed) => {
    setStarBlink(blink);
    try {
      localStorage.setItem('win98_star_blink', blink);
    } catch {
      // ignore
    }
  };

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
    setFontSize(currentFontSize);
    setScreenSaverMode(currentScreenSaverMode);
    setScreenSaverWait(currentScreenSaverWait);
    setIsDirty(false);
  }, [currentWallpaperColor, currentTitleBar, currentFontSize, currentScreenSaverMode, currentScreenSaverWait]);

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
      onApplyChanges(color, previewTitleBar, fontSize, screenSaverMode, screenSaverWait);
    }
  };

  const handleTitleBarChange = (id: string) => {
    setSelectedTitleBarId(id);
    setIsDirty(true);
    const targetTitleBar = TITLE_BAR_OPTIONS.find(t => t.id === id) || currentTitleBar;

    if (livePreview) {
      onApplyChanges(previewWallpaperColor, targetTitleBar, fontSize, screenSaverMode, screenSaverWait);
    }
  };

  const handleFontSizeChange = (size: FontSizeOption) => {
    setFontSize(size);
    setIsDirty(true);

    if (livePreview) {
      onApplyChanges(previewWallpaperColor, previewTitleBar, size, screenSaverMode, screenSaverWait);
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
        onApplyChanges(wp.color, tb, fontSize, screenSaverMode, screenSaverWait);
      }
    }
  };

  const handleApply = () => {
    soundFX.playClick();
    onApplyChanges(previewWallpaperColor, previewTitleBar, fontSize, screenSaverMode, screenSaverWait);
    setIsDirty(false);
  };

  const handleOK = () => {
    soundFX.playClick();
    onApplyChanges(previewWallpaperColor, previewTitleBar, fontSize, screenSaverMode, screenSaverWait);
    onClose();
  };

  const handleCancel = () => {
    soundFX.playClick();
    // Revert back to original props if user made live changes
    if (isDirty || livePreview) {
      onApplyChanges(
        currentWallpaperColor,
        currentTitleBar,
        currentFontSize,
        currentScreenSaverMode,
        currentScreenSaverWait
      );
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
    setFontSize('standard');
    setScreenSaverMode('stars');
    setScreenSaverWait(2);
    setStarTrailing(true);
    setStarBlink('normal');
    setStarSpeed(4);
    setStarCount(200);
    try {
      localStorage.setItem('win98_star_trailing', 'true');
      localStorage.setItem('win98_star_blink', 'normal');
      localStorage.setItem('win98_star_speed', '4');
      localStorage.setItem('win98_star_count', '200');
    } catch {}
    setIsDirty(true);
    if (livePreview) {
      onApplyChanges(defaultWp.color, defaultTb, 'standard', 'stars', 2);
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
          className={`px-2.5 py-1 -mb-[1px] border-t border-l border-r border-white border-b-0 cursor-pointer ${
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
            setActiveTab('screensaver');
          }}
          className={`px-2.5 py-1 -mb-[1px] border-t border-l border-r border-white border-b-0 cursor-pointer ${
            activeTab === 'screensaver'
              ? 'bg-[#c0c0c0] font-bold text-black border-t-2 border-t-[#ffffff] shadow-[-1px_-1px_0px_#dfdfdf]'
              : 'bg-[#b0b0b0] text-[#404040] hover:bg-[#b8b8b8]'
          }`}
          style={{
            borderTopLeftRadius: '3px',
            borderTopRightRadius: '3px',
            boxShadow: activeTab === 'screensaver' ? 'inset 1px 1px #ffffff, inset -1px 0 #808080' : 'none',
          }}
        >
          Screen Saver
        </button>

        <button
          type="button"
          onClick={() => {
            soundFX.playClick();
            setActiveTab('background');
          }}
          className={`px-2.5 py-1 -mb-[1px] border-t border-l border-r border-white border-b-0 cursor-pointer ${
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
          className={`px-2.5 py-1 -mb-[1px] border-t border-l border-r border-white border-b-0 cursor-pointer ${
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
                style={{ backgroundColor: activeTab === 'screensaver' ? '#000000' : previewWallpaperColor }}
              >
                {activeTab === 'screensaver' ? (
                  <div className="w-full h-full relative bg-black flex items-center justify-center overflow-hidden">
                    {screenSaverMode === 'stars' && (
                      <StarfieldCanvas
                        speed={starSpeed}
                        starCount={starCount}
                        starTrailing={starTrailing}
                        blinkSpeed={starBlink}
                      />
                    )}
                    {screenSaverMode === 'blank' && (
                      <div className="w-full h-full bg-black flex flex-col items-center justify-center">
                        <span className="text-[#444444] font-mono text-[9px] tracking-widest">[ BLANK SCREEN ]</span>
                      </div>
                    )}
                    {screenSaverMode === 'none' && (
                      <div className="w-full h-full flex flex-col items-center justify-center text-center p-2" style={{ backgroundColor: previewWallpaperColor }}>
                        <span className="text-white text-[10px] font-bold drop-shadow">[ No Screen Saver ]</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {/* Sample Inactive Window in background */}
                    <div
                      className={`absolute top-1.5 left-2 win98-outset opacity-90 shadow transition-all duration-150 ${
                        fontSize === 'extralarge'
                          ? 'w-[145px] text-[10px]'
                          : fontSize === 'large'
                          ? 'w-[138px] text-[9px]'
                          : 'w-[130px] text-[8px]'
                      }`}
                    >
                      <div className="win98-title-inactive px-1 py-[1px] flex justify-between items-center text-white">
                        <span className="truncate">Inactive Window</span>
                        <span className={fontSize !== 'standard' ? 'text-[8px]' : 'text-[7px]'}>✕</span>
                      </div>
                      <div className={`bg-[#c0c0c0] p-1 text-[#555] ${fontSize !== 'standard' ? 'text-[8px]' : 'text-[7px]'}`}>
                        Inactive Client Area
                      </div>
                    </div>

                    {/* Sample Active Window in foreground */}
                    <div
                      className={`absolute win98-outset shadow-lg z-10 transition-all duration-150 ${
                        fontSize === 'extralarge'
                          ? 'top-4 left-6 w-[172px]'
                          : fontSize === 'large'
                          ? 'top-5 left-7 w-[162px]'
                          : 'top-6 left-8 w-[150px]'
                      }`}
                    >
                      {/* Dynamic Active Title Bar Preview */}
                      <div
                        className={`px-1.5 flex justify-between items-center text-white font-bold transition-all ${
                          fontSize === 'extralarge'
                            ? 'py-[3px] text-[11.5px]'
                            : fontSize === 'large'
                            ? 'py-[2.5px] text-[10.5px]'
                            : 'py-[2px] text-[9px]'
                        }`}
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
                          <span className={`${fontSize !== 'standard' ? 'w-3 h-2.5 text-[7px]' : 'w-2.5 h-2 text-[6px]'} bg-[#c0c0c0] text-black flex items-center justify-center font-bold`}>_</span>
                          <span className={`${fontSize !== 'standard' ? 'w-3 h-2.5 text-[7px]' : 'w-2.5 h-2 text-[6px]'} bg-[#c0c0c0] text-black flex items-center justify-center font-bold`}>□</span>
                          <span className={`${fontSize !== 'standard' ? 'w-3 h-2.5 text-[7px]' : 'w-2.5 h-2 text-[6px]'} bg-[#c0c0c0] text-black flex items-center justify-center font-bold`}>✕</span>
                        </div>
                      </div>

                      {/* Menu bar */}
                      <div
                        className={`bg-[#c0c0c0] px-1 border-b border-[#808080] flex gap-1.5 text-black transition-all ${
                          fontSize === 'extralarge' ? 'text-[9.5px] py-0.5' : fontSize === 'large' ? 'text-[8.5px] py-0.5' : 'text-[7px]'
                        }`}
                      >
                        <span><u>F</u>ile</span>
                        <span><u>E</u>dit</span>
                        <span><u>V</u>iew</span>
                      </div>

                      {/* Window Content */}
                      <div
                        className={`bg-white m-[2px] p-1 border border-[#808080] text-black space-y-0.5 transition-all ${
                          fontSize === 'extralarge' ? 'text-[10px]' : fontSize === 'large' ? 'text-[9px]' : 'text-[8px]'
                        }`}
                      >
                        <div className="font-semibold flex items-center justify-between">
                          <span>Window Text</span>
                          <span className={`text-[#000080] font-mono ${fontSize !== 'standard' ? 'text-[8px]' : 'text-[7px]'}`}>
                            {fontSize === 'large' ? '12pt Large' : fontSize === 'extralarge' ? '14pt X-Large' : '9pt Std'}
                          </span>
                        </div>
                        <div
                          className={`flex items-center justify-between text-gray-500 ${
                            fontSize === 'extralarge' ? 'text-[8.5px]' : fontSize === 'large' ? 'text-[8px]' : 'text-[7px]'
                          }`}
                        >
                          <span>Status: Normal</span>
                          <button
                            type="button"
                            className={`bg-[#c0c0c0] border border-black font-bold ${
                              fontSize === 'extralarge' ? 'px-2 text-[8px] py-0.5' : fontSize === 'large' ? 'px-1.5 text-[7px]' : 'px-1 text-[6px]'
                            }`}
                          >
                            OK
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Sample Message Box floating */}
                    <div className="absolute bottom-1 right-2 win98-outset p-1 shadow z-20 bg-[#c0c0c0] transition-all">
                      <div className={`${fontSize === 'extralarge' ? 'text-[8.5px]' : fontSize === 'large' ? 'text-[8px]' : 'text-[7px]'} font-bold text-center`}>
                        Message Box
                      </div>
                      <div className="flex justify-center mt-1">
                        <span
                          className={`bg-[#c0c0c0] border border-[#0a0a0a] font-bold ${
                            fontSize === 'extralarge' ? 'px-2.5 py-[1px] text-[7.5px]' : fontSize === 'large' ? 'px-2 py-[1px] text-[7px]' : 'px-2 py-[1px] text-[6px]'
                          }`}
                        >
                          OK
                        </span>
                      </div>
                    </div>
                  </>
                )}

                {/* Scanline CRT overlay effect */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-15"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)',
                    backgroundSize: '100% 3px',
                  }}
                />
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

            {/* 3. Font Size Control Dropdown */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="fontsize-select" className="font-bold flex items-center gap-1">
                  <Type size={13} className="text-[#000080]" />
                  <span>Font Size:</span>
                </label>
                <div className="flex items-center gap-1">
                  <span className="px-1.5 py-[1px] bg-[#dfdfdf] border border-[#808080] font-mono text-[9px] text-[#000080] font-bold">
                    {fontSize === 'large' ? '120 DPI (Large)' : fontSize === 'extralarge' ? '144 DPI (X-Large)' : '96 DPI (Standard)'}
                  </span>
                </div>
              </div>

              <select
                id="fontsize-select"
                value={fontSize}
                onChange={(e) => {
                  soundFX.playClick();
                  handleFontSizeChange(e.target.value as FontSizeOption);
                }}
                className="win98-sunken-field w-full px-2 py-1 bg-white text-[11px] outline-none cursor-pointer"
              >
                <option value="standard">Standard Fonts (96 DPI / Normal)</option>
                <option value="large">Large Fonts (120 DPI / High Readability)</option>
                <option value="extralarge">Extra Large Fonts (144 DPI / Maximum)</option>
              </select>
            </div>

            {/* Visual Font Size Sample Preview Pane */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] text-gray-700">
                <span className="font-bold flex items-center gap-1">
                  <span>Sample Font Preview:</span>
                </span>
                <span className="text-[9px] font-mono text-gray-500">
                  {fontSize === 'large'
                    ? '120 DPI (Large · +25% Scale)'
                    : fontSize === 'extralarge'
                    ? '144 DPI (Extra Large · +50% Scale)'
                    : '96 DPI (Standard · 100% Scale)'}
                </span>
              </div>

              <div className="win98-sunken p-2 bg-white space-y-1.5 transition-all duration-150">
                {/* Sample Title Text */}
                <div
                  className="font-bold text-[#000080] truncate transition-all duration-150"
                  style={{
                    fontSize: fontSize === 'extralarge' ? '15px' : fontSize === 'large' ? '13px' : '11px',
                    lineHeight: '1.2',
                  }}
                >
                  Active Window Title — MS Sans Serif
                </div>

                {/* Sample Body / Pangram */}
                <div
                  className="text-[#111111] transition-all duration-150 leading-snug"
                  style={{
                    fontSize: fontSize === 'extralarge' ? '14px' : fontSize === 'large' ? '12.5px' : '11px',
                  }}
                >
                  The quick brown fox jumps over the lazy dog.
                </div>

                {/* Specimen Glyphs & UI Controls */}
                <div className="pt-1 border-t border-[#dfdfdf] flex items-center justify-between gap-2">
                  <span
                    className="text-gray-500 tracking-wider font-mono transition-all duration-150"
                    style={{
                      fontSize: fontSize === 'extralarge' ? '11px' : fontSize === 'large' ? '10px' : '9px',
                    }}
                  >
                    AaBbCcXxYyZz · 0123456789
                  </span>

                  <button
                    type="button"
                    tabIndex={-1}
                    className="win98-btn"
                    style={{
                      fontSize: fontSize === 'extralarge' ? '11.5px' : fontSize === 'large' ? '10.5px' : '9px',
                      padding: fontSize === 'extralarge' ? '2px 8px' : fontSize === 'large' ? '2px 6px' : '1px 5px',
                    }}
                  >
                    Sample Button
                  </button>
                </div>
              </div>
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
                      onApplyChanges(previewWallpaperColor, previewTitleBar, fontSize);
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

        {/* TAB: SCREEN SAVER (Requested: toggle flying stars or blank, specify wait time in minutes) */}
        {activeTab === 'screensaver' && (
          <div className="space-y-3">
            {/* Screen Saver Group Box */}
            <fieldset className="border border-[#808080] p-2.5 shadow-sm space-y-2.5">
              <legend className="px-1 text-[11px] font-bold text-black flex items-center gap-1">
                <Moon size={12} className="text-[#000080]" />
                <span>Screen Saver</span>
              </legend>

              {/* Mode Selection and Action Buttons */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label htmlFor="screensaver-select" className="text-[11px] font-semibold text-gray-800">
                    Select Screen Saver:
                  </label>
                  {screenSaverMode === 'stars' && (
                    <button
                      type="button"
                      id="starfield-submenu-toggle"
                      onClick={() => {
                        soundFX.playClick();
                        setShowStarSettings((prev) => !prev);
                      }}
                      className="text-[10px] text-[#000080] hover:underline flex items-center gap-1 cursor-pointer font-medium"
                      title="Toggle Starfield Simulation Customization Sub-Menu"
                      aria-expanded={showStarSettings}
                    >
                      <Sparkles size={11} className="text-amber-600" />
                      <span>{showStarSettings ? '▲ Collapse Starfield Sub-Menu' : '▼ Expand Starfield Sub-Menu'}</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <select
                    id="screensaver-select"
                    value={screenSaverMode}
                    onChange={(e) => {
                      soundFX.playClick();
                      const newMode = e.target.value as ScreenSaverMode;
                      setScreenSaverMode(newMode);
                      setIsDirty(true);
                      if (livePreview) {
                        onApplyChanges(previewWallpaperColor, previewTitleBar, fontSize, newMode, screenSaverWait);
                      }
                    }}
                    className="win98-sunken-field flex-1 px-2 py-1 bg-white text-[11px] outline-none cursor-pointer"
                  >
                    <option value="stars">Flying Stars (Starfield Simulation)</option>
                    <option value="blank">Blank Screen (CRT Standby)</option>
                    <option value="none">(None)</option>
                  </select>

                  <button
                    type="button"
                    id="screensaver-settings-btn"
                    onClick={() => {
                      soundFX.playClick();
                      if (screenSaverMode === 'stars') {
                        setShowStarSettings((prev) => !prev);
                      }
                    }}
                    disabled={screenSaverMode !== 'stars'}
                    className={`win98-btn px-2.5 py-1 text-[11px] flex items-center gap-1 ${
                      screenSaverMode !== 'stars' ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    title="Customize Starfield trailing, blink speed, warp speed and star count"
                  >
                    <span><u>S</u>ettings...</span>
                    {screenSaverMode === 'stars' && (
                      <span className="text-[8px] opacity-75">{showStarSettings ? '▲' : '▼'}</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundFX.playClick();
                      onPreviewScreenSaver?.(screenSaverMode, {
                        starTrailing,
                        blinkSpeed: starBlink,
                        speed: starSpeed,
                        starCount,
                      });
                    }}
                    disabled={screenSaverMode === 'none'}
                    className={`win98-btn px-2.5 py-1 text-[11px] font-bold flex items-center gap-1 ${
                      screenSaverMode === 'none' ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    title="Click to preview fullscreen screen saver. Move mouse or press any key to exit."
                  >
                    <Play size={11} className="text-green-700" />
                    <span><u>P</u>review</span>
                  </button>
                </div>
              </div>

              {/* Expandable Sub-Menu specifically for Starfield Simulation */}
              {showStarSettings && screenSaverMode === 'stars' && (
                <div
                  id="starfield-simulation-submenu"
                  className="win98-outset p-2.5 bg-[#d4d0c8] space-y-2 border border-[#808080] my-1 shadow-sm transition-all"
                >
                  <div className="font-bold text-[10px] text-[#000080] border-b border-[#808080] pb-1 flex justify-between items-center">
                    <span className="flex items-center gap-1">
                      <Sparkles size={12} className="text-amber-600" />
                      <span>Starfield Simulation Sub-Menu (Customization)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        soundFX.playClick();
                        setShowStarSettings(false);
                      }}
                      className="win98-ctrl-btn text-[9px] px-1"
                      title="Collapse Starfield Sub-Menu"
                    >
                      ✕
                    </button>
                  </div>

                  {/* 1. Star Trailing Effect Toggle */}
                  <div className="win98-sunken p-2 bg-[#dfdfdf] space-y-1">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="star-trailing-toggle"
                        className="flex items-center gap-2 cursor-pointer font-bold text-[11px] text-black"
                      >
                        <input
                          type="checkbox"
                          id="star-trailing-toggle"
                          checked={starTrailing}
                          onChange={(e) => {
                            soundFX.playClick();
                            handleStarTrailingToggle(e.target.checked);
                          }}
                          className="accent-[#000080]"
                        />
                        <span>Enable Star Trailing effect</span>
                      </label>

                      <span
                        className={`px-1.5 py-[1px] text-[9px] font-mono border ${
                          starTrailing
                            ? 'bg-[#e0f2fe] border-[#0284c7] text-[#0369a1] font-bold'
                            : 'bg-[#f3f4f6] border-[#9ca3af] text-[#4b5563]'
                        }`}
                      >
                        {starTrailing ? 'STREAK TRAILS ON' : 'PINPOINT DOTS'}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-600 pl-5 leading-tight">
                      When enabled, stars cast motion streaks as they fly forward. Turn off for crisp retro pinpoint stars.
                    </p>
                  </div>

                  {/* 2. Star Blink Speed Selection */}
                  <div className="win98-sunken p-2 bg-[#dfdfdf] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="star-blink-select" className="font-bold text-[11px] text-black flex items-center gap-1">
                        <span>Star Blink Speed:</span>
                      </label>
                      <span
                        className={`px-1.5 py-[1px] border font-mono text-[9px] font-bold ${
                          starBlink === 'hyper'
                            ? 'bg-[#ffebee] border-[#d32f2f] text-[#c62828] shadow-sm'
                            : 'bg-white border-[#808080] text-[#000080]'
                        }`}
                      >
                        {starBlink === 'none'
                          ? '0.0x (Steady Glow)'
                          : starBlink === 'slow'
                          ? '0.5x (Gentle Shimmer)'
                          : starBlink === 'fast'
                          ? '2.5x (Rapid Strobe)'
                          : starBlink === 'hyper'
                          ? '5.0x (⚡ Hyper Strobe - 2x Fast)'
                          : '1.0x (Normal Twinkle)'}
                      </span>
                    </div>

                    <select
                      id="star-blink-select"
                      value={starBlink}
                      onChange={(e) => {
                        soundFX.playClick();
                        handleStarBlinkChange(e.target.value as StarBlinkSpeed);
                      }}
                      className="win98-sunken-field w-full px-2 py-1 bg-white text-[11px] outline-none cursor-pointer"
                    >
                      <option value="none">None (Steady Celestial Glow / No Blinking)</option>
                      <option value="slow">Slow (Gentle Cosmic Shimmer & Twinkle)</option>
                      <option value="normal">Normal (Classic Windows 98 Twinkling Stars)</option>
                      <option value="fast">Fast (Rapid Pulsing & Sparkling Strobe)</option>
                      <option value="hyper">Hyper (⚡ 2x Fast Hyper-Pulse / Ultra-Rapid Strobe)</option>
                    </select>

                    <div className="text-[9px] text-gray-600 font-mono flex justify-between px-0.5 items-center">
                      <span>● Steady</span>
                      <span>◐ Gentle</span>
                      <span>◑ Normal</span>
                      <span>✦ Fast</span>
                      <span className={`font-bold ${starBlink === 'hyper' ? 'text-[#b71c1c] underline' : 'text-gray-500'}`}>
                        ⚡ Hyper
                      </span>
                    </div>

                    {/* Dedicated Visual Indicator for Blink Speed in the Submenu */}
                    {starBlink === 'hyper' ? (
                      <div
                        id="hyper-blink-indicator-container"
                        className={`mt-1 p-1.5 bg-[#fff8e1] border border-[#ffb300] rounded-[1px] shadow-sm flex items-center justify-between gap-2 ${
                          isStrobing ? 'animate-strobe-test' : 'animate-hyper-fade'
                        }`}
                        style={{
                          animation: isStrobing
                            ? 'reset-pulse-strobe 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                            : 'hyper-fade-pulse 0.35s ease-in-out infinite',
                        }}
                      >
                        <div className="flex items-center gap-1.5 text-[10px] text-[#b78103] font-bold">
                          <Zap size={13} className="text-[#e65100] fill-[#ff9800] shrink-0 animate-bounce" />
                          <span>HYPER BLINK ACTIVE:</span>
                          <span className="font-normal text-black text-[9.5px]">
                            Pulses star brightness at 5.0× frequency (2× faster than Fast)
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* Reset Pulse Button for tactile visual strobe test */}
                          <button
                            type="button"
                            id="reset-pulse-button"
                            onClick={handleTriggerResetPulse}
                            className="win98-btn px-2 py-0.5 text-[9.5px] font-bold flex items-center gap-1 text-[#000080] hover:text-black cursor-pointer active:translate-y-[1px]"
                            title="Trigger momentary strobe effect test (50% → 100% → 80% brightness cycle)"
                          >
                            <RotateCcw size={10} className={isStrobing ? 'animate-spin text-[#000080]' : ''} />
                            <span>Reset Pulse</span>
                          </button>
                          {/* Dynamic flashing strobe indicator */}
                          <div className="px-1 py-0.5 bg-red-600 text-white font-mono text-[8px] font-extrabold uppercase tracking-wider rounded-xs animate-pulse">
                            <span>5.0X STROBE</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-1 px-1.5 py-0.5 bg-[#f0f0f0] border border-[#d0d0d0] text-[9.5px] text-gray-600 flex items-center justify-between font-mono">
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#000080]" />
                          <span>Current Rate:</span>
                          <span className="font-bold text-[#000080]">
                            {starBlink === 'none'
                              ? '0x (Constant)'
                              : starBlink === 'slow'
                              ? '0.5x (Gentle)'
                              : starBlink === 'normal'
                              ? '1.0x (Standard)'
                              : '2.5x (Fast)'}
                          </span>
                        </div>
                        <span className="text-gray-400">Choose 'Hyper' for 2× Fast speed</span>
                      </div>
                    )}
                  </div>

                  {/* 3. Warp Speed & Star Density Sliders */}
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#999999]">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="font-bold">Warp Speed:</span>
                        <span className="font-mono font-bold text-[#000080]">{starSpeed}x</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={starSpeed}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setStarSpeed(val);
                          try {
                            localStorage.setItem('win98_star_speed', String(val));
                          } catch {}
                        }}
                        className="w-full accent-[#000080] cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="font-bold">Star Density:</span>
                        <span className="font-mono font-bold text-[#000080]">{starCount} stars</span>
                      </div>
                      <input
                        type="range"
                        min="80"
                        max="400"
                        step="20"
                        value={starCount}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setStarCount(val);
                          try {
                            localStorage.setItem('win98_star_count', String(val));
                          } catch {}
                        }}
                        className="w-full accent-[#000080] cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Reset Defaults for Starfield Simulation */}
                  <div className="flex justify-between items-center pt-1 border-t border-[#dfdfdf]">
                    <span className="text-[9px] text-gray-600 font-mono">
                      Preview updates live in CRT monitor
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        soundFX.playClick();
                        handleStarTrailingToggle(true);
                        handleStarBlinkChange('normal');
                        setStarSpeed(4);
                        setStarCount(200);
                        try {
                          localStorage.setItem('win98_star_speed', '4');
                          localStorage.setItem('win98_star_count', '200');
                        } catch {}
                      }}
                      className="win98-btn px-2 py-0.5 text-[9px] text-gray-700 hover:text-black"
                      title="Reset Starfield simulation settings to authentic defaults"
                    >
                      Reset Starfield
                    </button>
                  </div>
                </div>
              )}

              {/* Wait Time in Minutes (Primary user requirement) */}
              <div className="pt-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label htmlFor="screensaver-wait" className="text-[11px] flex items-center gap-1 font-semibold">
                    <Clock size={12} className="text-[#000080]" />
                    <span><u>W</u>ait:</span>
                  </label>
                  <input
                    id="screensaver-wait"
                    type="number"
                    min="1"
                    max="99"
                    value={screenSaverWait}
                    disabled={screenSaverMode === 'none'}
                    onChange={(e) => {
                      const val = Math.max(1, Math.min(99, parseInt(e.target.value, 10) || 1));
                      setScreenSaverWait(val);
                      setIsDirty(true);
                      if (livePreview) {
                        onApplyChanges(previewWallpaperColor, previewTitleBar, fontSize, screenSaverMode, val);
                      }
                    }}
                    className={`win98-sunken-field w-14 px-1.5 py-0.5 text-center bg-white text-[11px] font-mono outline-none ${
                      screenSaverMode === 'none' ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  />
                  <span className="text-[11px]">minutes</span>
                </div>

                <div className="text-[10px] text-gray-600 font-mono">
                  {screenSaverMode === 'none'
                    ? 'Disabled'
                    : `Activates after ${screenSaverWait}m idle`}
                </div>
              </div>

              {/* Password Protection aesthetic checkbox */}
              <div className="pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer text-[10px]">
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    disabled={screenSaverMode === 'none'}
                    className="accent-[#000080]"
                  />
                  <span>Password protected on resume</span>
                </label>
              </div>
            </fieldset>

            {/* Energy Saving Monitor Box */}
            <fieldset className="border border-[#808080] p-2.5 shadow-sm">
              <legend className="px-1 text-[11px] font-bold text-black flex items-center gap-1">
                <Sparkles size={12} className="text-amber-600" />
                <span>Energy saving features of monitor</span>
              </legend>
              <div className="flex items-center justify-between text-[10px]">
                <div className="text-gray-600 max-w-[250px] leading-tight">
                  To adjust the power-off standby delay and CRT energy settings, click Energy Settings.
                </div>
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playDing();
                    alert('Energy Star v2.0: Monitor power management is configured for maximum retro efficiency (DPMS Standby: 15 min, CRT Suspend: 30 min).');
                  }}
                  className="win98-btn px-2 py-1 text-[10px]"
                >
                  Energy...
                </button>
              </div>
            </fieldset>
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
