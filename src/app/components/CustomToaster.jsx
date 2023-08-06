import  { Toaster } from 'react-hot-toast';


export default function CustomToaster() {
    const toastOptions={
      style: {
        background: '#363636',
        color: '#fff',
      },
      success: {
        iconTheme: {
        primary: 'green',
        secondary: 'white',
      },
      },
    }
  
    return <Toaster   toastOptions={toastOptions} />
}