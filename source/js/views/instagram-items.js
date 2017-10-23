export default ( json ) => {
    return json.data.map(( item ) => {
        return `
            <div class="js-carousel-item instagram__item js-carousel-image -cover -column" data-img-src="${item.images.standard_resolution.url}"></div>
        `;

    }).join( "" );
};
