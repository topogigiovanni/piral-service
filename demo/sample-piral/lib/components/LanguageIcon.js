import * as React from 'react';
function getLanguageUrl(language) {
    switch (language) {
        case 'de':
            return require('../images/de.png');
        default:
            return require('../images/en.png');
    }
}
export const LanguageIcon = ({ language }) => {
    const url = getLanguageUrl(language);
    return React.createElement("img", { src: url, title: language, className: "language-icon" });
};
