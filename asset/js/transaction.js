$(document).ready(function () {
    var table = new DataTable('#transaction-table', {
        lengthMenu: [[10, 25, 50, 100], ['10', '25', '50', '100']],
        pageLength: 10,
        layout: {
            topStart: {
                features: [{
                    div: {
                        html: `
                <div class="btn-new-wrapper">
                    <button class="btn-add" onclick="this.nextElementSibling.classList.toggle('open')">+ New ▾</button>
                    <div class="btn-new-dropdown">
                        <button class="btn-new-option">+ Add</button>
                        <button class="btn-new-option">Import</button>
                    </div>
            </div>`
                    }
                }]
            },
            topEnd: {
                features: [
                    {
                        div: {
                            html: `<div style="position: relative; display: inline-block;">
                <button class="filter-btn" id="filter-toggle-btn" onclick="this.nextElementSibling.classList.toggle('open')">
                    ☰ Filters
                </button>
                <div class="filter-panel" id="filter-panel">
                    <div class="filter-group">
                        <label>Type</label>
                        <select id="filter-type">
                            <option value="">All</option>
                            <option value="Income">Income</option>
                            <option value="Expense">Expense</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Account</label>
                        <select id="filter-account">
                            <option value="">All</option>
                            <option value="Bank Account">Bank Account</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Wallet">Wallet</option>
                            <option value="Checking">Checking</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Category</label>
                        <select id="filter-category">
                            <option value="">All</option>
                            <option value="Income">Income</option>
                            <option value="Food">Food</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Transfer">Transfer</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Date From</label>
                        <input type="date" id="filter-date-from">
                    </div>
                    <div class="filter-group">
                        <label>Date To</label>
                        <input type="date" id="filter-date-to">
                    </div>
                    <div class="filter-group" style="flex-direction: row; gap: 8px; margin-top: 4px;">
                        <button id="filter-apply-btn" class="btn-new-option" style="flex:1;">Apply</button>
                        <button id="filter-clear-btn" class="btn-new-option" style="flex:1;">Clear</button>
                    </div>
                </div>
             </div>`
                        }
                    },
                    'search'
                ]
            },
            bottomStart: 'info',
            bottomEnd: {
                features: ['pageLength', 'paging']
            }
        }
    });

    //filter for Type
    $.fn.dataTable.ext.search.push(function (settings, data) {
        var val = $('#filter-type').val();
        if (!val) return true;
        return data[4].trim() === val;
    });

    //filter for Account
    $.fn.dataTable.ext.search.push(function (settings, data) {
        var val = $('#filter-account').val();
        if (!val) return true;
        return data[3].trim() === val;
    });

    //filter for Category
    $.fn.dataTable.ext.search.push(function (settings, data) {
        var val = $('#filter-category').val();
        if (!val) return true;
        return data[2].trim() === val;
    });

    //filter for date
    $.fn.dataTable.ext.search.push(function (settings, data) {
        var from = $('#filter-date-from').val();
        var to = $('#filter-date-to').val();
        var date = data[0].trim();

        //invalid date
        if (from && date < from) return false;
        if (to && date > to) return false;
        return true;
    });


    //apply button
    $(document).on('click', '#filter-apply-btn', function () {
        table.draw();
        updateFilterBadge();
        $('#filter-panel').removeClass('open');
    });

    //clear button
    $(document).on('click', '#filter-clear-btn', function () {
        $('#filter-type, #filter-account, #filter-category').val('');
        $('#filter-date-from, #filter-date-to').val('');
        table.draw();
        updateFilterBadge();
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('#filter-panel, #filter-toggle-btn').length) {
            $('#filter-panel').removeClass('open');
        }
    });

    //coloring the badges
    table.on('draw', function () {
        $('#transaction-table tbody tr').each(function () {

            var categoryCell = $(this).find('td:eq(2)');
            var category = categoryCell.text().trim();

            var badgeMap = {
                'Income': 'green-badge',
                'Food': 'yellow-badge',
                'Shopping': 'pink-badge',
                'Transfer': 'blue-badge',
            };

            var badgeClass = badgeMap[category] || 'yellow-badge';
            categoryCell.html(`<span class="soft-badge ${badgeClass}">${category}</span>`);

            var amountCell = $(this).find('td:eq(5)');
            var amount = parseFloat(amountCell.text());
            amountCell.removeClass('text-income text-expense');
            if (amount > 0) {
                amountCell.addClass('text-income');
            } else if (amount < 0) {
                amountCell.addClass('text-expense');
            }
        });
    }).draw();
});
