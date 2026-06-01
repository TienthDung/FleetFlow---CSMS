// 1. Logic chuyển Tab
      function switchTab(tabId, element) {
        document
          .querySelectorAll(".tab-section")
          .forEach((tab) => tab.classList.remove("active"));
        document
          .querySelectorAll(".sidebar-menu a")
          .forEach((nav) => nav.classList.remove("active"));
        document.getElementById(tabId).classList.add("active");
        element.classList.add("active");
      }

      // 2. Hàm ghi log hệ thống dùng chung (BR-18)
      function logAudit(actionDetails) {
        const tbody = document.getElementById("auditLogBody");
        const now = new Date();
        const timeString =
          now.getFullYear() +
          "-" +
          String(now.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(now.getDate()).padStart(2, "0") +
          " " +
          String(now.getHours()).padStart(2, "0") +
          ":" +
          String(now.getMinutes()).padStart(2, "0") +
          ":" +
          String(now.getSeconds()).padStart(2, "0");

        const newRow = `
                <tr style="animation: fadeIn 0.5s;">
                    <td class="small text-muted">${timeString}</td>
                    <td class="fw-medium">AD01 (Admin)</td>
                    <td class="small">192.168.1.5</td>
                    <td class="log-audit-text">ACTION: ${actionDetails}</td>
                </tr>
            `;
        tbody.insertAdjacentHTML("afterbegin", newRow);

        // Hiện Toast/Alert mượt
        const alertHtml = `<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 1100"><div class="toast show align-items-center text-white bg-success border-0" role="alert"><div class="d-flex"><div class="toast-body"><i class="fa-solid fa-check-circle me-2"></i>Cập nhật thành công! Log đã lưu.</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div></div></div>`;
        document.body.insertAdjacentHTML("beforeend", alertHtml);
        setTimeout(() => document.querySelector(".toast").remove(), 3000);
      }

      // 3. Xử lý Vòng đời xe
      function handleFleetStatus(selectEl, plate) {
        const status =
          selectEl.value === "maintenance" ? "Đang bảo dưỡng" : "Sẵn sàng";
        if (selectEl.value === "maintenance") {
          alert(
            `LƯU Ý: Xe ${plate} đã chuyển sang Đang bảo dưỡng. Hệ thống AI đã xóa xe này khỏi danh sách gợi ý chuyến mới.`,
          );
        }
        selectEl.className =
          selectEl.value === "ready"
            ? "form-select form-select-sm d-inline-block w-auto fw-medium text-success"
            : "form-select form-select-sm d-inline-block w-auto fw-medium text-danger";
        logAudit(`Thay đổi trạng thái vòng đời xe ${plate} -> ${status}`);
      }

      // 4. Xử lý Thêm xe mới (BR-19)
      function submitNewVehicle() {
        const modalEl = document.getElementById("addVehicleModal");
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
        document.getElementById("addVehicleForm").reset();
        logAudit("Khởi tạo thành công hồ sơ xe mới vào hệ thống.");
      }

      // 5. Phê duyệt tài xế
      function approveDriver(rowId, name) {
        document.getElementById(rowId).remove();
        let badge = document.getElementById("driverBadge");
        badge.innerText = parseInt(badge.innerText) - 1;
        if (badge.innerText == "0") badge.style.display = "none";
        logAudit(`Phê duyệt thành công hồ sơ eKYC của tài xế ${name}`);
      }