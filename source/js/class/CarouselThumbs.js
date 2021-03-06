import $ from "properjs-hobo";
import CarouselCore from "./CarouselCore";



class CarouselThumbs extends CarouselCore {
    constructor ( element ) {
        super( element );

        this.thumbs = this.element.find( ".js-carousel-thumb" );
        this.thumbs.eq( 0 ).addClass( "is-active" );

        this.element.data( "self", this );

        this.bind();
    }


    bind () {
        this.element.on( "click", ".js-carousel-thumb", ( e ) => {
            this.doThumbClick( e );
        });
    }


    doThumbClick ( e ) {
        const elem = $( e.target );
        const index = elem.index();

        this.thumbs.removeClass( "is-active" );
        elem.addClass( "is-active" );

        this._go( index );
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default CarouselThumbs;
