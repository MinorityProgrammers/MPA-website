import React, { useEffect, useState, useContext } from 'react';
import Loader from '../../components/Loader';
import { GlobalContext } from "../../contexts/provider";


const index = () => {
    const [userData, setUserData] = useState({})
    const [loader, setLoader] = useState(true);
     // states from global context

     const {
      authDispatch,
      authState: {
        auth: { loading, error, data },
      },
    } = useContext(GlobalContext);

    // redirect unauthorized users

    const redirect = () => {
      window.location.href = '/login' 
    }
        // spinner loader
        useEffect(() => {
            setTimeout(() => {
              setLoader(false);
            }, 4000);
          }, []);
      

    // grab a token from local storage so as user info

    useEffect(() => {
      const token = window.localStorage.getItem('jwtToken');
      const userInfo = window.localStorage.getItem('userInfo');

      if (token == null || userInfo == {}) {
          redirect()
      }

      setUserData(Object.values(JSON.parse(userInfo))[1])

    }, [data]); 

    useEffect(()=>{
        if(!loader && userData.isUpdated === true){
            window.location.href = '/dashboard/user/singleProfile' 
        }
        if(!loader && userData.isUpdated === false){
            window.location.href = '/dashboard/user/updateProfile' 
        }
    })

       

    
    return (
        <div
            className={`${
            loader ? 'tw-flex tw-items-center tw-justify-center tw-h-screen' : 'tw-hidden'
            }`}
        >
            <Loader />
        </div>
          )
}

export default index
