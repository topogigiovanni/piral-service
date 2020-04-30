import * as React from 'react';
function attach(element) {
    return {
        settings: {
            type: 'footer',
        },
        component: () => element,
    };
}
export function setupFooter() {
    return [
        attach(React.createElement("a", { href: "https://smapiot.com/legal/imprint/", target: "_blank" }, "Imprint")),
        attach(React.createElement("a", { href: "https://smapiot.com/legal/privacy/", target: "_blank" }, "Data Privacy")),
        attach(React.createElement("a", { href: "https://smapiot.com/legal/disclaimer/", target: "_blank" }, "Legal Disclaimer")),
    ];
}
