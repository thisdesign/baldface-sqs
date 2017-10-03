export default ( media ) => {
    return `
        <div class="overlay__inner">
            <div class="overlay__media js-overlay-media">
                ${media}
            </div>
            <div class="overlay__close js-overlay-close">
                <span class="icon icon--list icon--list--close">
                    <span class="ex1"></span>
                    <span class="ex2"></span>
                </span>
            </div>
            <div class="carousel__navi overlay__navi">
                <div class="carousel__navi__item overlay__navi__item js-overlay-navi" data-navi="next"></div>
                <div class="carousel__navi__item overlay__navi__item js-overlay-navi" data-navi="prev"></div>
            </div>
        </div>
    `;
};
