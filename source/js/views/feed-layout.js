export default ( items ) => {
    return `
        ${items.map(( item ) => {
            // Share <svg> block partials with JS source code :-P
            const icon = require( `../../../blocks/svg-${item.icon}.block` );
            const url = (item.ig ? item.url : "#");
            const jsClass = (item.ig ? "" : "js-feed-modal-link");
            const target = (item.ig ? `target="_blank"` : "");
            const padBottom = item.image.height / item.image.width * 100;
            const caption = item.caption.replace( /(<([^>]+)>)/ig, "" );

            return `
            <a href="${url}" class="grid__item feed__item -column animate-lift js-feed-anim ${jsClass}" data-id="${item.id}" ${target}>
                <div class="animate__el -poino">
                    <div class="feed__aspect js-feed-image -cover" data-img-src="${item.image.url}" style="padding-bottom:${padBottom}%;"></div>
                    <div class="feed__icon">${icon}</div>
                    <div class="feed__hover ghost">
                        <div class="feed__hover__el ghost__child">${caption}</div>
                    </div>
                </div>
            </a>`;

        }).join( "" )}
    `;
};
