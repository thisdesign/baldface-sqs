import $ from "properjs-hobo";
import * as core from "../core";
import feedFilterView from "../views/feed-filter";
import feedLayoutView from "../views/feed-layout";


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
        this.channel = this.all;
        this.element = element;
        this.views = {};
        this.data = core.cache.get( "feed" ) || {
            items: [],
            categories: [],
            tags: []
        };
        this.filterEl = this.element.find( ".js-feed-filter" );
        this.searchEl = this.element.find( ".js-feed-search" );
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

        this.views.layout = feedLayoutView( items );
        this.layoutEl[ 0 ].innerHTML = this.views.layout;
        this.imageLoader = core.util.loadImages( this.element.find( ".js-feed-image" ) );
    }


    bind () {
        this.element.on( "click", ".js-feed-filter-link", ( e ) => {
            const links = this.element.find( ".js-feed-filter-link" );
            const target = $( e.target );

            links.removeClass( "is-active" );
            target.addClass( "is-active" );

            this.channel = e.target.hash;

            this.filter();
        });
    }


    sort () {
        // Sort by timestamp, newest at the top
        // this.data.items = this.data.items.sort(( a, b ) => {
        //     const timeA = (a.updatedOn || a.created_time);
        //     const timeB = (b.updatedOn || b.created_time);
        //
        //     if ( timeA > timeB ) {
        //         return -1;
        //
        //     } else {
        //         return 1;
        //     }
        // });

        // Sort by randomized shuffle
        this.data.items = core.util.shuffle( this.data.items );
    }


    init () {
        this.bind();
        this.sort();
        this.filter();

        this.views.filter = feedFilterView( this.data.categories );
        this.filterEl[ 0 ].innerHTML = this.views.filter;

        console.log( this );
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
                    if ( json.collection ) {
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
                                }
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

                    } else {
                        json.data.forEach(( post ) => {
                            this.data.tags = this.data.tags.concat( post.tags );

                            const item = {
                                ig: true,
                                tags: post.tags || [],
                                categories: post.categories || [],
                                image: post.images.standard_resolution
                            };

                            if ( post.videos ) {
                                item.video = post.videos.standard_resolution;
                                item.video.provider = "instagram";
                            }

                            this.data.items.push( item );
                        });
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


    destroy () {}
}



/******************************************************************************
 * Export
*******************************************************************************/
export default FeedController;
