//判断当前字符串是否以str开始 先判断是否存在function是避免和js原生方法冲突，自定义方法的效率不如原生的高
if (typeof String.prototype.startWith != 'function') {
    String.prototype.startWith = function(str) {
        return this.slice(0, str.length) == str;
    };
}　　　　
//判断当前字符串是否以str结束
if (typeof String.prototype.endWith != 'function') {
    String.prototype.endWith = function(str) {
        return this.slice(-str.length) == str;
    };
}