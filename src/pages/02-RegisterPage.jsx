import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FormValidationMessage, showErrorMessage, showSuccessMessage } from "../components/InfoMessages";

export default function RegisterPage() {
    const [role, setRole] = useState(null);

    return (
        <>
            {role === null && <SelectRole setRole={setRole} />}
            {role === "company" && <Pricing />}
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
                        <span className="text-info logo-text">İK</span>olay
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

function Pricing() {
    return (
        <main className="d-flex  flex-column bg-default-h-100 justify-content-center">
            <div className="d-flex flex-column justify-content-center align-items-center text-center">
                <NavLink className="navbar-brand logo-text" to="/">
                    <img src="/img/ikolay-logo-light.svg" alt="ikolay logo" />
                    <span className="text-info logo-text">İK</span>olay
                </NavLink>
                <h1 className="pt-0">Fiyatlandırma</h1>
                <h2>İnsan Kaynakları Yönetimi Artık Daha Kolay ve Erişilebilir!<br></br>
                    <span className="text-info">İlk Bir Ay Ücretsiz Üyelikle Başlayın:</span>
                </h2>
            </div>

            <div className="d-flex text-def text-center gap-2 justify-content-center">
                <div className="bg-light card col-3">
                    <div className="card-header m-0 p-0">
                        <h4>Bronz</h4>
                    </div>
                    <div className="card-body m-1 p-2 d-flex flex-column justify-content-around align-items-center">
                        <h2 className="card-title">
                            500 ₺ <small className="text-muted">/ ay</small>
                        </h2>
                        <p className="small text-muted">
                            Hesabınıza <span className="fw-bold">tek seferlik 1 aylık kullanım</span> tanımlayın. İKolay'ın sınırsız kolaylıklar dünyasına ilk adımı atın. Paket süreniz dolmadan hesabınız üzerinden paketinizi yenilemek için bildirim alın.
                        </p>
                        <button
                            type="button"
                            className="btn btn-lg btn-info"
                        >
                            Seç
                        </button>
                    </div>
                </div>
                
                <div className="bg-light card col-3 ">
                {/* {(screen.width < 375) && <p className="small bg-warning-subtle text-warning p-0 m-0 rounded fw-bold">En Popüler!</p>} */}
                    <div className="card-header m-0 p-0">
                    <div className="ribbon "><span>En Popüler!</span></div>
                        <h4>Gümüş</h4>
                    </div>
                    <div className="card-body m-1 p-2 d-flex flex-column justify-content-around align-items-center">
                        <h2 className="card-title">
                        450 ₺ <small className="text-muted">/ ay</small>
                        </h2>
                        <p className="small text-muted">
                        <span className="fw-bold">3 aylık kullanım süresi</span>ni hesabınıza tek seferde tanımlayın, hizmetlerimizi test edin. 3 ay sonunda ihtiyaçlarınıza göre dilerseniz yıllık paketimizle, dilerseniz aynı paketle İKolaylamaya devam edin!
                        </p>
                        <button
                            type="button"
                            className="btn btn-lg btn-info"
                        >
                            Seç
                        </button>
                    </div>
                </div>
                <div className="bg-light card col-3">
                    <div className="card-header m-0 p-0">
                        <h4>Altın</h4>
                    </div>
                    <div className="card-body m-1 p-2 d-flex flex-column justify-content-around align-items-center">
                        <h2 className="card-title">
                        400 ₺ <small className="text-muted">/ ay</small>
                        </h2>
                        <p className="small text-muted">
                        <span className="fw-bold">Bir yıl boyunca</span>, paket yenileme derdi olmadan sınırsız İKolaylayın, işletmenizin bütün İK süreçlerini tek platformdan yürütün! Yıl sonunda paketiniz dolmadan hesabınız üzerinden paketinizi yenilemek için bildirim alın.
                        </p>
                        <button
                            type="button"
                            className="btn btn-lg btn-info"
                        >
                            Seç
                        </button>
                    </div>
                </div>
            </div>

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
        const saveManager = { ...user, role: "MANAGER" }
        setUser(saveManager);
        //POST METHODLARINDA PORT BİLGİSİ BELLİ EDİLMELİDİR VEYA localhost yerine 127.0.0.1 tercih edilmelidir !! Yoksa resp ve data 405 hatası döndürür !!
        fetch("http://localhost:80/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(saveManager)
        }).then(resp => {
            if (resp.ok)
                setUser({ ...defUser })
            return resp.json();
        }).then(data => {
            if (data.message === "Email Adresi Zaten Mevcut.") {
                console.log(data);
                showErrorMessage(data.message)
            } else {
                console.log(data);
                showSuccessMessage(data.message)
            }
        }).catch(err => {
            console.log(err);
            showErrorMessage(err.message)
        })
    }

    return (
        <main className="bg-default-h-100 d-flex justify-content-center align-items-center">
            <form typeof="submit" onSubmit={handleSubmit} className="d-flex align-items-center flex-column justify-content-center" >
                <div className="form-outline mb-2 text-center">
                    <NavLink className="navbar-brand logo-text" to="/">
                        <img src="/img/ikolay-logo-light.svg" alt="ikolay logo" />
                        <span className="text-info logo-text">İK</span>olay
                    </NavLink>
                </div>

                <label className="form-label" htmlFor="companyName">
                    Şirket Adı
                    <input type="text" id="companyName" name="companyName" className="form-control" onChange={handleChange} value={user.companyName} required onInvalid={e => e.target.setCustomValidity('Şirket Adı boş olamaz!')}
                        onInput={e => e.target.setCustomValidity('')} />
                </label>

                <label className="form-label w-100" htmlFor="taxNo">
                    Vergi No
                    <input className="form-control" value={user.taxNo} id="taxNo" type="number" name="taxNo" onChange={handleChange} max="9999999999" min="1000000000" onInvalid={e => e.target.setCustomValidity('Vergi no 10 haneli olmalıdır.')} onInput={e => e.target.setCustomValidity('')} required />
                </label>

                <label className="form-label" htmlFor="firstname">
                    Yetkili Adı
                    <input className="form-control" value={user.firstname} id="firstname" type="text" name="firstname" onChange={handleChange} required onInvalid={e => e.target.setCustomValidity('Yetkili Adı boş olamaz!')}
                        onInput={e => e.target.setCustomValidity('')} />
                </label>

                <label className="form-label " htmlFor="lastname">
                    Yetkili Soyadı
                    <input className="form-control" value={user.lastname} id="lastname" type="text" name="lastname" onChange={handleChange} required onInvalid={e => e.target.setCustomValidity('Yetkili Soyadı boş olamaz!')}
                        onInput={e => e.target.setCustomValidity('')} />
                </label>

                <label className="form-label" htmlFor="email">
                    Şirket Eposta
                    <input className="form-control" value={user.email} id="email" type="email" name="email" onChange={handleChange} required onInvalid={(e) => {
                        if (e.target.value == "") {
                            e.target.setCustomValidity('Eposta boş olamaz!')
                        } else {
                            e.target.setCustomValidity('Eposta @ içermeli! Örnek: ornek@ornek.com')
                        }
                    }}
                        onInput={e => e.target.setCustomValidity('')} title="Eposta @ içermeli! Örnek: ornek@ornek.com" />
                </label>

                <label className="form-label" htmlFor="password">
                    Şifre
                    <input className={`${user.password != user.passwordControl && "border-danger"} form-control`} value={user.password} id="password" type="password" name="password" onChange={handleChange} onInput={e => e.target.setCustomValidity('')} onInvalid={e => e.target.setCustomValidity("Şifre en az 6 karakterden oluşmalıdır")} minLength="6" required />
                </label>

                <label className="form-label" htmlFor="passwordControl">
                    Şifre Onayı
                    <input className={`${user.password != user.passwordControl && "border-danger"} form-control`} value={user.passwordControl} id="passwordControl" type="password" name="passwordControl" onChange={handleChange} required />
                </label>

                <div className="w-100 text-center">
                    {user.password != user.passwordControl && <FormValidationMessage message="Şifreler uyuşmuyor!" />}
                </div>

                <div className="d-flex justify-content-between w-100 gap-1">
                    <a className="w-100 d-flex pb-2 pt-0" href="http://localhost:5173/register">
                        <button className=" btn btn-secondary w-100" type="button">Vazgeç</button>
                    </a>
                    <button className=" btn btn-info mb-2 w-100 " disabled={user.password != user.passwordControl && true} type="submit">GÖNDER</button>
                </div>
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
        const saveVisitor = { ...user, role: "VISITOR" }
        setUser(saveVisitor);
        console.log(user)
        fetch("http://localhost:80/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(saveVisitor)
        }).then(resp => {
            if (resp.ok)
                setUser({ ...defUser });
            return resp.json();
        }).then(data => {
            if (data.message === "Email Adresi Zaten Mevcut.") {
                console.log(data);
                showErrorMessage(data.message)
            } else {
                console.log(data);
                showSuccessMessage(data.message)
            }
        }).catch(err => {
            console.log(err);
            showErrorMessage(err.message)
        })
    }

    return (
        <main className="bg-default-h-100 d-flex justify-content-center align-items-center">
            <form typeof="submit" onSubmit={handleSubmit} className="d-flex flex-column justify-content-center align-items-center">
                <NavLink className="navbar-brand logo-text" to="/">
                    <img src="/img/ikolay-logo-light.svg" alt="ikolay logo" />

                    <span className="text-info logo-text">İK</span>olay
                </NavLink>

                <label className="form-label" htmlFor="companyName">
                    Ad
                    <input className="form-control" id="firstname" type="text" value={user.firstname} name="firstname" onChange={handleChange} required onInvalid={e => e.target.setCustomValidity('Ad boş olamaz!')} onInput={e => e.target.setCustomValidity('')} />
                </label>

                <label className="form-label" htmlFor="taxNo">
                    Soyad
                    <input className="form-control" id="lastname" type="text" value={user.lastname} name="lastname" onChange={handleChange} required onInvalid={e => e.target.setCustomValidity('Soyad boş olamaz!')} onInput={e => e.target.setCustomValidity('')} />
                </label>

                <label className="form-label" htmlFor="email">
                    Eposta
                    <input className="form-control" id="email" type="email" value={user.email} name="email" onChange={handleChange} required onInvalid={(e) => {
                        if (e.target.value == "") {
                            e.target.setCustomValidity('Eposta boş olamaz!')
                        } else {
                            e.target.setCustomValidity('Eposta @ içermeli! Örnek: ornek@ornek.com')
                        }
                    }}
                        onInput={e => e.target.setCustomValidity('')} title="Eposta @ içermeli! Örnek: ornek@ornek.com" />
                </label>

                <label className="form-label" htmlFor="password">
                    Şifre
                    <input className={`${user.password != user.passwordControl && "border-danger"} form-control`} id="password" value={user.password} type="password" name="password" onChange={handleChange} onInput={e => e.target.setCustomValidity('')} onInvalid={e => e.target.setCustomValidity("Şifre en az 6 karakterden oluşmalıdır")} minLength="6" required />
                </label>

                <label className="form-label" htmlFor="passwordControl">
                    Şifre Onayı
                    <input className={`${user.password != user.passwordControl && "border-danger"} form-control`} id="passwordControl" value={user.passwordControl} type="password" name="passwordControl" onChange={handleChange} required />
                </label>

                <div className="w-100 text-center">
                    {user.password != user.passwordControl && <FormValidationMessage message="Şifreler uyuşmuyor!" />}
                </div>

                <div className="d-flex justify-content-between w-100 gap-1">
                    <a className="w-100 d-flex pb-2 pt-0" href="http://localhost:5173/register">
                        <button className=" btn btn-secondary w-100" type="button">Vazgeç</button>
                    </a>
                    <button className=" btn btn-info mb-2 w-100 " disabled={user.email == "" && true} type="submit">GÖNDER</button>
                </div>
            </form>
        </main>
    )
}