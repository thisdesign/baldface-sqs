import $ from "properjs-hobo";
import * as core from "../core";
import overlay from "../overlay";
import feedFilterView from "../views/feed-filter";
import feedLayoutView from "../views/feed-layout";
import overlayImageView from "../views/overlay-image";
import overlayVideoView from "../views/overlay-video";
import AnimateController from "./AnimateController";


// Special icon parser runs against `categories` and `tags`...
const iconMap = [
    { icon: "photo", regex: /.*?/i },
    { icon: "news", regex: /news/i },
    { icon: "press", regex: /press/i },
    { icon: "video", regex: /video/i }
];
const getIcon = ( cats, tags ) => {
    let icon = "photo";

    iconMap.forEach(( map ) => {
        if ( (cats && map.regex.test( cats.join( "" ).toLowerCase() )) || (tags && map.regex.test( tags.join( "" ).toLowerCase() )) ) {
            icon = map.icon;
        }
    });

    return icon;
};


/**
 *
 * @public
 * @global
 * @class FeedController
 * @classdesc Handle crazy ass feed thing...
 *
 */
class FeedController {
    constructor ( element ) {
        this.ig = "#Instagram";
        this.all = "#All";
        this.query = "";
        this.channel = this.all;
        this.element = element;
        this.data = core.cache.get( "feed" ) || {
            items: [],
            categories: [],
            tags: []
        };
        this.filterEl = this.element.find( ".js-feed-filter" );
        this.filterList = this.filterEl.find( ".js-feed-filter-list" );
        this.searchEl = this.element.find( ".js-feed-search" );
        this.searchInp = this.searchEl.find( ".js-feed-search-input" );
        this.searchTxt = this.searchEl.find( ".js-feed-search-text" );
        this.searchShim = this.searchEl.find( ".js-feed-search-shim" );
        this.layoutEl = this.element.find( ".js-feed-layout" );
        this.instagram = {
            userId: "297115335",
            accessToken: "297115335.3d264f9.68585bfbb56d4010afa93d099ea41978"
        };

        if ( !this.data.items.length ) {
            this.load().then(() => {
                core.cache.set( "feed", this.data );
                this.init();
            });

        } else {
            this.init();
        }
    }


    load () {
        return new Promise(( resolve ) => {
            const args = [
                // Squarespace collection
                {
                    url: "/feed/",
                    method: "GET",
                    dataType: "json",
                    data: {
                        format: "json"
                    }
                },
                // Instagram feed
                {
                    url: `https://api.instagram.com/v1/users/${this.instagram.userId}/media/recent`,
                    method: "GET",
                    dataType: "jsonp",
                    data: {
                        access_token: this.instagram.accessToken
                    }
                }
            ];
            const request = ( params ) => {
                $.ajax( params ).then(( json ) => {
                    // Squarespace
                    if ( json.collection ) {
                        this.createSqs( json );

                    // Instagram
                    } else {
                        this.createIg( json );
                    }

                    if ( !args.length ) {
                        resolve();

                    } else {
                        request( args.shift() );
                    }
                });
            };

            request( args.shift() );
        });
    }


    createIg ( json ) {
        json.data.forEach(( post ) => {
            this.data.tags = this.data.tags.concat( post.tags );

            const item = {
                ig: true,
                tags: post.tags || [],
                categories: post.categories || [],
                image: post.images.standard_resolution,
                timestamp: post.created_time,
                icon: "instagram",
                url: post.link,
                id: post.id,
                caption: post.caption.text
            };

            if ( post.videos ) {
                item.video = post.videos.standard_resolution;
                item.video.provider = "instagram";
            }

            this.data.items.push( item );
        });
    }


    createSqs ( json ) {
        this.data.categories = json.collection.categories;
        this.data.tags = this.data.tags.concat( json.collection.tags );

        json.items.forEach(( post ) => {
            const { width, height } = core.util.getOriginalDims( post.originalSize );
            const item = {
                sqs: true,
                tags: post.tags || [],
                categories: post.categories || [],
                image: {
                    url: post.assetUrl,
                    width,
                    height
                },
                timestamp: post.updatedOn,
                icon: getIcon( post.categories, post.tags ),
                url: post.fullUrl,
                id: post.id,
                caption: post.body
            };

            if ( post.recordTypeLabel === "video" ) {
                item.video = {
                    url: post.oembed.url,
                    width: post.oembed.width,
                    height: post.oembed.height,
                    provider: post.oembed.resolvedBy
                };
            }

            this.data.items.push( item );
        });
    }


    init () {
        this.bindFeed();
        this.bindSearch();
        this.bindFilter();
        this.sort();
        this.filter();
        this.filterList[ 0 ].innerHTML = feedFilterView( this.data.categories );
        this.filterCats = this.filterEl.find( ".js-feed-filter-cat" );

        if ( !core.detect.isDevice() ) {
            this.initTagCron();
        }

        // console.log( this );
    }


    bindSearch () {
        this.searchInp.on( "keydown", ( e ) => {
            // Enter key
            if ( e.keyCode === 13 ) {
                e.preventDefault();
                this.resetFilter();
                this.query = this.searchEl[ 0 ].value;
                this.search();
            }
        });

        this.searchInp.on( "focus", () => {
            if ( !core.detect.isDevice() ) {
                this.stopTagCron();
            }
        });

        this.searchInp.on( "blur", () => {
            if ( !core.detect.isDevice() ) {
                if ( this.searchInp[ 0 ].value === "" ) {
                    this.initTagCron();
                }
            }
        });
    }


    bindFilter () {
        this.element.on( "click", ".js-feed-filter-toggle", () => {
            this.filterList.toggleClass( "is-active" );
        });

        this.element.on( "click", ".js-feed-filter-cat", ( e ) => {
            const target = $( e.target );

            this.filterCats.removeClass( "is-active" );
            target.addClass( "is-active" );

            this.resetSearch();
            this.channel = e.target.hash;
            this.filter();
        });
    }


    bindFeed () {
        this.element.on( "click", ".js-feed-modal-link", ( e ) => {
            const elem = $( e.target );
            const data = elem.data();
            const item = this.find( data.id );
            let node = null;

            // Video
            if ( item.video && item.video.provider ) {
                node = $( overlayVideoView( item ) );

                overlay.open( node );

            // Image
            } else {
                node = $( overlayImageView( item ) );

                core.util.loadImages( node, core.util.noop ).on( "done", () => overlay.open( node ) );
            }
        });

        this.element.on( "mouseenter", ".js-feed-item", ( e ) => {
            const elem = $( e.target );
            const data = elem.data();

            if ( data.timeout ) {
                clearTimeout( data.timeout );
                elem.removeClass( "is-hover is-unhover" );
            }

            elem.addClass( "is-hover" );

        }).on( "mouseleave", ".js-feed-item", ( e ) => {
            const elem = $( e.target );

            elem.addClass( "is-unhover" );

            elem.data( "timeout", setTimeout(() => elem.removeClass( "is-hover is-unhover" ), core.config.defaultDuration ) );
        });
    }


    sort () {
        // Sort by timestamp, newest at the top
        this.data.items = this.data.items.sort(( itemA, itemB ) => {
            if ( itemA.timestamp > itemB.timestamp ) {
                return -1;
            }

            return 1;
        });
    }


    filter () {
        const items = this.data.items.filter(( item ) => {
            const cat = this.channel.replace( "#", "" );

            // Just Instagram content
            if ( this.channel === this.ig ) {
                // Only Instagram has user data
                return item.ig;

            // Back to Squarespace AND Instagram content
            } else if ( this.channel === this.all ) {
                return true;
            }

            // Just Squarespace content matching category
            // Only Squarespace has category data
            return item.categories.indexOf( cat ) !== -1;
        });

        this.layoutEl[ 0 ].innerHTML = feedLayoutView( items );
        this.imageLoader = core.util.loadImages( this.element.find( ".js-feed-image" ) );
        this.animController = new AnimateController( this.element.find( ".js-feed-anim" ) );
    }


    resetFilter () {
        this.channel = this.all;
        this.filterCats.removeClass( "is-active" );
        this.filterCats.filter( `[href="${this.all}"]` ).addClass( "is-active" );
        this.filterEl.removeClass( "is-active" );
    }


    search () {
        const regex = new RegExp( this.query, "gi" );
        const items = this.data.items.filter(( item ) => {
            if ( item.tags.length && regex.test( item.tags.join( "" ).toLowerCase() ) ) {
                return true;
            }

            return false;
        });

        this.layoutEl[ 0 ].innerHTML = feedLayoutView( items );
        this.imageLoader = core.util.loadImages( this.element.find( ".js-feed-image" ) );
        this.animController = new AnimateController( this.element.find( ".js-feed-anim" ) );
    }


    resetSearch () {
        this.query = "";
        this.searchInp[ 0 ].value = "";

        if ( this.searchEl.is( ".is-active" ) ) {
            if ( !core.detect.isDevice() ) {
                this.initTagCron();
            }
        }
    }


    find ( id ) {
        return this.data.items.find(( item ) => (id === item.id) );
    }


    initTagCron () {
        const doSwap = () => {
            // Ensure current tag is present
            this.searchTxt.attr( "data-curr", `"${tag}"` );

            // Set the timeout for the transition
            this.searchTimer = setTimeout(() => {
                // Ensure we always get a different tag
                while ( tag === lastTag ) {
                    tag = this.getTag();
                }

                // Shim process for style width calculation
                this.searchShim[ 0 ].innerHTML = `"${tag}"`;
                this.searchTxt[ 0 ].style.width = core.util.px( this.searchShim[ 0 ].getBoundingClientRect().width );

                // Apply the `next` attribute text value and trigger animation
                this.searchTxt.attr( "data-next", `"${tag}"` );
                this.searchTxt.addClass( "is-switch" );

                // Set timeout for animation then reset all text values
                this.searchTimer = setTimeout(() => {
                    this.searchTxt.attr( "data-curr", `"${tag}"` );
                    this.searchTxt.removeClass( "is-switch" );

                    // Do it again
                    doSwap();

                }, 200 );

                lastTag = tag;

            }, 3000 );
        };
        let tag = this.getTag();
        let lastTag = tag;

        this.searchEl.removeClass( "is-active" );

        doSwap();
    }


    stopTagCron () {
        this.searchEl.addClass( "is-active" );
        clearTimeout( this.searchTimer );
        this.searchTimer = null;
        this.searchShim[ 0 ].innerHTML = "";
        this.searchTxt[ 0 ].innerHTML = "";
        this.searchTxt[ 0 ].style.width = "auto";
        this.searchTxt
            .attr( "data-next", "" )
            .attr( "data-curr", "" )
            .removeClass( "is-switch" );
    }


    getTag () {
        return this.data.tags[ Math.floor( Math.random() * this.data.tags.length ) ];
    }


    destroy () {}
}



/******************************************************************************
 * Export
*******************************************************************************/
export default FeedController;
