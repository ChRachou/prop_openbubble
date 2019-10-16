import React from 'react';
import { Text, View,  StyleSheet, ImageBackground } from 'react-native';
import Logo from './LogoScreen.js';

export default class LogoBG extends React.Component {

    render() {
        return ( 
            
            <ImageBackground  source={require('../../assets/images/Loader.png')} style={styles.img_bg}>
				<Logo/> 
 

			</ImageBackground>

        )
    }
}

const styles = StyleSheet.create({

    //BACKGROUND
	img_bg :{
        width:  390, 
        height: 200,
        marginRight: 0,
       marginBottom: 0,
       borderColor: 'black',
       borderWidth: 1,
   
   },

})