import * as core from "../core";
import $ from "properjs-hobo";


/**
 *
 * @public
 * @global
 * @class HoverController
 * @classdesc Handle nifty hover effect.
 *
 */
class HoverController {
    constructor ( element ) {
        this.element = element;

        this.bind();
    }

    bind () {
        this.element.on( "mouseenter", ".js-hover-item", ( e ) => {
            const elem = $( e.target );
            const data = elem.data();

            if ( data.timeout ) {
                clearTimeout( data.timeout );
                elem.removeClass( "is-hover is-unhover" );
            }

            elem.addClass( "is-hover" );

        });

        this.element.on( "mouseleave", ".js-hover-item", ( e ) => {
            const elem = $( e.target );

            elem.addClass( "is-unhover" );

            elem.data( "timeout", setTimeout(() => elem.removeClass( "is-hover is-unhover" ), core.config.defaultDuration ) );
        });
    }

    destroy () {}
}



/******************************************************************************
 * Export
*******************************************************************************/
export default HoverController;
