import React from 'react';
import { Text, View,  StyleSheet } from 'react-native';


export default class Logo extends React.Component {

    render() {
        return ( 
            
            <View style={styles.container_logo} >
            	<Text style={styles.logo}> Open bubble </Text> 
            </View>

        )
    }
}

const styles = StyleSheet.create({

    //LOGO

    container_logo: {   
         height: 60, 
         marginBottom: 10, 
	   },
	 
	logo: {  
		fontSize:30,
        marginTop: 8,
        marginBottom: 15,
		fontWeight: 'bold',
		textAlign: 'center',
        color: 'black' , 
        paddingRight: 10,
    },
    
})