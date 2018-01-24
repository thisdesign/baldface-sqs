// import * as core from "../core";
// import $ from "properjs-hobo";
import Controller from "properjs-controller";


/**
 *
 * @public
 * @global
 * @class SnowController
 * @classdesc Handle rendering snow canvas.
 *
 */
class SnowController extends Controller {
    constructor ( element ) {
        super();

        this.element = element;
        this.canvas = document.createElement( "canvas" );
        this.width = 420;
        this.height = 420;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.className = "snowcanvas";
        this.context = this.canvas.getContext( "2d" );
        this.flakes = [];
        this.total = 200;
        this.images = [
            "/assets/snow/flake1.png",
            "/assets/snow/flake2.png",
            "/assets/snow/flake3.png",
            "/assets/snow/flake4.png"
        ];

        this.build();
        this.dump();
        this.loop();
    }


    create () {
        const x = Math.random() * this.width;
        const y = Math.random() * -this.height;
        const z = Math.random() * 50 - 20;
        const i = Math.floor( Math.random() * ((this.images.length - 1) - 0 + 1) ) + 0;

        return {
            size: z / 2 + 4,
            speedX: ( Math.random() - 0.5 ) * 2,
            speedY: z / 15 + 2,
            x: x,
            y: y,
            z: z,
            src: this.images[ i ],
            frame: 0
        };
    }


    build () {
        for ( let i = this.total; i--; ) {
            this.flakes.push( this.create() );
        }
    }


    dump () {
        this.element[ 0 ].appendChild( this.canvas );
    }


    loop () {
        this.go(() => {
            let flake = null;

            this.context.clearRect( 0, 0, this.width, this.height );

            for ( let i = this.flakes.length; i--; ) {
                const frame = this.flakes[ i ].frame;
                const x = this.flakes[ i ].x + frame * this.flakes[ i ].speedX;
                const y = this.flakes[ i ].y + frame * this.flakes[ i ].speedY;
                const size = Math.max( 2, this.flakes[ i ].size );

                flake = new Image();
                flake.src = this.flakes[ i ].src;
                this.flakes[ i ].frame++;

                this.context.globalAlpha = Math.max( 0.2, 1 - this.flakes[ i ].z / 40 );
                this.context.drawImage( flake, x, y, size, size );

                if ( y > this.height || x > this.width ) {
                    this.flakes[ i ] = this.create();
                }
            }
        });
    }


    destroy () {
        this.element[ 0 ].removeChild( this.canvas );
        this.canvas = null;
        this.stop();
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default SnowController;
