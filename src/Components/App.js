import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../Pages/auth/Login/Login';
import Register from '../Pages/auth/Register/Register';
import SideBar from './SideBar/SideBar';
import Content from './Content/Content';
import { MainContext } from '../Context/MainContext';
import Nav from './Nav/Nav';
import { Toaster } from 'react-hot-toast';
import '../app.css';


const App = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showDrowdown, setShowDrowdown] = useState(false);

    useEffect(() => {
        if(window.innerWidth > 1080) setShowSidebar(true);
        window.addEventListener('resize', () => {
            // Close SideBar When Resize Page
            setShowSidebar(false);
            // Close Drowdown When Resize Page
            setShowDrowdown(false);
        });

        document.body.addEventListener('click', (e) => {
            e.stopPropagation();
            setShowDrowdown(false);
        });
    }, []);
    return (
        <>
            {
                (localStorage.getItem('token')) ? (
                    <MainContext.Provider value={{showSidebar, setShowSidebar, showDrowdown, setShowDrowdown}}>
                        <div className={`w-full h-full bg-gray-900/40 fixed top-0 right-0 z-30 ${showSidebar ? 'lg:hidden' : 'hidden'}`} onClick={() => {
                            if(window.innerWidth < 1080) setShowSidebar(false);
                            setShowDrowdown(false);
                        }} />
                        <Nav />
                        <section className="flex">
                            <SideBar />
                            <Content />
                        </section>
                    </MainContext.Provider>
                ) : (
                    <Routes>
                        <Route path="/auth">
                            <Route path="/auth/register" element={<Register />} />
                            <Route path="/auth/login" element={<Login />} />
                        </Route>
                        <Route path="*" element={<Navigate to="/auth/login" />} />
                    </Routes>
                )
            }

            <Toaster 
                position="top-left"
                reverseOrder={false}
            />
        </>
    );
};
export default App;