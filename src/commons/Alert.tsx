import { XCircleIcon } from '@heroicons/react/20/solid';
import { AlertEnum, IAlertProps } from '@interfaces/components/IAlert';
import { useEffect, useState } from 'react';

const Alert = ({ alert, handleClose }: IAlertProps) => {
  const [backgroundAlert, setBackgroundAlert] = useState('');
  if (alert && alert?.autoClose) {
    setTimeout(() => {
      handleClose();
    }, 9000);
  }

  useEffect(() => {
    setBackgroundAlert(AlertEnum[alert?.type]);
  }, [alert]);

  return (
    <>
      {alert?.active && (
        <div x-data className={`${backgroundAlert} p-5 w-full rounded mb-8`}>
          <div className="flex space-x-3">
            <div className="flex-1 leading-tight text-sm text-black font-medium">{alert.message}</div>
            <button type="button">
              <XCircleIcon className="w-6 h-6 text-gray-600" onClick={handleClose} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
