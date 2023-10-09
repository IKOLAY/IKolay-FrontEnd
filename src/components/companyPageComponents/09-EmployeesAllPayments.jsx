export function EmployeesAllPayments({myRequests}) {

    return (
        <>
            <div className="d-flex flex-column justify-content-center bg-white rounded text-def">
                <h3 className="text-center mt-3">Harcama İsteklerim</h3>
                <table className="table align-middle mb-0 bg-white small">
                    <thead className="bg-light">
                        {myRequests == null && <tr>Yükleniyor!</tr>}
                        <tr>
                            {(myRequests != null && myRequests.length > 0) ? <><th>Harcama Adı</th>
                                <th>Harcama Türü</th>
                                
                                <th>Harcama Tutarı</th>
                                <th>Talep Tarihi</th>
                                <th>Harcama Kur Değeri</th>
                                <th>Onay/Red tarihi</th>
                                <th>Durumu</th>
                                <th>Harcama Belgesi</th></> : <th>Harcama talebi bulunmuyor!</th>}
                        </tr>

                    </thead>
                    <tbody>
                        {myRequests != null && myRequests.map((expense,index) => <ExpensesTableRow key={index} {...expense}/>)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

function ExpensesTableRow({confirmationDate,currencyMultiplier,currencyType,expenseType,fileId,name,status,transactionAmount,transactionDate}){

    function backgroundFixer(status){
        switch(status){
            case"PENDING": return "border-warning bg-warning-subtle"
            case"ACCEPTED": return "border-success bg-success-subtle"
            case"REJECTED": return "border-danger bg-danger-subtle"
        }
    }

    function handleEnglish(status){
        switch(status){
            case"PENDING": return "Beklemede"
            case"ACCEPTED": return "Onaylandı"
            case"REJECTED": return "Reddedildi"
            case "TRAVEL": return "Seyahat";
            case "EDUCATION": return "Eğitim";
            case "HEALTH": return "Sağlık";
            case "OTHER" : return "Diğer";
        }
    }
    return (
        <tr>
            <th>{name}</th>
            <td>{handleEnglish(expenseType)}</td>
            <td>{transactionAmount / currencyMultiplier} {currencyType}</td>
            <td>{transactionDate}</td>
            <td>{currencyMultiplier}</td>
            <td>{confirmationDate==null?"Beklemede":confirmationDate}</td>
            <td >
                <div className={`${backgroundFixer(status)} border p-2 rounded text-def`} >
                {handleEnglish(status)}
                </div>
            </td>
            <td>{fileId != null ? <a href={`http://localhost:80/files/${fileId}`} target="_blank"><button className="btn btn-outline-primary btn-sm" name="accept"><i className="fa-solid fa-download"></i> İndir</button></a> : "Belge Yok"}</td>
        </tr>
    )
}