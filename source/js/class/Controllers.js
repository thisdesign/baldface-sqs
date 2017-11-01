import * as core from "../core";
import ImageController from "./ImageController";
import AnimateController from "./AnimateController";
import CarouselController from "./CarouselController";
import SubscribeController from "./SubscribeController";
import FeedController from "./FeedController";
import VideoController from "./VideoController";
import AspectController from "./AspectController";
import ShopController from "./ShopController";
import HoverController from "./HoverController";
import WeatherController from "./WeatherController";


/**
 *
 * @public
 * @global
 * @class Controllers
 * @classdesc Handle controller functions.
 * @param {object} options Optional config
 *
 */
class Controllers {
    constructor ( options ) {
        this.element = options.el;
        this.callback = options.cb;
        this.controllers = [];
    }


    push ( id, elements, controller, conditions ) {
        this.controllers.push({
            id: id,
            elements: elements,
            instance: null,
            Controller: controller,
            conditions: conditions
        });
    }


    init () {
        this.controllers.forEach(( controller ) => {
            if ( controller.elements.length && controller.conditions ) {
                controller.instance = new controller.Controller( controller.elements );
            }
        });
    }


    kill () {
        this.controllers.forEach(( controller ) => {
            if ( controller.instance ) {
                controller.instance.destroy();
            }
        });

        this.controllers = [];
    }


    exec () {
        this.controllers = [];

        this.push( "video", this.element.find( core.config.videoSelector ), VideoController, true );
        this.push( "carousel", this.element.find( core.config.carouselSelector ), CarouselController, true );
        this.push( "animate", core.dom.body.find( core.config.animSelector ), AnimateController, true );
        this.push( "feed", this.element.find( core.config.feedSelector ), FeedController, true );
        this.push( "weather", this.element.find( core.config.weatherSelector ), WeatherController, true );
        this.push( "hover", core.dom.body.find( core.config.hoverSelector ), HoverController, true );
        this.push( "shop", core.dom.body.find( core.config.shopSelector ), ShopController, true );
        this.push( "subscribe", core.dom.body.find( core.config.subscribeSelector ), SubscribeController, true );

        this.aspect = this.element.find( core.config.aspectSelector );
        this.aspectController = new AspectController( this.aspect );
        this.images = this.element.find( core.config.lazyImageSelector );
        this.imageController = new ImageController( this.images );
        this.imageController.on( "preloaded", () => {
            this.init();

            if ( this.callback ) {
                this.callback();
            }
        });
    }


    destroy () {
        if ( this.aspectController ) {
            this.aspectController.destroy();
        }

        if ( this.imageController ) {
            this.imageController.destroy();
        }

        this.kill();
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default Controllers;
