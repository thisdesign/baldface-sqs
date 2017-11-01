import Easing from "properjs-easing";


/**
 *
 * @public
 * @namespace config
 * @memberof core
 * @description Stores app-wide config values.
 *
 */
const config = {
    /**
     *
     * @public
     * @member homepage
     * @memberof core.config
     * @description The default homepage slug.
     *
     */
    homepage: "home",


    /**
     *
     * @public
     * @member defaultEasing
     * @memberof core.config
     * @description The default easing function for javascript Tweens.
     *
     */
    defaultEasing: Easing.easeInOutCubic,


    /**
     *
     * @public
     * @member defaultDuration
     * @memberof core.config
     * @description The default duration for javascript Tweens.
     *
     */
    defaultDuration: 400,


    /**
     *
     * @public
     * @member defaultVideoChannel
     * @memberof core.config
     * @description The [MediaBox]{@link https://github.com/ProperJS/MediaBox} channel used for video.
     *
     */
    defaultVideoChannel: "vid",


    /**
     *
     * @public
     * @member defaultAudioChannel
     * @memberof core.config
     * @description The [MediaBox]{@link https://github.com/ProperJS/MediaBox} channel used for audio.
     *
     */
    defaultAudioChannel: "bgm",


    /**
     *
     * @public
     * @member mainSelector
     * @memberof core.config
     * @description The string selector used for <main> node.
     *
     */
    mainSelector: ".js-main",


    /**
     *
     * @public
     * @member introSelector
     * @memberof core.config
     * @description The string selector used for <intro> node.
     *
     */
    introSelector: ".js-intro",


    /**
     *
     * @public
     * @member naviSelector
     * @memberof core.config
     * @description The string selector used for <navi> node.
     *
     */
    naviSelector: ".js-navi",


    /**
     *
     * @public
     * @member lazyImageSelector
     * @memberof core.config
     * @description The string selector used for images deemed lazy-loadable.
     *
     */
    lazyImageSelector: ".js-lazy-image",
    lazyFigureSelector: ".js-lazy-figure",


    /**
     *
     * @public
     * @member animSelector
     * @memberof core.config
     * @description The string selector used for animatables.
     *
     */
    animSelector: ".js-animate",


    /**
     *
     * @public
     * @member coverSelector
     * @memberof core.config
     * @description The string selector used for covers.
     *
     */
    coverSelector: ".js-cover",


    /**
     *
     * @public
     * @member carouselSelector
     * @memberof core.config
     * @description The string selector used for carousels.
     *
     */
    carouselSelector: ".js-carousel",


    /**
     *
     * @public
     * @member subscribeSelector
     * @memberof core.config
     * @description The string selector used for <subscribes>.
     *
     */
    subscribeSelector: ".js-subscribe",


    /**
     *
     * @public
     * @member feedSelector
     * @memberof core.config
     * @description The string selector used for <feed>.
     *
     */
    feedSelector: ".js-feed",


    /**
     *
     * @public
     * @member videoSelector
     * @memberof core.config
     * @description The string selector used for <video>.
     *
     */
    videoSelector: ".js-video",


    /**
     *
     * @public
     * @member aspectSelector
     * @memberof core.config
     * @description The string selector used for <aspect>.
     *
     */
    aspectSelector: ".js-aspect",


    /**
     *
     * @public
     * @member trannySelector
     * @memberof core.config
     * @description The string selector used for <tranny>.
     *
     */
    trannySelector: ".js-tranny",


    /**
     *
     * @public
     * @member overlaySelector
     * @memberof core.config
     * @description The string selector used for <overlay>.
     *
     */
    overlaySelector: ".js-overlay",


    /**
     *
     * @public
     * @member shopSelector
     * @memberof core.config
     * @description The string selector used for <shop>.
     *
     */
    shopSelector: ".js-shop",


    /**
     *
     * @public
     * @member hoverSelector
     * @memberof core.config
     * @description The string selector used for <hover>.
     *
     */
    hoverSelector: ".js-hover",


    /**
     *
     * @public
     * @member footerSelector
     * @memberof core.config
     * @description The string selector used for <footer>.
     *
     */
    footerSelector: ".js-footer",


    /**
     *
     * @public
     * @member weatherSelector
     * @memberof core.config
     * @description The string selector used for <weather>.
     *
     */
    weatherSelector: ".js-weather",


    /**
     *
     * @public
     * @member lazyImageAttr
     * @memberof core.config
     * @description The string attribute for lazy image source URLs.
     *
     */
    lazyImageAttr: "data-img-src",


    /**
     *
     * @public
     * @member imageLoaderAttr
     * @memberof core.config
     * @description The string attribute ImageLoader gives loaded images.
     *
     */
    imageLoaderAttr: "data-imageloader"
};



/******************************************************************************
 * Export
*******************************************************************************/
export default config;
