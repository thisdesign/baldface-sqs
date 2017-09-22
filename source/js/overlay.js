import * as core from "./core";
import tranny from "./tranny";


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


    bind () {
        this.element.on( "click", ( e ) => {
            if ( e.target === this.element[ 0 ] ) {
                this.close();
            }
        });
    },


    open ( node ) {
        if ( !this.isOpen ) {
            this.node = node;
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
    }
};


/******************************************************************************
 * Export
*******************************************************************************/
export default overlay;
