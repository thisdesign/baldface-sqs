export default ( json ) => {
    return json.data.map(( item ) => {
        return `
            <div class="carousel__item js-carousel-item instagram__item js-carousel-image -cover" data-img-src="${item.images.standard_resolution.url}"></div>
        `;

    }).join( "" );
};
