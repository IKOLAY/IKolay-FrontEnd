export function AllEmployeAdvanceRequests() {
    // company page e eklenecek
}

export function EmployeeAdvanceRequests() {
    // employeeye özel requestler, employee pagee eklenecek

    return (
        <>
            <div className="d-flex flex-column justify-content-center bg-white rounded text-def">
                <h3 className="text-center mt-3">Avans Taleplerim</h3>
                <table className="table align-middle mb-0 bg-white small">
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
                        <AdvanceRequestTableRow/>
                    </tbody>
                </table>
            </div>
        </>
    )
}

function AdvanceRequestTableRow() {
    const status = "PENDING"

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
            <td>12/10/2023</td>
            <td>15000</td>
            <td>Eşim doğum yaptı.</td>
            <td></td>
            <td >
                <div className={`${backgroundFixer(status)} border p-2 rounded text-def`} >
                    {handleEnglish(status)}
                </div>
            </td>
        </tr>
    )
}
