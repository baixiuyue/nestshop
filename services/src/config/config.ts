export class Config {
    static mongmdbUrl = 'mongodb://localhost/nestxiaomi';
    static adminPath = 'admin'; // admin路有前缀
    static apiPath = 'api'; // api路有前缀
    static defaultPath = 'default'; // default路有前缀
    static sessionMaxAge = 60 * 1000; // session过期时间 验证码存在这里
    static uploadDir = 'upload'; // 文件上传目录
    static initPageSize = 20; // 默认分页显示条数
    static tokenKey = 'moonligth mongodb study'; // tokenKey加密方式
    static expiresInToken = 24 * 60 * 100; // token过期时间
    static redisTtl = 24 * 60 * 100; // 缓存过期时间
}