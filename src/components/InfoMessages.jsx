import Swal from "sweetalert2";


export function FormValidationMessage({ message }) {
    return (
        <div className="alert alert-danger text-center w-100" role="alert">
            {message}
        </div>
    )
}

export function showErrorMessage(message){
    Swal.fire({
        icon: 'error',
        title: 'Hay aksi!',
        text: message,
        confirmButtonText: 'Tamam',
        confirmButtonColor: "#6C757D",
      })
}

export function showSuccessMessage(message){
    Swal.fire({
        title: 'Teşekkürler!',
        text: message,
        icon: 'success',
        confirmButtonText: 'Devam',
        confirmButtonColor: "#5cb85c",
    })
}

export function showInfoMessage (message){
    Swal.fire({
        text: message,
        icon: 'info',
        confirmButtonText: 'Tamam',
        confirmButtonColor: "#6C757D",
    })
}

export function showMembershipUpdateMessage () {
    Swal.fire({
        title: 'Tebrikler!',
        text: "Üyeliğiniz başarıyla güncellendi! Lütfen tekrar giriş yapın!",
        icon: 'success',
        confirmButtonColor: '#5cb85c',
        confirmButtonText: 'Ana Sayfaya Git'
      }).then((result) => {
        if (result.isConfirmed) {
            window.localStorage.clear("token");
            window.localStorage.clear("user");
            window.localStorage.clear("company");
            window.localStorage.clear("shift");
            window.localStorage.clear("role");
            window.location.href = "/";
        }
      })
}

export function showEmployeeSaveSuccessMessage(companyId,setEmployeeList) {
    //Personel kaydı sırasın mesaj dönüyor. Yeni eklenen kullanıcının idsi olmadığı için silme ve güncelleme işleminde sorun çıkıyor. Bu yüzden fetch metodu kullanıldı. Bunun yanı sıra BACKEND düzeltilince eski haline getirilebilir Fetch'e gerek kalmayacaktır !!
    Swal.fire({
        title: 'Tebrikler!',
        text: "Personel Başarıyla Kaydedildi !",
        icon: 'success',
        confirmButtonColor: '#5cb85c',
        confirmButtonText: 'Tamam'
    });
    fetch(`http://localhost:80/user/getallpersonelwithcompanyid?companyId=${companyId}`).then(resp => {
        if (!resp.ok)
            throw new Error("Üzgünüz, bir hata oluştu!");
        return resp.json();
    }).then(data => {
        setEmployeeList(data);
    }).catch(err => console.log(err))
}

