/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';

type LoaderProps = {
  size?: number; // Tamaño del loader
  color?: string; // Color del loader
  top?: number | string; // Posición en el eje Y
  left?: number | string; // Posición en el eje X
  right?: number | string; // Posición en el eje X
  bottom?: number | string; // Posición en el eje Y
};

const Loader: React.FC<LoaderProps> = ({
  size = 25,
  color = '#fff',
  right,
  bottom,
}) => {
  const rotate = new Animated.Value(0);

  // Animación infinita de rotación
  React.useEffect(() => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 1200, // Duración de cada rotación (ms)
        useNativeDriver: true,
      }),
    ).start();
  }, [rotate]);

  // Calcular rotación continua como cadena
  const rotateInterpolation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View
      style={[
        styles.loaderContainer,
        {
          right,
          bottom,
          height: size + 10,
          width: size + 10,
        },
      ]}>
      <Animated.View
        style={[
          styles.circle,
          {
            borderRadius: size,
            width: size,
            height: size,
            borderColor: color,
            // Crear el efecto de esquina faltante
            transform: [{rotate: rotateInterpolation}],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100000000000000,
    backgroundColor: 'rgba(0,0,0,.5)',
    borderRadius: 20,
  },
  circle: {
    borderWidth: 3,
    borderColor: 'black',
    borderTopWidth: 0,
    borderLeftWidth: 1,
  },
});

export default Loader;
