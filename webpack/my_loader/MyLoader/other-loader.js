module.exports = function(source) {
    let content = source;

    content = content.replace('my_loader', "加油")
    return content
    
}