// Load the SASS
require( "../sass/screen.scss" );


// Load the JS
import navi from "./navi";
import tranny from "./tranny";
import router from "./router";
import footer from "./footer";
import overlay from "./overlay";
import * as core from "./core";
import Analytics from "./class/Analytics";


/**
 *
 * @public
 * @class App
 * @classdesc Load the App application Class to handle it ALL.
 *
 */
class App {
    constructor () {
        this.core = core;
        this.navi = navi;
        this.tranny = tranny;
        this.router = router;
        this.footer = footer;
        this.overlay = overlay;

        this.bind();
        this.init();
    }


    bind () {
        this.core.emitter.on( "app--intro-teardown", () => {
            this.core.log( "App Intro Teardown" );
        });

        this.core.emitter.on( "app--page-teardown", () => {
            this.core.log( "App Page Teardown" );
        });
    }


    /**
     *
     * @public
     * @instance
     * @method init
     * @memberof App
     * @description Initialize application modules.
     *
     */
    init () {
        // Core
        this.core.detect.init();

        // Utility ?

        // Views
        this.navi.init();
        this.tranny.init();
        this.footer.init();
        this.overlay.init();

        // Controller
        this.router.init();

        // Analytics
        this.analytics = new Analytics();
    }
}


// Create {app} instance
window.app = new App();


// Export {app} instance
export default window.app;
