import { useEffect, useState } from "react";
import PublicHolidays from "../PublicHolidays";
import { showErrorMessage, showSuccessMessage } from "../InfoMessages";

export default function EmployeeLeave() {
    const user = JSON.parse(window.localStorage.getItem("user"));
    const defLeave = {
        leaveName: "",
        startingDate: "",
        duration: "",
        email: "",
        companyId: user.companyId,
    }
    const [leaveList, setLeaveList] = useState([]);

    const [newLeave, setNewLeave] = useState({ ...defLeave });
    const [pendingRequests, setPendingRequests] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:80/leave/getcompanyspendingleaverequest/${user.companyId}`)
        .then(resp => resp.json())
        .then(data => {
            if (data.message)
                throw new Error(data.message);
            setPendingRequests(data);
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

    function handleSubmit() {
        const leaves = { ...newLeave }
        console.log(newLeave);
        console.log(leaves);
        if (newLeave.email == "") {
            leaves.email = null;
        }
        fetch(`http://localhost:80/leave/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(leaves)
        }).then
            (response => {
                console.log(response);
                return response.json();
            }).then(data => {
                console.log(data);
                if (data.message)
                    throw new Error(data.message)
                setNewLeave({ ...defLeave })
                showSuccessMessage("İzin başarıyla kaydedilmiştir.")
            }).catch(err => {
                console.log(err)
                showErrorMessage(err.message)
            });
    }

    return (
        <div className="d-flex flex-column gap-3 overflow-x-hidden mt-5">
            <section className="d-flex flex-row gap-3 mt-5">
                <button
                    type="button"
                    className="btn btn-info w-50"
                    data-bs-toggle="modal"
                    data-bs-target="#modalHoliday"
                >+ Resmi Tatil</button>
                <button
                    type="button"
                    className="btn btn-info w-50"
                    data-bs-toggle="modal"
                    data-bs-target="#modalLeave"
                >+ İzin</button>
            </section>
            <section
                className="modal fade text-def"
                id="modalHoliday"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 style={{ color: "black" }} className="modal-title fs-5" id="exampleModalLabel">
                                Resmi Tatil Tanımla
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <form typeof="submit" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="holidayName">Resmi Tatil Adı</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="holidayName"
                                        name="leaveName"
                                        value={newLeave.leaveName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="startDate">Başlangıç Tarihi</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="startDate"
                                        name="startingDate"
                                        value={newLeave.startingDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="duration">Gün</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="duration"
                                        name="duration"
                                        value={newLeave.duration}
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
                            >
                                Vazgeç
                            </button>
                            <button type="button" className="btn btn-info" onClick={handleSubmit}>
                                Kaydet
                            </button>
                        </div>
                    </div>
                </div>
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
                                Personel İzin Tanımla
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <form typeof="submit" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="holidayName">Gerekçe</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="holidayName"
                                        name="leaveName"
                                        value={newLeave.leaveName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="startDate">Başlangıç Tarihi</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="startDate"
                                        name="startingDate"
                                        value={newLeave.startingDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="duration">Süre</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="duration"
                                        name="duration"
                                        value={newLeave.duration}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="personal-email">Kişisel Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="personel-email"
                                        name="email"
                                        value={newLeave.email}
                                        onChange={handleChange}
                                        placeholder="Personelin kişisel emailini giriniz..."
                                    />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer justify-content-between">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Vazgeç
                            </button>
                            <button type="button" className="btn btn-info" onClick={handleSubmit}>
                                Kaydet
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <PublicHolidays leaveList={leaveList} setLeaveList={setLeaveList}/>
            <div className="overflow-y-auto bg-light rounded text-def" style={{ maxHeight: "30%" }}>
                <section className="mb-0 bg-white text-center rounded p-3">
                    <h1>PERSONEL İZİN TALEPLERİ</h1>
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
                            {pendingRequests != null && pendingRequests.map(request => <PendingRequestsEmployeeTableRow setPendingRequests={setPendingRequests} pendingRequests={pendingRequests} {...request} />)}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    )
}

function PendingRequestsEmployeeTableRow({ id, leaveName, createDate, duration, startingDate, status, setPendingRequests, pendingRequests }) {

    const date = new Date(createDate);
    const stringDate = date.toISOString().split("T")[0];

    function backgroundFixer(status) {
        switch (status) {
            case "PENDING": return "bg-warning-subtle border-warning"
            case "ACCEPTED": return "bg-success-subtle border-success"
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

    function handleConfirmClick(e) {
        fetch(`http://localhost:80/leave/confirmleave/${id}`).then(resp => resp.json())
            .then(data => {
                if (data.message)
                    throw new Error(data.message)
                setPendingRequests([...pendingRequests.filter(req => req.id != id)]);
            })
    }

    function handleRejectClick(e) {
        fetch(`http://localhost:80/leave/rejectleave/${id}`).then(resp => resp.json())
            .then(data => {
                if (data.message)
                    throw new Error(data.message)
                setPendingRequests([...pendingRequests.filter(req => req.id != id)]);
            })
    }


    return (<>

        <tr>
            <td>{leaveName}</td>
            <td>{startingDate}</td>
            <td>{duration}</td>
            <td><span className={`p-2 rounded border text-def ${backgroundFixer(status)}`}>{handleEnglish(status)}</span></td>
            <td>{stringDate}</td>
            <td>
                <button type="button"
                    className="btn btn-outline-success btn-sm me-1"
                    disabled={status != "PENDING" ? true : false}
                    onClick={handleConfirmClick}
                >ONAYLA</button>
                <button type="button"
                    className="btn btn-outline-danger btn-sm"
                    disabled={status != "PENDING" ? true : false}
                    onClick={handleRejectClick}
                >REDDET</button></td>
        </tr>

    </>
    )
}
