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
        this.addButtons = this.element.find( ".js-shop-addbutton" );
        this.shopCart = this.element.find( ".js-shop-cart" );

        this.bind();
        this.view();
    }


    view () {
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


    bind () {
        this.addButtons.on( "click", ( e ) => {
            const elem = $( e.target );
            const data = elem.data();

            // {additionalFields, itemId, sku, quantity}
            data.additionalFields = null;
            data.quantity = 1;
            data.sku = null;

            this.addCart( data );
        });
    }


    getCart () {
        return $.ajax({
            url: `/api/commerce/shopping-cart?crumb=${Store.crumb}`,
            method: "GET",
            dataType: "json"
        });
    }


    addCart ( payload ) {
        $.ajax({
            url: `/api/commerce/shopping-cart/entries?crumb=${Store.crumb}`,
            payload: payload,
            method: "POST",
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
