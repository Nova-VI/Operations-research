document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        * {
            user-select: none;
            -webkit-user-drag: none;
        }
    `;
    document.head.append(style);
});