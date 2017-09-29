import * as core from "../core";
import $ from "properjs-hobo";
import Store from "../core/Store";
import shopCartView from "../views/shop-cart";
import AnimateController from "./AnimateController";


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

        this.bind();
        this.loadCart();
    }


    bind () {
        this.element.on( "click", ".js-shop-addbutton", ( e ) => {
            const elem = $( e.target );
            const data = elem.data();
            const payload = {
                sku: null,
                itemId: data.itemId,
                quantity: 1,
                additionalFields: null
            };
            // {additionalFields, itemId, sku, quantity}

            this.addCart( payload );
        });

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

            this.addCart( payload, data.entryId );

            product.remove();
        });
    }


    loadCart () {
        if ( this.shopCart.length ) {
            this.getCart().then(( json ) => {
                this.shopCart[ 0 ].innerHTML = shopCartView( json );
                this.imageLoader = core.util.loadImages( this.element.find( ".js-shop-cart-image" ) );
                this.animController = new AnimateController( this.element.find( ".js-shop-cart-anim" ) );

            }).catch(( error ) => {
                core.log( "warn", error );
            });
        }
    }


    getCart () {
        return $.ajax({
            url: `/api/commerce/shopping-cart/?crumb=${Store.crumb}`,
            method: "GET",
            dataType: "json"
        });
    }


    addCart ( payload, id ) {
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

                this.addCart( payload );
            }
        })
        .catch(( error ) => {
            core.log( "warn", error );
        });
    }


    destroy () {}
}



/******************************************************************************
 * Export
*******************************************************************************/
export default ShopController;
