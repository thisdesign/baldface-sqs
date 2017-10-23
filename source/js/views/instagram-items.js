export default ( json ) => {
    return json.data.map(( item ) => {
        const rTags = /(<([^>]+)>)/ig;
        const caption = `<div class="grid__title p p--h3">${item.caption.text.replace( rTags, "" )}</div>`;

        return `
            <div class="js-carousel-item instagram__item js-carousel-image -cover -column js-hover-item" data-img-src="${item.images.standard_resolution.url}">
                <div class="grid__hover ghost -poino">
                    <div class="grid__hover__el ghost__child">
                        ${caption}
                    </div>
                </div>
            </div>
        `;

    }).join( "" );
};
