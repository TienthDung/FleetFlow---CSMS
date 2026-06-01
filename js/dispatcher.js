function switchTab(tabId, element) {
            document.querySelectorAll('.tab-section').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.sidebar-menu a').forEach(nav => nav.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
            element.classList.add('active');
        }

        function approveBooking(rowId) {
            const row = document.getElementById(rowId);
            if(row) {
                row.style.transition = "all 0.5s ease";
                row.style.opacity = "0";
                row.style.transform = "translateX(20px)";
                setTimeout(() => {
                    row.remove();
                    updateBadgeCount('approvalCount');
                    alert("✅ Đã phát sóng đơn Open Job thành công! Lệnh đang được gửi đến các tài xế trong khu vực.");
                }, 500);
            }
        }

        function rejectBooking(rowId) {
            if(confirm("Bạn có chắc chắn muốn từ chối đơn đặt xe này?")) {
                document.getElementById(rowId).remove();
                updateBadgeCount('approvalCount');
            }
        }

        function updateBadgeCount(elementId) {
            const badge = document.getElementById(elementId);
            let currentCount = parseInt(badge.innerText);
            if(currentCount > 0) badge.innerText = currentCount - 1;
            if(currentCount - 1 === 0) badge.style.display = 'none';
        }

        function handleSOS() {
            const sosBox = document.getElementById('sosBox');
            sosBox.style.animation = "none";
            sosBox.style.border = "1px solid #00B14F";
            sosBox.style.backgroundColor = "#e6fffa";
            sosBox.innerHTML = `
                <div class="d-flex align-items-center">
                    <i class="fa-solid fa-circle-check text-success fs-2 me-3"></i>
                    <div>
                        <h5 class="fw-bold text-success mb-0">Đang xử lý sự cố #BK-888</h5>
                        <p class="m-0 text-dark small">Bạn đã tiếp nhận. Vui lòng liên hệ tài xế qua bộ đàm hoặc điện thoại.</p>
                    </div>
                </div>
            `;
        }

        function resolveDispute() {
            const row = document.getElementById('row-dispute1');
            row.style.opacity = "0.5";
            row.querySelector('td:nth-child(4)').innerHTML = '<span class="badge bg-success">Đã giải quyết</span>';
            row.querySelector('.btn-detail').disabled = true;
            alert("Đã cập nhật hướng xử lý và mở băng hóa đơn tự động.");
        }