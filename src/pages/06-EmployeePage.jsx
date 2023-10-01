import { NavLink } from "react-router-dom";
import AvatarDropdown from "../components/AvatarDropdown";
import { useState } from "react";
import DashboardWelcome from "../components/DashboardWelcome";
import CompanyBadge from "../components/CompanyBadge";
import PublicHolidays from "../components/PublicHolidays";



export default function EmployeePage() {
    const [section, setSection] = useState(null);
    const defUser = JSON.parse(window.localStorage.getItem("user"));
    const role = window.localStorage.getItem("role");
    let company = JSON.parse(window.localStorage.getItem("company"));

    const [status, setStatus] = useState(); //success, pending, error
    const defMessage = { userId: defUser.id, companyId: defUser.companyId, content: "" };
    const [message, setMessage] = useState({ ...defMessage })

    const [ariaExpandedLeave, setAriaExpandedLeave] = useState(false);

    function handleMessageChange(e) {
        setMessage({ ...message, [e.target.name]: e.target.value })
    }
    function handleCommentClick(e) {

        fetch(`http://localhost:80/comment/finduserscomment/${defUser.id}`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                if (data.message)
                    throw new Error(data.message)
                setMessage(data)
            }).catch(err => {
                console.log(err);
                setMessage({ ...defMessage })
            })
    }

    function handleSendMessage(e) {
        console.log(message);
        e.preventDefault();
        setStatus("pending")
        fetch("http://localhost:80/comment/addcomment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(message)
        }).then
            (response => {
                console.log(response);
                return response.json();
            }).then(data => {
                console.log(data);
                if (data.hasOwnProperty("field")) {
                    throw new Error(data.message)
                }
                setStatus("success")
            }).catch(err => {
                setStatus("error")
                console.log(err);
            });
    }


    function handleSectionClick(e) {
        e.preventDefault();
        setSection(e.target.name);
    }

    function handleAriaExpandedLeave() {
        if (ariaExpandedLeave === false) {
            setAriaExpandedLeave(true)
        } else {
            setAriaExpandedLeave(false)
        }
    }

    return (
        <main className="row bg-default-h-100 m-0 p-0">
            <div className="d-flex m-0 p-0 " id="myTabContent" >
            <div className="position-fixed end-0 pt-2">
                    <AvatarDropdown userNameTitle={"Personel Adı"} userEmailTitle={"Personel Email"} user={defUser} role={role} setSection={handleSectionClick} />
            </div>
            <div className=" px-2 bg-ikolay-light ikolay-sidebar text-center small" style={{ height: "100%", width: "36%" }}>
            
                <div className="border-bottom border-secondary py-2 mb-1">
                    <NavLink to="/">
                        <img src="/img/ikolay-logo-dark.svg" alt="ikolay logo" />
                    </NavLink>
                    <NavLink to="/employee">
                        <span className="navbar-brand logo-dark-text nav-link-dark">Personel</span>
                    </NavLink>
                </div>
                <CompanyBadge company={company} />
                <button
                    className="btn btn-sm btn-info mb-2 w-100"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#modalRating"
                    onClick={handleCommentClick}
                >
                    Şirket Değerlendir
                </button>

                <section
                    className="modal fade"
                    id="modalRating"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 style={{ color: "black" }} className="modal-title fs-5" id="exampleModalLabel">
                                    Şirket Değerlendir
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">
                                <form typeof="submit" onSubmit={handleSendMessage}>
                                    <div className="border border-warning rounded mb-4 small">
                                        <p style={{ color: "orange" }} className="py-2 mb-0 fw-bold" >
                                            Değerlendirme/Yorum Kuralları
                                        </p>
                                        <ul className="pe-2" style={{ listStyleType: "circle" }}>
                                            <li className="mb-2">Kişisel Bilgilerin Gizliliği:

                                                Çalışanlar, yorumlarında kişisel bilgilerini (örneğin, tam ad, telefon numarası, e-posta adresi) paylaşmamalıdır.</li>
                                            <li className="mb-2">İhlal ve Taciz:

                                                Yorumlar, şirketler veya çalışanlar hakkında tehdit edici, aşağılayıcı, ırkçı, cinsiyetçi, ayrımcı veya saldırgan dil içeremez.</li>
                                            <li className="mb-2">Yorumların Doğruluğu:

                                                Yorumlar, gerçek ve doğru bilgilere dayanmalıdır. Yanıltıcı veya yanıltıcı yorumlar kabul edilmez.</li>
                                            <li className="mb-2">Yorumların İş Odaklı Olması:

                                                Yorumlar, işle ilgili olmalıdır. Şirketin dışındaki kişisel konulara odaklanan yorumlar kabul edilmemelidir.</li>
                                            <li className="mb-2">Öznel İfade:

                                                Yorumlar, kişisel deneyimlere dayalı olmalıdır. Diğer çalışanların deneyimleri ve bakış açılarına saygılı olunmalıdır.</li>
                                            <li className="mb-2">Telif Hakkı ve İçerik Koruması:

                                                Yorumlar, başkalarının telif hakkına tabi materyali izinsiz kullanmamalıdır.</li>
                                            <li className="mb-2">Reklam ve Spam:

                                                Yorumlar, reklam içermemeli veya spam amaçlı olmamalıdır. Reklam veya promosyon yapmak için uygun bir alan sağlanmalıdır.</li>
                                            <li className="mb-2">Moderasyon ve Silme Hakkı:

                                                Site yönetimi, uygunsuz veya kural dışı yorumları silme veya düzenleme hakkına sahiptir. Moderasyon kararlarına saygı gösterilmelidir.</li>
                                            <li className="mb-2">Kimlik Doğrulama ve İzleme:

                                                Yorum yapanların kimliklerini doğrulamak ve gerektiğinde izleme yapmak için gereken önlemleri alabilirsiniz.</li>
                                        </ul>
                                        <p style={{ color: "orange" }}>
                                            Her çalışanın çalıştığı şirkete tek bir yorum yapma hakkı bulunmaktadır. Değerlendirme yaparken yukarıdaki kurallara uyulmazsa yorumunuz şirketin değerlendirme sayfasında yayınlanmayacaktır.
                                        </p>

                                    </div>
                                    <div className="form-group py-3  border-top">
                                        <label htmlFor="content">Yorumunuz</label>
                                        <textarea className="w-100" style={{ minHeight: "150px" }} name="content" id="content" cols="30" rows="10" placeholder="Şirketinizle ilgili düşüncelerinizi giriniz...(Boş bırakılamaz!)" onChange={handleMessageChange} required value={message.content}></textarea>
                                    </div>
                                    <div className={`mb-3 mx-5 rounded ${message.commentType == "REJECTED" && "bg-danger"} ${message.commentType == "PENDING" && "bg-warning"} ${message.commentType == "ACCEPTED" && "bg-success"}`}>
                                        {message.commentType == "PENDING" && <label>Önceki gönderiniz karar aşamasındadır. Yorumunuz onaylanana veya reddedilene kadar yorumunuzu yenileyemezsiniz!</label>}
                                        {message.commentType == "ACCEPTED" && <label>Yorumunuz onaylanmıştır! Yorumunuzu güncelleyebilirsiniz!</label>}
                                        {message.commentType == "REJECTED" && <label >Yorumunuz reddedilmiştir! Lütfen yorumunuzu güncelleyiniz!</label>}
                                        {message.commentType == null && <label>Daha önce yorum yapmadınız!</label>}

                                    </div>
                                    <div className="modal-footer justify-content-between">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-bs-dismiss="modal"
                                        >
                                            Vazgeç
                                        </button>
                                        <button type="submit" data-bs-dismiss="modal"
                                            className={`btn btn-info ${status == "error" && "btn-danger"} ${status == "success" && "btn-success"}`}
                                            disabled={(status == "pending" || message.commentType == "PENDING" || message.content == "") && true}>
                                            Gönder
                                            {status == "pending" && <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>}
                                        </button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </section>

                <ul className="list-unstyled border-top border-secondary d-flex flex-column gap-2 pt-2">
                    <li className="mb-1">
                        <button
                            className="btn align-items-center ikolay-list-item collapsed border-secondary mb-2 w-100"
                            data-bs-toggle="collapse"
                            data-bs-target="#leave-collapse"
                            onClick={handleAriaExpandedLeave}
                        >
                            <span className="btn-toggle-employee me-1" aria-expanded={ariaExpandedLeave}></span>İzin
                        </button>
                        <div className="collapse" id="leave-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 d-flex flex-column gap-2">
                                <li>
                                    <a href="#" className="nav-link-dark" name="public-holidays" onClick={handleSectionClick}>
                                        Resmi Tatiller
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>

                </ul>
            </div>
            <div className="operation-container col d-flex">
                <section className="col-12 d-flex flex-column text-center justify-content-center px-2">
                    {section === null && <DashboardWelcome />}
                    {section === "public-holidays" && <PublicHolidays />}
                    {section === "employee-profile" && <EmployeeProfile />}




                </section>
            </div>
            </div>
        </main>
    )
}

function EmployeeProfile({ setOperation }) {

    let defUser = JSON.parse(window.localStorage.getItem("user"));
    let userShiftDetails = JSON.parse(window.localStorage.getItem("shift"));

    const [user, setUser] = useState({ ...defUser })
    console.log(defUser)

    function handleCancel(e) {
        setUser({ ...defUser })
    }

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function handleSave() {
        fetch("http://localhost:80/user/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        }).then
            (response => {
                console.log(response);
                return response.json();
            }).then(data => {
                console.log(data);
                if (data.message) {

                    throw new Error(data.message)
                }
                localStorage.setItem("user", JSON.stringify(data))
                setUser({ ...data })
            }).catch(err => {
                setUser({ ...defUser })
                console.log(err);
            });
    }

    return (

        <div className="d-flex justify-content-center align-items-center h-100 text-def">
            <div className="card rounded">
                <div className="card-body text-center">
                    <div className="my-1">
                        <img
                            src={defUser.photoUrl}
                            className="rounded-circle img-fluid"
                            style={{ width: 70 }}
                        />
                    </div>
                    <h4 className="p-0">{defUser.firstname} {defUser.lastname}</h4>
                    <div className="d-flex flex-column p-1 m-1 gap-1">
                        <a className="text-muted mb-1 text-decoration-underline" href={`tel:${defUser.phone}`}><i className="fa-solid fa-phone me-1"></i>
                            {defUser.phone == null ? "Belirlenmedi." : defUser.phone}</a>
                        <a href={`mailto:${defUser.email}`} className="text-decoration-underline text-muted"><i className="fa-regular fa-envelope me-1"></i> {defUser.email} </a>
                        <p className="text-muted m-0"><i class="fa-solid fa-location-dot"></i> {defUser.address} </p>
                    </div>
                    <button

                        className="btn btn-info btn-rounded w-100"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#modalEdit"
                    >
                        Profili Düzenle
                    </button>
                    <section
                        className="modal fade"
                        id="modalEdit"
                        tabIndex={-1}
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 style={{ color: "black" }} className="modal-title fs-5" id="exampleModalLabel">
                                        Personel Bilgilerini Düzenle
                                    </h1>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    />
                                </div>
                                <div className="modal-body">
                                    <form typeof="submit">
                                        <div className="form-group">
                                            <label htmlFor="firstname">Ad</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="firstname"
                                                name="firstname"
                                                value={user.firstname}
                                                onChange={handleChange}

                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="lastname">Soyad</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="lastname"
                                                name="lastname"
                                                value={user.lastname}
                                                onChange={handleChange}

                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Kişisel Eposta</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                value={user.email}
                                                onChange={handleChange}

                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone">Telefon</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="phone"
                                                name="phone"
                                                value={user.phone == null ? "Belirlenmedi." : user.phone}
                                                onChange={handleChange}

                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="address">Adres</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="address"
                                                name="address"
                                                value={user.address == null ? "" : user.address}
                                                onChange={handleChange}

                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer justify-content-between">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                        onClick={handleCancel}
                                    >
                                        Vazgeç
                                    </button>
                                    <button type="button" data-bs-dismiss="modal" className="btn btn-outline-info" onClick={handleSave}>
                                        Kaydet
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="d-flex flex-column justify-content-center text-center mt-2 border border-secondary-subtle rounded">
                        <h5 className="border-bottom">Vardiya Bilgileri</h5>
                        <ul className="list-unstyled">
                            <li><span className="fw-bold">Vardiya Adı: </span>{userShiftDetails == undefined ? "TBD" : userShiftDetails.shiftName}</li>
                            <li><span className="fw-bold">Başlangıç Saati: </span>{userShiftDetails == undefined ? "TBD" : userShiftDetails.startTime}</li>
                            <li><span className="fw-bold">Bitiş Saati: </span>{userShiftDetails == undefined ? "TBD" : userShiftDetails.endTime}</li>
                            <li><span className="fw-bold">Mola Hakkı: </span>{userShiftDetails == undefined ? "TBD" : userShiftDetails.breakTime}</li>
                        </ul>
                    </div>
                    <div className="d-flex flex-column justify-content-center text-center mt-2 border border-secondary-subtle rounded">
                        <h5 className="border-bottom">Maaş Bilgisi</h5>
                        <p>{defUser.salary} ₺ / ay</p>
                    </div>
                </div>
            </div>

        </div>




    )
}