import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from "@gluestack-ui/themed";
import NasaInfo from '../components/NasaInfo';
import Constants from 'expo-constants';




export default function Home({navigation}) {
    return (
        <View>
            <StatusBar style="auto" />
            <NasaInfo/>
        </View>
    );
}


