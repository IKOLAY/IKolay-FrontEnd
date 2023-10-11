import { PatternFormat } from "react-number-format";

export default function CompanyBadge({ company }) {
    return (
        <section className="border rounded p-2 bg-light my-2 d-flex flex-column gap-1 justify-content-center align-items-center text-center small">
           {company.logo === null && <img className="rounded-circle-square " src="/img/ikolay-companypp.svg" alt="varsayılan şirket logosu" />}
           {company.logo !== null && <img className="rounded-circle-square " src={company.logo} alt="şirket logosu" />}
            <p className="m-0 fw-bold">{company.companyName}</p>
            <p className="m-0"><i className="fa-solid fa-location-dot"></i> {company.address}</p>
            <p className="m-0"><i className="fa-solid fa-circle-info"></i> {company.about}</p>
            <p className="phone m-0 d-flex justify-content-center align-items-center"><i className="fa-solid fa-phone"></i>
                                <PatternFormat
                                className="border-0 text-decoration-underline bg-transparent w-75"
                                tabIndex="0"
                                id="phone"
                                name="phone"
                                value={company.phone == null ? "Belirlenmedi." : company.phone}
                                mask="_"
                                allowEmptyFormatting
                                format="+90 (###) ###-####"
                            /></p>
        </section>
    )
}