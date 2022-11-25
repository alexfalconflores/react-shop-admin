type AlertTypes = 'Success' | 'Error' | 'Info' | 'Warning' | '';

export enum AlertEnum {
  'Success' = 'bg-green-500',
  'Error' = 'bg-red-500',
  'Warning' = 'bg-yellow-500',
  'Info' = 'bg-sky-500',
  '' = 'bg-gray-500',
}

export interface IAlert {
  active: boolean;
  message: string;
  type: AlertTypes;
  autoClose: boolean;
}

export interface IAlertProps {
  alert: IAlert;
  handleClose: () => void;
}
