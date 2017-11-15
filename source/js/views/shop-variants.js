export default ( data ) => {
    return data.variantOptionOrdering.length ? `
        <div class="p -meta -dark">${data.variantOptionOrdering[ 0 ]}</div>
        <div class="product__selector">
            ${data.variants.map(( variant, i ) => {
                const vStyle = variant.attributes[ data.variantOptionOrdering[ 0 ] ];
                const bgColor = vStyle.replace( /\s/g, "" ).toLowerCase();

                return `<div class="product__variant js-shop-variant -column ${i === 0 ? "is-active" : ""}" data-style="${vStyle}" data-sku="${variant.sku}" style="background-color:${bgColor};"></div>`;

            }).join( "" )}
        </div>
    ` : ``;
};
