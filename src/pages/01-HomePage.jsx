
import { NavLink } from "react-router-dom";
import AvatarDropdown from "../components/AvatarDropdown";
import { useEffect, useState } from "react";
import CompanyBadge from "../components/CompanyBadge";
import { showErrorMessage } from "../components/InfoMessages";


export default function HomePage() {
    let role = window.localStorage.getItem("role");
    const [companyList, setCompanyList] = useState([])
    if (localStorage.getItem("user") != null) {
        useEffect(() => {
            fetch(`http://localhost/company/findbycompanynametopfive`)
                .then
                (response => {
                    console.log(response);
                    if (!response.ok)
                        throw new Error("Üzgünüz bir hata oluştu!")
                    return response.json();
                }).then(data => {
                    console.log(data);
                    setCompanyList(data);
                }).catch(err => {
                    console.log(err);
                    showErrorMessage(err.message);
                });
        }, [])
    }

    const [backToTopButtonDisplay, setBackToTopButtonDisplay] = useState("d-none")

window.onscroll = function () {
scrollFunction();
};

function scrollFunction() {
if (
document.body.scrollTop > 20 ||
document.documentElement.scrollTop > 20
) {
setBackToTopButtonDisplay("d-block");
} else if(document.body.scrollTop === 0) {
setBackToTopButtonDisplay("d-none");
}
}

function backToTop() {
document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;
}

    return (
        <>
            <HomeHeader role={role} />
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
                {role !== null && companyList.length !== 0 && <Clients companyList={companyList} />}
            </main>
            {
                
            }
            <button className={`${backToTopButtonDisplay} btn btn-danger position-fixed bottom-0 end-0 me-2 mb-2`} onClick={backToTop} ><i class="fas fa-arrow-up"></i></button>
            <HomeFooter />
        </>
    )
}

function HomeHeader({ role }) {

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

                            <RoleButtons />

                        </li>
                    </ul>
                </div>
            </nav>

            <section id="hero" className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <h5>İnsan Kaynakları Yönetimi artık çok kolay!</h5>
                        <h1>Siz de <span className="logo-span logo-text" style={{ fontSize: "1em" }}><span className="text-info logo-text" style={{ fontSize: "1em" }}>İK</span>olay</span> Ailesine Katılın</h1>
                        <p className="lead">Şirketinizin büyümesine destek olmak için buradayız. İnsan kaynakları yönetimini basit ve etkili hale getiren güçlü bir çözüm sunuyoruz. <br /> Personel onboarding, maaş ve ödemeler, vardiyalar ve daha fazlasını kolayca yönetin.</p>
                        {role === null && <NavLink to="/register">
                            <button className="btn btn-info px-4 py-2">Hemen Ücretsiz Kaydol!</button>
                        </NavLink>}
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
    let role = window.localStorage.getItem("role");
    let user = JSON.parse(window.localStorage.getItem("user"))
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
                    <AvatarDropdown userNameTitle={"Admin Adı:"} userEmailTitle={"Admin Email:"} user={user} role={role} />
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
                    <AvatarDropdown userNameTitle={"Personel Adı:"} userEmailTitle={"Personel Email:"} user={user} role={role} />
                </div>
            )


        case "VISITOR":
            return (
                <div className="d-flex justify-content-center gap-1">
                    <AvatarDropdown userNameTitle={"Kullanıcı Adı:"} userEmailTitle={"Kullanıcı Email:"} user={user} role={role} />
                </div>
            )

    }
}

function Clients({ companyList }) {
    return (
        <section id="clients" className="d-flex justify-content-center">
            <div className="d-flex overflow-y-hidden overflow-x-auto justify-content-start gap-1 p-3">
                {companyList.length !== 0 && companyList.map(company => <CarouselCard key={company.companyName} {...company} />)}
            </div>
        </section>
    )
}

function CarouselCard(props) {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:80/comment/findallcommentforguest?companyId=${props.id}`).then(response => {
            console.log(response);
            if (!response.ok)
                throw new Error("Üzgünüz, bir hata oluştu!")
            return response.json()
        }).then(data => {
            console.log(data);
            setReviews(data)
        }).then(error => {
            console.log(error);
            showErrorMessage(error.message);
        });
    }, [])

    return (

        <div className="text-center">
            <button className="border-0 m-0 p-0 rounded" type="button" data-bs-toggle="modal" data-bs-target={`#modal-${props.id}`}>
                <div className="card" style={{ minWidth: "200px", maxWidth: "200px" }}>
                    <div className="bg-light d-flex justify-content-center rounded p-2">
                        <img
                            className="rounded-circle-clients"
                            alt="şirket logosu"
                            src={props.logo}
                        />
                    </div>
                    <div className="card-body">
                        <h4 className="card-title small p-3">{props.companyName}</h4>
                    </div>
                </div>
            </button>
            <div
                className="modal fade bd-example-modal-lg"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="myLargeModalLabel"
                aria-hidden="true"
                id={`modal-${props.id}`}
            >
                <div className="modal-dialog modal-lg bg-default text-def">
                    <CompanyBadge company={{ ...props }} />
                    <section className="bg-default">
                        <div className="container py-5 w-100">
                            <div className="row d-flex justify-content-center">
                                <div className="col-9">
                                    <div className="card">
                                        <div
                                            className="card-header d-flex justify-content-center align-items-center p-3 "
                                            style={{ borderTop: "4px solid #0DCAF0" }}
                                        >
                                            <h5 className="mb-0">Çalışan Değerlendirmeleri</h5>
                                        </div>
                                        <div
                                            className="card-body"
                                            data-mdb-perfect-scrollbar="true"
                                            style={{ position: "relative", }}
                                        >
                                            {
                                                reviews.length == 0 ?
                                                    <div className="card mt-1 bg-dark-subtle">
                                                        <div className="card-body">Henüz Bir Yorum Yapılmadı</div>
                                                    </div>
                                                    :
                                                    <div>
                                                        {reviews.map((review, index) => <EmployeeReviews key={index} {...review} />
                                                        )}
                                                    </div>
                                            }

                                        </div>
                                        <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>


    )
}

function EmployeeReviews({ content }) {
    return (
        <>
            <div className="d-flex justify-content-between">
                <p className="small mb-1"></p>
                <p className="small mb-1 text-muted">23 Ocak 2023</p>
            </div>
            <div className="d-flex flex-row justify-content-start">
                <img
                    src={`https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava${Math.ceil(Math.random() * 6)}-bg.webp`}
                    alt="avatar 1"
                    style={{ width: 45, height: "100%" }}
                />
                <div>
                    <p
                        className="small p-2 ms-3 mb-3 rounded-3"
                        style={{ backgroundColor: "#f5f6f7" }}
                    >
                        {content}
                    </p>
                </div>
            </div>
        </>
    )
}

function HomeFooter() {
    return (
        <footer className="d-flex align-items-center justify-content-center bg-dark">
            <small>© 2022 İKolay, Inc</small>
        </footer>

    )
}
