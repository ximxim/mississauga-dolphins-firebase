export const imageAspects = {
    small: {
        formula: (h, w) => h === w,
        error: 'Unexpected height and width of the image. Make sure your image is of equal dimensions. Try again with a different image.',
    },
    medium: '4:3',
    large: '16.9',
};
