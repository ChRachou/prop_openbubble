/**************************
 * API: AVAILABLES
 **************************/

import { apiUrl , apiheaders } from "./pof-config";

// Create
export const api_post_meeting = ( userId , personId , dateRencontre , start , end , spotId ) => {

    return new Promise( (resolve, reject) => {
        const newObject = {
			userId: userId,
			person: {
			  userId: personId
			},
			date: dateRencontre,
			startTime: start,
			endTime: end,
			isAcceptedByUser: true,
			isAcceptedByPerson: true,
			spotId: spotId
        }

        fetch(
            `${apiUrl}/meetings`, { 
                method: 'POST',
                body: JSON.stringify(newObject),
                headers: apiheaders 
            }
        )
        .then( response => { return resolve(JSON.parse(response._bodyInit).id); } )
        .catch( error => { return reject(error); } )
    })

}

// Get by id
export const get_by_id = ( id ) => { 

    return new Promise( (resolve, reject) => {
        fetch( `${apiUrl}/meetings/?id=${id}` )
        .then( response => { return resolve(JSON.parse(response._bodyInit)); } )
        .catch( error => { return reject(error); } )
    })

};


