import * as core from "./core";
import AspectController from "./class/AspectController";
import AnimateController from "./class/AnimateController";


/**
 *
 * @public
 * @namespace footer
 * @description Performs the footer actions.
 *
 */
const footer = {
    init () {
        this.element = core.dom.footer;
        this.aspects = this.element.find( core.config.aspectSelector );
        this.images = this.element.find( core.config.lazyImageSelector );
        this.animates = this.element.find( core.config.animSelector );
        this.aspectController = new AspectController( this.aspects );
        this.animController = new AnimateController( this.animates );

        core.util.loadImages( this.images, core.util.isElementVisible );
    }
};


/******************************************************************************
 * Export
*******************************************************************************/
export default footer;
