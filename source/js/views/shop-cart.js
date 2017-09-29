import * as core from "../core";



export default ( data ) => {
    let html = ``;

    // Empty cart
    if ( data.message ) {
        html = `<div class="h1 -exp">${data.message}</div>`;

    } else {
        html = data.entries.map(( entry ) => {
            const dims = core.util.getOriginalDims( entry.item.originalSize );
            const aspect = dims.height / dims.width * 100;

            return `
                <div class="product -column -column--1of3 -vtop animate js-shop-cart-anim">
                    <div class="product__image">
                        <div class="aspect" style="padding-bottom:${aspect}%;">
                            <div class="aspect__media js-shop-cart-image -cover" data-img-src="${entry.item.assetUrl}" data-variants="${entry.item.systemDataVariants}"></div>
                        </div>
                    </div>
                    <div class="product__infocard">
                        <div class="-column">
                            <div class="product__title h3 -dark">${entry.title}</div>
                            ${entry.item.variants.map(( variant, i ) => {
                                if ( i === 0 && variant.attributes.Style ) {
                                    return `<div class="product__style p">${variant.attributes.Style}</div>`;
                                }

                                return `<div class="product__style p">&nbsp;</div>`;

                            }).join( "" )}
                        </div>
                        <div class="-column">
                            <div class="product__price h3 -dark">${entry.purchasePriceCents}</div>
                        </div>
                    </div>
                </div>
            `;

        }).join( "" );
    }

    return html;
};
