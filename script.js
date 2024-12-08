// مصفوفة لتخزين الطلبات مؤقتًا
let ordersArray = [];

// مرجع العناصر في HTML
const orderForm = document.getElementById("orderForm");
const orderList = document.getElementById("orderList");
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");

// إضافة طلب جديد
orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newOrder = {
        customerName: document.getElementById("customerName").value.trim(),
        orderNumber: parseInt(document.getElementById("orderNumber").value.trim()),
        orderPrice: parseFloat(document.getElementById("orderPrice").value.trim()),
        discountedPrice: parseFloat(document.getElementById("discountedPrice").value.trim()),
        orderType: document.getElementById("orderType").value.trim(),
        shippingCompany: document.getElementById("shippingCompany").value.trim(),
        orderAddress: document.getElementById("orderAddress").value.trim(),
        customerPhone: document.getElementById("customerPhone").value.trim(),
        orderDate: document.getElementById("orderDate").value.trim(),
        orderNotes: document.getElementById("orderNotes").value.trim() || "لا توجد ملاحظات",
    };

    // تحقق من عدم تكرار رقم الطلب
    if (ordersArray.find(order => order.orderNumber === newOrder.orderNumber)) {
        alert("رقم الطلب موجود بالفعل. الرجاء استخدام رقم طلب مختلف.");
        return;
    }

    ordersArray.push(newOrder);
    orderForm.reset();
    renderOrders();
    alert("تم إضافة الطلب بنجاح!");
});

// عرض الطلبات
function renderOrders() {
    orderList.innerHTML = "";

    if (ordersArray.length === 0) {
        orderList.innerHTML = "<p>لا توجد طلبات مضافة.</p>";
        return;
    }

    ordersArray.forEach(order => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <div><strong>اسم العميل:</strong> ${order.customerName}</div>
            <div><strong>رقم الطلب:</strong> ${order.orderNumber}</div>
            <div><strong>سعر الطلب:</strong> ${order.orderPrice}</div>
            <div><strong>سعر بعد الخصم:</strong> ${order.discountedPrice}</div>
            <div><strong>نوع الطلب:</strong> ${order.orderType}</div>
            <div><strong>شركة الشحن:</strong> ${order.shippingCompany}</div>
            <div><strong>العنوان:</strong> ${order.orderAddress}</div>
            <div><strong>رقم الهاتف:</strong> ${order.customerPhone}</div>
            <div><strong>تاريخ الطلب:</strong> ${order.orderDate}</div>
            <div><strong>ملاحظات:</strong> ${order.orderNotes}</div>
            
            <button class="edit-btn" data-id="${order.orderNumber}">تعديل</button>
            <button class="delete-btn" data-id="${order.orderNumber}">حذف</button>
        `;

        // ربط الأحداث بأزرار التعديل والحذف
        listItem.querySelector(".edit-btn").addEventListener("click", () => openEditModal(order.orderNumber));
        listItem.querySelector(".delete-btn").addEventListener("click", () => deleteOrder(order.orderNumber));

        orderList.appendChild(listItem);
    });
}

// حذف طلب
function deleteOrder(orderNumber) {
    if (confirm("هل أنت متأكد من رغبتك في حذف هذا الطلب؟")) {
        ordersArray = ordersArray.filter(order => order.orderNumber !== orderNumber);
        renderOrders();
        alert("تم حذف الطلب بنجاح.");
    }
}

// فتح نافذة تعديل الطلب
function openEditModal(orderNumber) {
    const order = ordersArray.find(order => order.orderNumber === orderNumber);
    if (!order) {
        alert("لم يتم العثور على الطلب.");
        return;
    }

    document.getElementById("editCustomerName").value = order.customerName;
    document.getElementById("editOrderNumber").value = order.orderNumber;
    document.getElementById("editOrderPrice").value = order.orderPrice;
    document.getElementById("editDiscountedPrice").value = order.discountedPrice;
    document.getElementById("editOrderType").value = order.orderType;
    document.getElementById("editShippingCompany").value = order.shippingCompany;
    document.getElementById("editOrderAddress").value = order.orderAddress;
    document.getElementById("editCustomerPhone").value = order.customerPhone;
    document.getElementById("editOrderDate").value = order.orderDate;
    document.getElementById("editOrderNotes").value = order.orderNotes;

    editModal.style.display = "block";

    editForm.onsubmit = (e) => {
        e.preventDefault();
        updateOrder(orderNumber);
        editModal.style.display = "none";
    };
}

// تحديث الطلب
function updateOrder(orderNumber) {
    const index = ordersArray.findIndex(order => order.orderNumber === orderNumber);
    if (index === -1) return;

    ordersArray[index] = {
        customerName: document.getElementById("editCustomerName").value.trim(),
        orderNumber: orderNumber,
        orderPrice: parseFloat(document.getElementById("editOrderPrice").value.trim()),
        discountedPrice: parseFloat(document.getElementById("editDiscountedPrice").value.trim()),
        orderType: document.getElementById("editOrderType").value.trim(),
        shippingCompany: document.getElementById("editShippingCompany").value.trim(),
        orderAddress: document.getElementById("editOrderAddress").value.trim(),
        customerPhone: document.getElementById("editCustomerPhone").value.trim(),
        orderDate: document.getElementById("editOrderDate").value.trim(),
        orderNotes: document.getElementById("editOrderNotes").value.trim() || "لا توجد ملاحظات",
    };

    renderOrders();
    alert("تم تحديث الطلب بنجاح!");
}

// إغلاق النوافذ عند الضغط على زر الإغلاق
document.querySelectorAll(".close").forEach(closeBtn => {
    closeBtn.addEventListener("click", () => {
        editModal.style.display = "none";
        imageModal.style.display = "none";
    });
});
