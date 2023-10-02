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
        title: 'Hata!',
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