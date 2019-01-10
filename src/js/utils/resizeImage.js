export const resize = ({
    file,
    width,
    height,
    filename,
}) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
            const elem = document.createElement('canvas');
            elem.width = width;
            elem.height = height;
            const ctx = elem.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            ctx.canvas.toBlob(blob => resolve(new File([blob], filename, {
                type: 'image/png',
                lastModified: Date.now(),
            })), 'image/png', 1);
        };
        reader.onerror = error => reject(error);
    };
});
