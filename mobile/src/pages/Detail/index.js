import React from 'react';
import {Feather} from '@expo/vector-icons'
import {View, Image, Text, TouchableOpacity, Linking} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png'; 

import styles from './styles';

export default function Detail(){

    const navigation = useNavigation();
    const route = useRoute();

    const caso = route.params.caso;

    const message = `Olá ${caso.name}, estou entrando em contato pois gostaria de ajudar no caso "${caso.title}" com o valor de ${Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(caso.value)}.`;


    function navigateBack(){
        navigation.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${caso.title}`,
            recipients: [caso.email],
            body: message,
        });
    }

    function sendWhatsApp(){
        Linking.openURL(`whatsapp://send?phone=${caso.whatsapp}&text=${message}`);
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
                <Image source={logoImg} />
            </View>

            <View style={styles.caso}>
                <Text style={[styles.caseProperty, {marginTop: 0,}]}>CASO:</Text>
                <Text style={styles.caseValue}>{caso.title}</Text>

                <Text style={styles.caseProperty}>DESCRIÇÃO:</Text>
                <Text style={styles.caseValue}>{caso.description}</Text>

                <Text style={styles.caseProperty}>VALOR:</Text>
                <Text style={styles.caseValue}>{Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(caso.value)}</Text>

            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato com {caso.name}, de {caso.city}-{caso.uf}:</Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}