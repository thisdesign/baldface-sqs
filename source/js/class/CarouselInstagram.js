import * as core from "../core";
import social from "../social";
import CarouselCore from "./CarouselCore";
import igItemsView from "../views/instagram-items";



class CarouselInstagram extends CarouselCore {
    constructor ( element ) {
        super( element );

        this.itemsEl = this.element.find( ".js-carousel-items" );
        this.curr = this.element.find( ".js-carousel-curr" );
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
        const value = this.data.index + 1;

        this.curr[ 0 ].innerHTML = (value < 10 ? `0${value}` : value);
    }


    setTotal () {
        this.total[ 0 ].innerHTML = (this.items.length < 10 ? `0${this.items.length}` : this.items.length);
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default CarouselInstagram;
