export default ( items ) => {
    return `
        ${items.map(( item ) => {
            return `<div class="feed__item -column">
                <div class="feed__aspect js-feed-image -cover" data-img-src="${item.image.url}" style="padding-bottom:${item.image.height / item.image.width * 100}%;"></div>
            </div>`;

        }).join( "" )}
    `;
};
