import * as core from "../core";
import $ from "properjs-hobo";
import Controller from "properjs-controller";




/**
 *
 * @public
 * @global
 * @class CarouselCore
 * @classdesc Handle core carousels logics.
 *
 */
class CarouselCore extends Controller {
    constructor ( element ) {
        super();

        this.element = element;

        this._find();
        this._bind();
    }


    _find () {
        this.items = this.element.find( ".js-carousel-item" );
        this.images = this.element.find( ".js-carousel-image" );
        this.videos = this.element.find( ".js-carousel-video" );
        this.active = this.items.eq( 0 ).addClass( "is-active" );
        this.naviItems = this.element.find( ".js-carousel-navi-item" );
        this.data = {
            index: 0,
            length: this.items.length,
            timeout: null,
            duration: core.util.getElementDuration( this.active[ 0 ] )
        };
    }


    _bind () {
        this.naviItems.on( "click", ( e ) => {
            const target = $( e.target );
            const data = target.data();

            if ( data.navi === "next" ) {
                this._advance();

            } else {
                this._rewind();
            }
        });
    }


    _clearClass () {
        this.items.removeClass( "is-entering is-exiting is-active" );
    }


    _transition ( next, curr ) {
        this.fire( "transition", next );
        this.active = next;

        curr.removeClass( "is-active" ).addClass( "is-exiting" );
        next.addClass( "is-entering" );

        this.data.timeout = setTimeout( () => {
            curr.removeClass( "is-exiting" );
            next.removeClass( "is-entering" ).addClass( "is-active" );

        }, this.data.duration );
    }


    _advance () {
        this._clearClass();

        if ( this.data.index === (this.data.length - 1) ) {
            this.data.index = 0;

        } else {
            this.data.index++;
        }

        const next = this.items.eq( this.data.index );

        this._transition(
            next,
            this.active
        );
    }


    _rewind () {
        this._clearClass();

        if ( this.data.index === 0 ) {
            this.data.index = (this.data.length - 1);

        } else {
            this.data.index--;
        }

        const next = this.items.eq( this.data.index );

        this._transition(
            next,
            this.active
        );
    }


    destroy () {}
}



/******************************************************************************
 * Export
*******************************************************************************/
export default CarouselCore;
