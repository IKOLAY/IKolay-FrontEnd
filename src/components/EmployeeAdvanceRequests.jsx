import { useEffect, useState } from "react"
import { showErrorMessage, showSuccessMessage } from "./InfoMessages";

export function AllEmployeAdvanceRequests() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [pendingAdvanceList, setPendingAdvanceList] = useState([]);
    console.log(pendingAdvanceList);
    useEffect(() => {
        fetch(`http://localhost:80/advance/getcompanypendingadvancerequest/${user.companyId}`).then(resp => resp.json())
            .then(data => setPendingAdvanceList(data));
    }, [])

    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center bg-white rounded text-def p-3">
                <h3 className="text-center p-2">ONAY BEKLEYEN PERSONEL AVANS TALEPLERİ</h3>
                {pendingAdvanceList.length>0?<table className="table align-middle mb-0 bg-white small">
                    <thead className="bg-ligh">
                        <tr>
                            <th>Açıklama</th>
                            <th>Talep Tarihi</th>
                            <th>Tutar</th>
                            <th>İşlem</th>

                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {pendingAdvanceList.map(request => <ManagerPendingAdvanceListRow key={request.id} {...request} setPendingAdvanceList={setPendingAdvanceList} pendingAdvanceList={pendingAdvanceList} />)}
                    </tbody>
                </table>:<h4>Harika! Personellerinizden herhangi bir avans talebini bulunmuyor!</h4>}
            </div>
        </>
    )
}

export function EmployeeAdvanceRequests({ advanceList }) {
    // employeeye özel requestler, employee pagee eklenecek
    console.log(advanceList);
    return (
        <>
            <div className="d-flex flex-column justify-content-center bg-white rounded text-def">
                <h3 className="text-center mt-3">Avans Taleplerim</h3>
                {advanceList.length > 0 ? <table className="table align-middle mb-0 bg-white small">
                    <thead className="bg-light">
                        <tr>
                            <th>Talep Tarihi</th>
                            <th>Tutar</th>
                            <th>Açıklama</th>
                            <th>Onay/Red tarihi</th>
                            <th>Durumu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {advanceList.map(request => <AdvanceRequestTableRow key={request.id} {...request} />)}
                    </tbody>
                </table> : <h3 className="text-center">Harcama talebiniz bulunmuyor!</h3>}

            </div>
        </>
    )
}

function AdvanceRequestTableRow({ description, confirmationDate, advanceStatus, advanceAmount, createDate }) {

    function backgroundFixer(status) {
        switch (status) {
            case "PENDING": return "border-warning bg-warning-subtle"
            case "ACCEPTED": return "border-success bg-success-subtle"
            case "REJECTED": return "border-danger bg-danger-subtle"
        }
    }

    function handleEnglish(status) {
        switch (status) {
            case "PENDING": return "Beklemede"
            case "ACCEPTED": return "Onaylandı"
            case "REJECTED": return "Reddedildi"
        }
    }
    return (
        <>
            <tr>
                {<td>{new Date(createDate + 12600000).toISOString().split("T")[0]}</td>}
                <td>{advanceAmount}</td>
                <td>{description}</td>
                <td>{confirmationDate != null ? confirmationDate : " - "}</td>
                <td >
                    <div className={`${backgroundFixer(advanceStatus)} border p-2 rounded text-def`} >
                        {handleEnglish(advanceStatus)}
                    </div>
                </td>
            </tr>
        </>
    )
}

function ManagerPendingAdvanceListRow({ description, userId, id, advanceStatus, advanceAmount, createDate, companyId, setPendingAdvanceList, pendingAdvanceList }) {

    const [employeesOtherRequests, setEmployeesOtherRequests] = useState([]);


    function backgroundFixer(status) {
        switch (status) {
            case "PENDING": return "border-warning bg-warning-subtle"
            case "ACCEPTED": return "border-success bg-success-subtle"
            case "REJECTED": return "border-danger bg-danger-subtle"
        }
    }

    function handleEnglish(status) {
        switch (status) {
            case "PENDING": return "Beklemede"
            case "ACCEPTED": return "Onaylandı"
            case "REJECTED": return "Reddedildi"
        }
    }

    function handleConfirm() {
        fetch(`http://localhost:80/advance/confirmadvance/${id}`).then(resp => resp.json())
            .then(data => {
                if (data.message)
                    throw new Error(data.message)
                setPendingAdvanceList(pendingAdvanceList.filter(req => req.id!=id));
                showSuccessMessage("Onaylama işlemi başarıyla tamamlandı!");
            }).catch(err=> showErrorMessage(err))
    }
    function handleReject() {
        fetch(`http://localhost:80/advance/rejectadvance/${id}`).then(resp => resp.json())
        .then(data => {
            if (data.message)
                throw new Error(data.message)
            setPendingAdvanceList(pendingAdvanceList.filter(req => req.id!=id));
            showSuccessMessage("Reddetme işlemi başarıyla tamamlandı!");
        }).catch(err=> showErrorMessage(err))
    }
    function handleGetAdvances() {
        fetch(`http://localhost:80/advance/getoneemployeerequests?companyId=${companyId}&userId=${userId}`).then(resp => resp.json())
            .then(data => {
                if (data.message)
                    throw new Error(data.message)
                setEmployeesOtherRequests(data.filter(req=> req.id!=id));
            }).catch(err=> showErrorMessage("Kullanıcıya ait önceki avans bilgilerini getirirken bir hata meydana geldi"));
    }
    return (
        <>
            <tr>
                <td>{description}</td>
                <td>{new Date(createDate + 12600000).toISOString().split("T")[0]}</td>
                <td>{advanceAmount}</td>
                <td>
                    <div className="mb-1">
                        <button type="button" className="btn btn-sm btn-outline-success mx-1" onClick={handleConfirm}>Onayla</button>
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={handleReject}>Reddet</button>
                    </div>
                    <button type="button" className="btn btn-sm btn-outline-warning " data-bs-toggle="modal"
                        data-bs-target={`#modalDetails-${id}`} onClick={handleGetAdvances}>Önceki talepleri görüntüle</button>
                    <div
                        className="modal fade"
                        id={`modalDetails-${id}`}
                        tabIndex={-1}
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5 text-def" id="exampleModalLabel">
                                        Eski Talepler
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
                                        <div className="form-group">
                                           {employeesOtherRequests.length>0? <table className="table align-middle mb-0 bg-white small">
                                                <thead className="bg-light">
                                                    <tr>
                                                        <th>Onay/Red tarihi</th>
                                                        <th>Tutar</th>
                                                        <th>Durumu</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {employeesOtherRequests.map(req => <OldAdvanceRequestRow key={req.id} {...req} />)}
                                                </tbody>
                                            </table>: <h4>Eski avans talebi bulunamadı.</h4>}

                                        </div>
                                        <div className="modal-footer justify-content-between">
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
                </td>
            </tr>
        </>
    )
}

function OldAdvanceRequestRow({ confirmationDate, advanceAmount, advanceStatus }) {
    function backgroundFixer(status) {
        switch (status) {
            case "PENDING": return "border-warning bg-warning-subtle"
            case "ACCEPTED": return "border-success bg-success-subtle"
            case "REJECTED": return "border-danger bg-danger-subtle"
        }
    }

    function handleEnglish(status) {
        switch (status) {
            case "PENDING": return "Beklemede"
            case "ACCEPTED": return "Onaylandı"
            case "REJECTED": return "Reddedildi"
        }
    }

    return (
        <tr>
            <th>{confirmationDate}</th>
            <th>{advanceAmount}</th>
            <th className={`${backgroundFixer(advanceStatus)}`}>{handleEnglish(advanceStatus)}</th>
        </tr>
    )
}

