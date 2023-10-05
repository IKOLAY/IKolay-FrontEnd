import { NavLink } from "react-router-dom";

export default function Error404() {
    return (
        <main className="error bg-default-h-100 d-flex flex-column p-5 justify-content-center gap-5 align-items-center">
            <NavLink className="nav-link logo-text d-flex" to="/" style={{ fontSize: "3em" }}>
                <img width={50} src="/img/ikolay-logo-light.svg" alt="ikolay logo" />
                <span style={{ fontSize: "1em" }} className="text-info logo-text">İK</span>olay
            </NavLink>

            <div className="d-flex justify-content-center align-items-center gap-1">
                <img className="error-img" src="/img/error-img.svg" alt="büyüteçli adam" />
                <div className="d-flex flex-column justify-content-center align-items-center gap-3">
                    <h1 className="text-center p-0 m-0">404</h1>
                    <h3 className="text-center fw-normal p-0 m-0">Aradığınız içeriğe şu an ulaşılamıyor.</h3>
                    <NavLink to="/">
                        <button className="btn btn-info text-white mt-3">Ana Sayfaya Dön</button>
                    </NavLink>
                </div>
            </div>

        </main>
    )
}