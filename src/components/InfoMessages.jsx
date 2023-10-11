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

