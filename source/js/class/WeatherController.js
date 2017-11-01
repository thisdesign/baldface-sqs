// import * as core from "../core";
// import $ from "properjs-hobo";
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
        this.element[ 0 ].innerHTML = weatherDataView();
    }


    destroy () {}
}



/******************************************************************************
 * Export
*******************************************************************************/
export default WeatherController;
