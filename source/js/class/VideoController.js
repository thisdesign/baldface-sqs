// import $ from "properjs-hobo";
import * as core from "../core";
import VideoFS from "./VideoFS";



/**
 *
 * @public
 * @global
 * @class Video
 * @classdesc Handle video logics.
 *
 */
class Video {
    constructor ( element ) {
        this.element = element;
        this.data = this.element.data();
        this.videoFS = null;

        this.load();
    }


    load () {
        if ( this.data.provider === "vimeo" ) {
            const uid = this.data.url.split( "/" ).pop();
            const url = `https://player.vimeo.com/video/${uid}?wmode=opaque&autoplay=1&loop=1&background=1`;
            const embed = this.element.find( ".js-embed" );
            const embedAspect = embed.find( ".js-embed-aspect" );

            embedAspect[ 0 ].style.paddingBottom = `${this.data.height / this.data.width * 100}%`;
            embedAspect[ 0 ].innerHTML = `<iframe class="embed__element" src="${url}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`;

            this.videoFS = new VideoFS( this.element, embed, this.data );

        } else if ( this.data.provider === "youtube" ) {
            core.log( "warn", "[Video]YouTube not supported yet..." );
        }
    }


    destroy () {}
}



/**
 *
 * @public
 * @class VideoController
 * @param {Hobo} elements The video modules
 * @classdesc Handles videos
 *
 */
class VideoController {
    constructor ( elements ) {
        this.elements = elements;
        this.instances = [];

        this.init();
    }


    init () {
        this.elements.forEach(( element, i ) => {
            this.instances.push( new Video( this.elements.eq( i ) ) );
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
export default VideoController;
