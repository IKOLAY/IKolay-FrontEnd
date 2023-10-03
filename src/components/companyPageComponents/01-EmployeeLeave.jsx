import { useEffect, useState } from "react";
import PublicHolidays from "../PublicHolidays";

export default function EmployeeLeave() {
    const [warningMessage, setWarningMessage] = useState(null);
    const user = JSON.parse(window.localStorage.getItem("user"));
    const defLeave = {
        leaveName: "",
        startingDate: "",
        duration: "",
        email: "",
        companyId: user.companyId,
    }

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
    }, [])


    function handleChange(e) {
        setNewLeave({ ...newLeave, [e.target.name]: e.target.value })
        setWarningMessage(null)

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
                setWarningMessage("İzin başarıyla kaydedilmiştir!")
                return response.json();
            }).then(data => {
                console.log(data);
                if (data.message)
                    throw new Error(data.message)
                setNewLeave({ ...defLeave })
            }).catch(err => {
                console.log(err)
                setWarningMessage(err.message)
            });
    }

    return (
        <div className="d-flex flex-column gap-2">
            <section className="d-flex flex-row gap-3">
                <button
                    type="button"
                    className="btn btn-lg btn-info w-50"
                    data-bs-toggle="modal"
                    data-bs-target="#modalHoliday"
                >+ Resmi Tatil</button>
                <button
                    type="button"
                    className="btn btn-lg btn-info w-50"
                    data-bs-toggle="modal"
                    data-bs-target="#modalLeave"
                >+ İzin</button>
            </section>
            <section
                className="modal fade"
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
                            <button type="button" className="btn btn-outline-primary" onClick={handleSubmit}>
                                Kaydet
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section
                className="modal fade"
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
                                    <label htmlFor="holidayName">İzin Tipi</label>
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
                                {warningMessage !== null && <WarningMessage warningMessage={warningMessage} />}
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
                            <button type="button" className="btn btn-outline-primary" onClick={handleSubmit}>
                                Kaydet
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <PublicHolidays />
            <div className=" overflow-y-scroll bg-light rounded" style={{maxHeight:"150px"}}>
            <section className="mb-0 bg-white text-center rounded mt-2">
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
                        {pendingRequests!=null && pendingRequests.map(request => <PendingRequestsEmployeeTableRow setPendingRequests={setPendingRequests} pendingRequests={pendingRequests} {...request}/>)}
                    </tbody>
                </table>
            </section>
            </div>
        </div>
    )
}

function PendingRequestsEmployeeTableRow({id,leaveName, createDate,duration,startingDate,status,setPendingRequests,pendingRequests}) {

    const date = new Date(createDate);
    const stringDate = date.toISOString().split("T")[0];

    function backgroundFixer(status){
        switch(status){
            case"PENDING": return "bg-warning"
            case"ACCEPTED": return "bg-success"
            case"REJECTED": return "bg-danger"
            case"CANCELED": return "bg-secondary"
        }
    }

    function handleEnglish(status){
        switch(status){
            case"PENDING": return "BEKLEMEDE"
            case"ACCEPTED": return "ONAYLANDI"
            case"REJECTED": return "REDDEDILDI"
            case "CANCELED": return "IPTAL EDILDI"
        }
    }

    function handleConfirmClick(e){
        fetch(`http://localhost:80/leave/confirmleave/${id}`).then(resp => resp.json())
        .then(data=>{
            if(data.message)
            throw new Error(data.message)
            setPendingRequests([...pendingRequests.filter(req=> req.id!=id)]);
        })
    }

    function handleRejectClick(e){
        fetch(`http://localhost:80/leave/rejectleave/${id}`).then(resp => resp.json())
        .then(data=>{
            if(data.message)
            throw new Error(data.message)
            setPendingRequests([...pendingRequests.filter(req=> req.id!=id)]);
        })
    }


    return (<>

        <tr>
            <td>{leaveName}</td>
            <td>{startingDate}</td>
            <td>{duration}</td>
            <td><span className={`"badge px-2 rounded text-black ${backgroundFixer(status)}`}>{handleEnglish(status)}</span></td>
            <td>{stringDate}</td>
            <td><button type="button" 
            className="btn btn-success" 
            disabled={status!="PENDING"?true:false}
            onClick={handleConfirmClick}
            >ONAYLA</button>
            <button type="button" 
            className="btn btn-danger" 
            disabled={status!="PENDING"?true:false}
            onClick={handleRejectClick}
            >REDDET</button></td>
        </tr>

    </>
    )
}
