/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import {View, Text, Image, StyleSheet} from 'react-native';

interface ComicItem {
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

interface ComicProps {
  item: ComicItem;
}

const Comic: React.FC<ComicProps> = ({item}) => {
  return (
    <View style={styles.cardComics}>
      <Image
        style={styles.imageComic}
        source={{
          uri: `${item.thumbnail.path}.${item.thumbnail.extension}`,
        }}
      />
      <Text numberOfLines={2} style={styles.titleComic}>
        {item.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardComics: {
    width: 120,
    marginRight: 40,
  },
  imageComic: {
    width: 120,
    height: 152,
    borderRadius: 5,
  },
  titleComic: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 12,
  },
});
export default Comic;
