import React from 'react';
import { Moon, Sun, Sparkles, Type } from 'lucide-react';

export type ThemeType = 'dark' | 'light' | 'indigo';

interface ThemeSelectorProps {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  isLargeText: boolean;
  setIsLargeText: (val: boolean) => void;
  language: 'en' | 'mr';
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  theme,
  setTheme,
  isLargeText,
  setIsLargeText,
  language
}) => {
  const isMr = language === 'mr';

  const themes: { id: ThemeType; label_en: string; label_mr: string; icon: any }[] = [
    { id: 'dark', label_en: 'Dark Gold', label_mr: 'सुवर्ण रात्र', icon: Moon },
    { id: 'light', label_en: 'Light Sand', label_mr: 'शांत प्रकाश', icon: Sun },
    { id: 'indigo', label_en: 'Indigo Sky', label_mr: 'गहन निळा', icon: Sparkles },
  ];

  return (
    <div className="flex items-center gap-1 p-0.5 sm:p-1 rounded-full bg-white/[0.04] border border-[var(--app-border)] shrink-0">
      {themes.map((t) => {
        const Icon = t.icon;
        const isSelected = theme === t.id;
        return (
          <button
            key={`theme-btn-${t.id}`}
            onClick={() => setTheme(t.id)}
            className={`p-1.5 rounded-full text-xs font-medium transition-all flex items-center justify-center ${
              isSelected
                ? 'bg-[#d4af37] text-black font-semibold shadow-sm'
                : 'text-[var(--app-text-muted)] hover:text-[var(--app-text)] hover:bg-white/5'
            }`}
            title={isMr ? t.label_mr : t.label_en}
            aria-label={isMr ? t.label_mr : t.label_en}
          >
            <Icon className="w-3.5 h-3.5" />
          </button>
        );
      })}

      {/* Font Size Toggle Button */}
      <button
        onClick={() => setIsLargeText(!isLargeText)}
        className={`px-1.5 py-1 rounded-full text-[10px] font-bold border transition-all flex items-center gap-0.5 ${
          isLargeText
            ? 'bg-[#d4af37] text-black border-[#d4af37]'
            : 'border-transparent text-[var(--app-text-muted)] hover:text-[var(--app-text)]'
        }`}
        title={isMr ? 'फॉन्ट आकार बदला (A/A+)' : 'Toggle Font Size (A/A+)'}
        aria-label="Toggle Font Size"
      >
        <Type className="w-3 h-3" />
        <span className="leading-none">{isLargeText ? 'A+' : 'A'}</span>
      </button>
    </div>
  );
};
