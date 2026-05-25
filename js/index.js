document.addEventListener("DOMContentLoaded", function () {
    const btnBooking = document.getElementById("btnBooking");
    const btnLogin = document.getElementById("btnLogin");

    if (btnBooking) {
        btnBooking.addEventListener("click", function () {
            alert("Hệ thống FleetFlow đang quét tìm xe gần bạn nhất. Vui lòng giữ kết nối!");
        });
    }

    if (btnLogin) {
        btnLogin.addEventListener("click", function () {
            console.log("Mở form đăng nhập hệ thống...");
        });
    }

    // Hiệu ứng khởi chạy mượt mà cho khối chữ bên trái
    const leftText = document.querySelector(".hero-content-left");

    if (leftText) {
        leftText.style.opacity = "0";
        leftText.style.transform = "translateY(15px)";
        leftText.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

        setTimeout(() => {
            leftText.style.opacity = "1";
            leftText.style.transform = "translateY(0)";
        }, 200);
    }
});