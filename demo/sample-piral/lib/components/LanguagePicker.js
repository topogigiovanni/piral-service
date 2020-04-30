import * as React from 'react';
import { useOnClickOutside, useDynamicLanguage, useTranslate } from 'piral';
import { LanguageIcon } from './LanguageIcon';
import { loadLanguage } from '../language';
export const LanguagePicker = ({ selected, available }) => {
    const [open, setOpen] = React.useState(false);
    const [language, setLanguage] = useDynamicLanguage(selected, loadLanguage);
    const container = React.useRef();
    const translate = useTranslate();
    useOnClickOutside(container, () => setOpen(false));
    return (React.createElement("div", { className: "language-picker", ref: container },
        React.createElement("div", { className: "current", onClick: () => setOpen(!open) },
            React.createElement(LanguageIcon, { language: language })),
        React.createElement("ul", { className: open ? 'open' : 'closed' }, available.map(lang => (React.createElement("li", { key: lang, onClick: () => setLanguage(lang) },
            React.createElement(LanguageIcon, { language: lang }),
            " ",
            React.createElement("span", null, translate(lang))))))));
};
