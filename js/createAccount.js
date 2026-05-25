document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.querySelector("form");
    const dobSelect = document.getElementById("dob");

    // 1. Tối ưu sinh động danh sách Năm sinh (Date of Birth Dropdown)
    if (dobSelect) {
        const currentYear = new Date().getFullYear();
        const startYear = 1970;
        const endYear = currentYear - 16; // Giới hạn người dùng phải từ 16 tuổi trở lên

        // Reset lại nội dung ban đầu của thẻ select
        dobSelect.innerHTML = '<option value="" disabled selected>Select</option>';

        // Vòng lặp đổ dữ liệu năm từ mới nhất đến cũ nhất
        for (let year = endYear; year >= startYear; year--) {
            const option = document.createElement("option");
            option.value = year;
            option.textContent = year;
            dobSelect.appendChild(option);
        }
    }

    if (!registerForm) return;

    // 2. Kiểm tra tính hợp lệ toàn diện của form Đăng ký
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const submitBtn = document.querySelector(".btn-login-submit");

        // Kiểm tra trường Họ và Tên không được bỏ trống hoặc quá ngắn
        if (nameInput.value.trim().length < 2) {
            alert("Vui lòng nhập tên hợp lệ (tối thiểu 2 ký tự).");
            nameInput.focus();
            return;
        }

        // Kiểm tra định dạng Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            alert("Vui lòng nhập chính xác địa chỉ email.");
            emailInput.focus();
            return;
        }

        // Kiểm tra độ dài mật khẩu
        if (passwordInput.value.length < 6) {
            alert("Mật khẩu bảo mật đăng ký phải chứa ít nhất 6 ký tự.");
            passwordInput.focus();
            return;
        }

        // Kiểm tra bắt buộc phải chọn năm sinh
        if (!dobSelect.value) {
            alert("Vui lòng lựa chọn năm sinh của bạn.");
            dobSelect.focus();
            return;
        }

        // 3. Hiệu ứng tải dữ liệu khi bấm nút Đăng ký
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Đang khởi tạo tài khoản...';

        // Giả lập kết nối Cơ sở dữ liệu và lưu thông tin tài khoản thành công
        setTimeout(() => {
            alert("Tạo tài khoản FleetFlow thành công! Hệ thống sẽ chuyển hướng sang trang đăng nhập.");
            
            // Bỏ comment dòng này khi kết nối với logic của Controller Servlet phía Backend:
            // registerForm.submit();
            
            window.location.href = "login.html";
        }, 1500);
    });
});