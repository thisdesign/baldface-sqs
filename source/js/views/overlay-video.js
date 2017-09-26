import paramalama from "paramalama";



export default ( item ) => {
    const params = paramalama( item.video.url );
    const url = item.video.url.replace( /\?.*?$/, "" );
    const qrs = (item.video.provider === "vimeo" ? "?autoplay=1" : "?autoplay=1&modestbranding=1");
    const path = (item.video.provider === "vimeo" ? "https://player.vimeo.com/video/" : "https://www.youtube.com/embed/");
    const id = (item.video.provider === "youtube" && params.v ? params.v : url.split( "/" ).pop());
    const source = `${path}${id}${qrs}`;
    const aspect = item.video.height / item.video.width * 100;

    return `
        <div class="overlay__video embed">
            <div class="embed__aspect" style="padding-bottom:${aspect}%;">
                <iframe class="embed__element" src="${source}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
            </div>
        </div>
    `;
};
