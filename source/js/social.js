import $ from "properjs-hobo";
// import * as core from "./core";


/**
 *
 * @public
 * @namespace social
 * @description Performs the social actions.
 *
 */
const social = {
    init () {
        this.instagram = {
            userId: "297115335",
            accessToken: "297115335.3d264f9.fddfdaf39082402490d61b0a0d486df0"
        };
    },


    execTimeout () {},


    getInstagram () {
        return $.ajax({
            url: `https://api.instagram.com/v1/users/${this.instagram.userId}/media/recent`,
            method: "GET",
            dataType: "jsonp",
            data: {
                access_token: this.instagram.accessToken
            }
        });
    }
};


/******************************************************************************
 * Export
*******************************************************************************/
export default social;
