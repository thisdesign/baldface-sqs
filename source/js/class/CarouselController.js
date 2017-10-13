import * as core from "../core";
import $ from "properjs-hobo";
import ScrollController from "properjs-scrollcontroller";
import ResizeController from "properjs-resizecontroller";



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
        this.active = this.items.eq( 0 ).addClass( "is-active" );
        this.indexes = this.element.find( ".js-carousel-index-item" );
        this.activeIndex = this.element.find( ".js-carousel-index-active" );
        this.naviItems = this.element.find( ".js-carousel-navi-item" );
        // this.auto = {
        //     enabled: false,
        //     duration: 5000,
        //     timeout: null
        // };
        this.data = {
            index: 0,
            length: this.items.length,
            timeout: null,
            duration: core.util.getElementDuration( this.active[ 0 ] )
        };

        this.bind();
        this.prep();
        this.check( this.active );
        this.index();
        this.display( this.active );

        // if ( this.auto.enabled ) {
        //     this.update();
        // }
    }


    index () {
        const index = this.indexes.eq( this.data.index );

        core.util.translate3d(
            this.activeIndex[ 0 ],
            `${index[ 0 ].offsetLeft}px`,
            "-50%",
            0
        );
    }


    display ( active ) {
        const display = active.data( "display" );

        if ( display ) {
            this.element.removeClass( "-dark -light" ).addClass( display );
        }
    }


    check ( active ) {
        this.activeVideo = active.find( ".js-carousel-video" );

        if ( this.activeVideo.length ) {
            this.activeEmbed = this.activeVideo.find( ".js-embed-iframe" );
            this.activeVideoData = this.activeVideo.data();

            if ( this.activeEmbed.length && this.activeVideoData.provider === "vimeo" ) {
                this.handleVimeo( active );
            }
        }
    }

    postEmbed ( method, value ) {
        const data = {
            value,
            method
        };
        const message = JSON.stringify( data );

        this.activeEmbed[ 0 ].contentWindow.postMessage( message, "*" );
    }


    handleVimeo ( active ) {
        this.activeProgress = active.find( ".js-progress" );
        this.activeProgressFill = this.activeProgress.find( ".js-progress-fill" );
        this.activeEmbed[ 0 ].src = this.activeEmbed.data().src;
    }


    onMessage ( e ) {
        if ( e.data ) {
            const data = JSON.parse( e.data );

            if ( data.event === "ready" ) {
                this.postEmbed( "addEventListener", "play" );
                this.postEmbed( "addEventListener", "finish" );
                this.postEmbed( "addEventListener", "playProgress" );
                core.log( "[Carousel] iframe embed is ready" );

            } else if ( data.event === "play" ) {
                core.log( "[Carousel] iframe embed playback start" );

            } else if ( data.event === "playProgress" ) {
                if ( this.activeProgressFill.length ) {
                    this.activeProgressFill[ 0 ].style.width = `${100 - (data.data.percent * 100)}%`;
                }

            } else if ( data.event === "finish" ) {
                this.clearEmbed();
                this.advance();
                core.log( "[Carousel] iframe embed playback end" );
            }
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
        this.naviItems.on( "click", ( e ) => {
            const target = $( e.target );
            const data = target.data();

            // if ( this.auto.enabled ) {
            //     this.auto.enabled = false;
            // }

            this.clearEmbed();

            if ( data.navi === "next" ) {
                this.advance();

            } else {
                this.rewind();
            }
        });

        this._resizer = new ResizeController();
        this._resizer.on( "resize", () => {
            this.index();
        });

        this._scroller = new ScrollController();
        this._scroller.on( "scroll", () => {
            const shouldPause = !core.util.isElementVisible( this.element[ 0 ] ) && this.activeEmbed;
            const shouldPlay = core.util.isElementVisible( this.element[ 0 ] ) && this.activeEmbed;

            if ( shouldPause ) {
                this.postEmbed( "pause", 1 );

            } else if ( shouldPlay ) {
                this.postEmbed( "play", 1 );
            }
        });

        this._onMessage = this.onMessage.bind( this );
        window.addEventListener( "message", this._onMessage, false );
    }


    clearEmbed () {
        if ( this.activeEmbed ) {
            this.activeEmbed[ 0 ].src = "";
            this.activeProgressFill[ 0 ].style.width = "100%";
        }
    }


    clearClass () {
        this.items.removeClass( "is-entering is-exiting is-active" );
    }


    // clearAuto () {
    //     try {
    //         clearTimeout( this.auto.timeout );
    //
    //     } catch ( error ) {
    //         core.log( "warn", error );
    //     }
    // }


    // update () {
    //     this.auto.timeout = setTimeout( this.advance.bind( this ), this.auto.duration );
    // }


    transition ( next, curr ) {
        this.active = next;

        curr.removeClass( "is-active" ).addClass( "is-exiting" );
        next.addClass( "is-entering" );

        this.data.timeout = setTimeout( () => {
            curr.removeClass( "is-exiting" );
            next.removeClass( "is-entering" ).addClass( "is-active" );

            // if ( this.auto.enabled ) {
            //     this.update();
            // }

        }, this.data.duration );
    }


    advance () {
        // this.clearAuto();
        this.clearClass();

        if ( this.data.index === (this.data.length - 1) ) {
            this.data.index = 0;

        } else {
            this.data.index++;
        }

        const next = this.items.eq( this.data.index );

        this.check( next );
        this.index();
        this.display( next );
        this.transition(
            next,
            this.active
        );
    }


    rewind () {
        // this.clearAuto();
        this.clearClass();

        if ( this.data.index === 0 ) {
            this.data.index = (this.data.length - 1);

        } else {
            this.data.index--;
        }

        const next = this.items.eq( this.data.index );

        this.check( next );
        this.index();
        this.display( next );
        this.transition(
            next,
            this.active
        );
    }


    destroy () {
        // this.clearAuto();

        if ( this._onMessage ) {
            window.removeEventListener( "message", this._onMessage, false );
        }

        if ( this._resizer ) {
            this._resizer.off( "resize" );
        }

        if ( this._scroller ) {
            this._scroller.off( "scroll" );
        }
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
