export default ( json ) => {
    return json.data.map(( item ) => {
        const rTags = /(<([^>]+)>)/ig;
        const title = `<div class="grid__title p">${item.caption.text.replace( rTags, "" )}</div>`;

        return `
            <div class="js-carousel-item instagram__item js-carousel-image -cover -column js-hover-item" data-img-src="${item.images.standard_resolution.url}">
                <div class="grid__hover ghost -poino">
                    <div class="grid__hover__el ghost__child">
                        ${title}
                    </div>
                </div>
            </div>
        `;

    }).join( "" );
};
