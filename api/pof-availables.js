/**************************
 * API: AVAILABLES
 **************************/

import { apiUrl , apiheaders } from "./pof-config";

// Create
export const api_post_available = ( userId , start , end , latitude , longitude , gender , spotId ) => {

    return new Promise( (resolve, reject) => {
        const newObject = {
            userId: userId,
            start: start,
            end: end,
            latitude: latitude,
            longitude: longitude,
            gender: gender,
            spotId: spotId
        }

        fetch(
            `${apiUrl}/availables`, { 
                method: 'POST',
                body: JSON.stringify(newObject),
                headers: apiheaders 
            }
        )
        .then( response => { return resolve(response._bodyInit); } )
        .catch( error => { return reject(error); } )
    })

}

// Get all
export const get_availables = () => { 

    return new Promise( (resolve, reject) => {
        fetch( `${apiUrl}/availables` )
        .then( response => { return resolve(response._bodyInit); } )
        .catch( error => { return reject(error); } )
    })

};


// Get by user id
export const get_availables_by_user = ( user_id ) => { 

    return new Promise( (resolve, reject) => {
        fetch( `${apiUrl}/availables/?userId=${user_id}` )
        .then( response => { return resolve(JSON.parse(response._bodyInit)); } )
        .catch( error => { return reject(error); } )
    })

};


// Get by dispo
export const get_availables_by_dispo = ( start , end , spotId , userId ) => { 

    return new Promise( (resolve, reject) => {
        fetch( `${apiUrl}/availables/?start=${start}&end=${end}&spotId=${spotId}&userId_ne=${userId}` )
        .then( response => { 
            return resolve(JSON.parse(response._bodyInit))
        })
        .catch( error => { return reject(error); } )
    })

};
