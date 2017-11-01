export default ( cats ) => {
    return `
        <a class="feed__filter-toggle js-feed-filter-toggle -column" href="#">
            ${require( `../../../blocks/svg-filters.block` )}
        </a>
        <a class="feed__category js-feed-filter-cat p a -column is-active" href="#All">All</a>
        <a class="feed__category js-feed-filter-cat p a -column" href="#Instagram">Instagram</a>
        ${cats.map(( cat ) => {
            return `<a class="feed__category js-feed-filter-cat p a -column" href="#${cat}">${cat}</a>`;

        }).join( "" )}
    `;
};
