import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function LoginPage() {
    const defLogInfo = { email: "", password: "" }
    const [loginInfo, setLoginInfo] = useState({ ...defLogInfo });
    const navigate = useNavigate();
    function handleSubmit(e) {

        e.preventDefault()
        console.log(loginInfo)
        fetch("http://localhost:80/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginInfo)
        }).then(resp => {
            if (!resp.ok)
                throw new Error("Hata initiate");
            return resp.json();
        }).then(data => {
            window.localStorage.setItem("token", data.token)
            console.log(data.token);
            fetch(`http://localhost:80/user/loggeduser?token=${data.token}`)
                .then(resp => resp.json())
                .then(data2 => {
                    console.log(data2);
                    window.localStorage.setItem("user", JSON.stringify(data2));
                    if (data.role == "MANAGER")
                        navigate("/company")
                    else if (data.role == "ADMIN")
                        navigate("/admin")
                    else
                        navigate("/")
                })
        }).catch(err => console.log(err))

    }

    function handleChange(e) {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
    }

    return (
        <main className="bg-default d-flex justify-content-center align-items-center">
            <form typeof="submit" onSubmit={handleSubmit}>
                <NavLink to="/">
                    <div className="form-outline mb-4 text-center">
                        <a className="navbar-brand logo-text " href="#">
                            <span className="text-info">İK</span>olay
                        </a>
                    </div>
                </NavLink>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">
                        Eposta
                        <input type="text" name="email" id="email" className="form-control" value={loginInfo.email} onChange={handleChange} />
                    </label>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="password">
                        Şifre
                        <input className="form-control" name="password" id="password" type="password" value={loginInfo.password} onChange={handleChange} />
                    </label>
                </div>
                <button type="submit" className="btn btn-info mb-4 w-100">
                    Giriş
                </button>
                
                <p className="text-center d-flex justify-content-between">
                    Üye değil misiniz? 
                    <NavLink to="/register">
                    <a href="#!" className="text-info small text-decoration-underline">Kaydol!</a>
                    </NavLink>
                </p>

            </form>
        </main>
    )
}

