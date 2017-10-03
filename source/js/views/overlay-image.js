export default ( item ) => {
    const jsClass = (item.image.width > item.image.height ? "overlay__image--wide" : "overlay__image--tall");

    return `
        <img class="overlay__image ${jsClass} js-overlay-image" data-img-src="${item.image.url}" />
    `;
};
