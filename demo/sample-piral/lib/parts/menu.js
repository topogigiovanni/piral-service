import * as React from 'react';
import { Link } from 'react-router-dom';
function attach(element) {
    return {
        settings: {
            type: 'general',
        },
        component: () => element,
    };
}
export function setupMenu() {
    return [attach(React.createElement(Link, { to: "/" }, "Home")), attach(React.createElement(Link, { to: "/error" }, "Not Found"))];
}
