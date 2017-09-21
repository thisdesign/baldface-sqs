import * as core from "./core";


/**
 *
 * @public
 * @namespace tranny
 * @description Performs the page transition.
 *
 */
const tranny = {
    init () {
        this.element = core.dom.tranny;
        core.emitter.on( "app--page-teardown", this.once );
    },


    in () {
        return new Promise(( resolve ) => {
            this.element.on( "animationend", () => {
                this.teardown();
                resolve();

            }).addClass( "is-tranny-in" );
        });
    },


    out () {
        return new Promise(( resolve ) => {
            this.element.on( "animationend", () => {
                this.teardown();
                this.element.removeClass( "is-tranny-in is-tranny-out is-tranny-once" );
                resolve();

            }).addClass( "is-tranny-out" );
        });
    },


    once () {
        core.emitter.off( "app--page-teardown", tranny.once );
        tranny.out();
    },


    teardown () {
        this.element.off( "animationend" );
    }
};


/******************************************************************************
 * Export
*******************************************************************************/
export default tranny;
