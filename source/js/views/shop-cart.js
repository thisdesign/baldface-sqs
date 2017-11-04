import * as core from "../core";



export default ( data ) => {
    let html = ``;

    // Empty cart
    if ( data.message ) {
        html = `<div class="h3 -exp">${data.message}</div>`;

    } else {
        html = data.entries.map(( entry ) => {
            const dims = core.util.getOriginalDims( entry.item.originalSize );
            const aspect = dims.height / dims.width * 100;

            return `
                <div class="product product--basic -column -column--1of3 -vtop animate js-shop-product js-shop-cart-anim">
                    <div class="product__image">
                        <div class="aspect" style="padding-bottom:${aspect}%;">
                            <div class="aspect__media js-shop-cart-image -cover" data-img-src="${entry.item.assetUrl}" data-variants="${entry.item.systemDataVariants}"></div>
                        </div>
                        <div class="product__hover ghost">
                            <div class="ghost__child">
                                <button class="button button--size-small button--naira button--naira-up js-shop-removebutton" data-entry-id="${entry.id}" data-sku="${entry.chosenVariant.sku}" data-item-id="${entry.item.id}">
                                    <div class="button__hover">Remove from Cart</div>
                                    <div class="button__main">Remove from Cart</div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="product__infocard">
                        <div class="-column -vtop">
                            <div class="product__title p p--h3 -dark">${entry.title}</div>
                            ${entry.item.variants.map(( variant, i ) => {
                                if ( i === 0 && variant.attributes.Style ) {
                                    return `<div class="product__style p">${variant.attributes.Style}</div>`;
                                }

                                return "";

                            }).join( "" )}
                        </div>
                        <div class="-column -vtop">
                            <div class="product__price p p--h2 -dark">${window.Y.Squarespace.Commerce.priceString( entry.item ).replace( /\s|cad/gi, "" )}</div>
                        </div>
                    </div>
                </div>
            `;

        }).join( "" );
    }

    return html;
};
