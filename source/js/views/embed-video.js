import paramalama from "paramalama";



export default ( data ) => {
    const url = (data.provider === "youtube" ? `https://www.youtube.com/embed/${paramalama( data.url ).v}?autoplay=1&loop=1&controls=0&modestbranding=1` : `https://player.vimeo.com/video/${data.url.split( "/" ).pop()}?autoplay=1&loop=1&background=1`);

    return `
        <div class="embed">
            <div class="embed__aspect" style="padding-bottom:${data.height / data.width * 100}%;">
                <iframe class="embed__element" src="${url}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
            </div>
        </div>
    `;
};
