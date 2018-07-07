// Модуль для генирации случайной строки
const randToken = require('rand-token'); 

class RenameHelper {
    // Вернет раширение файла "jpg", "gif", ...
    static getFileExtension(fileName) {
        let a = fileName.split(".");

        if( a.length === 1 || ( a[0] === "" && a.length === 2 ) ) {
            return "";
        }

        return a.pop();
    }

    static reName(Name) {
        // Получаем имя файла
        let fileName = Name;

        // Получаем расширение файла
        let fileExtension = this.getFileExtension(fileName);
   
        // "qwqwefwefvweqvwevwevwevw" + "12312123123123123123" + "." + "jpg"
        return fileName = randToken.uid(5) + (new Date().getTime()) + "." + fileExtension;
    }
}

module.exports = RenameHelper;