import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"

export default function AdminPage() {
    const [section, setSection] = useState(null)

    const [confirmInfo, setConfirmInfo] = useState([]);

    useEffect(() => {
        fetch("http://localhost/user/pendingmanagers").then(resp => resp.json()).then(data => setConfirmInfo(data));
    }, [])
    console.log(confirmInfo);

    function handleClick(e) {
        e.preventDefault();
        setSection(e.target.name)
    }

    return (
        <main className="container-fluid bg-default m-0 p-0">
            <div className="row m-0">
                <div className="w-25 bg-ikolay-light-h-100 admin-sidebar text-center small">
                    <NavLink to="/">
                        <div className="text-center py-4 border-bottom mb-4 ps-0  ">
                            <a className="navbar-brand logo-dark-text" href="#">
                                <img width={25} src="/img/ikolay-logo-dark.svg" alt="ikolay logo" />
                                <small>Admin</small>
                            </a>
                        </div>
                    </NavLink>
                    <div className="d-flex flex-column">
                        <a name="register-requests" onClick={handleClick}
                            href="#"
                            className="admin-list-item border rounded py-2 mb-2 text center"
                        >
                            Kayıt İstekleri
                        </a>
                        <a name="comment-request" onClick={handleClick}
                            href="#"
                            className="admin-list-item border rounded py-2 text center"
                        >
                            Yorum İstekleri
                        </a>
                    </div>
                </div>

                <div className="w-75 operation-container">
                    <div className="row justify-content-end my-3">
                        <div className="col-md-6 d-flex justify-content-end mb-5">
                            <div className="btn-group">
                                <a
                                    href="#"
                                    className="btn-img img dropdown-toggle text-white"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                ><img width={40} className="rounded-circle" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp" alt="" /></a>
                                <div
                                    className="dropdown-menu"
                                    x-placement="bottom-start"
                                    style={{
                                        position: "absolute",
                                        willChange: "transform",
                                        top: 0,
                                        left: 0,
                                        transform: "translate3d(0px, 100px, 0px)"
                                    }}
                                >
                                    
                                    <a className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="icon d-flex align-items-center justify-content-center mr-3">
                                            <span className="ion-ios-power" />
                                        </div>
                                        Çıkış
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="row pt-5 justify-content-center text-center">
                        <div className="w-75">
                            ÖRNEK KAYIT İSTEĞİ
                            <RegisterRequest/>
                            {section === null && <Welcome />}
                            {section === "register-requests" && confirmInfo.map(companyInfo => <RegisterRequest key={companyInfo.companyId} {...companyInfo} />)}
                            {section === "comment-request" && <CommentRequest />}

                        </div>
                    </section>
                </div>

                <div className="col-2"></div>
            </div>
        </main >
    )
}

function Welcome() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center gap-3 pt-5">
            <h1 style={{zIndex:"4"}}>Hoş geldiniz!</h1>
            <p>Hemen yandan bir işlem seçin ve <span className="text-info">İK</span>olaylayın!</p>
            <img width="60%" style={{opacity:0.2, position:"absolute"}} src="img/ikolay-welcome.svg"></img>
        </div>
    )
}

function RegisterRequest({ companyId, email, firstname, lastname, companyName, taxNo }) {
    const defConfirm = { isAccepted: true, companyId: companyId, email: email, content: "" }; //content: "Üzgünüz"
    const [confirm, setConfirm] = useState({ isAccepted: true, companyId: companyId, email: email, content: "" }); //content: "Üzgünüz"

    function handleRefuseSubmit(e) {
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
        }).catch(err => console.log(err))
    }

    function handleCancel() {
        setConfirm({ ...defConfirm })
    }

    function handleChange(e) {
        setConfirm({ ...confirm, [e.target.name]: e.target.value })
    }

    return (
        <div className="border rounded p-2 d-flex flex-column justify-content-between align-items-center register-request-bg my-4">
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

function CommentRequest() {
    return (
        <>
        </>
    )
}