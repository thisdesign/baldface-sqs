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
            accessToken: "297115335.3d264f9.68585bfbb56d4010afa93d099ea41978"
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
