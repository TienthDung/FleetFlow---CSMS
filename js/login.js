document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("form");
    
    if (!loginForm) return;

    loginForm.addEventListener("submit", function (e) {
        // Ngăn chặn trình duyệt reload lại trang ngay lập tức khi submit
        e.preventDefault();

        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const submitBtn = document.querySelector(".btn-login-submit");

        // 1. Kiểm tra định dạng Email bằng biểu thức chính quy (Regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            alert("Vui lòng nhập đúng định dạng email (ví dụ: name@company.com).");
            emailInput.focus();
            return;
        }

        // 2. Kiểm tra độ dài mật khẩu (Tối thiểu 6 ký tự để đảm bảo an toàn)
        if (passwordInput.value.length < 6) {
            alert("Mật khẩu bảo mật phải chứa ít nhất 6 ký tự.");
            passwordInput.focus();
            return;
        }

        // 3. Tối ưu trạng thái nút bấm (Chống spam double-click)
        submitBtn.disabled = true;
        // Sử dụng spinner tích hợp sẵn của Bootstrap 5
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Đang xử lý...';

        // 4. Giả lập quá trình gửi dữ liệu tới Server (Backend Servlet)
        setTimeout(() => {
            alert("Đăng nhập vào hệ thống FleetFlow thành công!");
            
            // Sau khi tối ưu hoàn tất, bỏ comment dòng dưới đây để form gửi dữ liệu lên hệ thống thật:
            // loginForm.submit();
            
            window.location.href = "index.html";
        }, 1500);
    });
});