import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function RegisterPage() {
    const [role, setRole] = useState(null);

    return (
        <>
            {role === null && <SelectRole setRole={setRole} />}
            {role === "company" && <RegisterCompanyManager />}
            {role === "guest" && <RegisterGuest />}
        </>
    )
}

function SelectRole({ setRole }) {
    return (
        <main className="bg-default-h-100 d-flex justify-content-center align-items-center">


            <form typeof="submit" className="d-flex flex-column">

                <div className="form-outline mb-4 text-center">
                    <NavLink className="navbar-brand logo-text" to="/">
                        <img src="/img/ikolay-logo-light.svg" alt="ikolay logo" />

                        <span className="text-info">İK</span>olay
                    </NavLink>
                </div>

                <div className="form-outline">
                    <label className="form-label" htmlFor="email">
                        Hangi seçenek sizi daha iyi tanımlıyor?
                    </label>

                </div>
                <select className="form-outline rounded" name="role" id="role" onChange={(e) => setRole(e.target.value)}>
                    <option value="null" defaultValue={null}>Seçiniz</option>
                    <option value="company">Şirket sahibi/yöneticisi</option>
                    <option value="guest">Ziyaretçi</option>
                </select>

            </form>

        </main>
    )

}

function RegisterCompanyManager() {
    const defUser = {

        firstname: "",
        lastname: "",
        password: "",
        passwordControl: "",
        email: "",
        companyName: "",
        taxNo: ""

    }
    const [user, setUser] = useState({ ...defUser });

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setUser({ ...user, role: "MANAGER" });
        console.log(user)
        fetch("http://localhost:80/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        }).then(resp => {
            if (!resp.ok)
                throw new Error("Üzgünüz, bir hata oluştu!");
            return resp.json();
        }).then(data => {
            setUser({ ...defUser })
            console.log(data);
        }).catch(err => console.log(err))
    }

    return (
        <main className="bg-default-h-100 d-flex justify-content-center align-items-center">
            <form typeof="submit" onSubmit={handleSubmit} className="d-flex align-items-center flex-column" >
            <div className="form-outline mb-4 text-center">
                    <NavLink className="navbar-brand logo-text" to="/">
                        <img src="/img/ikolay-logo-light.svg" alt="ikolay logo" />

                        <span className="text-info">İK</span>olay
                    </NavLink>
                </div>

                <label className="form-label" htmlFor="companyName">
                    Şirket Adı
                    <input type="text" id="companyName" name="companyName" className="form-control" onChange={handleChange} value={user.companyName} />
                </label>


                <label className="form-label" htmlFor="taxNo">
                    Vergi No
                    <input className="form-control" id="taxNo" type="number" name="taxNo" value={user.taxNo} onChange={handleChange} />
                </label>


                <label className="form-label" htmlFor="firstname">
                    Yetkili Adı
                    <input className="form-control" id="firstname" type="text" name="firstname" value={user.firstname} onChange={handleChange} />
                </label>



                <label className="form-label" htmlFor="lastname">
                    Yetkili Soyadı
                    <input className="form-control" id="lastname" type="text" name="lastname" value={user.lastname} onChange={handleChange} />
                </label>


                <label className="form-label" htmlFor="email">
                    Şirket Eposta
                    <input className="form-control" value={user.email} id="email" type="email" name="email" onChange={handleChange} />
                </label>


                <label className="form-label" htmlFor="password">
                    Şifre
                    <input className={`${user.password != user.passwordControl && "border-danger"} form-control`} value={user.password} id="password" type="password" name="password" onChange={handleChange} />
                </label>



                <label className="form-label" htmlFor="passwordControl">
                    Şifre Onayı
                    <input className={`${user.password != user.passwordControl && "border-danger"} form-control`} value={user.passwordControl} id="passwordControl" type="password" name="passwordControl" onChange={handleChange} />
                </label>

                <button className="btn btn-info w-100  mb-2" disabled={user.email == "" && true} type="submit">GÖNDER</button>

                <a className="w-100" href="http://localhost:5173/register">
                    <button className="btn btn-secondary w-100" type="button">Vazgeç</button>
                </a>
            </form>
        </main>

    )

}





function RegisterGuest() {
    const defUser = {

        firstname: "",
        lastname: "",
        password: "",
        passwordControl: "",
        email: ""

    }
    const [user, setUser] = useState({ ...defUser });

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setUser({ ...user, role: "VISITOR" });
        console.log(user)
        fetch("http://localhost:80/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        }).then(resp => {
            if (resp.ok)
                setUser({ ...defUser });
            return resp.json();
        }).then(data => console.log(data)).catch(err => console.log(err))

    }

    return (
        <main className="bg-default-h-100 d-flex justify-content-center align-items-center">
            <form typeof="submit" onSubmit={handleSubmit} className="d-flex flex-column justify-content-center align-items-center">
                <NavLink to="/">
                    <div className="text-center mb-4">
                        <a className="navbar-brand logo-text " href="#">
                            <span className="text-info">İK</span>olay Kayıt
                        </a>
                    </div>
                </NavLink>

                <label className="form-label" htmlFor="companyName">
                    Ad
                    <input type="text" id="companyName" name="companyName" className="form-control" onChange={handleChange} value={user.companyName} />
                </label>


                <label className="form-label" htmlFor="taxNo">
                    Soyad
                    <input className="form-control" id="taxNo" type="number" name="taxNo" value={user.taxNo} onChange={handleChange} />
                </label>

                <label className="form-label" htmlFor="email">
                    Eposta
                    <input className="form-control" value={user.email} id="email" type="email" name="email" onChange={handleChange} />
                </label>


                <label className="form-label" htmlFor="password">
                    Şifre
                    <input className={`${user.password != user.passwordControl && "border-danger"} form-control`} value={user.password} id="password" type="password" name="password" onChange={handleChange} />
                </label>



                <label className="form-label" htmlFor="passwordControl">
                    Şifre Onayı
                    <input className={`${user.password != user.passwordControl && "border-danger"} form-control`} value={user.passwordControl} id="passwordControl" type="password" name="passwordControl" onChange={handleChange} />
                </label>


                <button className="btn btn-info w-100  mb-2" disabled={user.email == "" && true} type="submit">GÖNDER</button>

                <a className="w-100" href="http://localhost:5173/register">
                    <button className="btn btn-secondary w-100" type="button">Vazgeç</button>
                </a>

            </form>
        </main>

    )

}