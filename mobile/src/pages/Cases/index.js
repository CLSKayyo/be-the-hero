import React, {useState, useEffect} from 'react';
import {Feather} from '@expo/vector-icons'
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png'; 

import styles from './styles';

export default function Cases(){
    const [total, setTotal] = useState(0);
    const [cases, setCases] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToDetail(caso){
        navigation.navigate('Detalhes', {caso});
    }

    async function loadIncidents(){
        if(loading){
            return;
        }

        if(total > 0 && cases.length === total){
            return;
        }

        setLoading(true);

        const response = await api.get(`cases?page=${page}`);

        setCases([...cases, ...response.data]);
        setTotal(response.headers['x-total-count']);

        setPage(page +1);
        setLoading(false);
    }

    useEffect(() =>{
        loadIncidents();
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList 
                style={styles.caseList}
                data={cases}
                keyExtractor={caso => String(caso.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({item:caso}) => (
                    <View style={styles.caso}>
                        <Text style={styles.caseProperty}>ONG:</Text>
                        <Text style={styles.caseValue}>{caso.name}, de {caso.city}-{caso.uf}</Text>

                        <Text style={styles.caseProperty}>CASO:</Text>
                        <Text style={styles.caseValue}>{caso.title}</Text>

                        <Text style={styles.caseProperty}>VALOR:</Text>
                        <Text style={styles.caseValue}>{Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(caso.value)}</Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(caso)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}