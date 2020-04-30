const languages = {
    en: 'English',
    de: 'Deutsch',
};
function getSampleTranslations(language) {
    switch (language) {
        case 'en':
            return Object.assign(Object.assign({}, languages), { sample: 'Welcome to the Piral Sample App!', search: 'Search ...' });
        case 'de':
            return Object.assign(Object.assign({}, languages), { sample: 'Willkommen in der Piral Beispielanwendung!', search: 'Suche ...' });
    }
}
export function loadLanguage(language, data) {
    // Usually these languages / data could be retrieved from a
    // translation service that takes care of *all* translations
    return new Promise(resolve => setTimeout(() => 
    // In this case we only fake the API access - for such static
    // translations Piral contains a better / simpler mechanism
    resolve(Object.assign(Object.assign({}, data), { global: getSampleTranslations(language) })), 500));
}
