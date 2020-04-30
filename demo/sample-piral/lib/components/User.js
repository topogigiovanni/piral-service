import * as React from 'react';
import { useGlobalState, useOnClickOutside } from 'piral';
import { withClass } from './utils';
export const User = () => {
    const [open, setOpen] = React.useState(false);
    const currentUser = useGlobalState(m => m.user);
    const menuItems = useGlobalState(m => m.registry.menuItems);
    const itemNames = Object.keys(menuItems).filter(m => menuItems[m].settings.type === 'user');
    const container = React.useRef(undefined);
    const image = currentUser ? require('../images/male.png') : require('../images/female.png');
    const items = itemNames.length > 0 && (React.createElement(React.Fragment, null,
        React.createElement("li", { className: "sep" }),
        itemNames.map(name => {
            const Component = menuItems[name].component;
            return React.createElement(Component, { key: name });
        })));
    useOnClickOutside(container, () => setOpen(false));
    return (React.createElement("div", { className: withClass('app-user', open && 'is-open'), ref: container },
        React.createElement("div", { className: "app-user-avatar", onClick: () => setOpen(!open) },
            React.createElement("img", { src: image, alt: "Profile Image" })),
        React.createElement("ul", { className: "app-user-details" }, currentUser ? (React.createElement(React.Fragment, null,
            React.createElement("li", null,
                React.createElement("span", { className: "user-name" }, "Name"),
                currentUser.firstName,
                " ",
                currentUser.lastName),
            items,
            React.createElement("li", { className: "sep" }),
            React.createElement("li", null,
                React.createElement("a", { href: "#" }, "Logout")))) : (React.createElement(React.Fragment, null,
            React.createElement("li", null,
                React.createElement("a", { href: "" }, "Login")),
            items)))));
};
