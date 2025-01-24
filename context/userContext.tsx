/* eslint-disable prettier/prettier */
import React, {createContext, useState, ReactNode} from 'react';

// Definir un tipo para los datos del usuario
interface UserData {
  name: string;
  lastName: string;
  email: string;
}

// Definir el tipo para el contexto
interface UserContextType {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  clearStateUser: () => void;
}

// Crear el contexto con un valor por defecto
const UserContext = createContext<UserContextType>({
  userData: {name: '', lastName: '', email: ''},
  setUserData: () => {}, // Función vacía por defecto
  clearStateUser: () => {}, // Función vacía por defecto
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    lastName: '',
    email: '',
  });

  const clearStateUser = () =>
    setUserData({
      name: '',
      lastName: '',
      email: '',
    });

  // Crear un objeto de datos que quieres exponer a través del contexto
  const data = {
    userData,
    setUserData,
    clearStateUser,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export default UserContext;
