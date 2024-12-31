document.addEventListener('DOMContentLoaded', () => {
    const addItemButton = document.getElementById('addItemButton');
    const tableBody = document.getElementById('itemTableBody');
    const summary = document.getElementById('summary');

    let subtotal = 0;
    let totalTax = 0;

    const updateSummary = () => {
        const grandTotal = subtotal + totalTax;
        summary.textContent = `Subtotal: $${subtotal.toFixed(2)} | Total Tax: $${totalTax.toFixed(2)} | Grand Total: $${grandTotal.toFixed(2)}`;
    };

    addItemButton.addEventListener('click', () => {
        // Retrieve form data
        const itemName = document.getElementById('itemName').value;
        const itemPrice = parseFloat(document.getElementById('itemPrice').value);
        const itemQuantity = parseInt(document.getElementById('itemQuantity').value);
        const itemTax = parseFloat(document.getElementById('itemTax').value);

        // Validate inputs
        if (!itemName || isNaN(itemPrice) || isNaN(itemQuantity) || isNaN(itemTax)) {
            alert('Please fill in all fields correctly.');
            return;
        }

        // Calculate totals
        const itemTotalWithoutTax = itemPrice * itemQuantity;
        const itemTaxAmount = (itemTax / 100) * itemTotalWithoutTax;
        const itemTotalWithTax = itemTotalWithoutTax + itemTaxAmount;

        // Update overall totals
        subtotal += itemTotalWithoutTax;
        totalTax += itemTaxAmount;

        // Add item to the table
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${itemName}</td>
            <td>$${itemPrice.toFixed(2)}</td>
            <td>${itemQuantity}</td>
            <td>${itemTax.toFixed(2)}%</td>
            <td>$${itemTotalWithTax.toFixed(2)}</td>
        `;
        tableBody.appendChild(row);

        // Update summary
        updateSummary();

        // Reset form fields
        document.getElementById('itemName').value = '';
        document.getElementById('itemPrice').value = '';
        document.getElementById('itemQuantity').value = '';
        document.getElementById('itemTax').value = '';
    });
});
