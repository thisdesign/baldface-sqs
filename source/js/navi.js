import * as core from "./core";


/**
 *
 * @public
 * @namespace navi
 * @description Performs the branded load-in screen sequence.
 *
 */
const navi = {
    /**
     *
     * @public
     * @method init
     * @memberof navi
     * @description Method initializes navi node in DOM.
     *
     */
    init () {
        this.element = core.dom.navi;
        this.items = this.element.find( ".js-navi-a" );
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
