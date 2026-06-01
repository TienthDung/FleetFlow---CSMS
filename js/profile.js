document.addEventListener('DOMContentLoaded', function() {
            
            // 1. XỬ LÝ ĐỔI ẢNH ĐẠI DIỆN (AVATAR)
            const avatarInput = document.getElementById('avatarInput');
            const userAvatarImg = document.getElementById('userAvatarImg');

            if (avatarInput && userAvatarImg) {
                avatarInput.addEventListener('change', function(e) {
                    const file = e.target.files[0];
                    if (file) {
                        if (!file.type.match('image.*')) {
                            alert('Vui lòng chỉ chọn file định dạng hình ảnh (JPG, PNG).');
                            avatarInput.value = '';
                            return;
                        }
                        const reader = new FileReader();
                        reader.onload = function(event) {
                            userAvatarImg.src = event.target.result;
                        }
                        reader.readAsDataURL(file);
                    }
                });
            }

            // 2. XỬ LÝ TẢI LÊN & PREVIEW ẢNH eKYC
            const fileInputs = document.querySelectorAll('.file-input');

            fileInputs.forEach(input => {
                input.addEventListener('change', function(e) {
                    const file = e.target.files[0];
                    const uploadBox = input.nextElementSibling;
                    const previewImg = uploadBox.querySelector('.preview-img');

                    if (file) {
                        if (!file.type.match('image.*')) {
                            alert('Vui lòng chỉ chọn file hình ảnh (JPG, PNG).');
                            input.value = ''; 
                            return;
                        }

                        const reader = new FileReader();
                        reader.onload = function(event) {
                            previewImg.src = event.target.result; 
                            uploadBox.classList.add('has-img');
                        }
                        reader.readAsDataURL(file);
                    }
                });
            });
        });

        // 3. HÀM XÓA ẢNH ĐÃ CHỌN TRONG eKYC
        function removeImage(event, inputId) {
            event.stopPropagation(); 
            const input = document.getElementById(inputId);
            const uploadBox = input.nextElementSibling;
            const previewImg = uploadBox.querySelector('.preview-img');
            
            input.value = '';
            previewImg.src = '';
            uploadBox.classList.remove('has-img');
        }