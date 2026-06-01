document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");
    const yobSelect = document.getElementById("yob");

    // 1. Tối ưu sinh động danh sách Năm sinh (Date of Birth Dropdown)
    if (yobSelect) {
        const currentYear = new Date().getFullYear();
        const maxAllowedYear = currentYear - 18; // Giới hạn người dùng phải từ 18 tuổi trở lên
        const minYear = 1940; // Giới hạn đáy để thanh cuộn gọn gàng

        // Vòng lặp đổ dữ liệu năm từ mới nhất đến cũ nhất
        for (let year = maxAllowedYear; year >= minYear; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yobSelect.appendChild(option);
        }

        // Xử lý đổi màu chữ khi người dùng đã chọn năm (xóa mờ)
        yobSelect.addEventListener('change', function() {
            this.style.color = '#fff';
        });
    }

    if (!registerForm) return;

    // 2. Kiểm tra tính hợp lệ toàn diện của form Đăng ký
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const rePasswordInput = document.getElementById("rePassword");
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

        // Kiểm tra Mật khẩu nhập lại có khớp không
        if (passwordInput.value !== rePasswordInput.value) {
            alert("Mật khẩu nhập lại không khớp, vui lòng kiểm tra lại.");
            rePasswordInput.focus();
            return;
        }

        // Kiểm tra bắt buộc phải chọn năm sinh
        if (!yobSelect.value) {
            alert("Vui lòng lựa chọn năm sinh của bạn.");
            yobSelect.focus();
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