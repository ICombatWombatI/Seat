const randToken = require('rand-token'); 

class mysqlHelper {

    /* 
        objList = [{id: 5, name: 'A5'}, ... , {id: 100, name: 'A100'}]
        filedName = 'id' -> [5, ... , 100]
        filedName = 'name' -> ['A5', ... , 'A100'] 
    */
    static getValueList(objList, filedName) {
        const valueList = [];

        for (let i = 0; i < objList.length; i++) {
            valueList.push(objList[i][filedName]);
        }

        return valueList;
    }

    /* 
        await promises["images"];
        await promises["addons"];
    */
    static async getPromisesData(promises) {
        const data = {};

        for (let key in promises) {
            data[key] = await promises[key];
        }

        return data;
    }

    /*
        objList = [{id: 5, name: 'A5', desription: 'desc1'}, ... , {id: 100, name: 'A100', desription: 'desc2'}]
        fields = {id: 5, name: 'A5'} -> [{desription: 'desc1'}]
    */
    static getObjList(objList, fields) {
        const data = [];

        function checkFileds(objItem, fields) {

            for (let fieldName in fields) {
                if (objItem[fieldName] != fields[fieldName]) {
                    return false;
                } 
            }

            return true;
        }

        function sanitazeItem(item, fields) {
            let sanitazeItem = item;

            for (let propName in fields) {
                delete sanitazeItem[propName];
            }
    
            return sanitazeItem;
        }

        for (let i = 0; i < objList.length; i++) {
            if (checkFileds(objList[i], fields)) {
                data.push(sanitazeItem(objList[i], fields));
            }
       }

        return data;
    }

    static fieldTrim(field) {
        return field.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }

    static fieldToArray(field) {
        let a = field.split(",");
        let b = [];
        for (let i = 0; i < a.length; i++) {
            b[i] = this.fieldTrim(a[i]);
        }

        return b;
    }

    static sanitazeArray(arr) {
        let sanitazedArr = [];

        for (let i in arr) {
            let val = Math.ceil(parseInt(arr[i]));
            sanitazedArr.push(val);
        }

        return sanitazedArr;
    }

    static mysql_real_escape_string (str) {
        return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
            switch (char) {
                case "\0":
                    return "\\0";
                case "\x08":
                    return "\\b";
                case "\x09":
                    return "\\t";
                case "\x1a":
                    return "\\z";
                case "\n":
                    return "\\n";
                case "\r":
                    return "\\r";
                case "\"":
                case "'":
                case "\\":
                case "%":
                    return "\\"+char; // prepends a backslash to backslash, percent,
                                      // and double/single quotes
            }
        });
    }

    static getFileExtension(fileName) {
        let a = fileName.split(".");

        if( a.length === 1 || ( a[0] === "" && a.length === 2 ) ) {
            return "";
        }

        return a.pop();
    }

    static cutFileExtension(fileName) {
        return fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
    }

    static renameFileToRand(filedName) {
        // Получаем расширение файла
        let fileExtension = this.getFileExtension(filedName);

        // "qwqwefwefvweqvwevwevwevw" + "12312123123123123123" + "." + "jpg"
        return randToken.uid(256) + (new Date().getTime()) + "." + fileExtension;
    }
}

module.exports = mysqlHelper;