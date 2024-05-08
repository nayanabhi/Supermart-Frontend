import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// Function to make Axios requests with JWT token handling
export const AxiosWithToken = async (method, url, data = {}) => {
    const navigate = useNavigate();
    const storedToken = localStorage.getItem('token');
    const headers = {
        'Authorization': `Bearer ${storedToken}`,
        'Content-Type': 'application/json'
    }

    const response = await axios({ method, url, headers, data});
    if (response.data.message === 'TokenExpiredError') {
        localStorage.removeItem('token');
        navigate('/signin')
        return;
    }else {
        console.log({34324324: response})
        return response?.data;
    }
    // axios.get('http://localhost:3000/users/unSelectedProducts', {
    //   headers: {
    //     'Authorization': `Bearer ${storedToken}`,
    //     'Content-Type': 'application/json'
    //   }
    // })
    //   .then(response => {
    //     return response.data;
    //   })
    //   .catch(error => {
    //     if(error.response.data.message === 'TokenExpiredError') {
    //       localStorage.removeItem('token');
    //       navigate('/signin')
    //       return;
    //     }
    //     console.error('Error fetching categories:', error);
    //   });
};
