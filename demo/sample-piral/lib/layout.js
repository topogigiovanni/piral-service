import * as React from 'react';
import { useTranslate } from 'piral';
import { SearchInput } from 'piral-search';
import { Layout, LanguagePicker } from './components';
import { getTileClass } from './utils';
export const errors = {
    menu: () => React.createElement("span", null),
    extension: () => React.createElement("div", null),
    feed: ({ error }) => (React.createElement("div", { className: "pi-error" },
        React.createElement("img", { src: require('./images/error.svg'), alt: "Error" }),
        React.createElement("div", { className: "pi-title" }, "Data Unavailable"),
        React.createElement("div", { className: "pi-description" }, "The demanded data has not been found. Please contact support to resolve this issue."),
        React.createElement("div", { className: "pi-details" }, error))),
    loading: () => (React.createElement("div", { className: "pi-center" },
        React.createElement("div", { className: "pi-error" },
            React.createElement("img", { src: require('./images/error.svg'), alt: "Error" }),
            React.createElement("div", { className: "pi-title" }, "Something Went Wrong"),
            React.createElement("div", { className: "pi-description" }, "An error occured during the loading process. Try refreshing or come back later.")))),
    not_found: () => (React.createElement("div", { className: "pi-error" },
        React.createElement("img", { src: require('./images/not-found.svg'), alt: "Not Found" }),
        React.createElement("div", { className: "pi-title" }, "Page Not Found"),
        React.createElement("div", { className: "pi-description" }, "The provided URL does not map to a page. Please contact support to resolve this issue."))),
    page: () => (React.createElement("div", { className: "pi-error" },
        React.createElement("img", { src: require('./images/error.svg'), alt: "Error" }),
        React.createElement("div", { className: "pi-title" }, "Page Crashed"),
        React.createElement("div", { className: "pi-description" }, "Sorry for the inconvenience. We try to resolve the issue as soon as possible."))),
    modal: ({ onClose }) => (React.createElement("div", { className: "pi-error" },
        React.createElement("img", { src: require('./images/error.svg'), alt: "Error" }),
        React.createElement("div", { className: "pi-title" }, "Dialog Crashed"),
        React.createElement("div", { className: "pi-description" },
            React.createElement("p", null, "Sorry for the inconvenience. We try to resolve the issue as soon as possible."),
            React.createElement("button", { className: "btn btn-primary", onClick: onClose }, "Close")))),
    tile: () => (React.createElement("div", { className: "pi-error" },
        React.createElement("div", { className: "pi-title" }, "Tile Crashed"),
        React.createElement("div", { className: "pi-description" }, "Sorry for the inconvenience."))),
    unknown: () => (React.createElement("div", { className: "pi-error" },
        React.createElement("img", { src: require('./images/error.svg'), alt: "Error" }),
        React.createElement("div", { className: "pi-title" }, "Unknown Error"),
        React.createElement("div", { className: "pi-description" }, "An unknown error occured."))),
};
export const layout = {
    Layout,
    LanguagesPicker: LanguagePicker,
    LoadingIndicator: () => (React.createElement("div", { className: "pi-center" },
        React.createElement("div", { className: "pi-spinner" }, "Loading"))),
    DashboardContainer: ({ children }) => {
        const translate = useTranslate();
        return (React.createElement("div", { className: "pi-content" },
            React.createElement("h1", null, translate('sample')),
            React.createElement("div", { className: "pi-dashboard" }, children)));
    },
    DashboardTile: ({ children, rows, columns }) => React.createElement("div", { className: getTileClass(columns, rows) }, children),
    MenuContainer: ({ children }) => React.createElement("div", { className: "pi-menu" }, children),
    MenuItem: ({ children }) => React.createElement("div", { className: "pi-item" }, children),
    SearchContainer: ({ loading, children }) => (React.createElement("div", { className: "pi-search" },
        React.createElement(SearchInput, null),
        React.createElement("div", { className: "pi-details" },
            children,
            loading && (React.createElement("div", { className: "pi-center" },
                React.createElement("div", { className: "pi-spinner" })))))),
    SearchInput: ({ setValue, value }) => {
        const translate = useTranslate();
        return (React.createElement("input", { type: "search", required: true, placeholder: translate('search'), onChange: e => setValue(e.target.value), value: value }));
    },
    SearchResult: ({ children }) => React.createElement("div", { className: "pi-item" }, children),
    NotificationsHost: ({ children }) => React.createElement("div", { className: "pi-notifications" }, children),
    NotificationsToast: ({ options, onClose, children }) => (React.createElement("div", { className: `pi-item ${options.type}` },
        React.createElement("div", { className: "pi-details" },
            options.title && React.createElement("div", { className: "pi-title" }, options.title),
            React.createElement("div", { className: "pi-description" }, children)),
        React.createElement("div", { className: "pi-close", onClick: onClose }))),
    ModalsHost: ({ children, open }) => {
        React.useEffect(() => {
            const body = document.body;
            if (open) {
                body.style.top = `-${window.scrollY}px`;
                body.classList.add('pi-modal-open');
            }
            else {
                const offset = -parseInt(body.style.top || '0', 10);
                body.classList.remove('pi-modal-open');
                body.style.top = '';
                window.scrollTo(0, offset);
            }
            return () => { };
        }, [open]);
        return React.createElement("div", { className: "pi-modal" }, children);
    },
    ModalsDialog: ({ children }) => React.createElement("div", { className: "pi-modal-dialog" }, children),
};
