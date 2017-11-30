export default ( data ) => {
    const order = data.variantOptionOrdering[ 1 ];
    const variants = [];

    data.variants.forEach(( variant ) => {
        const compare = variants.find(( vari ) => {
            return vari.attributes[ order ] === variant.attributes[ order ];
        });

        if ( !compare ) {
            variants.push( variant );
        }
    });

    return `
        <div class="p -meta -dark">${order}</div>
        <select class="product__selector js-shop-size-selector p -meta">
            ${variants.map(( variant, i ) => {
                return `<option value="${variant.attributes[ order ]}" ${i === 0 ? "selected" : ""}>${variant.attributes[ order ]}</option>`;

            }).join( "" )}
        </select>
    `;
};
