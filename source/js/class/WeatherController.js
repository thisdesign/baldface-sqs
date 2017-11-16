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
        this.apiKey = "d183d92692749a09";
        this.apiPWS = "ICENTRAL179";
        this.apiUrl = `http://api.wunderground.com/api/${this.apiKey}/conditions/forecast/q/pws:${this.apiPWS}.json`;

        this.load();
    }


    load () {
        $.ajax({
            url: this.apiUrl,
            method: "GET",
            dataType: "json"

        }).then(( json ) => {
            this.element[ 0 ].innerHTML = weatherDataView( json );
        });
    }


    destroy () {}
}



/******************************************************************************
 * Export
*******************************************************************************/
export default WeatherController;
