import { IAlert } from '@interfaces/components/IAlert';
import { useState } from 'react';

const useAlert = (options?: IAlert) => {
  const defaultOptions: IAlert = {
    active: false,
    message: '',
    type: '',
    autoClose: true,
  };
  const [alert, setAlert] = useState({
    ...defaultOptions,
    ...options,
  });

  const toggleAlert = () => {
    // @ts-ignore
    setAlert(!alert.active);
  };

  return {
    alert,
    setAlert,
    toggleAlert,
  };
};

export default useAlert;
