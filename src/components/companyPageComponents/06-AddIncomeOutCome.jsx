import { useState } from "react";

export default function AddIncomeOutcome() {
    const payment = {
        companyId: 1,
        name: "",
        transactionDate: "",
        transactionAmount: "",
        isPaid: false,
        type: "OUTCOME"
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
        fetch(`http://localhost:80/transaction/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(addPayment)
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
                        <option value="OUTCOME" >GİDER</option>
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
                <button type="submit" className="btn btn-primary" >EKLE</button>
            </div>
        </form>
    )
}