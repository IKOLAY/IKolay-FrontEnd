import { NavLink, useNavigate } from "react-router-dom";



export default function AvatarDropdown({ userNameTitle, userEmailTitle, user, role, setSection }) {
    const navigate = useNavigate();

    function handleLogout(e) {
        window.localStorage.clear("token");
        window.localStorage.clear("user");
        window.localStorage.clear("company");
        window.localStorage.clear("shift");
        window.localStorage.clear("role");
        navigate("/")
        if (window.location.href === "http://localhost:5173/") {
            location.reload()
        }
    }



    function UserSpecificLink({ linkTitle, navLink }) {
        if (linkTitle === "İKolay Müşterileri") {
            return (
                <a href="#clients" className="nav-link-dark">{linkTitle}</a>
            )
        } else if (linkTitle === "Personel") {
            return (
                <div className="d-flex flex-column justify-content-center align-items-center">
                    {window.location.href !== `http://localhost:5173${navLink}` &&
                        <NavLink to={navLink} className="nav-link-dark">{linkTitle}</NavLink>}
                    {window.location.href === `http://localhost:5173${navLink}` &&
                        <button className="border btn btn-info rounded w-75" name="employee-profile" onClick={setSection}>Profil</button>}
                </div>
            )
        }
        return (
            <>
                {window.location.href !== `http://localhost:5173${navLink}` && <NavLink to={navLink} className="nav-link-dark">{linkTitle}
                </NavLink>}
            </>
        )
    }

    return (
        <div className="avatar-dropdown pe-3 ps-3" style={{ marginTop: "-10px" }}>
            <div className="btn-group">
                <a
                    href="#"
                    className="btn-img img dropdown-toggle text-white"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <img width={40} className="avatar rounded-circle pt-2 me-1" src={user.photoUrl} alt="" />
                </a>
                <div
                    className="dropdown-menu"
                    x-placement="bottom-start"
                    style={{
                        position: "absolute",
                        willChange: "transform",
                        top: 0,
                        left: 0,
                        transform: "translate3d(-100px, 50px, 0px)"
                    }}
                >
                    <div className="d-flex flex-column align-items-center small border bg-secondary-subtle rounded m-2 mt-0 pt-3">
                        <p className="fw-bold">{userNameTitle}:</p>
                        <p>{user.firstname} {user.lastname}</p>
                        <p className="fw-bold">{userEmailTitle}:</p>
                        <p>{user.companyEmail}</p>
                    </div>
                    <div className="d-flex flex-column justify-content-center text-center gap-2">
                        {window.location.href !== "http://localhost:5173/" &&
                            <NavLink to="/" className="nav-link-dark">
                                İKolay Ana Sayfa
                            </NavLink>}
                        {role === "ADMIN" && <UserSpecificLink linkTitle="Admin" navLink="/admin" />}
                        {role === "MANAGER" && <UserSpecificLink linkTitle="Kurumsal" navLink="/company" />}
                        {role === "EMPLOYEE" && <UserSpecificLink linkTitle="Personel" navLink="/employee" />}
                        {role === "VISITOR" && <UserSpecificLink linkTitle="İKolay Müşterileri" navLink="#clients" />}

                        <button className="btn-link border-0 bg-transparent text-decoration-none nav-link-dark" type="button" onClick={handleLogout}>
                            Çıkış
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

