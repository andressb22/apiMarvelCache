/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import {useContext, useState} from 'react';
import LogoMarvel from '../assets/marvelLogo.png';
import DecoLogin from '../assets/decoLogin.png';
import Input from '../componets/Input';

import AlertModal from '../componets/Alert';
import {useNavigation} from '@react-navigation/native';
import {login} from '../services/authService';
import UserContext from '../context/userContext';
import {useInputHandles, Validaciones} from '../hooks/useInputHandler';

const Login: React.FC = () => {
  const Email = useInputHandles({type: 'email', required: true});
  const Password = useInputHandles({type: 'none', required: false});
  const [modalActive, setModalActive] = useState(false);
  const [modalText, setModalText] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('');
  const navigation = useNavigation();
  const {setUserData} = useContext(UserContext);

  const logUser = async (): void => {
    const validatedEmail = Validaciones({
      text: Email.text,
      type: 'email',
      setError: Email.setError,
    });
    const validatedPassword = Validaciones({
      text: Password.text,
      type: 'none',
      setError: Password.setError,
    });

    if (validatedEmail || validatedPassword) return;

    try {
      const response = await login(Email.text, Password.text);

      if (response.ok) {
        setUserData(response.data);
        navigation.navigate('Heroes');
        return;
      }
      // Si las credenciales son incorrectas
      setModalText('Usuario o contraseña incorrectos');
      setModalTitle('Alerta');
      setModalActive(true);
    } catch (error) {
      setModalText('Error del servidor intente de nuevo');
      setModalTitle('Error');
      setModalActive(true);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <AlertModal
        title={modalTitle}
        message={modalText}
        type={1}
        visible={modalActive}
        handler={setModalActive}
      />
      <StatusBar backgroundColor="#D43437" barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Image source={LogoMarvel} />
          </View>
          <View style={styles.contDecoHeader}>
            <Image source={DecoLogin} />
          </View>
        </View>
        <View style={styles.contForm}>
          <Input
            label="Correo"
            placeholder="Escriba su correo"
            handler={Email}
            required={true}
          />
          <Input
            label="Contraseña"
            placeholder="Escriba su contraseña"
            handler={Password}
            secureTextEntry={true}
          />
          <TouchableOpacity onPress={logUser} style={styles.button}>
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 45,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D43437',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  contForm: {
    height: '65%',
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal: 60,
    paddingTop: '15%',
  },
  contDecoHeader: {
    position: 'absolute',
    bottom: 0,
  },
  header: {
    height: '35%',
    backgroundColor: '#D43437',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingTop: 35,
  },
});

/*
<LinearGradient
        colors={['#000000', '#070707', '#292929', '#424242', '#666666']}
        locations={[0, 0.35, 0.67, 0.94, 1]}
        start={{x: 1, y: 1}} // Punto de inicio (izquierda arriba)
        end={{x: 1, y: 0}}
        style={styles.container}>

      </LinearGradient>
*/
export default Login;
