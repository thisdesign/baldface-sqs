import paramalama from "paramalama";



export default ( data ) => {
    const params = paramalama( data.url );
    const url = data.url.replace( /\?.*?$/, "" );
    const qrs = (data.provider === "vimeo" ? "?&background=1&autoplay=1&api=1&loop=0" : "?&autoplay=1&loop=0&controls=0&modestbranding=1&enablejsapi=1");
    const path = (data.provider === "vimeo" ? "https://player.vimeo.com/video/" : "https://www.youtube.com/embed/");
    const id = (data.provider === "youtube" && params.v ? params.v : url.split( "/" ).pop());
    const source = `${path}${id}${qrs}`;
    const aspect = data.height / data.width * 100;

    return `
        <div class="embed js-embed">
            <div class="embed__aspect" style="padding-bottom:${aspect}%;">
                <iframe class="embed__element js-embed-iframe" data-src="${source}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
            </div>
        </div>
    `;
};
