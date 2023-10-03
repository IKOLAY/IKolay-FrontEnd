import { useState, useRef, useEffect } from "react";
import { EmployeesAllPayments } from "./09-EmployeesAllPayments";
import { CompanysPendingPayments } from "./08-CompanysPendingPayments";

export default function AddIncomeOutcome() {
    const user = JSON.parse(localStorage.getItem("user"));

    const payment = {
        companyId: user.companyId,
        name: "",
        expenseType: "MANAGER",
        currencyMultiplier: 1,
        currencyType: "TL",
        transactionDate: "",
        transactionAmount: "",
        isPaid: false,
        status: "ACCEPTED",
        confirmationDate: "",
        type: "OUTCOME",
        fileId: undefined
    }
    const [addPayment, setAddPayment] = useState({ ...payment });

    function handleChange(e) {
        if (e.target.name === "isPaid") {
            setAddPayment({ ...addPayment, [e.target.name]: e.target.checked })
        } else {
            setAddPayment({ ...addPayment, [e.target.name]: e.target.value })
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const managerTransaction = { ...addPayment, confirmationDate: addPayment.transactionDate }
        fetch(`http://localhost:80/transaction/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(managerTransaction)
        }
        ).then(response => {
            console.log(response);
            return response.json();
        }).then(data => {
            setAddPayment({ ...payment })
            console.log(data);
        }).catch(error => console.log(error));
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="bg-light text-def p-3 rounded">
                <h3 className="text-center p-2">GELİR/GİDER TANIMLA</h3>
                <div className="d-flex flex-column gap-3">

                    <div className="d-flex flex-column">
                        <label>Ödeme Tarihini Giriniz</label>
                        <input
                            type="date"
                            className="form-control"
                            placeholder="taridateh"
                            aria-label="date"
                            aria-describedby="basic-addon1"
                            name="transactionDate"
                            value={addPayment.transactionDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="d-flex flex-column">
                        <label>Ödeme Adı</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="örn: Kredi, Personel Maaş"
                            aria-label="payment-type"
                            aria-describedby="basic-addon2"
                            name="name"
                            value={addPayment.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="d-flex flex-column" >
                        <label>Ödeme Tutar</label>
                        <div className="d-flex">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="örn: 50000"
                                aria-label="Amount (to the nearest dollar)"
                                name="transactionAmount"
                                value={addPayment.transactionAmount}
                                onChange={handleChange}
                            />
                            <span className="input-group-text">TL</span>
                        </div>
                    </div>
                    <div className="d-flex flex-column">
                        <select name="type" value={addPayment.type} onChange={handleChange} className="w-100 rounded border">
                            <option value="OUTCOME">GİDER</option>
                            <option value="INCOME">GELİR</option>
                        </select>
                    </div>
                </div>
                <div className="mt-1 d-flex justify-content-center align-items-center align-middle">
                    <input
                        className="me-1"
                        type="checkbox"
                        id="flexCheckDefault"
                        name="isPaid"
                        checked={addPayment.isPaid}
                        onChange={handleChange}
                    />
                    <label className="text-info small py-2" htmlFor="flexCheckDefault">
                        Ödeme yapıldıysa bu kutuyu işaretleyiniz.
                    </label>
                </div>
                <div className="d-flex flex-row justify-content-center mt-2">
                    <button type="submit" className="btn btn-info" >EKLE</button>
                </div>
            </form>
            <div className="overflow-y-hidden mt-3">
                <CompanysPendingPayments />
            </div>
        </>
    )
}

export function IncomeOutcomeForEmployeeMethod() {
    const fileInput = useRef();
    const user = JSON.parse(localStorage.getItem("user"));
    const [currencyList, setCurrencyList] = useState([]);
    const [expenseList, setExpenseList] = useState([]);
    const [image, setImage] = useState(null);

    function onImageChange(event) {
        if (event.target.files && event.target.files[0]) {
            setImage()
            setAddPayment({ ...addPayment, file: URL.createObjectURL(event.target.files[0]) })
            console.log(event.target.value)
        }
    };


    const payment = {
        companyId: user.companyId,
        employeeId: user.id,
        name: `Personel Ödemesi - ${user.id}`,
        expenseType: expenseList.length > 0 ? expenseList[0] : "",
        currencyMultiplier: 1,
        currencyType: "TL",
        transactionDate: "",
        transactionAmount: "",
        isPaid: true,
        status: "PENDING",
        type: "OUTCOME",
        fileId: undefined
    }
    const [addPayment, setAddPayment] = useState({ ...payment });
    const [myRequests, setMyRequests] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:80/transaction/getexpensetypes`)
            .then(resp => resp.json())
            .then(data => {
                if (data.message)
                    throw new Error(data.message)
                setExpenseList(data);
                setAddPayment({ ...addPayment, expenseType: data[0] })
            })
        fetch(`http://localhost:80/transaction/getcurrencies`)
            .then(resp => resp.json())
            .then(data => {
                if (data.message)
                    throw new Error(data.message)
                setCurrencyList(data);
            })

        fetch(`http://localhost:80/transaction/findmyexpenserequests/${user.id}`)
            .then(resp => resp.json())
            .then(data => {
                if (data.message)
                    throw new Error(data.message)
                console.log(data);
                setMyRequests(data);
            })
    }, [])



    function handleChange(e) {
        setAddPayment({ ...addPayment, [e.target.name]: e.target.value })
        if (e.target.value == "TL" && e.target.name == "currencyType")
            setAddPayment({ ...addPayment, [e.target.name]: e.target.value, currencyMultiplier: 1 })
        console.log(fileInput.current.files);
    }


    function handleSubmit(e) {
        e.preventDefault();
        if (fileInput.current.files && fileInput.current.files[0]) {
            const formData = new FormData();
            formData.set("file", fileInput.current.files[0]);
            fetch(`http://localhost:80/files`, {
                method: "POST",
                body: formData
            }
            ).then(response => {
                console.log(response);
                return response.json();
            }).then(data => {
                fetch(`http://localhost:80/transaction/add`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ...addPayment, fileId: data.confirmMessage })
                })
                    .then(resp => resp.json())
                    .then(data2 => {
                        if (data2.message)
                            throw new Error(data2.message)
                        setMyRequests([...myRequests, data2])
                        setAddPayment({ ...payment })
                        fileInput.current.value = null;
                        setImage(null)
                    })
            }).catch(error => console.log(error));

        } else {
            fetch(`http://localhost:80/transaction/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...addPayment })
            })
                .then(resp => resp.json())
                .then(data2 => {
                    if (data2.message)
                        throw new Error(data2.message)
                    setMyRequests([...myRequests, data2])
                    setAddPayment({ ...payment })
                })
        }
    }
    function handleEnglish(expenseType) {
        switch (expenseType) {
            case "TRAVEL":
                return "SEYAHAT";
            case "EDUCATION": return "EĞİTİM";
            case "HEALTH": return "SAĞLIK";
            default: return "DİĞER";
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="bg-light text-def p-3 rounded">
                <h3 className="text-center p-2">HARCAMA TALEBİ GİR</h3>
                <div className="d-flex flex-column gap-3">

                    <div className="d-flex flex-column">
                        <label>Ödeme Tarihini Giriniz</label>
                        <input
                            type="date"
                            className="form-control"
                            placeholder="taridateh"
                            aria-label="date"
                            aria-describedby="basic-addon1"
                            name="transactionDate"
                            value={addPayment.transactionDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="d-flex" >
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Ödeme Tutarınızı Giriniz"
                            aria-label="Amount (to the nearest dollar)"
                            name="transactionAmount"
                            value={addPayment.transactionAmount}
                            onChange={handleChange}
                        />
                        {addPayment.currencyType != "TL" && <input
                            type="number"
                            className="form-control"
                            placeholder={`Lütfen güncel ${addPayment.currencyType} kurunu giriniz.`}
                            aria-label="Exchange-Rate"
                            name="currencyMultiplier"
                            value={addPayment.currencyMultiplier}
                            onChange={handleChange}
                        />}
                        <div className="input-group-append">
                            <span className="input-group-text">
                                <div className="input-group d-flex justify-content-center mt-1">
                                    <select name="currencyType" value={addPayment.currencyType} onChange={handleChange} >
                                        {currencyList.map(curr => <option key={curr} value={`${curr}`} >{curr}</option>)}
                                    </select>
                                </div></span>
                        </div>

                    </div>
                    <div className="input-group d-flex justify-content-center mt-1">
                        <select name="expenseType" value={addPayment.expenseType} onChange={handleChange} >
                            {expenseList.map(exp => <option key={exp} value={`${exp}`} >{handleEnglish(exp)}</option>)}
                        </select>
                    </div>
                </div>
                <div className="input-group mt-1">
                    <input
                        type="file"
                        aria-label="related-document"
                        aria-describedby="basic-addon2"
                        onChange={onImageChange}
                        ref={fileInput}
                        style={{ color: "white" }}
                    />
                    {addPayment.file && <img src={addPayment.file} alt={addPayment.file} />}
                </div>
                <div className="d-flex flex-row justify-content-center mt-2">
                    <button type="submit" className="btn btn-info" >EKLE</button>
                </div>
            </form>
            <div className="overflow-y-scroll mt-3">
                <EmployeesAllPayments myRequests={myRequests} user={user} setMyRequests={setMyRequests} />
            </div>
        </>

    )

}