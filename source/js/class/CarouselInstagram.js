import * as core from "../core";
import social from "../social";
import CarouselCore from "./CarouselCore";
import igItemsView from "../views/instagram-items";



class CarouselInstagram extends CarouselCore {
    constructor ( element ) {
        super( element );

        this.itemsEl = this.element.find( ".js-carousel-items" );
        this.curr = this.element.find( ".js-carousel-curr" );
        this.currText = this.curr.find( ".js-carousel-curr-text" );
        this.currShim = this.curr.find( ".js-carousel-curr-shim" );
        this.currTicker = this.curr.find( ".js-carousel-curr-ticker" );
        this.total = this.element.find( ".js-carousel-total" );

        social.getInstagram().then(( json ) => {
            this.itemsEl[ 0 ].innerHTML = igItemsView( json );

            this._find();
            this.bind();
            this.load();
            this.setCurr();
            this.setTotal( json.data.length );
        });
    }


    load () {
        core.util.loadImages( this.images, core.util.noop );
    }


    bind () {
        this.on( "transition", ( /*next*/ ) => {
            this.setCurr();
            core.util.translate3d(
                this.itemsEl[ 0 ],
                `-${this.elData.unit * this.data.index}vw`,
                0,
                0
            );
        });
    }


    setCurr () {
        const newValue = this.data.index + 1;
        const newText = (newValue < 10 ? `0${newValue}` : newValue);
        const currData = this.currText.data();
        const currValue = currData.curr ? parseInt( currData.curr, 10 ) : newValue;
        const currText = (currValue < 10 ? `0${currValue}` : currValue);

        // Apply the bi-directional animation
        if ( parseInt( newValue, 10 ) < parseInt( currValue, 10 ) ) {
            this.currTicker.addClass( "is-reversed" );

        } else {
            this.currTicker.removeClass( "is-reversed" );
        }

        // Ensure current tag is present
        this.currText.attr( "data-curr", currText );

        // Shim process for style width calculation
        this.currShim[ 0 ].innerHTML = newText;
        this.currText[ 0 ].style.width = `${this.currShim[ 0 ].getBoundingClientRect().width}px`;

        // Apply the `next` attribute text value and trigger animation
        this.currText.attr( "data-next", newText );
        this.currText.addClass( "is-switch" );

        // Set timeout for animation then reset all text values
        setTimeout(() => {
            this.currText.attr( "data-curr", newText );
            this.currText.removeClass( "is-switch" );

        }, 200 );
    }


    setTotal () {
        this.total[ 0 ].innerHTML = (this.items.length < 10 ? `0${this.items.length}` : this.items.length);
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default CarouselInstagram;
