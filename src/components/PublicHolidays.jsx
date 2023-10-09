import { useEffect, useState } from "react";

export default function PublicHolidays({setLeaveList,leaveList}) {
    const user = JSON.parse(window.localStorage.getItem("user"))
    const companyId = user.companyId

    return (
        <section className="mb-0 bg-light text-center p-2 rounded overflow-y-auto" style={{maxHeight:"50%"}}>
            <h1 className="text-def border-bottom border-secondary-subtle">RESMİ TATİLLER</h1>
            <table className="table table-light align-middle">
                <thead>
                    <tr>
                        <th className="text-def" scope="col">Tatil Adı</th>
                        <th className="text-def" scope="col">Başlangıç Tarihi</th>
                        <th className="text-def" scope="col">Süre</th>
                    </tr>
                </thead>
                <tbody>
                {leaveList !== undefined && leaveList.length !== 0 && leaveList.map(
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