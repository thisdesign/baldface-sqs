import $ from "properjs-hobo";
import CarouselCore from "./CarouselCore";



class CarouselThumbs extends CarouselCore {
    constructor ( element ) {
        super( element );

        this.thumbs = this.element.find( ".js-carousel-thumb" );
        this.thumbs.eq( 0 ).addClass( "is-active" );

        this.bind();
    }


    bind () {
        this.element.on( "click", ".js-carousel-thumb", ( e ) => {
            const elem = $( e.target );
            const index = elem.index();

            this.thumbs.removeClass( "is-active" );
            elem.addClass( "is-active" );

            this._go( index );
        });
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default CarouselThumbs;
