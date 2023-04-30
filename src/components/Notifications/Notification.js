import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Notification.css';

const Notification = () => {
  const messages = [
    'Try out the new challenges!',
    'Don\'t forget to check out the map!',
    'Provide feedback on the new challenges! We\'d love to hear from you!',
    'HaliHacks is coming up soon!',
    'Share your achievements with your friends on social media!',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newIndex = Math.floor(Math.random() * messages.length);
      setCurrentIndex(newIndex);
      const message = messages[newIndex];
      toast.success(message, {
        bodyClassName: 'notification-body notification-toast',
        position: 'top-center',
        autoClose: 2000,
      });

      console.log(`Notification shown: ${message}`);
    }, 40000);

    return () => {
      clearInterval(intervalId);
    }
  }, []);

  console.log('rendering Home component');

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        icon={false}
        toastContainerClassName="custom-toast-container"
      />
    </div>
  );
};

export default Notification;
