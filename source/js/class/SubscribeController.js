import $ from "properjs-hobo";



/**
 *
 * @public
 * @global
 * @class SubscribeController
 * @classdesc Handle newsletter form posting — hooked into Squarespace mailchimp integration.
 * @block-field <squarespace:block-field id="footer-blocks--subscribe" columns="1" />
 *
 */
class SubscribeController {
    constructor ( element ) {
        this.element = element;
        this.data = this.element.data();
        this.email = this.element.find( ".js-subscribe-email" );
        this.placeholder = this.element.closest( ".js-placeholder" );

        this.bind();
    }


    bind () {
        this.email.on( "keydown", ( e ) => {
            // Trap ENTER
            if ( e.keyCode === 13 ) {
                e.preventDefault();
                this.send();
            }
        });

        this.email.on( "focus", () => {
            const field = this.email.closest( ".js-subscribe-field" );

            field.addClass( "is-focused" );
        });

        this.email.on( "blur", () => {
            const field = this.email.closest( ".js-subscribe-field" );

            if ( this.email[ 0 ].value === "" ) {
                field.removeClass( "is-focused" );
            }
        });
    }


    clear () {
        this.email[ 0 ].value = "";
        this.email[ 0 ].blur();
    }

    // getKey () {
    //     return $.ajax({
    //         url: "/api/form/FormSubmissionKey",
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json;charset=UTF-8"
    //         },
    //         dataType: "json"
    //     });
    // }
    //
    //
    // saveForm ( key ) {
    //     return $.ajax({
    //         url: "/api/form/SaveFormSubmission",
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json;charset=UTF-8"
    //         },
    //         payload: {
    //             collectionId: "",
    //             form: JSON.stringify({
    //                 [ this.data.formYui ]: this.email[ 0 ].value
    //             }),
    //             formId: this.data.formId,
    //             key,
    //             objectName: "footer-blocks--subscribe",
    //             pageId: this.data.pageId,
    //             pagePath: window.location.pathname,
    //             pageTitle: document.title
    //         }
    //     });
    // }



    send () {
        const { value } = this.email[ 0 ]; // Form value

        /*
          POST TO MAILCHIMP HERE
        */

        this.clear(); // Clear form

        /* Handle animation */
        if ( this.placeholder.length ) {
            this.placeholder.addClass( "is-placeholder" );
        }
    }


    destroy () {}
}



/******************************************************************************
 * Export
*******************************************************************************/
export default SubscribeController;
