import rgba from 'color-rgba';

function blendColors(args) {
    let base = args.shift();
    let mix;
    while (args.length !== 0) {
        const added = rgba(args.shift());
        if (typeof added[3] === 'undefined') {
            added[3] = 1;
        }
        if (base[3] && added[3]) {
            mix = [0, 0, 0, 0];
            mix[3] = 1 - (1 - added[3]) * (1 - base[3]);
            mix[0] = Math.round((added[0] * added[3] / mix[3]) + (base[0] * base[3] * (1 - added[3]) / mix[3]));
            mix[1] = Math.round((added[1] * added[3] / mix[3]) + (base[1] * base[3] * (1 - added[3]) / mix[3]));
            mix[2] = Math.round((added[2] * added[3] / mix[3]) + (base[2] * base[3] * (1 - added[3]) / mix[3]));
        } else if (added) {
            mix = added;
        } else {
            mix = base;
        }
        base = mix;
    }
    return 'rgba(' + mix[0] + ',' + mix[1] + ',' + mix[2] + ',' + mix[3] + ')';
}

function randomRgba() {
    const o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

module.exports = {blendColors, randomRgba};