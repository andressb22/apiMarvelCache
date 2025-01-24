/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */

import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import succesIco from '../assets/succesIco.png';
import errorIco from '../assets/errorIco.png';

interface AlertModalProps {
  title: string;
  message: string;
  type: integer;
  visible: boolean;
  handler: (value: boolean) => void;
}

const icoStatus = [succesIco, errorIco];

const AlertModal: React.FC<AlertModalProps> = ({
  title,
  message,
  type,
  visible,
  handler,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.containerIco}>
            <Image style={styles.ico} source={icoStatus[type]} />
          </View>
          <View>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View>
            <Text>{message}</Text>
          </View>
          <TouchableOpacity onPress={()=>handler(false)} style={styles.button}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    backgroundColor: '#004A9F',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.6)',
  },
  containerIco: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ico: {
    width: 180,
    height: 180,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 6,
  },
  modal: {
    backgroundColor: '#fff',
    paddingVertical: 40,
    paddingHorizontal: 60,
    borderRadius: 10,
    maxWidth: '85%',
  },
});

export default AlertModal;
