import { useState } from 'react';

export const useNotifications = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [displayAlert, setDisplayAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertType, setAlertType] = useState<string>('');
  const [redirect, setRedirect] = useState<boolean>(false);

  return { showModal, setShowModal, displayAlert, setDisplayAlert, alertMessage, setAlertMessage, alertType, setAlertType, redirect, setRedirect };
}