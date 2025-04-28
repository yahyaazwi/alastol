document.querySelectorAll('.permit-thumbnail').forEach(img => {
    img.addEventListener('mouseover', () => {
        img.style.cursor = 'pointer';
    });
});

document.querySelectorAll('.manage-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Show modal for managing companies
    });
});