/**************************
 * API: USERS
 **************************/

import { apiUrl , apiheaders } from "./pof-config";

import { Base64 } from 'js-base64';


// const punkApiKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
// const password = ""; // la punk API n'utilise aucun mot de passe
// const authBase64 = base64.encode(`${punkApiKey}:${password}`);



// Login
export const get_user_login = (phoneCountryCode , mobileNumber, password ) => { 

    return new Promise( (resolve, reject) => {
        let b64password = Base64.encode(mobileNumber+':'+password)

        fetch(
            `${apiUrl}/user/login/?phoneCountryCode=${phoneCountryCode}&mobileNumber=${mobileNumber}&b64password=${b64password}`, { 
                method: 'GET',
                headers: apiheaders 
            }
        )
        .then(
            response => {
                let code = JSON.parse(response._bodyInit).code
                let message = JSON.parse(response._bodyInit).message.content

                if (code == 200) {
                    return resolve(response);
                } else {
                    return resolve(message);
                }
            }
        )
        .catch(
            error => {
                return reject(error);
            }
        )
    })

};



// Get by id
export const get_user_by_id = ( user_id ) => { 

    return new Promise( (resolve, reject) => {
        fetch( `${apiUrl}/users/?userId=${user_id}` )
        .then( response => { return resolve(JSON.parse(response._bodyInit)); } )
        .catch( error => { return reject(error); } )
    })

};

