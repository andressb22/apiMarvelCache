/* eslint-disable prettier/prettier */
import {useState} from 'react';

interface InputValidationProps {
  text?: string;
  setError: (error: string) => void;
  type?: string;
}

interface InputHandlesProps {
  type?: string;
  required?: boolean;
}

const regCorreo =
  /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

export const Validaciones = (input: InputValidationProps): boolean => {
  if ('text' in input) {
    if (input.text == null || input.text == undefined) {
      input.setError('Esta casilla es obligatoria');
      return true;
    }
    if (input.text.trim() == '') {
      input.setError('Esta casilla es obligatoria');
      return true;
    }
    if (input.type == 'email') {
      if (!regCorreo.test(input.text.trim())) {
        input.setError('Dirección de correo invalida');
        return true;
      }
    }
  }

  return false;
};

export const useInputHandles = ({
  type,
  required = false,
}: InputHandlesProps) => {
  const [error, setError] = useState('');
  const [text, setText] = useState('');

  const handleChange = (textdata: string) => {
    if (error != '') {
      setError('');
    }
    setText(textdata);
  };

  const handleBlur = () => {
    if (required) {
      Validaciones({text, type, setError});
      if (error != '') return setError('');
    }
  };

  const handleFocus = () => {
    if (required) {
      if (error != '') return setError('');
    }
  };

  return {
    error,
    text,
    handleChange,
    handleBlur,
    handleFocus,
    setError,
    type,
  };
};
