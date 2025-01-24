# Proyecto React Native - Marvel API

Este proyecto es una aplicación en React Native que utiliza la API de Marvel. A continuación se presentan los pasos detallados para configurar y ejecutar el proyecto correctamente.

## Requisitos previos

- Tener [Node.js](https://nodejs.org/) instalado en tu sistema.
- Tener [npm](https://www.npmjs.com/) instalado.
- Tener un emulador de Android configurado o un dispositivo físico conectado.

## Pasos para ejecutar el proyecto

### 1. Clonar el repositorio

Clona el repositorio en tu máquina local utilizando el siguiente comando:

```bash
git clone <Este repositorio>

```

### 2. Ingresar al directorio raíz del proyecto

Clona el repositorio en tu máquina local utilizando el siguiente comando:

```bash
cd <nombre_del_repositorio>
```

### 3. Instalar dependencias

Ejecuta el siguiente comando para instalar todas las dependencias necesarias para el proyecto:

```bash
npm install
```

### 4. Iniciar el servidor de Metro

Para iniciar el servidor de desarrollo de React Native, ejecuta el siguiente comando:

```bash
npx react-native start
```

### 5. Abrir el emulador de Android

Una vez que Metro esté corriendo, presiona la tecla a en la terminal donde se está ejecutando el servidor de Metro para abrir el emulador de Android. Si ya tienes un emulador corriendo o un dispositivo físico conectado, la aplicación debería iniciar automáticamente en el emulador.

### 6. Configurar las claves de la API de Marvel

Antes de ejecutar la aplicación, debes configurar las claves de acceso a la API de Marvel.

    Regístrate en el sitio oficial de la API de Marvel: https://developer.marvel.com/.
    Obtén tus claves PUBLICKEY y PRIVATEKEY.

A continuación, dirígete al archivo const.js, que se encuentra en el directorio raíz del proyecto. Sustituye las siguientes variables con tus claves proporcionadas por Marvel:

```bash
const PUBLICKEY = '<TU_PUBLICKEY>';
const PRIVATEKEY = '<TU_PRIVATEKEY>';
```

### 7. Ejecutar la aplicación

Una vez configuradas las claves, puedes ejecutar la aplicación en tu emulador o dispositivo físico. En una nueva terminal, ejecuta el siguiente comando:

```bash
npx react-native run-android
```

Esto debería compilar y lanzar la aplicación en tu dispositivo o emulador Android.

¡Listo! Ahora puedes empezar a interactuar con la aplicación utilizando la API de Marvel. Si tienes algún problema durante la configuración, revisa los pasos nuevamente o consulta la documentación oficial de React Native.
