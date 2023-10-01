import { createContext, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import AvatarDropdown from "../components/AvatarDropdown";

const UserContext = createContext(null);
const RoleContext = createContext(null);

export default function HomePage() {

    return (
        <>
            <HomeHeader />
            <main className="bg-dark-subtle">
                <section id="about" className="container w-100">
                    <div className="d-flex flex-column justify-content-center align-items-center text-center p-4">
                        <div>
                            <h2>Hakkımızda</h2>
                            <p>
                                2023 yılında kurulan şirketimiz, dinamik ve genç bir ekip tarafından yönetilmektedir ve insan kaynakları yönetimi alanında tutkulu bir misyona sahiptir. İş dünyasının dönüşen ihtiyaçlarına yanıt vermek ve şirketlerin insan kaynakları süreçlerini optimize etmek için özel olarak tasarlanmış çözümler sunuyoruz.
                            </p>
                            <h3>İnsan Kaynakları Odaklılık</h3>
                            <p>Biz, insan kaynakları yönetimini kolaylaştırmak ve işverenlerin ve çalışanların en büyük potansiyellerine ulaşmalarını sağlamak için buradayız. HRMS (Human Resource Management System) çözümlerimiz, personel onboarding, maaş - gelir/gider yönetimi, vardiya yönetimi gibi kritik insan kaynakları süreçlerini optimize etmenize yardımcı olur.</p>
                        </div>

                        <div >
                            <h3>Vizyonumuz</h3>
                            <p>
                                Geleceği şekillendirmek için yenilikçi çözümler sunarak dünya genelinde bir iz bırakmayı hedefliyoruz. Şirketimizin temel ilkesi, iş dünyasının ihtiyaçlarına duyarlı bir şekilde yaklaşmak ve müşterilerimizin başarısını desteklemektir. Vizyonumuz, şirketlerin çalışanlarına odaklanmalarını ve insan kaynakları yönetimini bir avantaj olarak kullanmalarını teşvik etmektir. Şirketlerimizin başarılarını artırmak için insan kaynakları süreçlerini daha verimli ve etkili hale getirerek iş dünyasına değer katmayı amaçlıyoruz.</p>
                        </div>


                        <div>
                            <h3>Değerlerimiz</h3>
                            <ul className="list-unstyled">
                                <li>
                                    <b>İnsan Odaklılık:</b> Çalışanlarımızın ve müşterilerimizin ihtiyaçlarını anlamak ve onlara destek olmak bizim önceliğimizdir.
                                </li>
                                <li>
                                    <b>İnovasyon:</b> İş dünyasındaki gelişmeleri yakından takip ederek en yeni teknolojileri ve çözümleri sunarız.
                                </li>
                                <li>
                                    <b>İşbirliği:</b> Müşterilerimizle yakın işbirliği içinde çalışarak ortak hedeflere ulaşırız.
                                </li>
                                <li>
                                    <b>Şeffaflık ve Güvenilirlik:</b> Her zaman şeffaf ve güvenilir bir şekilde çalışırız, müşteri verilerini gizli tutarız.
                                </li>
                            </ul>
                            <p>Biz, işletmelerin insan kaynakları yönetimini basit, etkili ve insan odaklı bir şekilde yönlendirmelerine yardımcı olmayı hedefliyoruz. Gelecekte sizi ve şirketinizi daha fazla büyüme ve başarı bekliyor. İnsan kaynakları yönetimini yeniden tanımlamaya hazır mısınız?</p>
                        </div>
                    </div>
                </section>

                <section id="services">
                    <div className="container text-center">
                        <div className="row">
                            <h2>Hizmetlerimiz</h2>
                        </div>

                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-3">
                                <ul className="list-unstyled text-center">
                                    <li>
                                        <img src="/img/icons/onboarding.svg" alt="el sıkışma ikon" />
                                        PERSONEL ONBOARDING
                                    </li>
                                    <li>
                                        <img src="/img/icons/management.svg" alt="üç çalışan ikon" />
                                        PERSONEL YÖNETİMİ
                                    </li>
                                    <li className="p-0">
                                        <img src="/img/icons/wage.svg" alt="para veren el ikon" />
                                        MAAŞ VE ÜCRET YÖNETİMİ
                                    </li>
                                </ul>
                            </div>

                            <div className="col-md-3">
                                <ul className="list-unstyled text-center">
                                    <li>
                                        <img src="/img/icons/shift.svg" alt="yer değiştiren insanlar ikon" />
                                        VARDİYA YÖNETİMİ
                                    </li>
                                    <li>
                                        <img src="/img/icons/rating.svg" alt="başarı kurdelesi uken" />
                                        ŞİRKET DEĞERLENDİRME
                                    </li>
                                    <li className="p-0">
                                        <img src="/img/icons/support.svg" alt="destek temsilcisi ikon" />
                                        7/24 DESTEK
                                    </li>
                                </ul>
                            </div>

                            <div className="col-md-3"></div>
                        </div>
                    </div>
                </section>
                {role !== null && <Clients />}
            </main>
            <HomeFooter />
        </>
    )
}

function HomeHeader() {
    let user = JSON.parse(window.localStorage.getItem("user"))
    let role = window.localStorage.getItem("role");
    return (
        <header className="container-fluid px-5 text-center">
            <nav className="navbar navbar-expand-lg ">
                <NavLink className="navbar-brand logo-text nav-link" to="/">
                    <img src="/img/ikolay-logo-light.svg" alt="ikolay logo" />
                    <span className="text-info logo-text">İK</span>olay
                </NavLink>

                <button
                    className="navbar-toggler"
                    type="button "
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="me-auto"></div>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Ana Sayfa
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#about">
                                Hakkımızda
                            </a>
                        </li>

                        <li className="nav-item border-end">
                            <a className="nav-link" href="#services">
                                Hizmetlerimiz
                            </a>
                        </li>

                        <li className="nav-item">
                            <RoleContext.Provider value={role}>
                                <UserContext.Provider value={user}>
                                    <RoleButtons />
                                </UserContext.Provider>
                            </RoleContext.Provider>
                        </li>
                    </ul>
                </div>
            </nav>

            <section id="hero" className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <h5>İnsan Kaynakları Yönetimi artık çok kolay!</h5>
                        <h1>Siz de <span className="logo-span"><span className="text-info logo-text">İK</span>olay</span> Ailesine Katılın</h1>
                        <p className="lead">Şirketinizin büyümesine destek olmak için buradayız. İnsan kaynakları yönetimini basit ve etkili hale getiren güçlü bir çözüm sunuyoruz. <br /> Personel onboarding, maaş ve ödemeler, vardiyalar ve daha fazlasını kolayca yönetin.</p>
                        <NavLink to="/register">
                            <button className="btn btn-info px-4 py-2">Hemen Ücretsiz Kaydol!</button>
                        </NavLink>
                    </div>

                    <div className="col-md-6 col-sm-12 h-25">
                        <img src="/img/hero-img.svg" alt="mutlu çalışanlar illüstrasyon" />
                    </div>
                </div>
            </section>
        </header>
    )
}

function RoleButtons() {
    switch (role) {
        case null:
            return (
                <div className="d-flex justify-content-center gap-1">
                    <li className="nav-item">
                        <NavLink to="/login" className="nav-link text-decoration-underline">Giriş</NavLink>
                    </li>
                    <li>
                        <NavLink to="/register">
                            <button type="button" className="btn btn-info">Kayıt</button>
                        </NavLink>
                    </li>
                </div>
            )

        case "ADMIN":
            return (
                <div className="d-flex justify-content-center gap-1">
                    <li className="nav-item">
                        <NavLink to="/admin" className="nav-link text-decoration-underline">Admin</NavLink>
                    </li>
                    <li>
                        <AvatarDropdown userNameTitle={"Admin Adı:"} userEmailTitle={"Admin Email:"} user={user} role={role} />
                    </li>
                </div>
            )

        case "MANAGER":
            return (
                <div className="d-flex justify-content-center gap-1">

                    <AvatarDropdown userNameTitle={"Yönetici Adı:"} userEmailTitle={"Yönetici Email:"} user={user} role={role} />

                </div>
            )


        case "EMPLOYEE":
            return (
                <div className="d-flex justify-content-center gap-1">
                    <li className="nav-item">
                        <NavLink to="/employee" className="nav-link text-decoration-underline">Personel</NavLink>
                    </li>
                    <li>
                        <AvatarDropdown userNameTitle={"Personel Adı:"} userEmailTitle={"Personel Email:"} user={user} role={role} />
                    </li>
                </div>
            )


        case "VISITOR":
            return (
                <div className="d-flex justify-content-center gap-1">
                    <li>
                        <AvatarDropdown userNameTitle={"Kullanıcı Adı:"} userEmailTitle={"Kullanıcı Email:"} user={user} role={role} />
                    </li>
                </div>
            )

    }
}

function Clients() {
    return (
        <section id="clients">
            <section className=" text-def text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="text-def">Müşterilerimiz</h2>
                        </div>

                        <form className="d-flex col-12 form-inline mb-3">
                            <input
                                className="form-control me-1"
                                type="search"
                                placeholder="Şirket ara..."
                                aria-label="Search"
                            />
                            <button className="btn btn-info my-2 my-sm-0" type="submit">
                                Ara
                            </button>
                        </form>

                        <div className="col-4"></div>

                        <div className="col-12">
                            <div
                                id="carouselExampleIndicators"
                                className="carousel slide"
                                data-bs-ride="carousel"
                            >
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <div className="row">
                                            <div className="col-md-4 mb-3">
                                                <div className="card">
                                                    <div className="bg-light d-flex justify-content-center rounded">
                                                        <img
                                                            className="w-50 rounded-circle py-4"
                                                            alt="100%x280"
                                                            src="https://media.istockphoto.com/id/1281009425/vector/three-elements-triangle-symbol-abstract-business-logotype.jpg?s=612x612&w=0&k=20&c=CyXS_u8bP7T4V-fh_bmj0pm360JU3LrC9CG3mdpq87M="
                                                        />
                                                    </div>
                                                    <div className="card-body">
                                                        <h4 className="card-title">Company Name</h4>
                                                        <p className="card-text">
                                                            Company About
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="col-md-4 mb-3">
                                                <div className="card">
                                                    <div className="bg-light d-flex justify-content-center rounded">
                                                        <img
                                                            className="w-50 rounded-circle py-4"
                                                            alt="100%x280"
                                                            src="https://media.istockphoto.com/id/1281009425/vector/three-elements-triangle-symbol-abstract-business-logotype.jpg?s=612x612&w=0&k=20&c=CyXS_u8bP7T4V-fh_bmj0pm360JU3LrC9CG3mdpq87M="
                                                        />
                                                    </div>
                                                    <div className="card-body">
                                                        <h4 className="card-title">Company Name</h4>
                                                        <p className="card-text">
                                                            Company About
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="col-md-4 mb-3">
                                                <div className="card">
                                                    <div className="bg-light d-flex justify-content-center rounded">
                                                        <img
                                                            className="w-50 rounded-circle py-4"
                                                            alt="100%x280"
                                                            src="https://media.istockphoto.com/id/1281009425/vector/three-elements-triangle-symbol-abstract-business-logotype.jpg?s=612x612&w=0&k=20&c=CyXS_u8bP7T4V-fh_bmj0pm360JU3LrC9CG3mdpq87M="
                                                        />
                                                    </div>
                                                    <div className="card-body">
                                                        <h4 className="card-title">Company Name</h4>
                                                        <p className="card-text">
                                                            Company About
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="carousel-item">
                                        <div className="row">
                                            <div className="col-md-4 mb-3">
                                                <div className="card">
                                                    <div className="bg-light d-flex justify-content-center rounded">
                                                        <img
                                                            className="w-50 rounded-circle py-4"
                                                            alt="100%x280"
                                                            src="https://media.istockphoto.com/id/1281009425/vector/three-elements-triangle-symbol-abstract-business-logotype.jpg?s=612x612&w=0&k=20&c=CyXS_u8bP7T4V-fh_bmj0pm360JU3LrC9CG3mdpq87M="
                                                        />
                                                    </div>
                                                    <div className="card-body">
                                                        <h4 className="card-title">Company Name</h4>
                                                        <p className="card-text">
                                                            Company About
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="col-md-4 mb-3">
                                                <div className="card">
                                                    <div className="bg-light d-flex justify-content-center rounded">
                                                        <img
                                                            className="w-50 rounded-circle py-4"
                                                            alt="100%x280"
                                                            src="https://media.istockphoto.com/id/1281009425/vector/three-elements-triangle-symbol-abstract-business-logotype.jpg?s=612x612&w=0&k=20&c=CyXS_u8bP7T4V-fh_bmj0pm360JU3LrC9CG3mdpq87M="
                                                        />
                                                    </div>
                                                    <div className="card-body">
                                                        <h4 className="card-title">Company Name</h4>
                                                        <p className="card-text">
                                                            Company About
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                           
                                            <div className="col-md-4 mb-3">
                                                <div className="card">
                                                    <div className="bg-light d-flex justify-content-center rounded">
                                                        <img
                                                            className="w-50 rounded-circle py-4"
                                                            alt="100%x280"
                                                            src="https://media.istockphoto.com/id/1281009425/vector/three-elements-triangle-symbol-abstract-business-logotype.jpg?s=612x612&w=0&k=20&c=CyXS_u8bP7T4V-fh_bmj0pm360JU3LrC9CG3mdpq87M="
                                                        />
                                                    </div>
                                                    <div className="card-body">
                                                        <h4 className="card-title">Company Name</h4>
                                                        <p className="card-text">
                                                            Company About
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="carousel-item">
                                        <div className="row">
                                            <div className="col-md-4 mb-3">
                                                <div className="card">
                                                    <div className="bg-light d-flex justify-content-center rounded">
                                                        <img
                                                            className="w-50 rounded-circle py-4"
                                                            alt="100%x280"
                                                            src="https://media.istockphoto.com/id/1281009425/vector/three-elements-triangle-symbol-abstract-business-logotype.jpg?s=612x612&w=0&k=20&c=CyXS_u8bP7T4V-fh_bmj0pm360JU3LrC9CG3mdpq87M="
                                                        />
                                                    </div>
                                                    <div className="card-body">
                                                        <h4 className="card-title">Company Name</h4>
                                                        <p className="card-text">
                                                            Company About
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="col-md-4 mb-3">
                                                <div className="card">
                                                    <div className="bg-light d-flex justify-content-center rounded">
                                                        <img
                                                            className="w-50 rounded-circle py-4"
                                                            alt="100%x280"
                                                            src="https://media.istockphoto.com/id/1281009425/vector/three-elements-triangle-symbol-abstract-business-logotype.jpg?s=612x612&w=0&k=20&c=CyXS_u8bP7T4V-fh_bmj0pm360JU3LrC9CG3mdpq87M="
                                                        />
                                                    </div>
                                                    <div className="card-body">
                                                        <h4 className="card-title">Company Name</h4>
                                                        <p className="card-text">
                                                            Company About
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="col-md-4 mb-3">
                                                <div className="card">
                                                    <div className="bg-light d-flex justify-content-center rounded">
                                                        <img
                                                            className="w-50 rounded-circle py-4"
                                                            alt="100%x280"
                                                            src="https://media.istockphoto.com/id/1281009425/vector/three-elements-triangle-symbol-abstract-business-logotype.jpg?s=612x612&w=0&k=20&c=CyXS_u8bP7T4V-fh_bmj0pm360JU3LrC9CG3mdpq87M="
                                                        />
                                                    </div>
                                                    <div className="card-body">
                                                        <h4 className="card-title">Company Name</h4>
                                                        <p className="card-text">
                                                            Company About
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-12 text-center mt-2">
                        <button
                            className="btn btn-secondary me-5"
                            href="#carouselExampleIndicators"
                            role="button"
                            data-bs-slide="prev"
                        >
                            <i className="fa fa-arrow-left" />
                        </button>
                        <button
                            className="btn btn-secondary "
                            href="#carouselExampleIndicators"
                            role="button"
                            data-bs-slide="next"
                        >
                            <i className="fa fa-arrow-right" />
                        </button>
                    </div>
                </div>
            </section>
        </section>
    )
}

function HomeFooter() {
    return (
        <footer className="d-flex align-items-center justify-content-center bg-dark">
            <small>© 2022 İKolay, Inc</small>
        </footer>

    )
}
