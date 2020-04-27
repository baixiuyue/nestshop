
import { format } from 'silly-datetime';
import * as md5 from 'md5';
import * as svgCaptcha from 'svg-captcha';
import * as jwt from 'jsonwebtoken';
import { Config } from '../config/config';
import * as redisStore from 'cache-manager-redis-store';
import * as cacheManager from 'cache-manager';
export class Helper {
    static formatTime(params, format) {
        return format(params, format || 'YYYY-MM-DD HH:mm');
    }
    static getMd5(str: string) {
        return md5(str);
    }
    static getCaptcha() {
        let captcha = svgCaptcha.create({
            size: 2,
            fontSize: 50,
            width: 100,
            height: 34,
            background: "#cc9966"
        });
        return captcha;
    }
    static createToken(obj: Object) { // 创建token 解密 jwt.verify(token,Config.tokenKey);
        return jwt.sign(obj, Config.tokenKey, { expiresIn: Config.expiresInToken });
    }
    // https://www.javascriptcn.com/read-57903.html
    //import * as redisStore from 'cache-manager-redis-store';
    // import * ascacheManager from 'cache-manager';
    // var cacheManager = cacheManager.caching({store: redisStore, ttl: 10});
    // set(key, val, {ttl: ttl}, cb) // * see note below
    // get(key, cb)
    // del(key, cb)
    // mset(key1, val1, key2, val2, {ttl: ttl}, cb) // set several keys at once
    // mget(key1, key2, key3, cb) // get several keys at once
    // // key 是string类型
    // cacheManager.set(key, val, {ttl: ttl},(err, result) => {
    //     console.log(result)
    // })
    // cacheManager.get(key, (err, result) => {
    //     //过期返回 undefined
    //     console.log(result);
    // });
    // cacheManager.del(key, (err, result) => {
    //     console.log(result);
    // });
    static cacheManager = cacheManager.caching({store: redisStore, ttl: Config.redisTtl});
}
