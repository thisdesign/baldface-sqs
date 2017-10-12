import * as core from "../core";
import $ from "properjs-hobo";
import Store from "../core/Store";
import shopCartView from "../views/shop-cart";
import shopVariantsView from "../views/shop-variants";
import shopQuantityView from "../views/shop-quantity";
import AnimateController from "./AnimateController";



class ShopProduct {
    constructor ( element ) {
        this.element = element;
        this.shopSku = null;
        this.shopQty = null;
        this.shopVariants = this.element.find( ".js-shop-variants" );
        this.shopQuantity = this.element.find( ".js-shop-quantity" );

        this.bind();
        this.loadVariants();
    }


    bind () {
        this.element.on( "click", ".js-shop-addbutton", ( e ) => {
            const elem = $( e.target );
            const data = elem.data();
            const payload = {
                sku: this.shopSku || null,
                itemId: data.itemId,
                quantity: this.shopQty || 1,
                additionalFields: null
            };
            // {additionalFields, itemId, sku, quantity}

            ShopController.addCart( payload );
        });

        this.element.on( "click", ".js-shop-variant", ( e ) => {
            const elem = $( e.target );
            const data = elem.data();

            this.shopVariants.find( ".js-shop-variant" ).removeClass( "is-active" );
            elem.addClass( "is-active" );

            this.shopSku = data.sku;

            this.loadQuantity();
        });

        this.element.on( "change", ".js-shop-quantity-selector", ( e ) => {
            this.shopQty = parseInt( e.target.value, 10 );
        });
    }


    loadVariants () {
        if ( this.shopVariants.length ) {
            this.shopVariants[ 0 ].innerHTML = shopVariantsView( this.shopVariants.data().json );
            this.shopSku = this.shopVariants.find( ".js-shop-variant" ).eq( 0 ).data().sku;
            this.loadQuantity();
        }
    }


    loadQuantity () {
        if ( this.shopQuantity.length ) {
            this.shopQuantity[ 0 ].innerHTML = shopQuantityView( this.shopQuantity.data().json, this.shopSku );
        }
    }
}



/**
 *
 * @public
 * @global
 * @class ShopController
 * @classdesc Handle setting aspect ratio with JS.
 *
 */
class ShopController {
    constructor ( element ) {
        this.element = element;
        this.shopCart = this.element.find( ".js-shop-cart" );
        this.shopProducts = this.element.find( ".js-shop-product" );

        this.bind();
        this.loadCart();
        this.loadProducts();
    }


    bind () {
        this.element.on( "click", ".js-shop-removebutton", ( e ) => {
            const elem = $( e.target );
            const product = elem.closest( ".js-shop-product" );
            const data = elem.data();
            const payload = {
                sku: data.sku,
                itemId: data.itemId,
                quantity: 0
            };
            // {itemId, sku, quantity}

            ShopController.addCart( payload, data.entryId );

            product.remove();
        });
    }


    loadCart () {
        if ( this.shopCart.length ) {
            ShopController.getCart().then(( json ) => {
                this.shopCart[ 0 ].innerHTML = shopCartView( json );
                this.imageLoader = core.util.loadImages( this.element.find( ".js-shop-cart-image" ) );
                this.animController = new AnimateController( this.element.find( ".js-shop-cart-anim" ) );

            }).catch(( error ) => {
                core.log( "warn", error );
            });
        }
    }


    loadProducts () {
        this.shopProducts.forEach(( el, i ) => {
            const product = this.shopProducts.eq( i );

            product.data( "instance", new ShopProduct( product ) );
        });
    }


    destroy () {}
}



ShopController.getCart = () => {
    return $.ajax({
        url: `/api/commerce/shopping-cart/?crumb=${Store.crumb}`,
        method: "GET",
        dataType: "json"
    });
};


ShopController.addCart = ( payload, id ) => {
    $.ajax({
        url: `/api/commerce/shopping-cart/entries/${id ? id : ""}?crumb=${Store.crumb}`,
        payload: payload,
        method: (id ? "PUT" : "POST"),
        headers: {
            "Content-Type": "application/json"
        },
        dataType: "json"
    })
    .then(( json ) => {
        if ( json.crumbFail ) {
            Store.crumb = json.crumb;

            core.log( "warn", "Crumb fail. Trying again." );

            ShopController.addCart( payload );
        }
    })
    .catch(( error ) => {
        core.log( "warn", error );
    });
};



/******************************************************************************
 * Export
*******************************************************************************/
export default ShopController;
