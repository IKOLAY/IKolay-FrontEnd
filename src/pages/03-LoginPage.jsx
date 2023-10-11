import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { showErrorMessage } from "../components/InfoMessages";

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
                throw new Error("Eposta veya şifre hatalı.");
            return resp.json();
        }).then(data => {
            window.localStorage.setItem("token", data.token);
            window.localStorage.setItem("role", data.role);
            fetch(`http://localhost:80/user/loggeduser?token=${data.token}`)
                .then(resp => resp.json())
                .then(data2 => {
                    console.log(data2);
                    window.localStorage.setItem("user", JSON.stringify(data2));
                    if (data2.companyId == null) {
                        window.localStorage.setItem("company", null);
                        window.localStorage.setItem("shift", null)
                        roleCheck(data.role)
                    } else {
                        fetch(`http://localhost:80/company/companyinformation?id=${data2.companyId}`)
                            .then(resp => resp.json())
                            .then(data3 => {
                                console.log(data3);
                                window.localStorage.setItem("company", JSON.stringify(data3));
                                if (data2.shiftId == null) {
                                    window.localStorage.setItem("shift", null);
                                    roleCheck(data.role)
                                }
                                else {
                                    fetch(`http://localhost:80/shift/findshift/${data2.shiftId}`)
                                        .then(resp => resp.json())
                                        .then(data4 => {
                                            console.log(data4);
                                            window.localStorage.setItem("shift", JSON.stringify(data4));
                                            roleCheck(data.role)
                                        })
                                }
                            });
                    }
                })

        }).catch(err => {
            console.log(err);
            showErrorMessage(err.message)
        })
    }

    function roleCheck(role) {
        if (role == "MANAGER")
            navigate("/company")
        else if (role == "ADMIN")
            navigate("/admin")
        else if (role == "EMPLOYEE")
            navigate("/employee")
        else
            navigate("/")
    }

    function handleChange(e) {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
    }

    return (
        <main className="bg-default-h-100 d-flex justify-content-center align-items-center">
            <form typeof="submit" onSubmit={handleSubmit}>
                <NavLink to="/">
                    <div className="navbar-brand logo-text form-outline mb-4 text-center">
                   
                            <span className="text-info logo-text">İK</span>olay
                    
                    </div>
                </NavLink>
                <div className="form-outline mb-4">
                    <label className="form-label w-100" htmlFor="email">
                        Eposta
                        <input name="email" id="email" type="text" className="form-control" value={loginInfo.email} onChange={handleChange} required onInvalid={(e) => {
                            if (e.target.value == "") {
                                e.target.setCustomValidity('Eposta boş olamaz!')
                            } else {
                                e.target.setCustomValidity('Eposta @ içermeli! Örnek: ornek@ornek.com')
                            }
                        }}
                            onInput={e => e.target.setCustomValidity('')} title="Eposta @ içermeli! Örnek: ornek@ornek.com"/>
                    </label>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label w-100" htmlFor="password">
                        Şifre
                        <input name="password" id="password" type="password" className="form-control" value={loginInfo.password} onChange={handleChange} required onInvalid={e => e.target.setCustomValidity('Şifre boş olamaz!')}
                            onInput={e => e.target.setCustomValidity('')} />
                    </label>
                </div>
                <button type="submit" className="btn btn-info mb-4 w-100">
                    Giriş
                </button>
                
                <p className="text-center d-flex justify-content-between">
                    Üye değil misiniz? 
                    <NavLink to="/register">
                    <span className="text-info small text-decoration-underline">Kaydol!</span>
                    </NavLink>
                </p>


            </form>
            
        </main>
    )
}

