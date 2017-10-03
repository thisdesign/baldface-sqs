export default ( cats ) => {
    return `
        <a class="feed__category js-feed-filter-cat a -column is-active" href="#All">All</a>
        <a class="feed__category js-feed-filter-cat a -column" href="#Instagram">Instagram</a>
        ${cats.map(( cat ) => {
            return `<a class="feed__category js-feed-filter-cat a -column" href="#${cat}">${cat}</a>`;

        }).join( "" )}
    `;
};
