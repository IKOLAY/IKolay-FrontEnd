import { NavLink } from "react-router-dom";

export default function CompanyPage() {
    function handleLogout(e) {
        window.localStorage.clear("token")
        window.localStorage.clear("user")
        window.localStorage.clear("company")
        window.localStorage.clear("shift")
    }

    return (
        <main className="container-fluid bg-default m-0 p-0">
            <ul className="col-10 nav nav-tabs py-2" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link active"
                        id="home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#home"
                        type="button"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                    >
                        Şirket Sayfası
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#profile"
                        type="button"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                    >
                        Personel Sayfam
                    </button>
                </li>
                
            </ul>
            <div className="col-2">
                    <div className=" justify-content-end">
                        <div className=" d-flex justify-content-end position-fixed top-0 end-0 mt-2">
                            <div className="btn-group">
                                <a
                                    href="#"
                                    className="btn-img img dropdown-toggle text-white"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <img width={40} className="rounded-circle me-1" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp" alt="" />
                                </a>
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

                                    <NavLink className="dropdown-item d-flex align-items-center" to="/" onClick={handleLogout}>
                                        Çıkış
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <div className="tab-content" id="myTabContent">
                <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                >
                    ...
                </div>
                <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                >
                    ...
                </div>
                <div
                    className="tab-pane fade"
                    id="contact"
                    role="tabpanel"
                    aria-labelledby="contact-tab"
                >
                    ...
                </div>
            </div>
        </main>
    )
}