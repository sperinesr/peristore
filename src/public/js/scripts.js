function mostrarDatosTransferencia() {
    Swal.fire({
        title: 'Datos de Transferencia Bancaria',
        html: `
            <strong>Nombre:</strong> Sebastian Perines <br>  
            <strong>RUT:</strong> 18.924.939-K <br> 
            <br>  
            <strong>Banco:</strong> Banco BCI <br>
            <strong>Tipo Cuenta:</strong> Cuenta Vista<br>
            <strong>N° Cuenta:</strong> 23501693 <br>
        `,
        icon: 'info',
        confirmButtonText: 'Cerrar'
    });
}