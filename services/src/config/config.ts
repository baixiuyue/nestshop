export class Config {
    static mongmdbUrl = 'mongodb://localhost/nestxiaomi';
    static adminPath = 'admin'; // admin路有前缀
    static apiPath = 'api'; // api路有前缀
    static defaultPath = 'default'; // default路有前缀
    static sessionMaxAge = 30 * 1000 * 60; // session过期时间
    static uploadDir = 'upload'; // 文件上传目录
    static initPageSize = 20; // 默认分页显示条数
}