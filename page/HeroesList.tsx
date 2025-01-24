/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */

import {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {useCachedRequests} from '../context/ProxyProvider';
import decoMarvel from '../assets/decoMarvel.png';
import decoEdificios from '../assets/decoEdificios.png';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {MAXRESULTPERPAGE} from '../const';
import UserContext from '../context/userContext';
import Hero from '../componets/Hero';
import Loader from '../componets/Loader';

interface Hero {
  id: string;
  thumbnail: any;
  name: string;
  description: string;
  comics: any;
}

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HeroeDetails'
>;

const windowWidth = Dimensions.get('window').width;

export function HeroesList() {
  const [state, actions] = useCachedRequests();
  UserContext;

  const [heroes, setHeroes] = useState<Hero[]>([]);
  const navigation = useNavigation<NavigationProp>();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      if (state?.data && state.data[state.url] !== undefined) {
        setHeroes([...heroes, ...state.data[state.url]]);
      }
    }
  }, [state.data]);

  const getDetailsHero = (item: Hero) => {
    navigation.navigate('HeroeDetails', {
      id: item.id,
      name: item.name,
      description: item.description,
      image: `${item.thumbnail.path}.${item.thumbnail.extension}`,
      urlComics: item.comics.collectionURI,
    });

    actions.paginate(item.comics.collectionURI);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor="#D43437" barStyle="light-content" />
      {!state.isFetching && <Loader right={'45%'} bottom={10} />}

      <View style={styles.container}>
        <Image style={styles.decoMarvel} source={decoMarvel} />
        <Image style={styles.decoEdificios} source={decoEdificios} />
        <View style={styles.contHeader}>
          <View style={{flex: 1}}>
            <Text style={styles.title}>Personajes de marvel</Text>
          </View>
        </View>
        <FlatList
          data={heroes}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Hero item={item} getDetailsHero={getDetailsHero} />
          )}
          maxToRenderPerBatch={MAXRESULTPERPAGE * 2}
          onEndReached={() =>
            actions.paginate('https://gateway.marvel.com/v1/public/characters')
          }
          windowSize={8}
          onEndReachedThreshold={0.6}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#252525',
  },
  contHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },

  decoEdificios: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: windowWidth,
  },
  decoMarvel: {
    position: 'absolute',
    top: -105,
    left: -130,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default HeroesList;
