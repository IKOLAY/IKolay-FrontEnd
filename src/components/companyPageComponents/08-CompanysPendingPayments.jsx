import { useEffect, useState } from "react";

export function CompanysPendingPayments() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [pendingExpenses, setPendingExpenses] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:80/transaction/getcompanyspendingpayments/${user.companyId}`)
            .then(resp => resp.json())
            .then(data => setPendingExpenses(data))
    }, [])

    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center bg-white rounded text-def p-3">
                <h3 className="text-center p-2">ONAY BEKLEYEN PERSONEL HARCAMA TALEPLERİ</h3>
                <table className="table align-middle mb-0 bg-white small">
                    <thead className="bg-ligh">
                        {pendingExpenses == null && <tr>Yükleniyor!</tr>}
                        <tr>
                            {(pendingExpenses != null && pendingExpenses.length > 0) ?
                                <>
                                    <th className="text-def">Harcama Adı</th>
                                    <th className="text-def">Harcama Miktarı</th>
                                    <th className="text-def">Talep Tarihi</th>
                                    <th className="text-def">Harcama Kur Değeri</th>
                                    <th className="text-def">Harcama Belgesi</th></> : <th>Harcama talebi bulunmuyor!</th>}
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {pendingExpenses != null && pendingExpenses.map(expense => <ExpensesTableRow key={expense.id} {...expense} pendingExpenses={pendingExpenses} setPendingExpenses={setPendingExpenses} />)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

function ExpensesTableRow({ expenseType, currencyType, currencyMultiplier, fileId, id, transactionAmount, transactionDate, name, pendingExpenses, setPendingExpenses }) {
    function handleClick(e) {
        if (e.target.name == "accept") {
            fetch(`http://localhost:80/transaction/confirmpayment/${id}`)
                .then(resp => resp.json())
                .then(data => {
                    if (data.message)
                        throw new Error(data.message)
                    setPendingExpenses(pendingExpenses.filter(exp => exp.id != id))
                })
        } else {
            fetch(`http://localhost:80/transaction/rejectpayment/${id}`)
                .then(resp => resp.json())
                .then(data => {
                    if (data.message)
                        throw new Error(data.message)
                    setPendingExpenses(pendingExpenses.filter(exp => exp.id != id))
                })
        }
    }

    return (
        <tr>
            <th className="text-def">{name}</th>
            <td className="text-def">{transactionAmount / currencyMultiplier} {currencyType}</td>
            <td className="text-def">{transactionDate}</td>
            <td className="text-def">{currencyMultiplier}</td>
            <td className="text-def">{fileId != null ? <a href={`http://localhost:80/files/${fileId}`} target="_blank">
                <button className="btn btn-outline-primary" name="accept">İndir</button></a> : "< Belge Yok >"}</td>
            <td className="text-def">
                <div className="d-flex gap-2">
                    <button className="btn btn-outline-info" onClick={handleClick} name="accept">Onayla</button>
                    <button className="btn btn-outline-danger" onClick={handleClick} name="reject">Reddet</button>
                </div>
            </td>

        </tr>
    )
}