/**************************
 * API: SPOT
 **************************/

import { apiUrl , apiUrlClient , apiheaders } from "./pof-config";

const url = apiUrlClient + '/spot'


// Search spot around
// TODO: il faut que l'utilisateur soit connecté
export const api_post_spot_search = ( latitude , longitude ) => { 

    return new Promise( (resolve, reject) => {
        const timezoneOffset = new Date().getTimezoneOffset()

        fetch(
            `${url}/search/?timezoneOffset=${timezoneOffset}&source=app&displayLanguageCode=fr`, { 
                method: 'POST',
                body: JSON.stringify({
                    latitude: latitude,
                    longitude: longitude
                }),
                headers: apiheaders 
            }
        )
        .then(
            response => {
                return resolve(response);
            }
        )
        .catch(
            error => {
                return reject(error);
            }
        )
    })

};


// Get all
export const get_all_spots = () => { 

    return new Promise( (resolve, reject) => {
        fetch( `${apiUrl}/spots/` )
        .then( response => { return resolve(JSON.parse(response._bodyInit)); } )
        .catch( error => { return reject(error); } ) 
    })

};


// Get by id
export const get_spot_by_id = ( id ) => { 

    return new Promise( (resolve, reject) => {
        fetch( `${apiUrl}/spots/?spotId=${id}` )
        .then( response => { return resolve(JSON.parse(response._bodyInit)); } )
        .catch( error => { return reject(error); } ) 
    })

};

