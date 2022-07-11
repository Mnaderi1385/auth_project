import useTitle from '../../Components/Hooks/useTitle';


const NotFound = () => {
    useTitle('صفحه مورد نظر یافت نشد !!!');

    return (
        <div className="text-center flex flex-col justify-center items-center min-h-[90vh]">
            <div className="flex justify-center">
                <span className="font-bold text-7xl sm:text-9xl notFound4 animate-[bounce_.9s_ease_.5s_infinite] block text-slate-600 darK:text-slate-400">4</span>
                <span className="font-bold text-orange-500 text-7xl sm:text-9xl notFound0 block animate-pulse">0</span>
                <span className="font-bold text-7xl sm:text-9xl notFound4 block animate-bounce text-slate-600 darK:text-slate-400">4</span>
            </div>
            <p className="text-lg md:text-2xl font-bold text-gray-700 dark:text-slate-300">آخ! مشکلی پیش اومده</p>
            <p className="text-base md:text-lg font-semibold text-orange-600 rounded-md p-3">متاسفانه صفحه مورد نظر پیدا نشد</p>
        </div>
    );
}

export default NotFound;