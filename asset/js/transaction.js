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
                            html: `<div style="position: relative; display: inline-block;"><button class="filter-btn" onclick="this.nextElementSibling.classList.toggle('open')">
                    ☰ Filters
                </button>
                <div class="filter-panel">
                    <div class="filter-group">
                        <label>Type</label>
                        <select>
                            <option>All</option>
                            <option>Income</option>
                            <option>Expense</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Account</label>
                        <select>
                            <option>All</option>
                            <option>Bank Account</option>
                            <option>Credit Card</option>
                            <option>Cash</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Category</label>
                        <select>
                            <option>All</option>
                            <option>Income</option>
                            <option>Food</option>
                            <option>Shopping</option>
                            <option>Transfer</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Date From</label>
                        <input type="date">
                    </div>
                    <div class="filter-group">
                        <label>Date To</label>
                        <input type="date">
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

    // Single draw handler for both badges and income/expense coloring
    table.on('draw', function () {
        $('#transaction-table tbody tr').each(function () {

            // --- Category badge (column index 2) ---
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
