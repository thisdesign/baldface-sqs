import $ from "properjs-hobo";
import * as core from "../core";



/**
 *
 * @public
 * @global
 * @class FormController
 * @classdesc Handle form posting.
 *
 */
class FormController {
    constructor ( element ) {
        this.element = element;
        this.inputs = this.element.find( ".js-form-input" );
        this.placeholder = this.element.closest( ".js-placeholder" );
        this.validations = {
            email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        };

        this.bind();
    }


    isValid () {
        let ret = true;

        this.inputs.forEach(( input ) => {
            if ( !this.validations[ input.type ].test( input.value ) ) {
                ret = false;
            }
        });

        return ret;
    }


    bind () {
        this.element.on( "submit", ( e ) => {
            e.preventDefault();

            if ( this.isValid() ) {
                this.send();
            }

            return false;
        });

        this.inputs.on( "focus", ( e ) => {
            const input = $( e.target );
            const field = input.closest( ".js-form-field" );

            field.addClass( "is-focused" );
        });

        this.inputs.on( "blur", ( e ) => {
            const input = $( e.target );
            const field = input.closest( ".js-form-field" );

            if ( input[ 0 ].value === "" ) {
                field.removeClass( "is-focused" );
            }
        });
    }


    data () {
        const data = {};

        this.inputs.forEach(( input ) => {
            data[ input.name ] = input.value;
        });

        return data;
    }


    clear () {
        this.inputs.forEach(( input ) => {
            input.value = "";
        });
    }


    send () {
        const data = this.data();
        const headers = {};

        if ( /^post/i.test( this.element[ 0 ].method ) ) {
            headers[ "Content-Type" ] = "application/x-www-form-urlencoded";
        }

        $.ajax({
            url: this.element[ 0 ].action,
            method: this.element[ 0 ].method,
            data,
            headers
        })
        .then(( /*response*/ ) => {
            this.clear();

            if ( this.placeholder.length ) {
                this.placeholder.addClass( "is-placeholder" );
            }
        })
        .catch(( error ) => {
            core.log( "warn", error );
        });
    }


    destroy () {}
}



/******************************************************************************
 * Export
*******************************************************************************/
export default FormController;
