
import { format } from 'silly-datetime';
import * as md5 from 'md5';
export class Helper {
    static formatTime(params, format) {
        return format(params, format || 'YYYY-MM-DD HH:mm');
    }
    static getMd5(str: string) {
        return md5(str);
    }
    static publicPipe(schema, values) {
        const { error } = schema.validate(values);
        let errMsgs: string[] = [];
        if (error) {
            const keys = [];
            error.details.forEach(e => {
                const { key, label } = e.context;
                if (keys.indexOf(key) === -1) {
                    errMsgs.push(label);
                    keys.push(key);
                }
            });
            errMsgs = [...new Set(errMsgs)];
        }

        return errMsgs.length > 0 ? errMsgs : values;
    }
}
