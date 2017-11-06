import * as core from "../core";
import scroll2 from "properjs-scroll2";
import Easing from "properjs-easing";
import ScrollController from "properjs-scrollcontroller";


/**
 *
 * @public
 * @global
 * @class ScrollJack
 * @classdesc Handle the fucking scroll jack :(
 *
 */
class ScrollJack {
    constructor ( element ) {
        this.element = element.addClass( "is-scroll-jacked" );
        this.sections = this.element.find( ".js-scrolljack-section" );
        this.active = this.sections.eq( 0 ).addClass( "is-active-section" );
        this.isMoving = false;
        this.duration = 600;

        this.bindWheel();
    }


    bindScroll () {
        this.scroller = new ScrollController();
        this.scroller.on( "scroll", () => {
            this.sections.forEach(( el, i ) => {
                const section = this.sections.eq( i );
                const bounds = section[ 0 ].getBoundingClientRect();
                const data = section.data();

                if ( data.bind && bounds.bottom >= (window.innerHeight / 2) ) {
                    this.unbindScroll();
                    this.bindWheel();
                }
            });
        });
    }


    unbindScroll () {
        if ( this.scroller ) {
            this.scroller.off( "scroll" );
            this.scroller.stop();
            this.scroller = null;
        }
    }


    bindWheel () {
        core.dom.doc.on( "DOMMouseScroll mousewheel", ( e ) => {
            e.preventDefault();

            if ( !this.isMoving ) {
                this.isMoving = true;
                this.handle( e );
            }

            return false;
        });
    }


    unbindWheel () {
        core.dom.doc.off( "DOMMouseScroll mousewheel" );
    }


    handle ( e ) {
        let offset = null;
        let section = null;

        // Scroll up
        if ( e.deltaY < 0 ) {
            section = this.active.prev();

        // Scroll down
        } else {
            section = this.active.next();
        }

        if ( section && section.length ) {
            this.active = section;
            this.sections.removeClass( "is-active-section" );
            this.active.addClass( "is-active-section" );

            offset = section[ 0 ].offsetTop/* - core.dom.navi[ 0 ].getBoundingClientRect().height*/;

            scroll2({
                y: offset,
                ease: Easing.easeInOutQuad,
                delay: 0,
                duration: this.duration,
                complete: () => {
                    setTimeout(() => {
                        this.isMoving = false;

                        const data = this.active.data();

                        if ( data.unbind ) {
                            this.unbindWheel();
                            this.bindScroll();
                        }

                    }, 500 );
                }
            });

        } else {
            this.isMoving = false;
        }
    }


    destroy () {
        this.unbindScroll();
        this.unbindWheel();
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default ScrollJack;
