/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */

import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface HeroItem {
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {available: number};
  series: {available: number};
  stories: {available: number};
}

interface HeroProps {
  item: HeroItem;
  getDetailsHero: (hero: HeroItem) => void;
}

const Hero: React.FC<HeroProps> = ({item, getDetailsHero}) => {
  return (
    <ImageBackground
      source={{
        uri: `${item.thumbnail.path}.${item.thumbnail.extension}`,
      }}
      style={styles.card}
      imageStyle={{borderRadius: 11}}>
      <View style={styles.conNameAndDetails}>
        <View style={styles.contName}>
          <Text style={styles.name}>{item.name}</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              getDetailsHero(item);
            }}
            style={styles.buttonDetails}>
            <Text style={styles.buttonText}>Detalles</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.datahero}>
        <View>
          <View style={styles.participationHero}>
            <Text style={[styles.colorText, {fontSize: 12, fontWeight: '700'}]}>
              {item.comics.available}
            </Text>
            <Text style={[styles.colorText, {fontSize: 10}]}>Comics</Text>
          </View>
          <View style={styles.participationHero}>
            <Text style={[styles.colorText, {fontSize: 12, fontWeight: '700'}]}>
              {item.series.available}
            </Text>
            <Text style={[styles.colorText, {fontSize: 10}]}>Series</Text>
          </View>
          <View style={styles.participationHero}>
            <Text style={[styles.colorText, {fontSize: 12, fontWeight: '700'}]}>
              {item.stories.available}
            </Text>
            <Text style={[styles.colorText, {fontSize: 10}]}>Historias</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  buttonDetails: {
    marginBottom: 10,
    marginLeft: 10,
    backgroundColor: '#004A9F',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    minWidth: 100,
    maxWidth: 120,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.21,
    shadowRadius: 8.19,
    elevation: 13,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  card: {
    marginBottom: 25,
    height: 190,
    flexDirection: 'row',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.21,
    shadowRadius: 8.19,
    elevation: 8,
  },
  conNameAndDetails: {
    justifyContent: 'space-between',
  },
  contName: {
    backgroundColor: 'rgba(233, 60, 60, 0.73)',
    padding: 15,
    borderTopLeftRadius: 11,
    borderBottomRightRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorText: {
    color: '#fff',
  },
  datahero: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    flex: 1,
    marginTop: 10,
    marginRight: 15,
  },
  name: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  participationHero: {
    backgroundColor: 'rgba(31, 31, 31, 0.79)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginBottom: 10,
    padding: 6,
  },
});

export default Hero;
