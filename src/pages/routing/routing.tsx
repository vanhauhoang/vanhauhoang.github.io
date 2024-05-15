import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainPage from '../main/main';
import BuyPage from '../buy/buy';

export const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="whiskers" element={<MainPage />} />
                <Route path="whiskers/buy" element={<BuyPage />} />
                <Route path="*" element={<div>Not found</div>} />
            </Routes>
        </BrowserRouter>
    );
};

