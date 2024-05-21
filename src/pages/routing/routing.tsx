import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FC, ReactElement } from 'react';
import React from 'react';

const BuyPage = React.lazy(() => import('../buy/buy'));
const MainPage = React.lazy(() => import('../main/main'));

export const Routing: FC = (): ReactElement => {
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

