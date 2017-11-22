export default ( data ) => {
    const order = data.variantOptionOrdering[ 0 ];
    const variants = [];

    data.variants.forEach(( variant ) => {
        const compare = variants.find(( vari ) => {
            return vari.attributes[ order ] === variant.attributes[ order ];
        });

        if ( !compare ) {
            variants.push( variant );
        }
    });

    return data.variantOptionOrdering.length ? `
        <div class="p -meta -dark">${order}</div>
        <div class="product__selector">
            ${variants.map(( variant, i ) => {
                const vStyle = variant.attributes[ order ];
                const bgColor = vStyle.replace( /\s/g, "" ).toLowerCase();

                return `<div class="product__variant js-shop-style -column ${i === 0 ? "is-active" : ""}" data-style="${vStyle}" style="background-color:${bgColor};"></div>`;

            }).join( "" )}
        </div>
    ` : ``;
};
