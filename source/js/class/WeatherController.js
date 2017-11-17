// import * as core from "../core";
import $ from "properjs-hobo";
import weatherDataView from "../views/weather-data";


/**
 *
 * @public
 * @global
 * @class WeatherController
 * @classdesc Handle loading/rendering weather data.
 *
 */
class WeatherController {
    constructor ( element ) {
        this.element = element;
        this.system = "metric";
        this.data = null;
        this.apiKey = "d183d92692749a09";
        this.apiPWS = "ICENTRAL179";
        this.apiUrl = `//api.wunderground.com/api/${this.apiKey}/conditions/forecast/q/pws:${this.apiPWS}.json`;

        this.load();
        this.bind();
    }


    bind () {
        this.element.on( "click", ".js-weather-toggle", ( e ) => {
            const elem = $( e.target );
            const data = elem.data();

            this.system = data.system;
            this.render();
        });
    }


    load () {
        $.ajax({
            url: this.apiUrl,
            method: "GET",
            dataType: "json"

        }).then(( json ) => {
            this.data = json;
            this.render();
        });
    }


    render () {
        this.element[ 0 ].innerHTML = weatherDataView( this.data, this.system );
    }


    destroy () {}
}



/******************************************************************************
 * Export
*******************************************************************************/
export default WeatherController;
