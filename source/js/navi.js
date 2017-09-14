import * as core from "./core";


/**
 *
 * @public
 * @namespace navi
 * @description Performs the branded load-in screen sequence.
 *
 */
const navi = {
    init () {
        this.element = core.dom.navi;
        this.items = this.element.find( ".js-navi-a" );
        this.mobileNav = this.element.find( ".js-navi-mobile" );
        this.mobileLink = this.element.find( ".js-navi-link-mobile" );
        this.mobileized = false;

        this.bind();
    },


    bind () {
        this.mobileLink.on( "click", () => {
            if ( this.mobileized ) {
                this.mobileized = false;
                core.dom.html.removeClass( "is-navi-mobile" );

            } else {
                this.mobileized = true;
                core.dom.html.addClass( "is-navi-mobile" );
            }
        });
    },


    close () {
        if ( this.mobileized ) {
            this.mobileized = false;
            core.dom.html.removeClass( "is-navi-mobile" );
        }
    },


    active ( view ) {
        this.items.removeClass( "is-active" );
        this.items.filter( `.js-navi--${view}` ).addClass( "is-active" );
    }
};


/******************************************************************************
 * Export
*******************************************************************************/
export default navi;
