$(document).ready(function () {
    // once HTML is loaded, then run this script
    $('#expenses-table').DataTable({
        // calls the DataTables plugin
        paging: true, // allow pagination
        searching: true, // allowing search of data
        ordering: true, // adding ordering by column
        order: [[0, 'desc']], // default sort: first column (index 0) descending
        pageLength: 10,
        lengthChange: false, // user cannot change the number of rows per page
        info: false, // Showing 1 to 10 of 57 entries is hidden
    });
});
