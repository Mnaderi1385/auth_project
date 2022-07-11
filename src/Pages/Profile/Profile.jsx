import React, { useEffect, useState } from 'react';
import { azhadevAxios } from '../../AxiosConfig/azhadevAxios';
import Loading from '../../Components/Loading/Loading';
import Title from '../../Components/Title/Title';
import useTitle from './../../Components/Hooks/useTitle';

const Profile = () => {
    useTitle('پروفایل');
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        azhadevAxios.get('/auth/user', {
           headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
           },
        })
            .then((res) => {
                setLoading(false);
                setData(res.data);
            });
    }, []);
    


    return (

        <>
            <Title>پروفایل</Title>
            <section className="bg-slate-200 dark:bg-slate-700 mt-5 rounded-lg py-8 px-5">
                <div className="flex items-center">
                    <i className="fa fa-phone text-slate-700 dark:text-white text-sm ml-1" />
                    <span className="font-semibold text-slate-600 dark:text-white text-sm block ml-2">شماره تلفن :</span>
                    
                    {
                        (loading) ? (
                            <Loading
                                size="sm"
                                color="primary"
                            />
                            ) : (
                            <span className="text-slate-600 dark:text-gray-300 font-medium text-xs block">{ data.phone }</span>
                        )
                    }
                </div>
            </section>
        </>
    );
}

export default Profile;
