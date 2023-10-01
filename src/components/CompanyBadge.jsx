export default function CompanyBadge({company}){
    return(
        <div className="border rounded p-2 bg-light my-2 d-flex flex-column gap-1 justify-content-center align-items-center">
        <img className="rounded-circle" width={32} src="/img/ikolay-companypp.svg" alt="varsayılan şirket logosu" />
        <p className="m-0">{company.companyName}</p>
        <p className="m-0"><i className="fa-solid fa-location-dot"></i> {company.address}</p>
        <p className="m-0"><i className="fa-solid fa-circle-info"></i> {company.about}</p>
        <p className="m-0"><i className="fa-solid fa-phone"></i> {company.phone}</p>

        <button className="btn btn-sm btn-info">Düzenle</button>
    </div>
    )
}