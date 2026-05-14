document.addEventListener('DOMContentLoaded', () => {
    // === 1. BỎ HOÀN TOÀN TÍNH NĂNG LẮC LƯ 3D ===
    const card = document.querySelector('.profile-card');
    
    if (window.matchMedia("(pointer: fine)").matches) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Quầng sáng nhẹ nhàng lướt trên mặt kính (Glare effect)
            card.style.background = `
                radial-gradient(
                    circle 400px at ${x}px ${y}px, 
                    rgba(255, 255, 255, 0.8), 
                    rgba(255, 255, 255, 0.45)
                )
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = 'rgba(255, 255, 255, 0.55)';
            card.style.transition = 'background 0.5s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    }

    // === 2. HIỆU ỨNG TỪ TÍNH (MAGNETIC HOVER) ĐÃ SỬA LỖI LỆCH TÂM ===
    const magnets = document.querySelectorAll('.btn, .social-icon, .avatar-container');

    magnets.forEach((magnet) => {
        // Fix lỗi: Khi áp dụng từ tính cho Avatar đang nổi, phải giữ lại thuộc tính translateX(-50%)
        const isAvatar = magnet.classList.contains('avatar-container');
        const baseTransform = isAvatar ? 'translateX(-50%) ' : '';

        magnet.addEventListener('mousemove', function(e) {
            const rect = magnet.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Hút dính cực êm mà không làm hỏng tọa độ căn giữa
            magnet.style.transform = `${baseTransform}translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
            magnet.style.transition = 'transform 0.1s ease-out';
        });

        magnet.addEventListener('mouseleave', function() {
            magnet.style.transform = `${baseTransform}translate(0px, 0px) scale(1)`;
            magnet.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
        });
    });
});