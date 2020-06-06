import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Image, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios'

import styles from './styles';

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

const Home = () => {

    const [ufs, setUfs] = useState<string[]>([]);

    const [cities, setCities] = useState<string[]>([]);

    const [selectedUf, setSelectedUF] = useState('0');

    const [selectedCity, setSelectedCity] = useState('0');

    const navigation = useNavigation();

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);

            setUfs(ufInitials);
        })
    }, []);

    useEffect(() => {

        if (selectedUf === '0') return;

        console.log(selectedUf);

        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
            const cities = response.data.map(city => city.nome);

            setCities(cities);
        })
    }, [selectedUf]);

    function handleNavigationToPoints() {
        navigation.navigate('Points', {
            selectedUf,
            selectedCity
        });
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

            <ImageBackground
                source={require('../../assets/home-background.png')}
                style={styles.container}
                imageStyle={{ width: 274, height: 368 }}
            >
                <View style={styles.main}>
                    <Image source={require('../../assets/logo.png')} />
                    <View style={{ marginBottom: 25 }}>
                        <Text style={styles.title}>
                            Seu marketplace de coleta de resíduos
                        </Text>
                        <Text style={styles.description} >
                            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
                        </Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    {/* <TextInput
                        style={styles.input}
                        placeholder="Digite o estado"
                        value={uf}
                        maxLength={2}
                        autoCapitalize="characters"
                        autoCorrect={false}
                        onChangeText={text => setUF(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Digite a cidade"
                        value={city}
                        onChangeText={text => setCity(text)}
                    /> */}
                    <RNPickerSelect
                        style={styles}
                        placeholder={{
                            label: 'Selecione uma estado',
                            value: null,
                            color: '#34CB79',
                        }}
                        onValueChange={(value) => setSelectedUF(value)}
                        items={ufs.map(uf => ({ key: uf, label: uf, value: uf }))}
                    />
                    <RNPickerSelect
                        placeholder={{
                            label: 'Selecione uma cidade',
                            value: null,
                            color: '#34CB79',
                        }}
                        style={styles}
                        onValueChange={(value) => setSelectedCity(value)}
                        items={cities.map(city => ({ key: city, label: city, value: city }))}
                    />

                    <RectButton style={styles.button} onPress={handleNavigationToPoints}>
                        <View style={styles.buttonIcon}>
                            <Text>
                                <Icon name="arrow-right" color="#fff" size={24} />
                            </Text>
                        </View>
                        <Text style={styles.buttonText}>
                            Entrar
                    </Text>
                    </RectButton>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}

export default Home;