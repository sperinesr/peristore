function confirmDelete(productId) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Crear y enviar un formulario oculto
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = `/admin/delete/${productId}`;

            document.body.appendChild(form);
            form.submit();
        }
    });
}
// Función para mostrar una alerta de éxito al crear un producto
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('created') === '1') {
    Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: 'El producto se ha guardado correctamente',
        timer: 2000,
        showConfirmButton: false
    });

    // Limpia la URL para que no vuelva a mostrar la alerta al recargar
    const url = new URL(window.location);
    url.searchParams.delete('created');
    window.history.replaceState({}, document.title, url);
}
// Función para mostrar una alerta de éxito al actualizar un producto
if (urlParams.get('updated') === '1') {
    Swal.fire({
        icon: 'success',
        title: 'Productos actualizados',
        text: 'Los productos se han actualizado correctamente',
        timer: 2000,
        showConfirmButton: false
    });

    // Limpia la URL para que no vuelva a mostrar la alerta al recargar
    const url = new URL(window.location);
    url.searchParams.delete('updated');
    window.history.replaceState({}, document.title, url);
}
// Función para mostrar una alerta de éxito al eliminar un producto
if (urlParams.get('deleted') === '1') {
    Swal.fire({
        icon: 'success',
        title: 'Producto eliminado',
        text: 'El producto se ha eliminado correctamente',
        timer: 2000,
        showConfirmButton: false
    });

    // Limpia la URL para que no vuelva a mostrar la alerta al recargar
    const url = new URL(window.location);
    url.searchParams.delete('deleted');
    window.history.replaceState({}, document.title, url);
}