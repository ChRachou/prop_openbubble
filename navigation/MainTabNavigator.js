import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import HistoriqueScreen from '../screens/HistoriqueScreen';
import ProfilScreen from '../screens/ProfilScreen';
import ConnexionScreen from '../screens/ConnexionScreen';
import CreerCompte1Screen from '../screens/CreerCompte1Screen';
import CreerCompte2Screen from '../screens/CreerCompte2Screen';
import CreerCompte3Screen from '../screens/CreerCompte3Screen';
import RencontreScreen from '../screens/RencontreScreen'; 
import ChatRencontreScreen from '../screens/ChatRencontreScreen';

import HomeScreen from '../screens/HomeScreen';
import DemarrerRencontreScreen from '../screens/DemarrerRencontreScreen';
import PersonneTrouveeScreen from '../screens/PersonneTrouveeScreen';
import FinRencontreScreen from '../screens/FinRencontreScreen';
import EnvoyerQuestionnaireScreen from '../screens/EnvoyerQuestionnaireScreen';
import DestinationRencontreScreen from '../screens/DestinationRencontreScreen';
import MinuteurRencontreScreen from '../screens/MinuteurRencontreScreen';
import QuestionnaireRencontreScreen from '../screens/QuestionnaireRencontreScreen'

const HistoriqueStack = createStackNavigator({
  	Historique: HistoriqueScreen,
});

HistoriqueStack.navigationOptions = {
	tabBarLabel: 'Historique',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
		focused={focused}
		name={Platform.OS === 'ios' ? 'ios-folder' : 'md-folder'}
		/>
	),
};

const HomeStack = createStackNavigator({ 
	DemarrerRencontre:DemarrerRencontreScreen,
    CreerCompte: CreerCompte3Screen ,
    Accueil: HomeScreen,
	Connexion: ConnexionScreen,
	 

	CreerCompte1: CreerCompte1Screen,
	CreerCompte2: CreerCompte2Screen,
	

	PersonneTrouvee: PersonneTrouveeScreen,
	
	Rencontre: RencontreScreen,
	
	FinRencontre: FinRencontreScreen,
	EnvoyerQuestionnaire: EnvoyerQuestionnaireScreen,
	ChatRencontre: ChatRencontreScreen,
	
	DestinationRencontre: DestinationRencontreScreen,
	MinuteurRencontre: MinuteurRencontreScreen,
	QuestionnaireScreen: QuestionnaireRencontreScreen,
});

HomeStack.navigationOptions = {
	tabBarLabel: 'Accueil',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
		/>
	),
};

const ProfilStack = createStackNavigator({
	Profil: ProfilScreen,
});

ProfilStack.navigationOptions = {
	tabBarLabel: 'Profil',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
		/>
	),
};

export default createBottomTabNavigator({
	HomeStack,
	HistoriqueStack, 
	ProfilStack,
});
