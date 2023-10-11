import { useEffect, useState } from "react";
import { showErrorMessage, showMembershipUpdateMessage } from "../components/InfoMessages";
import { NavLink } from "react-router-dom";

export default function MembershipUpdate() {
    const [membershipList, setMembershipList] = useState([]);
    const user = JSON.parse(window.localStorage.getItem("user"));

    useEffect(() => {
        fetch(`http://localhost:80/membership/getactivememberships`).then(resp => {
            if (!resp.ok)
                throw new Error("Üzgünüz, bir hata oluştu!");
            return resp.json();
        }).then(data => {
            setMembershipList(data);
        }).catch(err => console.log(err))
    }, []);

    return (

        <main className="container-fluid text-def-light">
            <div className="d-flex flex-column text-center mt-3 mb-3">
                <NavLink className="navbar-brand logo-text" to="/">
                    <img src="/img/ikolay-logo-light.svg" alt="ikolay logo" />
                    <span className="text-info logo-text">İK</span>olay
                </NavLink>
                <h1 className="p-0 mt-0">Fiyatlandırma</h1>
                <h2 className="p-0 fw-normal">İnsan Kaynakları Yönetimi Artık Daha Kolay ve Erişilebilir!<br></br>
                    <span className="text-info fw-lighter ">İlk Bir Ay Ücretsiz Üyelikle Başlayın:</span>
                </h2>
            </div>
            <div className="mx-auto" style={{ maxWidth: "800px" }}>
                <div className="row d-flex flex-wrap justify-content-center gap-2"  >
                    {membershipList.map(p => <PricingCard key={p.title} packg={p} user={user} />)}
                </div>
            </div>

        </main>
    )
}

function PricingCard({ packg, user }) {
    const selectedMembership = { companyId: user.companyId, membershipId: packg.id }
    function handleMembershipSelection(e) {
        fetch(`http://localhost:80/membership/setselectedmembership`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedMembership)
        }).then
            (response => {
                console.log(response);
                return response.json();
            }).then(data => {
                console.log(data);
                if (data.message)
                    throw new Error(data.message)
                showMembershipUpdateMessage();
            }).catch(err => {
                console.log(err)
                showErrorMessage(err.message)
            });
    }

    return (
        <div className="bg-light card col-3 text-center" style={{ minHeight: "250px", minWidth: "250px", maxHeight: "250px", maxWidth: "250px" }}>
            <div className="card-header m-0 p-0 w-100">
                <h4>{packg.name}</h4>
            </div>
            <div className="card-body m-0 p-1 d-flex flex-column justify-content-around align-items-center">
                <h2 className="card-title m-0 p-0">
                    {packg.price} ₺ <small className="text-muted">/ ay</small>
                </h2>
                <p className="text-muted m-0 p-0" style={{ fontSize: "0.7em" }}>
                    {packg.description}
                </p>
                <button
                    type="button"
                    className="btn btn btn-info m-1"
                    onClick={handleMembershipSelection}
                >
                    Seç
                </button>
            </div>

        </div>

    )
}