import _ from 'lodash';

export const humanize = (number) => {
    if (number <= 10) {
        return number;
    } else if (number < 1000) {
        const config = [
            { key: 900, value: '900+' },
            { key: 800, value: '800+' },
            { key: 700, value: '700+' },
            { key: 600, value: '600+' },
            { key: 500, value: '500+' },
            { key: 400, value: '400+' },
            { key: 300, value: '300+' },
            { key: 200, value: '200+' },
            { key: 100, value: '100+' },
            { key: 50, value: '50+' },
            { key: 10, value: '10+' },
        ];
        const bracket = _.find(config, element => element.key < number);

        return bracket.value;
    } else if (number < 100000) {
        return `${(number / 1000).toFixed(1)} k`;
    } else if (number < 1000000) {
        return `${(number / 1000).toFixed(0)} k`;
    } else if (number > 1000000) {
        return `${(number / 1000000).toFixed(1)} k`;
    } else {
        return number;
    }
};
