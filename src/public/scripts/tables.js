$(document).ready(function () {
    $('#products-table').DataTable({
        paging: true,     // sin paginación si querés que se vea como "Excel"
        searching: true,  // sin buscador si no lo necesitás
        info: true,       // sin texto de "mostrando x de y"
        ordering: true,    // habilita ordenamiento
        columnDefs: [
            { orderable: false, targets: -1 } // desactiva ordenamiento en columna "Eliminar"
        ],
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
        }
    });
});