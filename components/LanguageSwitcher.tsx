import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        // document.dir = lng === 'ar' ? 'rtl' : 'ltr'; // Removed RTL support
    };

    return (
        <div className="flex items-center gap-2">
            <Globe size={16} className="text-slate-400" />
            <select
                onChange={(e) => changeLanguage(e.target.value)}
                value={i18n.language}
                className="bg-transparent text-xs font-mono text-slate-400 uppercase tracking-widest outline-none cursor-pointer hover:text-primary transition-colors"
            >
                <option value="en" className="bg-slate-900 text-slate-400">EN</option>
                <option value="fr" className="bg-slate-900 text-slate-400">FR</option>
            </select>
        </div>
    );
};

export default LanguageSwitcher;
