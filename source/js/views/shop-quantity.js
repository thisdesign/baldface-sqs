export default ( data, sku ) => {
    let idx = 0;
    const values = [];
    const variant = data.variants.find( ( item ) => item.sku === sku );

    while ( idx < variant.qtyInStock ) {
        idx++;
        values.push( idx );
    }

    return `
        <div class="p -meta -dark">Quantity</div>
        <select class="product__selector js-shop-quantity-selector p -meta">
            ${values.map(( value, i ) => {
                return `<option value="${value}" ${i === 0 ? "selected" : ""}>${value}</option>`;

            }).join( "" )}
        </select>
    `;
};
