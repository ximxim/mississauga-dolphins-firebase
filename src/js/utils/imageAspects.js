export const imageAspects = {
    small: {
        formula: ({ height, width }) => height === width,
        error: 'Unexpected height and width of the image. Make sure your image is of equal dimensions. Try again with a different image.',
        thumbnail: {
            height: 100,
            width: 100,
        },
    },
    medium: {
        formula: ({ height, width }) => height === (3 / 4 * width),
        error: 'Unexpected height and width of the image. Image with aspect ratio 4:3 is expected such as 1280 pixels width and 720 pixels height. Try again with a different image.',
        thumbnail: {
            height: 100,
            width: 100,
        },
    },
    large: {
        formula: ({ height, width }) => height === (9 / 16 * width),
        error: 'Unexpected height and width of the image. Image with aspect ratio 16:9 is expected such as 1920 pixels width and 1080 pixels height. Try again with a different image.',
        thumbnail: {
            height: 100,
            width: 100,
        },
    },
};
