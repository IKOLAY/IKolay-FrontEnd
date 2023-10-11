import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import DashboardWelcome from "../components/DashboardWelcome";
import AvatarDropdown from "../components/AvatarDropdown";
import CompanyBadge from "../components/CompanyBadge";

export default function AdminPage() {
    const user = JSON.parse(window.localStorage.getItem("user"));
    const role = window.localStorage.getItem("role");
    const [section, setSection] = useState(null)

    const [confirmInfo, setConfirmInfo] = useState([]);

    const ikolay = {
        logo: "https://lh3.googleusercontent.com/pw/ADCreHfCCDcwmiOg0DTcRbOx--axodmnAIvjYzrh7ghut1TuAkQ73ddded9SUcOLwLXG6x0K-tSvbxWYYJWlCj_dUjflqR8YOE7i69Rldw5ykN9Oa4UVQRbzLlNnJ-OUOyV7f3oP534TErnxApTm6UCISgx2jQ=w500-h500-s-no?authuser=0",
        companyName: "İKolay A.Ş.",
        address: "Bağlıca Mh. Çakmaklıtaş Cd. 1188. Sk. 5/38 Ankara",
        about: "2023 yılında kurulan şirketimiz,  iş dünyasının dönüşen ihtiyaçlarına yanıt vermek ve şirketlerin insan kaynakları süreçlerini optimize etmek için özel olarak tasarlanmış çözümler sunmaktadır.",
        phone: "5464837452"
    };

    useEffect(() => {
        fetch("http://localhost:80/user/pendingmanagers").then(resp => resp.json()).then(data => setConfirmInfo(data));
    }, [])
    console.log(confirmInfo);

    function handleSectionClick(e) {
        e.preventDefault();
        setSection(e.target.name)
    }

    return (
        <main className="container-fluid bg-default-h-100 m-0 p-0">
            <div className="d-flex m-0">
                <div className="w-25 bg-ikolay-light-h-100 ikolay-sidebar text-center small p-2" >
                    <div className="border-bottom border-secondary py-3 mb-1">
                        <NavLink to="/">
                            <img src="/img/ikolay-logo-dark.svg" alt="ikolay logo" />
                        </NavLink>
                        <a href="/admin">
                            <span className="navbar-brand logo-dark-text nav-link-dark">Admin</span>
                        </a>
                    </div>
                    <CompanyBadge company={ikolay} />
                    <div className="d-flex flex-column my-4">
                        <a name="register-requests" onClick={handleSectionClick}
                            href="#"
                            className="ikolay-list-item border border-secondary rounded py-2 mb-2 text center"
                        >
                            Kayıt İstekleri
                        </a>
                        <a name="comment-requests" onClick={handleSectionClick}
                            href="#"
                            className="ikolay-list-item border border-secondary rounded py-2 text center"
                        >
                            Yorum İstekleri
                        </a>
                    </div>
                </div>

                <div className="w-100 d-flex mx-2">
                    <div className="position-fixed end-0 mt-4">
                        <AvatarDropdown userNameTitle="Admin Adı" userEmailTitle="Admin Email" user={user} role={role} />
                    </div>

                    <section className="operation-container d-flex flex-column text-center justify-content-center">

                        {section === null && <DashboardWelcome />}
                        {section === "register-requests" && confirmInfo.map(companyInfo => <RegisterRequests key={companyInfo.companyId} {...companyInfo} confirmInfo={confirmInfo} setConfirmInfo={setConfirmInfo}/>)}
                        {section === "comment-requests" && <CommentRequests />}


                    </section>
                </div>
            </div>
        </main >
    )
}

function RegisterRequests({ companyId, email, firstname, lastname, companyName, taxNo, confirmInfo, setConfirmInfo }) {
    const defConfirm = { isAccepted: true, companyId: companyId, email: email, content: "Üzgünüz!" };
    const [confirm, setConfirm] = useState({ isAccepted: true, companyId: companyId, email: email, content: "Üzgünüz!" });

    function handleRefuseSubmit() {
        const refuse = { ...confirm, isAccepted: false }
        fetch("http://localhost:80/auth/approve", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(refuse)
        }).then(resp => {
            console.log(resp);
            if (!resp.ok)
                throw new Error("Hata initiate");
            return resp.json();
        }).then(data => {
            setConfirm({ ...defConfirm })
            setConfirmInfo(confirmInfo.filter(req =>req.companyId != companyId))
        }).catch(err => console.log(err))
    }

    function handleClick(e) {
        fetch("http://localhost:80/auth/approve", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(confirm)
        }).then(resp => {
            if (!resp.ok)
                throw new Error("Hata initiate");
            return resp.json();
        }).then(data => {
            setConfirm({ ...defConfirm })
            setConfirmInfo(confirmInfo.filter(req => req.companyId != companyId))
        }).catch(err => console.log(err))
    }

    function handleCancel() {
        setConfirm({ ...defConfirm })
    }

    function handleChange(e) {
        setConfirm({ ...confirm, [e.target.name]: e.target.value })
    }

    return (
        <div className="border rounded p-2 d-flex flex-column justify-content-between align-items-center request-bg my-2">
            <p><span>Şirket Adı:</span> {companyName}</p>
            <p><span>Vergi No:</span> {taxNo}</p>
            <p><span>Yetkili Ad-Soyad:</span> {firstname} {lastname}</p>
            <div className="d-flex gap-2">
                <button className="btn btn-info btn-sm" onClick={handleClick}>Onayla</button>
                <button type="button"
                    className="btn btn-warning btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target={`#modalAdd${companyId}`} >Reddet</button>
                <div
                    className="modal fade"
                    id={`modalAdd${companyId}`}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    Başvuruyu Reddet
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={handleCancel}
                                />
                            </div>
                            <div className="modal-body">
                                <form typeof="submit">

                                    <div className="form-group">
                                        <label htmlFor="content">Red Mesajı</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="content"
                                            name="content"
                                            placeholder="Red sebebini giriniz."
                                            value={confirm.content}
                                            onChange={handleChange}
                                        />
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
                                        <button onClick={handleRefuseSubmit} type="button" data-bs-dismiss="modal" className="btn btn-warning">
                                            Reddet
                                        </button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CommentRequests() {
    const [pendingComments, setPendingComments] = useState([])

    useEffect(() => {
        fetch("http://localhost:80/comment/findallcommentforadmin")
            .then(resp => resp.json())
            .then(data => setPendingComments(data))
            .catch(err => console.log(err));
    }, [])

    return (
        pendingComments.map(comment => <CommentRow key={comment.userId} {...comment} comments={pendingComments} setComments={setPendingComments} />)
    )
}

function CommentRow({ id, companyId, userId, content, comments, setComments }) {
    const [user, setUser] = useState({ firstname: "", lastname: "" });
    const [company, setCompany] = useState({ companyName: "", taxNo: "" });
    const [toggle, setToggle] = useState(true);

    function handleClick(e) {
        if (e.target.name == "accept") {
            fetch(`http://localhost:80/comment/acceptcomment/${id}`).then(resp => {
                if (resp.ok) {
                    setComments(comments.filter(comment => comment.id != id));
                }
            }).catch(err => console.log(err))
        } else {
            fetch(`http://localhost:80/comment/rejectcomment/${id}`).then(resp => {
                if (resp.ok) {
                    setComments(comments.filter(comment => comment.id != id));
                }
            }).catch(err => console.log(err))
        }
    }
    function handleToggle() {
        setToggle(false)
    }

    return (
        <div className="request-bg border rounded p-2 d-flex flex-column justify-content-between align-items-center request-bg my-2">
            <span className="mb-3 fw-bold">{content}</span>
            <div className="d-flex justify-content-center align-items-center gap-2">
                <button className="btn btn-info btn-sm" onClick={handleClick} name="accept">Onayla</button>
                <button className="btn btn-warning btn-sm" onClick={handleClick} name="reject">Reddet</button>
                <button type="button"
                    className="btn btn-light btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target={`#modalAdd${userId}`}
                    onClick={handleToggle}>Detay</button>
                <div
                    className="modal fade"
                    id={`modalAdd${userId}`}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 style={{ color: "black" }} className="modal-title fs-5" id="exampleModalLabel">
                                    Çalışan ve Firma Detayları:
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
                                    <div className="form-group ">
                                        {toggle ? <label >Kullanici yükleniyor.</label> : <GetFirstAndLastName userId={userId} user={user} setUser={setUser} />}
                                        {toggle ? <label >Firma yükleniyor.</label> : <GetCompanyNameAndTaxNo companyId={companyId} company={company} setCompany={setCompany} />}

                                    </div>
                                    <div className="modal-footer justify-content-end">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-bs-dismiss="modal"
                                        >
                                            Kapat
                                        </button>

                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}


function GetFirstAndLastName({ userId, user, setUser }) {
    useEffect(() => {
        fetch(`http://localhost:80/user/getusersfirstandlastname/${userId}`).then(resp => resp.json()).then(data => {
            if (!data.firstname)
                throw new Error(data.message);
            setUser(data);
        }).catch(err => console.log(err))
    }, [])

    return <>
        <label className="fw-bold">Kullanıcı Ad Soyad:</label>
        <p>{user.firstname} {user.lastname}</p>
    </>
}

function GetCompanyNameAndTaxNo({ companyId, company, setCompany }) {
    useEffect(() => {
        fetch(`http://localhost:80/company/companyinformation?id=${companyId}`).then(resp => resp.json()).then(data => {
            if (!data.taxNo)
                throw new Error(data.message);
            setCompany(data);
        })
    }, []);


    return <><label className="fw-bold">Firma Adı ve Vergi Numarası:</label>
        <p>{company.companyName} {company.taxNo}</p></>

}