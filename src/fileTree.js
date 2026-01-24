const {starRate, favorite, getStarRate, getFavorite} = require('./starRate_favorite.js')
const errorAlert = require('./utils.js');
const fs = require("fs");
const { title } = require("process");
fileTree = []
fileTreeName = "src/fileTree.json"
function fileTreeLoad(){
    // if (fs.existsSync(fileTreeName)) {
    //     fs.unlink(fileTreeName, (err) => {
    //         if (err) {
    //             console.error("Error deleting file:", err);
    //             return;
    //         }
    //         console.log('previous file was deleted');
    //     })
    // }
    // //console.log("trying to create")
    // fs.open(fileTreeName, "w+", (err, file) => {
    //     if (err) throw err;
    //     //console.log(file);
    //     });


    //console.log("trying to fill file")
    let overdiv = document.createElement("div")
    overdiv.style.marginLeft = "10px"
    overdiv.id = "fileTreeOverDiv"
    //overdiv.classList.add("")


    let files = fs.readdirSync("./Local/", (err) => {
        if (err) {
            console.error("Error reading directory:", err);
            return;
        }
        console.log('directory was read');
    }) 
    files.forEach(file => {
        overdiv.appendChild(TreeRecursion("./Local/"+file))
    });
    let sidebarFolder = document.getElementById("sidebarFolder")
    sidebarFolder.appendChild(overdiv)
     //console.log("fileTreeFile: " + JSON.stringify(fileTreeFile))


    // fs.writeFile(fileTreeName, JSON.stringify(fileTreeFile, null, 2), err => {
    //     if (err) {
    //         console.error("fail");
    //     } else {
    //         console.log("success");
    //     }
    // });
}






function TreeRecursion(folder) {
    let elementDiv = document.createElement("div")



    function elementClick(elementDiv) {
        console.log(elementDiv.lastChild)
        if (elementDiv.dataset.type=="folder") {

            if (elementDiv.lastChild.style.display == "none") {
                elementDiv.lastChild.style.display = "inline-block"
            } else {
                elementDiv.lastChild.style.display = "none"
            }
           
        } else if (elementDiv.dataset.type=="imageSet"){
            secondSidebar("imageSet", elementDiv.lastChild)
            
        } else if(elementDiv.dataset.type=="file"){
            //launch text viewe

            secondSidebar("file", elementDiv.lastChild)
        }else {
            console.error("erro092")
        }
    }

    elementDiv.id = "fileTree"+folder + "div"
    //console.log("check 1")
    
    if (dataType(folder)=="folder") {
        let files = fs.readdirSync(folder, (err) => {
            if (err) {
                console.error("Error reading directory:", err);
                return;
            }
            console.log('directory was read');
        }) 
        let dropdown = document.createElement("div")
        let text = document.createElement("p")
        let icon = document.getElementById("folder-svg").cloneNode(true)
        console.log(icon)
        icon.style.display = "inline-block"
        text.dataset.fullname = folder
        text.innerHTML = folder.slice(folder.lastIndexOf("/")+1, folder.length)
        text.classList.add("fileTreeText")
        text.classList.add("fileTreeGen")
        text.addEventListener('click', () =>{
            elementDiv = text.parentElement
            elementClick(elementDiv)

        })//click
        elementDiv.dataset.type = "folder"
        dropdown.style.display = "none"
        dropdown.classList.add("fileTreeDiv")
        elementDiv.appendChild(icon)
        elementDiv.appendChild(text)
        elementDiv.appendChild(dropdown)
        elementDiv.classList.add("fileTreeGen")
        files.forEach(file => {
            dropdown.appendChild(TreeRecursion(folder +"/"+file))
        });
        
        return elementDiv

    }else if(dataType(folder)=="imageSet"){
        elementDiv.dataset.type = "imageSet"
        let text = document.createElement("p")
        let icon = document.getElementById("image-svg").cloneNode(true)
        icon.style.display = "inline-block"
        text.classList.add("fileTreeText")
        text.classList.add("fileTreeGen")
        text.dataset.fullname = folder
        text.addEventListener('click', () =>{
            elementDiv = text.parentElement
            elementClick(elementDiv)

        })//click
        text.innerHTML = folder.slice(folder.lastIndexOf("/")+1, folder.length)
        elementDiv.appendChild(icon)
        elementDiv.appendChild(text)
        elementDiv.classList.add("fileTreeGen")
        return elementDiv
        
    } else if(dataType(folder)=="file"){
        elementDiv.dataset.type = "file"
        let text = document.createElement("p")
        let icon = document.getElementById("file-svg").cloneNode(true)
        icon.style.display = "inline-block"
        text.classList.add("fileTreeText")
        text.classList.add("fileTreeGen")
        text.dataset.fullname = folder
        text.addEventListener('click', () =>{
            elementDiv = text.parentElement
            elementClick(elementDiv)

        })//click

        text.innerHTML = folder.slice(folder.lastIndexOf("/")+1, folder.length)
        elementDiv.appendChild(icon)
        elementDiv.appendChild(text)
        elementDiv.classList.add("fileTreeGen")
        return elementDiv
    } else{
        console.error("error354")
    }
}
    
   







function dataType(data) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp']
    try {
        let files = fs.readdirSync(data, (err) => {
        if (err) {
            console.log("Error reading directory:", err);
        }
        console.log('directory was read');
    }) 
        return runFolder(files)
    } catch (error) {
        return runFile(data)
    }
     
    
    function runFile(data) {
        //console.log("FINAL ----- FILE")
        return "file"
    }
    function runFolder(files) {
        imageFolder = true
        files.forEach(f => {
            temp = false
            f = f.toLowerCase()
            imageExtensions.forEach(extension => {
                if (f.endsWith(extension)) {
                    temp = true
                }
            });
            if (temp == false) {
                imageFolder=false
            }
        });

        if(imageFolder==true){
            //console.log("FINAL ----- IMAGE FOLDER")
            return "imageSet"
        }else if (imageFolder==false) {
            //console.log("FINAL ----- FOLDER")
            return "folder"
        } else{
            console.error("erro124")
        }
        //detect if files are images
    }
}





function secondSidebar(type, node) {
    //sidebar = document.getElementById("fileSidebar")
    overdiv = document.getElementById("secondSidebarOverdiv")
    titleP = document.getElementById("titleSecondSidebar")
    authorP = document.getElementById("authorSecondSidebar")
    descriptionP = document.getElementById("descriptionSecondSidebar")
    data=JSON.parse(fs.readFileSync("src/data.json", 'utf-8'))
    found = false
    for (let i = 0; i < data.length; i++) {
        if (type == "imageSet" &&data[i].path.slice(0,-1) == node.dataset.fullname) {
            
            document.getElementById("fileSidebar").style.marginLeft = "min(calc(40% + 37px), 437px)"
            console.log("shouldve shifted")
            found = true
            //console.log(titlediv.lastChild)
            titleP.innerHTML = data[i].title
            authorP.innerHTML = data[i].author
            descriptionP.innerHTML = data[i].description
            starRate(data[i].rating)
            console.log(data[i].title)
            console.log(data[i].description) //.slice(0, data[i].path.lastIndexOf(".")) 

        } else if (type == "file" &&data[i].path== node.dataset.fullname) {
            document.getElementById("fileSidebar").style.marginLeft = "min(calc(40% + 37px), 437px);"
            found = true
            console.log(data[i].title)
            console.log(data[i].description)
        }

        
    }
    if (found == false) {
        errorAlert("book not found in data file", "this  likely means that the book was directly put into the system and not through the file adding tab")
    }

}



module.exports = fileTreeLoad;

