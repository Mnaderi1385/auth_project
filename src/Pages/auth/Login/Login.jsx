import { useState } from 'react';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { azhadevAxios } from '../../../AxiosConfig/azhadevAxios';
import FormikControls from '../../../Components/FormikElements/FormikControls';
import Loading from '../../../Components/Loading/Loading';
import useTitle from './../../../Components/Hooks/useTitle';


const Login = () => {
    useTitle('ورود به حساب کاربری');
    const [toggle, setToggle] = useState(true);

    const initialValues = {
        phone: '',
        password: '',
        remember: 0,
    };

    const SubmitForm = (values, submitProps) => {
        azhadevAxios.post('/auth/login', values)
            .then((res) => {
                if(res.status === 200 || res.status === 201) {
                    localStorage.setItem('token', res.data.token);
                    submitProps.setSubmitting(false);
                    toast.success('شما با موفقیت وارد حساب کاربری خود شدید', {
                        style: {
                            fontWeight: 'bold',
                            fontSize: '.9rem',
                            background: '#16a34a',
                            color: '#fff',
                            borderRadius: '.4rem',
                            padding: '1.1rem',
                        },
                    });

                    setTimeout(() => {
                        window.location.href = '/';
                    }, 2000);
                } else {
                    submitProps.setSubmitting(false);

                    toast.error(res.data.message, {
                        style: {
                            fontWeight: 'bold',
                            fontSize: '.9rem',
                            background: '#D32F2F',
                            color: '#fff',
                            borderRadius: '.4rem',
                            padding: '1.1rem',
                        },
                        position: 'top-left',
                    });
                };
            });
    };

    const validationSchema = Yup.object({
        phone: Yup.number().required('لطفا شماره تلفن خود را وارد کنید !').min(11, 'شماره تلفن باید 11 رقم باشد !'),
        password: Yup.string().required('لطفا رمز عبور خود را وارد کنید !'),
    });


    const handleChangeToggle = (formik) => {
        setToggle(!toggle);
        if(toggle) {
            formik.setValues({
                ...formik.values,
                remember : 1,
            })
        } else {
            formik.setValues({
                ...formik.values,
                remember : 0,
            });
        };
    };

    return (
        <section className="flex justify-center items-center min-h-screen bg-slate-300 bg py-10">
            <div id="overlay" className="fixed top-0 w-full min-h-screen bg-slate-800/40 z-30"></div>
            <div className="max-w-lg w-full mx-2 md:mx-auto bg-slate-100 rounded-lg min-h-[200px] z-50">
                <div className="flex flex-col justify-between">
                    <div className="bg-indigo-600 flex flex-col justify-center items-center p-5 rounded-t-lg">
                        <h1 className="text-slate-100 text-lg font-bold">ورود به حساب کاربری</h1>
                    </div>
                    
                    <div className="px-6 py-8 rounded-lg">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={SubmitForm}
                            validationSchema={validationSchema}
                            validateOnMount
                        >

                            {
                                (formik) => {
                                    return(
                                        <Form>
                                            <FormikControls
                                                control="input"
                                                type="text"
                                                inputClass="w-full rounded-full px-10 py-4 outline-none bg-slate-200 text-xs text-slate-800 placeholder:font-semibold transition-all duration-500 border-2 border-transparent focus:border-indigo-600"
                                                icon="fa fa-phone"
                                                name="phone"
                                                placeholder="شماره تلفن"
                                            />

                                            <FormikControls
                                                control="input"
                                                type="password"
                                                inputClass="w-full rounded-full px-10 py-4 outline-none bg-slate-200 text-xs text-slate-800 placeholder:font-semibold transition-all duration-500 border-2 border-transparent focus:border-indigo-600"
                                                icon="fa fa-lock"
                                                name="password"
                                                placeholder="رمز عبور"
                                            />


                                            <label htmlFor="switch" className="mt-10 flex items-center">
                                                <input type="checkbox" name="remmber" id="switch" className="relative cursor-pointer appearance-none w-11 h-6 bg-slate-300 rounded-full active:shadow-md active:shadow-slate-500 checked:bg-indigo-300 duration-500 checked:after:right-6 after:rounded-full after:w-6 after:h-6 after:bg-slate-500 after:checked:bg-indigo-600 after:absolute after:right-0 after:duration-500 after:opacity-90" onChange={() => handleChangeToggle(formik)} />
                                                <span className="select-none cursor-pointer mr-2 text-sm text-slate-700 font-semibold">مرا به خاطر بسپار</span>
                                            </label>

                                            <div className="mt-8 w-full">
                                                <button className="w-full px-4 py-3 bg-indigo-700 text-white rounded-full text-sm transition-all duration-500 flex justify-center items-center hover:bg-indigo-600 disabled:opacity-70 disabled:cursor-no-drop" disabled={!formik.isValid || formik.isSubmitting}>
                                                {
                                                        (formik.isSubmitting) ? (
                                                            <Loading 
                                                                size="sm"
                                                                color="secondary"
                                                            />
                                                        ) : (
                                                            <>
                                                                <i className="fa fa-sign-in text-slate-100 ml-2" />
                                                                <span>ورود</span>
                                                            </>
                                                        )
                                                    }
                                                </button>
                                            </div>



                                            <p className="text-center text-sm font-semibold mt-8 text-slate-600">
                                                حساب کاربری ندارید ؟ <Link to="/auth/register" className="text-blue-400 hover:underline">یکی بسازید</Link>
                                            </p>
                                        </Form>
                                    )
                                }
                            }
                        </Formik>
                    </div>
                </div>
            </div>


            
        </section>
    );
}

export default Login;
