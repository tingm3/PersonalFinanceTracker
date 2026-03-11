$(document).ready(function () {
    // Initialize DataTable
    $('#expenses-table').DataTable({
        paging: true,
        searching: true,
        ordering: true,
        order: [[0, 'desc']],
        pageLength: 10,
        lengthChange: false,
        info: false,
        columnDefs: [
            {targets: 1, orderable: false},
            {targets: 2, orderable: true},
            {targets: 3, orderable: true},
        ],
    });
});
