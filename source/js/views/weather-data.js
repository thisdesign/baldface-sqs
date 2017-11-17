export default ( data, system ) => {
    const forecast = data.forecast.simpleforecast.forecastday[ 0 ];
    const conditions = data.current_observation;
    const isMetric = (system === "metric");
    const temp = isMetric ? conditions.temp_c : conditions.temp_f;
    const high = isMetric ? forecast.high.celsius : forecast.high.fahrenheit;
    const low = isMetric ? forecast.low.celsius : forecast.low.fahrenheit;
    const winddir = forecast.avewind.dir;
    const windspeed = isMetric ? forecast.avewind.kph : forecast.avewind.mph;
    const tempunit = isMetric ? "C" : "F";
    const speedunit = isMetric ? "KPH" : "MPH";
    const lengthunit = isMetric ? "CM" : "IN";
    const cm2in = 0.393701;
    let snowfall = parseInt( window.Y.Squarespace.Template.getTweakValue( "snowfall" ), 10 );

    if ( !isMetric ) {
        snowfall = Math.ceil( snowfall * cm2in );
    }

    return data.response.error ? `
        <div class="weather__error -wrap">
            <div class="hh1">${data.response.error}</div>
        </div>
    ` : `
        <div class="weather__primary -wrap">
            <div class="weather__temp -column -vtop">
                <div class="weather__temp__curr">
                    <div class="hh1 -column -vtop">${temp}</div>
                    <div class="h2 -column -vtop -deg">&deg;</div>
                    <div class="h2 -column -vtop -sup">${tempunit}</div>
                </div>
                <div class="weather__stat p p--hh">
                    <div>${high}&deg; High</div>
                    <span></span>
                    <div>${low}&deg; Low</div>
                </div>
            </div>
            <div class="weather__depth weather__paddle -column -vtop">
                <div class="weather__depth__curr">
                    <div class="hh1 -column -vtop">${snowfall}</div>
                    <div class="h2 -column -vtop -sup">${lengthunit}</div>
                </div>
                <!--<div class="weather__stat p p--hh">
                    <div>20${lengthunit} Storm Total</div>
                    <span></span>
                    <div>8${lengthunit} in Last 24</div>
                </div>-->
            </div>
        </div>
        <div class="weather__secondary -wrap">
            <div class="weather__wind-dir -column -vtop">
                <div class="h2">${winddir}</div>
                <div class="p p--hh">Wind Direction</div>
            </div>
            <div class="weather__wind-speed weather__paddle -column -vtop">
                <div class="weather__wind-speed__curr">
                    <div class="h2 -column -vtop">${windspeed}</div>
                    <div class="h3 -column -vtop -sup">${speedunit}</div>
                </div>
                <div class="p p--hh">Wind Speed</div>
            </div>
        </div>
        <div class="weather__beaker js-weather-beaker"></div>
        <div class="weather__toggle -wrap">
            <div class="weather__toggle__system p -light -column ${isMetric ? "is-active" : ""} js-weather-toggle" data-system="metric">Metric</div>
            <div class="p -light -column">&nbsp;/&nbsp;</div>
            <div class="weather__toggle__system p -light -column ${isMetric ? "" : "is-active"} js-weather-toggle" data-system="imperial">Imperial</div>
        </div>
    `;
};
