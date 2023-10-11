import { NavLink } from "react-router-dom";
import DashboardWelcome from "../components/DashboardWelcome";
import { useState, useEffect } from "react";
import EmployeeList from "../components/companyPageComponents/02-EmployeeList";
import EmployeeLeave from "../components/companyPageComponents/01-EmployeeLeave";
import ShiftSystem from "../components/companyPageComponents/05-EmployeeShiftSystem";
import AnnualProfitLoss from "../components/companyPageComponents/03-AnnualProfitLoss";
import AllExpenses from "../components/companyPageComponents/04-AllExpenses";
import IncomingPayments from "../components/companyPageComponents/07-IncomingPayments";
import AddIncomeOutcome from "../components/companyPageComponents/06-AddIncomeOutCome";
import AvatarDropdown from "../components/AvatarDropdown";
import CompanyBadge from "../components/CompanyBadge";
import EmployeePage from "./06-EmployeePage";
import { showErrorMessage } from "../components/InfoMessages";
import { PatternFormat } from "react-number-format";

export default function CompanyPage() {
    const [section, setSection] = useState(null);
    const [ariaExpandedEmployee, setAriaExpandedEmployee] = useState(false);
    const [ariaExpandedFinance, setAriaExpandedFinance] = useState(false);

    let defCompany = JSON.parse(window.localStorage.getItem("company"));
    const [company, setCompany] = useState({ ...defCompany })


    const user = JSON.parse(window.localStorage.getItem("user"));
    const role = window.localStorage.getItem("role");


    function handleSectionClick(e) {
        e.preventDefault();
        setSection(e.target.name);
    }

    function handleAriaExpandedEmployee() {
        if (ariaExpandedEmployee === false) {
            setAriaExpandedEmployee(true)
        } else {
            setAriaExpandedEmployee(false)
        }
    }

    function handleAriaExpandedFinance() {
        if (ariaExpandedFinance === false) {
            setAriaExpandedFinance(true)
        } else {
            setAriaExpandedFinance(false)
        }
    }

    function handleCancelEditCompany(e) {
        setCompany({ ...defCompany })
    }

    function handleEditCompany(e) {
        console.log(company)
        setCompany({ ...company, [e.target.name]: e.target.value })
    }

    function handleSaveEditCompany() {
        fetch("http://localhost:80/company/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(company)
        }).then
            (response => {
                console.log(response);
                return response.json();
            }).then(data => {
                
                console.log(data);
                if (data.message) {
                    showErrorMessage(data.message);
                    throw new Error(data.message);
                }
                localStorage.setItem("company", JSON.stringify(data))
                setCompany({ ...data })
            }).catch(err => {
                setCompany({ ...defCompany });
                console.log(err);
                showErrorMessage(err.message);
            });
    }


    return (
        <main className="container-fluid bg-default-h-100 m-0 p-0">
            <div className="col-12" style={{ height: "7%" }}>
                <ul className="col-12 nav nav-tabs " id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link active"
                            id="company-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#company"
                            type="button"
                            role="tab"
                            aria-controls="company"
                            aria-selected="true"
                        >
                           <i className="fa-solid fa-building"></i> Şirket Sayfası
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            id="wmployee-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#employee"
                            type="button"
                            role="tab"
                            aria-controls="employee"
                            aria-selected="false"
                        >
                           <i className="fa-solid fa-user"></i> Personel Sayfam
                        </button>
                    </li>
                </ul>
            </div>
            <div className="tab-content container-fluid m-0 p-0 " id="myTabContent" style={{ height: "91%" }}>
                <div
                    className="w-100 tab-pane fade show active"
                    id="company"
                    role="tabpanel"
                    aria-labelledby="company-tab"
                    style={{ height: "100%" }}
                >

                    <div className="d-flex" style={{ height: "100%" }}>
                        <div className="position-fixed end-0">
                            <AvatarDropdown userNameTitle="Yönetici Adı" userEmailTitle="Yönetici Email" user={user} role={role} />
                        </div>
                        <div className="px-2 bg-ikolay-light ikolay-sidebar text-center small" style={{ height: "100%", width: "36%" }}>

                            <div className="border-bottom border-secondary py-2 mb-1">
                                <NavLink to="/">
                                    <img src="/img/ikolay-logo-dark.svg" alt="ikolay logo" />
                                </NavLink>
                                <NavLink to="/company">
                                    <span className="navbar-brand logo-dark-text nav-link-dark">Kurumsal</span>
                                </NavLink>
                            </div>
                            <CompanyBadge company={defCompany} />
                            <button
                                className="btn btn-sm btn-info mb-2"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#modalEditCompany"
                            >
                                Şirket Bilgilerini Düzenle
                            </button>
                            <section
                                className="modal fade"
                                id="modalEditCompany"
                                tabIndex={-1}
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                            >
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                                Şirket Bilgilerini Düzenle
                                            </h1>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            />
                                        </div>
                                        <div className="modal-body">
                                            <form typeof="submit" className="text-def">
                                                <div className="form-group">
                                                    <label htmlFor="companyName">Şirket Adı</label>
                                                    <input
                                                        type="text"
                                                        className="form-control bg-secondary-subtle text-center"
                                                        id="companyName"
                                                        name="companyName"
                                                        value={company.companyName}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="companyName">Vergi No</label>
                                                    <input
                                                        type="text"
                                                        className="form-control bg-secondary-subtle text-center"
                                                        id="companyName"
                                                        name="companyName"
                                                        value={company.taxNo}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="companyAddress">Adres</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="address"
                                                        name="address"
                                                        maxLength="80"
                                                        value={company.address}
                                                        onChange={handleEditCompany}

                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="companyAbout">Hakkında</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="about"
                                                        name="about"
                                                        maxLength="150"
                                                        value={company.about}
                                                        onChange={handleEditCompany}

                                                    />
                                                </div>
                                                <div className="form-group d-flex flex-column">
                                                    <label htmlFor="phone">Telefon</label>
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <PatternFormat
                                                            type="tel"
                                                            className="form-control"
                                                            id="phone"
                                                            name="phone"
                                                            mask="_"
                                                            allowEmptyFormatting
                                                            format="+90 (###) ###-####"
                                                            value={company.phone}
                                                            onChange={handleEditCompany}
                                                            onInvalid={e => e.target.setCustomValidaty("Telefon numarası 10 haneli olmalı!")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="modal-footer justify-content-between">
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary"
                                                        data-bs-dismiss="modal"
                                                        onClick={handleCancelEditCompany}
                                                    >
                                                        Vazgeç
                                                    </button>
                                                    <button type="button" className="btn btn-outline-info" data-bs-dismiss="modal" onClick={handleSaveEditCompany} disabled={company.companyName == "" && true}>
                                                        Kaydet
                                                    </button>
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                </div>
                            </section>
                            <ul className="list-unstyled border-top border-secondary d-flex flex-column gap-2 pt-2">
                                <li className="mb-1">
                                    <button
                                        className="btn align-items-center ikolay-list-item collapsed border-secondary mb-2 w-100"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#employee-collapse"
                                        onClick={handleAriaExpandedEmployee}
                                    >
                                        <span className="btn-toggle-employee me-1" aria-expanded={ariaExpandedEmployee}></span> Personel <i class="fa-solid fa-person"></i>
                                    </button>
                                    <div className="collapse" id="employee-collapse">
                                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 d-flex flex-column gap-2">
                                            <li>
                                                <a href="#" className="nav-link-dark" name="employee-list" onClick={handleSectionClick}>
                                                    Liste
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="nav-link-dark" name="employee-leave" onClick={handleSectionClick}>
                                                    İzin
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="nav-link-dark" name="employee-shift" onClick={handleSectionClick}>
                                                    Vardiya
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li className="mb-1">
                                    <button
                                        className="btn align-items-center rounded collapsed ikolay-list-item border-secondary w-100 mb-2"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#finance-collapse"
                                        onClick={handleAriaExpandedFinance}
                                    >
                                        <span className="btn-toggle-finance me-1" aria-expanded={ariaExpandedFinance}></span> Finans <i class="fa-solid fa-coins"></i>
                                    </button>
                                    <div className="collapse" id="finance-collapse">
                                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 d-flex flex-column gap-2">
                                            <li>
                                                <a href="#" className="nav-link-dark" name="profit-loss" onClick={handleSectionClick}>
                                                    Kar / Zarar
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="nav-link-dark" name="all-expenses" onClick={handleSectionClick}>
                                                    Tüm Giderler
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="nav-link-dark" name="incoming-payments" onClick={handleSectionClick}>
                                                    Yaklaşan Ödemeler
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="nav-link-dark" name="add-income-outcome" onClick={handleSectionClick}>
                                                    Gelir/Gider Gir
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <section className="operation-container d-flex flex-column text-center justify-content-center px-2">
                            {section === null && <DashboardWelcome />}
                            {section === "employee-list" && <EmployeeList />}
                            {section === "employee-leave" && <EmployeeLeave />}
                            {section === "employee-shift" && <ShiftSystem />}
                            {section === "profit-loss" && <AnnualProfitLoss />}
                            {section === "all-expenses" && <AllExpenses />}
                            {section === "incoming-payments" && <IncomingPayments />}
                            {section === "add-income-outcome" && <AddIncomeOutcome />}



                        </section>
                    </div>

                </div>
                <div
                    className="tab-pane fade h-100 overflow-hidden"
                    id="employee"
                    role="tabpanel"
                    aria-labelledby="employee-tab"
                >
                    <EmployeePage />
                </div>

            </div>
        </main>
    )
}

