import * as core from "./core";
import ShopController from "./class/ShopController";


/**
 *
 * @public
 * @namespace navi
 * @description Performs the navigation actions.
 *
 */
const navi = {
    init () {
        this.element = core.dom.navi;
        this.items = this.element.find( ".js-navi-a" );
        this.mobileNav = this.element.find( ".js-navi-mobile" );
        this.mobileLink = this.element.find( ".js-navi-link-mobile" );
        this.mobileized = false;

        ShopController.updateCart();

        this.storeNav.init(this.element);
        this.bind();
    },


    bind () {
        this.mobileLink.on( "click", () => {
            if ( this.mobileized ) {
                this.mobileized = false;
                core.dom.html.removeClass( "is-navi-mobile" );

            } else {
                this.mobileized = true;
                core.dom.html.addClass( "is-navi-mobile" );
            }
        });
    },


    close () {
        if ( this.mobileized ) {
            this.mobileized = false;
            core.dom.html.removeClass( "is-navi-mobile" );
        }
    },


    active ( view ) {
        this.items.removeClass( "is-active" );
        this.items.filter( `.js-navi--${view}` ).addClass( "is-active" );
    },

    // feel free to add this to its own file.
    // I didn't know where ot put it.
    storeNav: {
        init (elem) {
            this.element = elem;
            this.storeLink = this.element.find(" .js-navi--shop ");
            this.storeCategories = this.element.find(" .js-storeCategories" );
            this.classToggle = "-isOpen";

            this.handleEvents();
        },

        handleEvents () {
            this.storeLink.on( "mouseenter", () => {
                this.open();
            });
            this.storeLink.on( "mouseout", () => {
                this.close();
            });
            this.storeCategories.on( "mouseover", () => {
                this.open();
            });
            this.storeCategories.on( "mouseout", () => {
                this.close();
            });
        },

        open () {
            this.storeCategories.addClass("-isOpen");
        },

        close () {
            this.storeCategories.removeClass("-isOpen");
        },
    }
};


/******************************************************************************
 * Export
*******************************************************************************/
export default navi;
