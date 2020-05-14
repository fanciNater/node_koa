class RespJson {
    constructor(code, message, data, total) {
        this.code = code;
        this.message = message;
        this.data = data || undefined;
        this.total = total || undefined;
    }
}

module.exports = RespJson;