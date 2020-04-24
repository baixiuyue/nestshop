
import { format } from 'silly-datetime';
import * as md5 from 'md5';
import * as svgCaptcha from 'svg-captcha';

export class Helper {
    static formatTime(params, format) {

        return format(params, format || 'YYYY-MM-DD HH:mm');
    }

}
export function getMd5(str:string){
    return md5(str);
}
export function getCaptcha() {
    let captcha = svgCaptcha.create({
        size: 2,
        fontSize: 50,
        width: 100,
        height: 34,
        background: "#cc9966"
    });
    return captcha;
}
