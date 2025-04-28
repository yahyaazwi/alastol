// Sample data for drivers
const drivers = [
    { name: "John Doe", status: "متاح", task: "None" },
    { name: "Jane Smith", status: "في المهمة", task: "Fuel Delivery" }
];

// Function to update driver status with color coding
function updateDriverStatus(index, status) {
    drivers[index].status = status;
    renderDriversTable();
}

// Function to render drivers table with color coding
function renderDriversTable() {
    const tableBody = document.querySelector("#drivers-table tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    drivers.forEach((driver, index) => {
        const row = document.createElement("tr");

        // Apply color coding based on status
        let statusColor = "";
        if (driver.status === "متاح") {
            statusColor = "green";
        } else if (driver.status === "في المهمة") {
            statusColor = "yellow";
        } else if (driver.status === "مشغول") {
            statusColor = "red";
        }

        row.innerHTML = `
            <td>${driver.name}</td>
            <td style="color: ${statusColor}; font-weight: bold;">${driver.status}</td>
            <td>${driver.task}</td>
            <td>
                <button onclick="updateDriverStatus(${index}, 'متاح')">متاح</button>
                <button onclick="updateDriverStatus(${index}, 'في المهمة')">في المهمة</button>
                <button onclick="updateDriverStatus(${index}, 'مشغول')">مشغول</button>
                <button onclick="deleteDriver(${index})">حذف</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Add sorting functionality to the drivers table
function sortTable(columnIndex) {
    const table = document.querySelector("#drivers-table tbody");
    const rows = Array.from(table.rows);

    rows.sort((a, b) => {
        const cellA = a.cells[columnIndex].textContent.trim();
        const cellB = b.cells[columnIndex].textContent.trim();
        return cellA.localeCompare(cellB);
    });

    table.innerHTML = "";
    rows.forEach(row => table.appendChild(row));
}

// Add alert notifications
function showAlert(message, type = "info") {
    const alertBox = document.createElement("div");
    alertBox.className = `alert alert-${type}`;
    alertBox.textContent = message;

    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}

// Function to edit a driver
function editDriver(index) {
    showAlert(`Editing driver: ${drivers[index].name}`, "success");
    // Add edit logic here
}

// Function to delete a driver
function deleteDriver(index) {
    if (confirm("Are you sure you want to delete this driver?")) {
        showAlert(`Deleted driver: ${drivers[index].name}`, "danger");
        drivers.splice(index, 1);
        renderDriversTable();
    }
}

// Function to track service
function trackService() {
    alert("Tracking service...");
}

// Function to request service
function requestService() {
    alert("Requesting service...");
}

// Add loading states for buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        button.textContent = 'جاري التحميل...';
        button.disabled = true;

        // Simulate async operation
        setTimeout(() => {
            button.textContent = 'اضغط هنا';
            button.disabled = false;
        }, 2000);
    });
});

// Add event listeners for sorting
const headers = document.querySelectorAll("#drivers-table thead th");
headers.forEach((header, index) => {
    header.addEventListener("click", () => sortTable(index));
});

// Initial render
renderDriversTable();

// Add login logic
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // تحقق من بيانات تسجيل الدخول
    if (username === 'admin' && password === '1234') {
        localStorage.setItem('loggedInUser', username);
        window.location.href = 'drivers-table.html'; // الانتقال إلى صفحة إدارة السائقين
    } else {
        document.getElementById('login-error').textContent = 'اسم المستخدم أو كلمة المرور غير صحيحة';
    }
});

// Function to add a new driver
function addDriver(name, status, task) {
    const newDriver = { name, status, task };
    drivers.push(newDriver);
    logActivity(`تمت إضافة السائق: ${name}`);
    renderDriversTable();
}

// Function to log activity
function logActivity(message) {
    const activityLog = localStorage.getItem('activityLog') || '';
    const updatedLog = `${activityLog}\n${new Date().toLocaleString()}: ${message}`;
    localStorage.setItem('activityLog', updatedLog);
}

// Event listener for adding a new driver
document.getElementById('add-driver').addEventListener('click', function() {
    const name = prompt('أدخل اسم السائق:');
    if (name) {
        addDriver(name, 'متاح', '');
    }
});
