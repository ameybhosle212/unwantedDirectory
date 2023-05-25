const fs = require('fs');
const path = require('path');
const universalLibraryCollector = []



const collectAllLibrary = ()=>{
    let allLibraries = fs.readdirSync(path.join(__dirname , 'node_modules'));
    for (let index = 0; index < allLibraries.length; index++) {
        let element = allLibraries[index];
        universalLibraryCollector.push({
            'name':element,
            count:0
        })
    }
}
collectAllLibrary()


const mainFunc = ()=>{
    let allFilesandFolder = fs.readdirSync(__dirname);
    for (let index = 0; index < allFilesandFolder.length; index++) {
        let element = allFilesandFolder[index]
        if(fs.lstatSync(path.join(__dirname , element)).isDirectory() && element !== "node_modules"){
            dirLibrary(path.join(__dirname , element));
        }else if(fs.lstatSync(path.join(__dirname , element)).isFile() && element.split('.')[1]!=="json"){
            fileLibrary(path.join(__dirname , element))
        }
    }
    console.log(universalLibraryCollector);
}


const dirLibrary = (source)=>{
    let allFilesandFolder = fs.readdirSync(source);
    for (let index = 0; index < allFilesandFolder.length; index++) {
        let element = allFilesandFolder[index];
        // console.log(element);
        // console.log(path.join(source , allFilesandFolder[index]));
        if(fs.lstatSync(path.join(source , allFilesandFolder[index])).isDirectory()){
            dirLibrary(path.join(source , allFilesandFolder[index]))
        }
        else{
            fileLibrary(path.join(source , allFilesandFolder[index]))
        }
    }
}

const fileLibrary = (source)=>{
    console.log(source);
    let file = fs.readFileSync(source,"utf-8")
    for (let index = 0; index < universalLibraryCollector.length; index++) {
        const element = universalLibraryCollector[index];
        if(file.includes(`require('${element['name']}')`) || file.includes(`require("${element['name']}")`)){
            element['count'] = element['count']  + 1;
        }
    }
}




mainFunc()
