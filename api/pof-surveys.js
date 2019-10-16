/**************************
 * API: AVAILABLES
 **************************/

import moment from "moment"; 
import { apiUrl , apiheaders } from "./pof-config";

// Create
export const api_post_survey = ( userId , meetingId , questionsArray ) => {

    return new Promise( (resolve, reject) => {
        const newObject = {
			userId: userId,
			meetingId: meetingId,
			questions: questionsArray,
			date:  moment().format('YYYY-MM-DD')
        }

        fetch(
            `${apiUrl}/surveys`, { 
                method: 'POST',
                body: JSON.stringify(newObject),
                headers: apiheaders 
            }
        )
        .then( response => { return resolve('success'); } )
        .catch( error => { return reject(error); } )
    })

}




