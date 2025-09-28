const Messages = {
    greet: "<p style='color:blue'>Hello %1. What a beautiful day. Server current date and time is %2</p>",
    noName: "<p style='color:red'>No name provided</p> <p style='color:blue'>",
    noText: '<p style="color: red;">Error: Please provide text parameter</p>',
    success: '<p style="color: green;">Successfully appended "%1" to %2</p>',
    error: '<p style="color: red;">Error writing to file: %1</p>',
    notFound: '<p style="color: red;">404 Error: File "%1" not found</p>',
    errorReadingFile: '<p style="color: red;">Error reading file: %1</p>'
};

module.exports = Messages;