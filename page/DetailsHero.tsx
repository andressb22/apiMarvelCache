/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useCachedRequests} from '../context/ProxyProvider';
import BackIco from '../assets/backIco.png';
import {MAXRESULTPERPAGE} from '../const';
import Comic from '../componets/Comic';
import Loader from '../componets/Loader';

const windowWidth = Dimensions.get('window').width;

const DetailsHero = () => {
  const [state, actions] = useCachedRequests();
  const [comics, setComics] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const {
    params: {name, description, image, urlComics},
  } = useRoute();

  useEffect(() => {
    if (isFocused && state?.data) {
      if (state.data[urlComics] != undefined) {
        setComics([...comics, ...state.data[urlComics]]);
      }
      //
    }
  }, [state.data]);

  const goBackListHeroes = () => {
    actions.cleanState(urlComics);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor="#D43437" barStyle="light-content" />

      {!state.isFetching && <Loader right={10} bottom={120} />}
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={goBackListHeroes}
            style={styles.buttonBack}>
            <Image source={BackIco} />
          </TouchableOpacity>
          <Image
            blurRadius={10}
            style={styles.backgroundImage}
            source={{uri: image}}
          />
          <Image style={styles.avatar} source={{uri: image}} />
          <Text style={styles.title}>{name}</Text>
        </View>
        <View style={styles.contDataHero}>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.contComics}>
            <FlatList
              data={comics}
              keyExtractor={item => item.id}
              horizontal={true}
              renderItem={({item}) => <Comic item={item} />}
              maxToRenderPerBatch={MAXRESULTPERPAGE}
              onEndReached={() => actions.paginate(urlComics)}
              windowSize={4}
              onEndReachedThreshold={0.6}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: '60%',
    height: 200,
    borderRadius: 100,
    marginTop: 15,
  },
  buttonBack: {
    zIndex: 1000,
    position: 'absolute',
    top: 15,
    left: 20,
    width: 30,
  },
  backgroundImage: {
    width: windowWidth,
    height: 300,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.5,
  },

  container: {
    backgroundColor: '#212121',
    flex: 1,
  },
  contComics: {
    backgroundColor: 'rgba(46,46,46,.65)',
    paddingHorizontal: 30,
    paddingVertical: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.24,
    shadowRadius: 13.84,
    elevation: 17,
  },
  contDataHero: {
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: 20,
  },
  description: {
    paddingHorizontal: 50,
    color: '#fff',
    fontSize: 16,
  },
  header: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    marginBottom: 60,
  },

  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    position: 'relative',
    bottom: -40,
    textAlign: 'center',
    paddingHorizontal: 20,
    verticalAlign: 'middle',
  },
});

export default DetailsHero;
