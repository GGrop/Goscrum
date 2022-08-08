import Swal from "sweetalert2"

export const swal = () => {
    Swal.fire({
        title:"Credenciales invalidas",
        text:"Porf favor introduzca credenciales validas",
        confirmButtonText: "Aceptar",
        width:"400px",
        timer:5000,
        timerProgressBar:true,
    })
}
