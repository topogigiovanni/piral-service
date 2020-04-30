export function withClass(baseClass, optional) {
    if (!optional || typeof optional !== 'string') {
        return baseClass;
    }
    return `${baseClass} ${optional}`;
}
