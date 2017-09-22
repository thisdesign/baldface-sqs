import paramalama from "paramalama";



export default ( item ) => {
    const url = (item.video.provider === "youtube" ? `https://www.youtube.com/embed/${paramalama( item.video.url ).v}?autoplay=1` : `https://player.vimeo.com/video/${item.video.url.split( "/" ).pop()}?autoplay=1`);

    return `
        <div class="overlay__video embed">
            <div class="embed__aspect" style="padding-bottom:${item.video.height / item.video.width * 100}%;">
                <iframe class="embed__element" src="${url}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
            </div>
        </div>
    `;
};
