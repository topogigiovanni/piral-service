import * as React from 'react';
import { Menu, Notifications, Modals, Languages } from 'piral';
import { Search } from 'piral-search';
import { MenuToggle } from './MenuToggle';
import { User } from './User';
export const Layout = ({ children }) => (React.createElement("div", { className: "app-container" },
    React.createElement("div", { className: "app-menu" },
        React.createElement("div", { className: "app-menu-content" },
            React.createElement(Menu, { type: "general" }),
            React.createElement(Menu, { type: "admin" }))),
    React.createElement(Notifications, null),
    React.createElement(Modals, null),
    React.createElement("div", { className: "app-header" },
        React.createElement("div", { className: "app-title" },
            React.createElement(MenuToggle, null),
            React.createElement("h1", null, "Piral Sample")),
        React.createElement(Search, null),
        React.createElement(Menu, { type: "header" }),
        React.createElement(Languages, null),
        React.createElement(User, null)),
    React.createElement("div", { className: "app-content" }, children),
    React.createElement("div", { className: "app-footer" },
        React.createElement(Menu, { type: "footer" }))));
