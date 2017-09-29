import * as core from "../core";
import $ from "properjs-hobo";
import Store from "../core/Store";


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

        this.bind();
    }


    bind () {
        this.addButtons.on( "click", ( e ) => {
            const elem = $( e.target );
            const data = elem.data();

            this.addCart( data );
        });
    }


    addCart ( data ) {
        $.ajax({
            url: `/api/commerce/shopping-cart/entries?crumb=${Store.crumb}`,
            payload: JSON.stringify({
                sku: data.sku || null,
                itemId: data.itemId,
                additionalFields: null
            }),
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

                this.addCart( data );
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
