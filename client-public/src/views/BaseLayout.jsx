import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar';

function BaseLayout() {
    return (
        <div className='bg-white text-black min-h-screen p-6 font-sans'>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default BaseLayout;