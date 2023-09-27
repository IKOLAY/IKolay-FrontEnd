import { NavLink } from "react-router-dom";

export default function HomePage() {

    return (
        <>
            <HomeHeader />
            <main className="bg-dark-subtle">
                <section id="about" className="container w-100">

                    <div className="d-flex flex-column justify-content-center align-items-center text-center p-4 text-def">

                        <div>
                            <h2>Hakkımızda</h2>
                            <p>
                                2023 yılında kurulan şirketimiz, dinamik ve genç bir ekip tarafından yönetilmektedir ve insan kaynakları yönetimi alanında tutkulu bir misyona sahiptir. İş dünyasının dönüşen ihtiyaçlarına yanıt vermek ve şirketlerin insan kaynakları süreçlerini optimize etmek için özel olarak tasarlanmış çözümler sunuyoruz.
                            </p>
                            <h4>İnsan Kaynakları Odaklılık</h4>
                            <p>Biz, insan kaynakları yönetimini kolaylaştırmak ve işverenlerin ve çalışanların en büyük potansiyellerine ulaşmalarını sağlamak için buradayız. HRMS (Human Resource Management System) çözümlerimiz, personel onboarding, maaş - gelir/gider yönetimi, vardiya yönetimi gibi kritik insan kaynakları süreçlerini optimize etmenize yardımcı olur.</p>
                        </div>

                        <div >
                            <h2>Vizyonumuz</h2>
                            <p>
                                Geleceği şekillendirmek için yenilikçi çözümler sunarak dünya genelinde bir iz bırakmayı hedefliyoruz. Şirketimizin temel ilkesi, iş dünyasının ihtiyaçlarına duyarlı bir şekilde yaklaşmak ve müşterilerimizin başarısını desteklemektir. Vizyonumuz, şirketlerin çalışanlarına odaklanmalarını ve insan kaynakları yönetimini bir avantaj olarak kullanmalarını teşvik etmektir. Şirketlerimizin başarılarını artırmak için insan kaynakları süreçlerini daha verimli ve etkili hale getirerek iş dünyasına değer katmayı amaçlıyoruz.</p>
                        </div>


                        <div>
                            <h2>Değerlerimiz</h2>
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
                                        <img src="/img/icons/onboarding.svg" alt="el sıkışma ikonu" />
                                        PERSONEL ONBOARDING
                                    </li>
                                    <li>
                                        <img src="/img/icons/management.svg" alt="el sıkışma ikonu" />
                                        PERSONEL YÖNETİMİ
                                    </li>
                                    <li className="p-0">
                                        <img src="/img/icons/wage.svg" alt="el sıkışma ikonu" />
                                        MAAŞ VE ÜCRET YÖNETİMİ
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <ul className="list-unstyled text-center">
                                    <li>
                                        <img src="/img/icons/shift.svg" alt="el sıkışma ikonu" />
                                        VARDİYA YÖNETİMİ
                                    </li>
                                    <li>
                                        <img src="/img/icons/rating.svg" alt="el sıkışma ikonu" />
                                        ŞİRKET DEĞERLENDİRME
                                    </li>
                                    <li className="p-0">
                                        <img src="/img/icons/support.svg" alt="el sıkışma ikonu" />
                                        7/24 DESTEK
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-3"></div>
                        </div>
                    </div>
                </section>
            </main>
            <HomeFooter />

        </>
    )
}

function HomeHeader() {
    return (
        <header className="container-fluid px-5 text-center">
            <nav className="navbar navbar-expand-lg">
                <NavLink className="navbar-brand logo-text" to="/">
                    <img src="/img/ikolay-logo-light.svg" alt="ikolay logo" />

                    <span className="text-info">İK</span>olay
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
                    <ul className="navbar-nav mr-auto">
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
                            <NavLink to="/login" className="nav-link text-decoration-underline">Giriş</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register">
                                <button type="button" className="btn btn-info">Kayıt</button>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            <section id="hero" className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <h5>İnsan Kaynakları Yönetimi artık çok kolay!</h5>
                        <h1>Siz de <span className="logo-span"><span className="text-info">İK</span>olay</span> Ailesine Katılın</h1>
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

function HomeFooter() {
    return (
        <footer className="d-flex align-items-center justify-content-center bg-dark-subtle">
            <small>© 2022 İKolay, Inc</small>
        </footer>

    )
}
