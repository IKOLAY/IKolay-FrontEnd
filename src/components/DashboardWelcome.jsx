export default function DashboardWelcome() {
    const user = JSON.parse(window.localStorage.getItem("user"))

    return (
        <div className="d-flex flex-column justify-content-center align-items-center gap-3">
            <h1 style={{ zIndex: "4" }}>Hoş geldiniz! {user.firstname} {user.lastname}</h1>
            <h5 style={{ zIndex: "4" }}>Hemen yan menüden bir işlem seçin ve <span className="text-info">İK</span>olaylayın!</h5>
            <img width="50%" style={{ opacity: 0.2, position: "absolute" }} src="img/ikolay-welcome.svg"></img>
        </div>
    )
}