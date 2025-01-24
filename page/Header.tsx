/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useCachedRequests} from '../context/ProxyProvider';
import {useContext} from 'react';
import UserContext from '../context/userContext';

const Header = () => {
  const [_, actions] = useCachedRequests();
  const {userData, clearStateUser} = useContext(UserContext);

  const logUser = () => {
    clearStateUser();
    actions.logOut();
  };

  return (
    <View style={styles.container}>
      <View style={styles.contDataUser}>
        <Text style={styles.title}>Perfil</Text>
        <Text
          style={styles.name}>{`${userData.name} ${userData.lastName}`}</Text>
      </View>
      <View style={styles.contButton}>
        <TouchableOpacity onPress={logUser} style={styles.buttonClose}>
          <Text style={styles.buttonCloseText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonClose: {
    borderColor: '#fff',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 3,
    width: 150,
    paddingLeft: 10,
  },
  buttonCloseText: {
    color: '#fff',
    fontWeight: '700',
    marginRight: 10,
  },
  contButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: 75,
    backgroundColor: '#D43437',
    flexDirection: 'row',
  },
  contDataUser: {
    flex: 0.8,
    justifyContent: 'center',
    marginLeft: 28,
  },
  name: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '700',
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
});

export default Header;
