import * as core from "../core";



/**
 *
 * @public
 * @global
 * @class Carousel
 * @classdesc Handle carousels logics.
 *
 */
class Carousel {
    constructor ( element ) {
        this.element = element;
        this.items = this.element.find( ".js-carousel-item" );
        this.images = this.element.find( ".js-carousel-image" );
        this.videos = this.element.find( ".js-carousel-video" );
        this.copy = this.element.find( ".js-carousel-copy" );
        this.active = this.items.eq( 0 );
        this.auto = {
            enabled: false,
            duration: 5000,
            timeout: null
        };
        this.data = {
            index: 0,
            length: this.items.length,
            timeout: null,
            duration: core.util.getElementDuration( this.active[ 0 ] )
        };

        this.bind();
        this.prep();

        if ( this.auto.enabled ) {
            this.update();
        }
    }


    prep () {
        const btns = this.copy.find( "a" );

        btns.forEach(( el, i ) => {
            const elem = btns.eq( i );
            const text = elem[ 0 ].innerText.replace( /^\s+|\s$|\n|\t/g, "" );

            elem.addClass( "button button--size-large button--naira button--naira-up" );

            elem[ 0 ].innerHTML = `<div class="button__hover">${text}</div><div class="button__main">${text}</div>`;
        });
    }


    bind () {
        this.element.on( "click", () => {
            if ( this.auto.enabled ) {
                this.auto.enabled = false;

                core.log( "[Carousel]::Disable auto transition" );
            }

            this.advance();
        });
    }


    clear () {
        try {
            clearTimeout( this.auto.timeout );

        } catch ( error ) {
            core.log( "warn", error );
        }
    }


    clearClass () {
        this.items.removeClass( "is-entering is-exiting is-active" );
    }


    clearAuto () {
        try {
            clearTimeout( this.auto.timeout );

        } catch ( error ) {
            core.log( "warn", error );
        }
    }


    update () {
        this.auto.timeout = setTimeout( this.advance.bind( this ), this.auto.duration );
    }


    transition ( $next, $curr ) {
        this.active = $next;

        $curr.removeClass( "is-active" ).addClass( "is-exiting" );
        $next.addClass( "is-entering" );

        this.data.timeout = setTimeout( () => {
            $curr.removeClass( "is-exiting" );
            $next.removeClass( "is-entering" ).addClass( "is-active" );

            if ( this.auto.enabled ) {
                this.update();
            }

        }, this.data.duration );
    }


    advance () {
        this.clear();
        this.clearClass();

        if ( this.data.index === (this.data.length - 1) ) {
            this.data.index = 0;

        } else {
            this.data.index++;
        }

        this.transition(
            this.items.eq( this.data.index ),
            this.active
        );
    }


    rewind () {
        this.clear();
        this.clearClass();

        if ( this.data.index === 0 ) {
            this.data.index = (this.data.length - 1);

        } else {
            this.data.index--;
        }

        this.transition(
            this.items.eq( this.data.index ),
            this.active
        );
    }


    destroy () {
        this.clear();
        this.clearAuto();
    }
}



/**
 *
 * @public
 * @global
 * @class CarouselController
 * @param {Hobo} elements The carousel modules
 * @classdesc Handle carousels of various kinds and sorts.
 *
 */
class CarouselController {
    constructor ( elements ) {
        this.elements = elements;
        this.instances = [];

        this.init();
    }


    init () {
        this.elements.forEach(( element, i ) => {
            this.instances.push( new Carousel( this.elements.eq( i ) ) );
        });
    }


    destroy () {
        this.instances.forEach(( instance ) => {
            instance.destroy();
        });
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default CarouselController;
