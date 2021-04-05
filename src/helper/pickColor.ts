export type Color = [number, number, number];

export const pickColor = (color1: Color, color2: Color, weight: number): Color => {
    const w = weight * 2 - 1;
    const w1 = (w + 1) / 2;
    const w2 = 1 - w1;
    return [Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2)];
}
