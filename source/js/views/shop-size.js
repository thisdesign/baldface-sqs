export default ( data ) => {
    const order = data.variantOptionOrdering[ 1 ];

    return `
        <div class="p -meta -dark">${order}</div>
        <select class="product__selector js-shop-size-selector p -meta">
            ${data.variants.map(( variant, i ) => {
                return `<option value="${variant.attributes[ order ]}" ${i === 0 ? "selected" : ""}>${variant.attributes[ order ]}</option>`;

            }).join( "" )}
        </select>
    `;
};
