import { useEffect, useState } from "react";

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
            <section className="d-flex flex-row gap-1">
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
                className="modal fade"
                id="modalHoliday"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-def" id="exampleModalLabel">
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
                            <h1 className="modal-title fs-5 text-def" id="exampleModalLabel">
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
            <PublicHoliday />

        </div>
    )
}

function PublicHoliday() {
    const user = JSON.parse(window.localStorage.getItem("user"))
    const companyId = user.companyId
    const [leaveList, setLeaveList] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:80/leave/getcompanyleaves?companyId=${companyId}`).then(resp => {
            if (!resp.ok)
                throw new Error("Üzgünüz, bir hata oluştu!");
            return resp.json();
        }).then(data => {
            console.log(data);
            setLeaveList(data);
            console.log(leaveList);
        }).catch(err => console.log(err))
    }, []);
    return (
        <section className="mb-0 bg-light text-center p-4">
            <h1 className="text-def border-bottom border-secondary-subtle">RESMİ TATİLLER</h1>
            <table className="table table-light align-middle">
                <thead>
                    <tr>
                        <th className="text-def" scope="col">İzin Adı</th>
                        <th className="text-def" scope="col">Başlangıç</th>
                        <th className="text-def" scope="col">Süre</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveList.length != 0 && leaveList.map(
                        leave => {
                            return <GetLeaveRow key={leave.startingDate + leave.leaveName} {...leave} />
                        }
                    )}
                </tbody>
            </table>
        </section>
    )
}

function GetLeaveRow({ leaveName, startingDate, duration, }) {
    return (
        <tr>
            <td className="text-def">{leaveName}</td>
            <td className="text-def">{startingDate}</td>
            <td className="text-def">{duration} Gün</td>
        </tr>
    )
}