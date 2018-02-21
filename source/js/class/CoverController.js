import * as core from "../core";
import Controller from "properjs-controller";


/**
 *
 * @public
 * @global
 * @class CoverController
 * @param {Element} element The dom element to work with.
 * @classdesc Handle fullbleed cover image moments.
 *
 */
class CoverController extends Controller {
    constructor ( elements ) {
        super();

        this.elements = elements;
        this.isCoverActive = false;
        this.isScrollActive = false;

        this.start();
    }


    /**
     *
     * @instance
     * @description Initialize the animation frame
     * @memberof CoverController
     * @method start
     *
     */
    start () {
        // Call on parent cycle
        this.go(() => {
            let isCover = false;
            let isScroll = false;

            this.elements.forEach(( el, i ) => {
                const bounds = el.getBoundingClientRect();
                const scroll = this.elements.eq( i ).is( ".js-cover-scroll" );

                if ( bounds.top <= 0 && bounds.bottom > 0 ) {
                    isCover = true;
                }

                if ( scroll ) {
                    isScroll = (bounds.bottom >= window.innerHeight);
                }
            });

            if ( isCover && !this.isCoverActive ) {
                this.isCoverActive = true;
                core.dom.html.addClass( "is-cover-view" );

            } else if ( !isCover && this.isCoverActive ) {
                this.isCoverActive = false;
                core.dom.html.removeClass( "is-cover-view" );
            }

            if ( isScroll && !this.isScrollActive ) {
                this.isScrollActive = true;
                core.dom.html.addClass( "is-page-scroll" );

            } else if ( !isScroll && this.isScrollActive ) {
                this.isScrollActive = false;
                core.dom.html.removeClass( "is-page-scroll" );
            }
        });
    }


    /**
     *
     * @instance
     * @description Stop the animation frame
     * @memberof CoverController
     * @method destroy
     *
     */
    destroy () {
        core.dom.html.removeClass( "is-cover-view is-page-scroll" );
        this.stop();
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default CoverController;
