import { useEffect, useState } from "react";

export default function PublicHolidays() {
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