import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Login } from "./pages/Login";
import { Post } from "./pages/Post";

//create your first component
const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    return (
        <div>
            <ScrollToTop>
                {!isLoginPage && <Navbar />}
                <Routes basename={basename}>
                    <Route path="/" element={<Navigate to="/login" />} /> {/* Redirige la raíz a /login */}
                    <Route element={<Login />} path="/login" />
                    <Route element={<Post />} path="/post/:theid" />
                    <Route element={<Home />} path="/home" />
                    <Route element={<Demo />} path="/demo" />
                    <Route element={<Single />} path="/single/:theid" />
                    <Route element={<h1>Not found!</h1>} />
                </Routes>
                <Footer />
            </ScrollToTop>
        </div>
    );
};

export default Layout;