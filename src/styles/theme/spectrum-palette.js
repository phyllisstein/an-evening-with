/* eslint-disable sort-keys */

import chroma from 'chroma-js'
import R from 'ramda'

export const js = {
    celery400: chroma('rgb(68, 181, 86)'),
    celery500: chroma('rgb(75, 195, 95)'),
    celery600: chroma('rgb(81, 210, 103)'),
    celery700: chroma('rgb(88, 224, 111)'),
    chartreuse400: chroma('rgb(133, 208, 68)'),
    chartreuse500: chroma('rgb(142, 222, 73)'),
    chartreuse600: chroma('rgb(155, 236, 84)'),
    chartreuse700: chroma('rgb(163, 248, 88)'),
    yellow400: chroma('rgb(223, 191, 0)'),
    yellow500: chroma('rgb(237, 204, 0)'),
    yellow600: chroma('rgb(250, 217, 0)'),
    yellow700: chroma('rgb(255, 226, 46)'),
    magenta400: chroma('rgb(216, 55, 144)'),
    magenta500: chroma('rgb(226, 73, 157)'),
    magenta600: chroma('rgb(236, 90, 170)'),
    magenta700: chroma('rgb(245, 107, 183)'),
    fuchsia400: chroma('rgb(192, 56, 204)'),
    fuchsia500: chroma('rgb(207, 62, 220)'),
    fuchsia600: chroma('rgb(217, 81, 229)'),
    fuchsia700: chroma('rgb(227, 102, 239)'),
    purple400: chroma('rgb(146, 86, 217)'),
    purple500: chroma('rgb(157, 100, 225)'),
    purple600: chroma('rgb(168, 115, 233)'),
    purple700: chroma('rgb(180, 131, 240)'),
    indigo400: chroma('rgb(103, 103, 236)'),
    indigo500: chroma('rgb(117, 117, 241)'),
    indigo600: chroma('rgb(130, 130, 246)'),
    indigo700: chroma('rgb(144, 144, 250)'),
    seafoam400: chroma('rgb(27, 149, 154)'),
    seafoam500: chroma('rgb(32, 163, 168)'),
    seafoam600: chroma('rgb(35, 178, 184)'),
    seafoam700: chroma('rgb(38, 192, 199)'),
    red400: chroma('rgb(227, 72, 80)'),
    red500: chroma('rgb(236, 91, 98)'),
    red600: chroma('rgb(247, 109, 116)'),
    red700: chroma('rgb(255, 123, 130)'),
    orange400: chroma('rgb(230, 134, 25)'),
    orange500: chroma('rgb(242, 148, 35)'),
    orange600: chroma('rgb(249, 164, 63)'),
    orange700: chroma('rgb(255, 181, 91)'),
    green400: chroma('rgb(45, 157, 120)'),
    green500: chroma('rgb(51, 171, 132)'),
    green600: chroma('rgb(57, 185, 144)'),
    green700: chroma('rgb(63, 200, 156)'),
    blue400: chroma('rgb(38, 128, 235)'),
    blue500: chroma('rgb(55, 142, 240)'),
    blue600: chroma('rgb(75, 156, 245)'),
    blue700: chroma('rgb(90, 169, 250)'),
    gray50: chroma('rgb(37, 37, 37)'),
    gray75: chroma('rgb(47, 47, 47)'),
    gray100: chroma('rgb(50, 50, 50)'),
    gray200: chroma('rgb(62, 62, 62)'),
    gray300: chroma('rgb(74, 74, 74)'),
    gray400: chroma('rgb(90, 90, 90)'),
    gray500: chroma('rgb(110, 110, 110)'),
    gray600: chroma('rgb(144, 144, 144)'),
    gray700: chroma('rgb(185, 185, 185)'),
    gray800: chroma('rgb(227, 227, 227)'),
    gray900: chroma('rgb(255, 255, 255)'),
}

export const css = R.map(R.invoker(0, 'css'), js)
