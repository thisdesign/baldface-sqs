export default ( items ) => {
    return items.map(( item ) => {
        // Share <svg> block partials with JS source code :-P
        const rTags = /(<([^>]+)>)/ig;
        const icon = require( `../../../blocks/svg-${item.icon}.block` );
        const url = (item.ig ? item.url : "#");
        const jsClass = (item.ig ? "" : "js-feed-modal-link");
        const target = (item.ig ? `target="_blank"` : "");
        const padBottom = item.image.height / item.image.width * 100;
        const caption = item.caption ? `<div class="grid__caption p">${item.caption.replace( rTags, "" )}</div>` : null;
        const title = item.title ? `<div class="grid__title p p--h3">${item.title.replace( rTags, "" )}</div>` : null;

        return `
            <a href="${url}" class="grid__item feed__item -column animate-lift js-feed-anim js-hover-item ${jsClass}" data-id="${item.id}" ${target}>
                <div class="animate__el -poino">
                    <div class="feed__aspect js-feed-image -cover" data-img-src="${item.image.url}" style="padding-bottom:${padBottom}%;"></div>
                    <div class="feed__icon">${icon}</div>
                    <div class="grid__hover ghost">
                        <div class="grid__hover__el ghost__child">
                            ${title || ""}
                            ${caption || ""}
                        </div>
                    </div>
                </div>
            </a>
        `;

    }).join( "" );
};
