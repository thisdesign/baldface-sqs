export default ( data ) => {
    const forecast = data.forecast.simpleforecast.forecastday[ 0 ];
    const conditions = data.current_observation;

    return data.response.error ? `
        <div class="weather__error -wrap">
            <div class="hh1">${data.response.error}</div>
        </div>
    ` : `
        <div class="weather__primary -wrap">
            <div class="weather__temp -column -vtop">
                <div class="weather__temp__curr">
                    <div class="hh1 -column -vtop">${conditions.temp_c}</div>
                    <div class="h2 -column -vtop -deg">&deg;</div>
                    <div class="h2 -column -vtop -sup">C</div>
                </div>
                <div class="weather__stat p p--hh">
                    <div>${forecast.high.celsius}&deg; High</div>
                    <span></span>
                    <div>${forecast.low.celsius}&deg; Low</div>
                </div>
            </div>
            <div class="weather__depth weather__paddle -column -vtop">
                <div class="weather__depth__curr">
                    <div class="hh1 -column -vtop">258</div>
                    <div class="h2 -column -vtop -sup">CM</div>
                </div>
                <div class="weather__stat p p--hh">
                    <div>20CM Storm Total</div>
                    <span></span>
                    <div>8CM in Last 24</div>
                </div>
            </div>
        </div>
        <div class="weather__secondary -wrap">
            <div class="weather__wind-dir -column -vtop">
                <div class="h2">${forecast.avewind.dir}</div>
                <div class="p p--hh">Wind Direction</div>
            </div>
            <div class="weather__wind-speed weather__paddle -column -vtop">
                <div class="weather__wind-speed__curr">
                    <div class="h2 -column -vtop">${forecast.avewind.kph}</div>
                    <div class="h3 -column -vtop -sup">KPH</div>
                </div>
                <div class="p p--hh">Wind Speed</div>
            </div>
        </div>
        <div class="weather__beaker">
            <div></div>
        </div>
    `;
};
