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
            this.renderDepth();
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
            this.renderDepth();
        });
    }


    render () {
        this.element[ 0 ].innerHTML = weatherDataView( this.data, this.system );
    }


    renderDepth () {
        const cm2in = 0.393701;
        const beaker = this.element.find( ".js-weather-beaker" );
        const html = [];
        let snowfall = parseInt( window.Y.Squarespace.Template.getTweakValue( "snowfall" ), 10 );
        let snowdepth = parseInt( window.Y.Squarespace.Template.getTweakValue( "snowdepth" ), 10 );
        let percent = snowfall / snowdepth * 100;
        let notches = (snowdepth / 5);

        // Imperial toggle
        if ( this.system !== "metric" ) {
            snowfall = Math.ceil( snowfall * cm2in );
            snowdepth = Math.ceil( snowdepth * cm2in );
            percent = snowfall / snowdepth * 100;
            notches = snowdepth / 2;
        }

        html.push( `<div class="weather__beaker__snowfall" style="top:${percent}%;"></div>` );

        for ( let i = 0; i <= notches; i++ ) {
            html.push( `<div class="weather__beaker__notch" style="top:${(i * notches)}%;"></div>` );
        }

        beaker[ 0 ].innerHTML = html.join( "" );
    }


    destroy () {}
}



/******************************************************************************
 * Export
*******************************************************************************/
export default WeatherController;
