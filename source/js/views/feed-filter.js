export default ( cats ) => {
    return `
        <a class="feed__category js-feed-filter-link p a is-active" href="#All">All</a>
        <a class="feed__category js-feed-filter-link p a" href="#Instagram">Instagram</a>
        ${cats.map(( cat ) => {
            return `<a class="feed__category js-feed-filter-link p a" href="#${cat}">${cat}</a>`;

        }).join( "" )}
    `;
};
