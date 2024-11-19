function mostrarDatosTransferencia() {
    Swal.fire({
        title: 'Datos de Transferencia Bancaria',
        html: `
            <strong>Nombre:</strong> Sebastian Perines <br>  
            <strong>RUT:</strong> 18.924.939-K <br> 
            <strong>Banco:</strong> Tenpo Prepago <br>
            <strong>Tipo Cuenta:</strong> Cuenta Vista<br>
            <strong>N° Cuenta:</strong> 111118924939 <br>
        `,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Copiar Datos',
        cancelButtonText: 'Cerrar',
        didOpen: () => {
            const copiarButton = document.querySelector('.swal2-confirm');
            copiarButton.addEventListener('click', () => {
                const datos = `
                    Nombre: Sebastian Perines
                    RUT: 18.924.939-K
                    Banco: Tenpo Prepago
                    Tipo Cuenta: Cuenta Vista
                    N° Cuenta: 111118924939
                `;
                navigator.clipboard.writeText(datos).then(() => {
                    Swal.fire('¡Datos copiados!', 'Los datos fueron copiados al portapapeles.', 'success');
                }).catch((err) => {
                    Swal.fire('Error', 'Hubo un problema al copiar los datos.', 'error');
                });
            });
        }
    });
}
