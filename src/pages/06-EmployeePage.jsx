import { NavLink } from "react-router-dom";
import AvatarDropdown from "../components/AvatarDropdown";
import { useEffect, useState } from "react";
import DashboardWelcome from "../components/DashboardWelcome";
import CompanyBadge from "../components/CompanyBadge";
import PublicHolidays from "../components/PublicHolidays";
import { showErrorMessage, showInfoMessage, showSuccessMessage } from "../components/InfoMessages";
import { AdvanceRequest, IncomeOutcomeForEmployeeMethod } from "../components/companyPageComponents/06-AddIncomeOutCome";
import { PatternFormat } from "react-number-format";

export default function EmployeePage() {
    const [section, setSection] = useState(null);
    const defUser = JSON.parse(window.localStorage.getItem("user"));
    const role = window.localStorage.getItem("role");
    let company = JSON.parse(window.localStorage.getItem("company"));

    const [status, setStatus] = useState(); //success, pending, error
    const defMessage = { userId: defUser.id, companyId: defUser.companyId, content: "", commentType: "" };
    const [message, setMessage] = useState({ ...defMessage })

    const [ariaExpandedLeave, setAriaExpandedLeave] = useState(false);
    const [ariaExpandedFinance, setAriaExpandedFinance] = useState(false);

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
                { data.commentType == "PENDING" && showInfoMessage("Yorumunuz onay aşamasında. Takipte kalın!") }
                { data.commentType == "ACCEPTED" && showSuccessMessage("Yorumunuz onaylandı! Katkınız ve değerli düşünceleriniz için teşekkür ederiz.") }
                { data.commentType == "REJECTED" && showErrorMessage("Yorumunuz kurallara uymadığı için reddedildi!") }
                { data.commentType === null && showInfoMessage("Henüz yorum yapmadınız!") }
            }).catch(err => {
                console.log(err);
                setMessage({ ...defMessage });
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
                showSuccessMessage("Yorumunuz admin onayına gönderildi!")
            }).catch(err => {
                setStatus("error")
                console.log(err);
                showErrorMessage(err.message);
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

    function handleAriaExpandedFinance() {
        if (ariaExpandedFinance === false) {
            setAriaExpandedFinance(true)
        } else {
            setAriaExpandedFinance(false)
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
                            <span className="navbar-brand logo-dark-text nav-link-dark">Personel</span>
                    </div>
                    <CompanyBadge company={company} />
                    <button
                        className="btn btn-sm btn-info mb-2 w-100"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#modalRating"
                        onClick={handleCommentClick}
                    >
                        <i className="fa-solid fa-award"></i> Şirket Değerlendir
                    </button>

                    <section
                        className="modal fade text-def"
                        id="modalRating"
                        tabIndex={-1}
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">
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
                                        <div className="border border-dark-subtle rounded mb-4 small text-def p-2 shadow">
                                            <p className="py-2 mb-0 fw-bold" >
                                                Değerlendirme/Yorum Kuralları
                                            </p>
                                            <ul className="pe-2 small list-unstyled">
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
                                            <p className="fw-bold">
                                                Her çalışanın çalıştığı şirkete tek bir yorum yapma hakkı bulunmaktadır. Değerlendirme yaparken yukarıdaki kurallara uyulmazsa yorumunuz şirketin değerlendirme sayfasında yayınlanmayacaktır.
                                            </p>

                                        </div>
                                        <div className="form-group py-3 border-top">
                                            <label htmlFor="content">Yorumunuz</label>
                                            <textarea className="w-100 p-2" style={{ minHeight: "150px" }} name="content" id="content" cols="30" rows="10" placeholder="Şirketinizle ilgili düşüncelerinizi giriniz...(Boş bırakılamaz!)" onChange={handleMessageChange} required value={message.content}></textarea>
                                        </div>
                                        <div className={`mb-4 p-2 border mx-auto rounded small ${message.commentType == "REJECTED" && "bg-danger-subtle border-danger"} ${message.commentType == "PENDING" && "bg-warning-subtle border-warning"} ${message.commentType == "ACCEPTED" && "bg-success-subtle border-success"}`}>
                                            {message.commentType == "PENDING" && <label>Önceki gönderiniz karar aşamasındadır. Yorumunuz onaylanana veya reddedilene kadar yorumunuzu yenileyemezsiniz!</label>}
                                            {message.commentType == "ACCEPTED" && <label>Yorumunuz onaylanmıştır! Yorumunuzu güncelleyebilirsiniz!</label>}
                                            {message.commentType == "REJECTED" && <label >Yorumunuz reddedilmiştir! Lütfen yorumunuzu güncelleyiniz!</label>}
                                            {message.commentType === null && <label>Daha önce yorum yapmadınız!</label>}

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
                                <span className="btn-toggle-employee me-1" aria-expanded={ariaExpandedLeave}></span>İK <i className="fa-solid fa-person"></i>
                            </button>
                            <div className="collapse" id="leave-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 d-flex flex-column gap-2">
                                    <li>
                                        <a href="#" className="nav-link-dark" name="leave-request" onClick={handleSectionClick}>
                                            İzin Talebi
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="mb-1">
                            <button
                                className="btn align-items-center ikolay-list-item collapsed border-secondary mb-2 w-100"
                                data-bs-toggle="collapse"
                                data-bs-target="#finance-collapse"
                                onClick={handleAriaExpandedFinance}
                            >
                                <span className="btn-toggle-employee me-1" aria-expanded={ariaExpandedFinance}></span>Finans <i className="fa-solid fa-coins"></i>
                            </button>
                            <div className="collapse" id="finance-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 d-flex flex-column gap-2">
                                    <li>
                                        <a href="#" className="nav-link-dark" name="expense-request" onClick={handleSectionClick}>
                                            Harcama Talebi
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link-dark" name="advance-request" onClick={handleSectionClick}>
                                            Avans Talebi
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
                        {section === "leave-request" && <Leave {...defUser} />}
                        {section === "employee-profile" && <EmployeeProfile />}
                        {section === "expense-request" && <IncomeOutcomeForEmployeeMethod />}
                        {section === "advance-request" && <AdvanceRequest />}
                    </section>
                </div>
            </div>
        </main>
    )
}

function EmployeeProfile() {

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
                    showErrorMessage(data.message);
                    throw new Error(data.message);

                }
                localStorage.setItem("user", JSON.stringify(data))
                setUser({ ...data })
            }).catch(err => {
                setUser({ ...defUser })
                console.log(err);
                showErrorMessage(err.message)
            });
    }

    return (
        <div className="d-flex justify-content-center align-items-center h-100 text-def">
            <div className="bg-light p-4 rounded">
                <div className=" text-center">
                    <div className="my-1">
                        <img
                            src={defUser.photoUrl}
                            className="rounded-circle img-fluid"
                            style={{ width: 70 }}
                        />
                    </div>
                    <h4 className="p-0">{defUser.firstname} {defUser.lastname}</h4>
                    <div className="d-flex flex-column p-1 m-1 gap-1 justify-content-center align-items-center ">
                        <a className="text-muted mb-1 pe-auto" href={`tel:${defUser.phone}`}>
                            <div className="d-flex justify-content-center align-items-center">
                            <i className="fa-solid fa-phone me-1 "></i>
                            <PatternFormat
                                className="border-0 text-decoration-underline w-75"
                                tabIndex="0"
                                id="phone"
                                name="phone"
                                value={defUser.phone == null ? "Belirlenmedi." : defUser.phone}
                                onChange={handleChange}
                                mask="_"
                                allowEmptyFormatting
                                format="+90 (###) ###-####"
                            />
                            </div>
                        </a>
                        <a href={`mailto:${defUser.email}`} className="text-decoration-underline text-muted"><i className="fa-regular fa-envelope me-1"></i> {defUser.email} </a>
                        <p className="text-muted m-0"><i className="fa-solid fa-location-dot"></i> {defUser.address} </p>
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
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">
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
                                            <PatternFormat
                                                className="form-control"
                                                id="phone"
                                                name="phone"
                                                value={user.phone == null ? "Belirlenmedi." : user.phone}
                                                onChange={handleChange}
                                                mask="_"
                                                allowEmptyFormatting
                                                format="+90 (###) ###-####"
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

function Leave({ id, companyId }) {
    const defLeave = { leaveName: "", startingDate: "", duration: "", userId: id, companyId: companyId };
    const [newLeave, setNewLeave] = useState({ ...defLeave });
    const [myRequest, setMyRequest] = useState(null);
    const [leaveList, setLeaveList] = useState([]);
    const user = JSON.parse(window.localStorage.getItem("user"));
    useEffect(() => {
        fetch(`http://localhost:80/leave/getmyleaverequests?companyId=${companyId}&userId=${id}`)
            .then(resp => resp.json())
            .then(data => {
                if (data.message)
                    throw new Error(data.message);
                setMyRequest(data);
                console.log(data);
            })
        fetch(`http://localhost:80/leave/getcompanyleaves?companyId=${user.companyId}`).then(resp => {
            if (!resp.ok)
                throw new Error("Hata initiate");
            return resp.json();
        }).then(data => {
            console.log(data);
            setLeaveList(data);
            console.log(leaveList);
        }).catch(err => console.log(err))
    }, [])

    function handleChange(e) {
        setNewLeave({ ...newLeave, [e.target.name]: e.target.value })
    }

    function handleClick(e) {
        fetch(`http://localhost:80/leave/sendleaverequest`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newLeave)
        }).then(resp => resp.json())
            .then(data => {
                if (data.message)
                    throw new Error(data.message)
                console.log(data);
                setMyRequest([...myRequest, { ...data }])
                setNewLeave({ ...defLeave })
                showSuccessMessage("İzin talebiniz Yöneticinize başarıyla gönderildi!")
                console.log(defLeave);
            }).catch(err=>showErrorMessage(err.message))
    }
    function handleCancel(e) {
        setNewLeave({ ...defLeave })
    }

    return (
        <div className="d-flex flex-column justify-content-center gap-2">
            <section className="d-flex flex-row gap-3">
                <button
                    type="button"
                    className="btn btn-lg btn-info w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#modalLeave"
                >+ İzin Talebi Gir</button>
            </section>
            <section
                className="modal fade text-def"
                id="modalLeave"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 style={{ color: "black" }} className="modal-title fs-5" id="exampleModalLabel">
                                İzin Talebi
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
                                    <label htmlFor="holidayName">Gerekçe</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="holidayName"
                                        name="leaveName"
                                        onChange={handleChange}
                                        value={newLeave.leaveName}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="startDate">Başlangıç Tarihi</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="startDate"
                                        name="startingDate"
                                        onChange={handleChange}
                                        value={newLeave.startingDate}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="duration">Süre</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Gün sayısını giriniz..."
                                        id="duration"
                                        name="duration"
                                        onChange={handleChange}
                                        value={newLeave.duration}
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
                            <button type="button"
                                className="btn btn-info"
                                onClick={handleClick}
                                data-bs-dismiss="modal"
                            >
                                Gönder
                            </button>
                        </div>
                    </div>
                </div>
            </section>


            <PublicHolidays leaveList={leaveList} setLeaveList={setLeaveList} />

            <section className="mb-0 bg-white text-center overflow-y-auto text-def small rounded" style={{ maxHeight: "50%" }}>
                <h1>PERSONELE ÖZEL İZİNLER</h1>
                <table className="table align-middle">
                    <thead className="bg-light">
                        <tr>
                            <th scope="col">Gerekçe</th>
                            <th scope="col">İzin Başlangıç Tarihi</th>
                            <th scope="col">İş günü</th>
                            <th scope="col">Onay durumu</th>
                            <th scope="col">Talep Oluşturulma Tarihi</th>
                            <th scope="col">Vazgeç</th>

                        </tr>
                    </thead>
                    <tbody>
                        {myRequest != null && myRequest.map(request => <MyRequestEmployeeTableRow key={request.id} setMyRequest={setMyRequest} myRequest={myRequest} {...request} />)}
                    </tbody>
                </table>
            </section>
        </div>
    )
}

function MyRequestEmployeeTableRow({ id, leaveName, createDate, duration, startingDate, status, setMyRequest, myRequest }) {

    const date = new Date(createDate);

    const stringDate = date.toISOString().split("T")[0];
    function backgroundFixer(status) {
        switch (status) {
            case "PENDING": return "bg-warning-subtle border-warning"
            case "ACCEPTED": return "bg-success-subtle border-success "
            case "REJECTED": return "bg-danger-subtle border-danger"
            case "CANCELED": return "bg-secondary-subtle border-secondary"
        }
    }

    function handleEnglish(status) {
        switch (status) {
            case "PENDING": return "Beklemede"
            case "ACCEPTED": return "Onaylandı"
            case "REJECTED": return "Reddedildi"
            case "CANCELED": return "İptal Edildi"
        }
    }

    function handleClick(e) {
        fetch(`http://localhost:80/leave/cancelleave/${id}`).then(resp => resp.json())
            .then(data => {
                if (data.message)
                    throw new Error(data.message)
                setMyRequest([...myRequest.map(req => {
                    if (req.id == id)
                        return { ...data }
                    return req
                })])
            })
    }


    return (<>

        <tr>
            <td>{leaveName}</td>
            <td>{startingDate}</td>
            <td>{duration}</td>
            <td><span className={`border p-2 rounded text-def ${backgroundFixer(status)}`}>{handleEnglish(status)}</span></td>
            <td>{stringDate}</td>
            <td><button type="button"
                className="btn btn-outline-danger"
                disabled={status != "PENDING" ? true : false}
                onClick={handleClick}
            >İptal Et</button></td>
        </tr>

    </>
    )
}