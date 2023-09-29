import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { fetchAllWebsites } from "../ajaxHelper";
import '../Style/Root.css'

export default function Root() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    function logout() {
        localStorage.removeItem('token');
        setToken('');
        setIsLoggedIn(false);
    }

    useEffect(() => {
        if (!localStorage.getItem('websites')) {
            fetchAllWebsites()
                .then(websites => {
                    localStorage.setItem('websites', JSON.stringify(websites));
                });
        }
    }, []);

    return (
        <div>
            <header>
                <h2 className="webName">Website Reviewer</h2>
                <nav className="headerLink">
                <div className="navbar">
                    <Link to="WebsiteListings" className="linkStyle">Homepage</Link>
                    <Link to="Reviews" className="linkStyle">Reviews</Link>
                    {token ? <Link to="profile" className="linkStyle">Profile</Link> : null}
                    {!token && (
                        <>
                            <Link to="Register" className="linkStyle">Register</Link>
                            <Link to="Login" className="linkStyle">Login</Link>
                        </>
                    )}
                    {token && <button onClick={logout} className="logoutButton">Log Out</button>}
                </div>
                </nav>
            </header>
            <main>
                <Outlet
                    context={[
                        token, setToken,
                        isLoggedIn, setIsLoggedIn
                    ]}
                />
            </main>
        </div>
    );
}