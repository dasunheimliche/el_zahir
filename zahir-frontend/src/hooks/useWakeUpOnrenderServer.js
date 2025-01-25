import { useEffect } from 'react';
import axios from 'axios';

export default function useWakeUpOnrenderServer() {
  useEffect(() => {
    axios.get('https://zahir-api.onrender.com/api/register');
  }, []);
}
