import paramalama from "paramalama";



export default ( data ) => {
    const params = paramalama( data.url );
    const url = data.url.replace( /\?.*?$/, "" );
    const qrs = (data.provider === "vimeo" ? "?api=1" : "?controls=0&modestbranding=1&enablejsapi=1");
    const path = (data.provider === "vimeo" ? "https://player.vimeo.com/video/" : "https://www.youtube.com/embed/");
    const id = (data.provider === "youtube" && params.v ? params.v : url.split( "/" ).pop());
    const source = `${path}${id}${qrs}`;
    const aspect = data.height / data.width * 100;

    return `
        <div class="embed">
            <div class="embed__aspect" style="padding-bottom:${aspect}%;">
                <iframe class="embed__element" src="${source}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
            </div>
        </div>
    `;
};
