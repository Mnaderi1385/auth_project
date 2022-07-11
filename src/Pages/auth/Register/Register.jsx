import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../../../Components/FormikElements/FormikControls';
import { Link } from 'react-router-dom';
import { azhadevAxios } from '../../../AxiosConfig/azhadevAxios';
import Loading from '../../../Components/Loading/Loading';
import toast from 'react-hot-toast';
import useTitle from '../../../Components/Hooks/useTitle';



const Register = () => {
    useTitle('ثبت نام');
    const initialValues = {
        phone: '',
        password: '',
        c_password: '',
    };
    
    const SubmitForm = (values, submitProps) => {
        azhadevAxios.post('/auth/register', values)
            .then((res) => {
                console.log(res);
                submitProps.setSubmitting(false);
                if(res.status === 200 || res.status === 201) {
                    localStorage.setItem('token', res.data.token);
                    toast.success(res.data.message, {
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
                    }, 1000);
                } else {
                    toast.error(res.data.phone[0], {
                        style: {
                            fontWeight: 'bold',
                            fontSize: '.9rem',
                            background: '#D32F2F',
                            color: '#fff',
                            borderRadius: '.4rem',
                            padding: '1.1rem',
                        },
                    });
                };
            }).catch((err) => {
                toast.error('مشکلی پیش اومده لطفا دوباره امتحان کنید', {
                    style: {
                        fontWeight: 'bold',
                        fontSize: '.9rem',
                        background: '#D32F2F',
                        color: '#fff',
                        borderRadius: '.4rem',
                        padding: '1.1rem',
                    },
                });
            });
    }
    
    const validationSchema = Yup.object({
        phone: Yup.number().required('لطفا شماره تلفن خود را وارد کنید !').min(11, 'شماره تلفن باید 11 رقم باشد !'),
        password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, 'لطفا حداقل یک حرف بزرگ یک کوچک و حداقل 8 کاراکتر وارد کنید !').required('لطفا رمز عبور خود را وارد کنید !'),
        c_password: Yup.string().oneOf([Yup.ref('password'), ''], 'با رمز عبور مطابقت ندارد !').required('لطفا تکرار رمز عبور خود را وارد کنید !')
    });
    return (
        <section className="flex justify-center items-center min-h-screen bg-slate-300 bg py-10">
            <div id="overlay" className="fixed top-0 w-full min-h-screen bg-slate-800/40 z-30"></div>
            <div className="max-w-xl w-full mx-2 md:mx-auto bg-slate-100 rounded-lg min-h-[200px] z-50">
                <div className="flex flex-col justify-between">
                    <div className="bg-indigo-600 flex flex-col justify-center items-center p-5 rounded-t-lg">
                        <h1 className="text-slate-100 text-lg font-bold">ثبت نام</h1>
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
                                    return (
                                        <Form>
                                            <FormikControl
                                                control="input"
                                                type="text"
                                                inputClass="w-full rounded-full px-10 py-4 outline-none bg-slate-200 text-xs text-slate-800 placeholder:font-semibold transition-all duration-500 border-2 border-transparent focus:border-indigo-600"
                                                icon="fa fa-phone"
                                                name="phone"
                                                placeholder="شماره تلفن"
                                            />

                                            <FormikControl
                                                control="input"
                                                type="password"
                                                inputClass="w-full rounded-full px-10 py-4 outline-none bg-slate-200 text-xs text-slate-800 placeholder:font-semibold transition-all duration-500 border-2 border-transparent focus:border-indigo-600"
                                                icon="fa fa-lock"
                                                name="password"
                                                placeholder="رمز عبور"
                                            />

                                            <FormikControl
                                                control="input"
                                                type="password"
                                                inputClass="w-full rounded-full px-10 py-4 outline-none bg-slate-200 text-xs text-slate-800 placeholder:font-semibold transition-all duration-500 border-2 border-transparent focus:border-indigo-600"
                                                icon="fa fa-check"
                                                name="c_password"
                                                placeholder="تکرار رمز عبور"
                                            />


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
                                                                <i className="fa fa-user-plus text-slate-100 ml-2" />
                                                                <span>ثبت نام</span>
                                                            </>
                                                        )
                                                    }
                                                </button>
                                            </div>



                                            <p className="text-center text-sm font-semibold mt-8 text-slate-600">
                                                قبلا ثبت نام کرده اید ؟ <Link to="/auth/login" className="text-blue-400 hover:underline">ورود</Link>
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

export default Register;
