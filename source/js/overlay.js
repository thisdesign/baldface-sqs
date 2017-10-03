import * as core from "./core";
import tranny from "./tranny";
import $ from "properjs-hobo";
import overlayInnerView from "./views/overlay-inner";


/**
 *
 * @public
 * @namespace overlay
 * @description Performs the overlay shimmer.
 *
 */
const overlay = {
    init () {
        this.element = core.dom.overlay;
        this.isOpen = false;
        this.node = null;
        this.duration = core.util.getElementDuration( core.dom.overlay[ 0 ] );

        this.bind();
    },


    load () {
        this.image = this.node.find( ".js-overlay-image" );

        if ( this.image.length ) {
            core.util.loadImages( this.image, core.util.noop );
        }
    },


    bind () {
        this.element.on( "click", ".js-overlay-close", () => {
            this.close();
        });

        this.element.on( "click", ".js-overlay-navi", ( e ) => {
            const elem = $( e.target );
            const data = elem.data();

            core.emitter.fire( `app--overlay-${data.navi}` );
        });
    },


    open ( html ) {
        if ( !this.isOpen ) {
            this.node = $( overlayInnerView( html ) );
            this.load();
            this.element.addClass( "is-active" ).append( this.node );
            core.dom.html.addClass( "is-clipped" );
            this.isOpen = true;
            tranny.in().then(() => {
                this.node.addClass( "is-active" );
            });
        }
    },


    close () {
        if ( this.isOpen ) {
            this.node.removeClass( "is-active" );
            core.dom.html.removeClass( "is-clipped" );
            this.isOpen = false;
            setTimeout(() => {
                this.element.removeClass( "is-active" );
                tranny.out().then(() => {
                    this.element[ 0 ].innerHTML = "";
                    this.node = null;
                });

            }, this.duration );
        }
    },


    update ( html ) {
        if ( this.isOpen ) {
            this.node.find( ".js-overlay-media" )[ 0 ].innerHTML = html;
            this.load();
        }
    }
};


/******************************************************************************
 * Export
*******************************************************************************/
export default overlay;
