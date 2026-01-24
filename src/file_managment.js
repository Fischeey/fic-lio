const {errorAlert, bookExistsInData, getBookData, increasePage, decreasePage} = require('./utils.js');
const fileTreeLoad = require('./fileTree.js');
const {starRate, favorite, getStarRate, getFavorite} = require('./starRate_favorite.js')
//const { title } = require("process");
const fs = require("fs");


function log(data) {
    document.getElementById("log").innerHTML += data;
}


let fileName = "src/data.json"
let favoriteBool = false;
let manualFavoriteBool = false;
let manualStarRateVar;


let baseData = [{title:"title",author:"author",rating:null,favorite:false,description:"base_book",content:"content",path:'path', images:false}];

let data;
function start() {
    fileTreeLoad()
    
    errorAlert("hi","hello there my friend how is it going")



    
    if (fs.existsSync(fileName)) {
        data=JSON.parse(fs.readFileSync(fileName, 'utf-8'))
        console.log(data.title)

    }else {
        console.log("trying to create")
        fs.open(fileName, "w+", (err, file) => {
            if (err) throw err;
            console.log(file);
        });
        fs.writeFile(fileName, JSON.stringify(baseData, null, 2), err => {
            if (err) {
                console.error("fail");
            } else {
                console.log("success");
            }
            data=JSON.parse(fs.readFileSync(fileName, 'utf-8'))
        });
        
    }


    let tempDataForFileEntry_baseData = {path: 'path', imagebool: false}

    if (!fs.existsSync("src/tempDataForFileEntry.json")) {
        fs.open("src/tempDataForFileEntry.json", "w+", (err, file) => {
            if (err) throw err;
            console.log(file);
        });
        fs.writeFile("src/tempDataForFileEntry.json", JSON.stringify(tempDataForFileEntry_baseData, null, 2), err => {
            if (err) {
                console.error("fail");
            } else {
                console.log("success");
            }
            
            tempData=JSON.parse(fs.readFileSync(fileName, 'utf-8'))
        });

    } else {
        tempData=JSON.parse(fs.readFileSync("src/tempDataForFileEntry.json", 'utf-8'))
        tempData.path = 'path'
        tempData.imagebool = false
        fs.writeFileSync("src/tempDataForFileEntry.json", JSON.stringify(tempData, null, 2));
    }
}


let picker = document.getElementById('picker');
let listing = document.getElementById('listing');
//












picker.addEventListener('change', e => {
    files = e.target.files

    tempData=JSON.parse(fs.readFileSync("src/tempDataForFileEntry.json", 'utf-8'))


        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.startsWith('image/')) {
                let str1 = file.webkitRelativePath

                str1 = str1.split("/", 3)
   
                if (str1.length == 2) {

                    if (!fs.existsSync('src/tempFolderForImages/'+str1[1])) {
                        const reader = new FileReader();
                        reader.onload = function(a) {

                            const dataUrl = a.target.result; // your data

                            // Strip the data: URL prefix to get just the base64-encoded bytes
                            const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, "");

                            // Create a Buffer from the base64 string
                            const buffer = Buffer.from(base64Data, 'base64');
                            //data = Buffer.from(a.target.result).replace("/^data:image\/\w+;base64,/","")
                            fs.writeFile('src/tempFolderForImages/'+str1[1],buffer,(err) => {
                                if (err) {
                                    console.error('Error saving image:', err);
                                } else {
                                    console.log('Image saved successfully!');
                                }
                            })
                        };
                        reader.readAsDataURL(file);
                        

                    } 
                }
            }
        
    }



    console.log(files)
    tempData.imagebool = true
    fs.writeFileSync("src/tempDataForFileEntry.json", JSON.stringify(tempData, null, 2));     
    









});




const folderButton = document.getElementById("sidebarBtnFolder")

folderButton.addEventListener('click', function() {
        // Code to execute when the button is clicked
        console.log("asasdfaasdfdf")
        console.log("file4");
        //get_books();
 });


function open_book(title) {
    if (fs.existsSync(fileName)) {

 
        data=JSON.parse(fs.readFileSync(fileName, 'utf-8'))
        for (let i = 1; i < data.length; i++) {
            
            if (data[i].title == title) {

                book_open = data[i];
                

            }
        }
        
    }else {
        //file dosent exist
    }
 
    const title_div = document.getElementById("title_div")
    title_div.textContent = book_open.title
    const author_div = document.getElementById("author_div")
    author_div.textContent = book_open.author
    if (book_open.rating != null) {
        starRate(book_open.rating)  
    }
    if (book_open.favorite ==true) {
        favorite()
    }
    document.getElementById("description_div").textContent = book_open.description
    document.getElementById("content_div").innerHTML = book_open.content

}



// function get_books() {
//     const fs = require("fs");
//     console.log("file3")
//     if (fs.existsSync(fileName)) {
//         //console.log("file1")
//         data=JSON.parse(fs.readFileSync(fileName, 'utf-8'))
//         const prent = document.getElementById("sidebarFolder")
//         const old_div = document.getElementById("accessed_div")
//         //console.log("check 2")
//         old_div.remove()
//         //new_div = 0
//         new_div = document.createElement("div")
//         new_div.id = "accessed_div"
//         new_div.className = "manualEntrees-container"
//         prent.appendChild(new_div)

//         let buttons = []
//         for (let i = 1; i < data.length; i++) {
//             const temp_div = document.createElement("div")
//             temp_div.className = "singleLineDiv_files"
//             const temp = document.createElement("p")
//             //temp_div.className = "multiLineDiv"
//             temp.textContent = data[i].title
//             temp.id = "inserted_book"+ toString(i)
//             temp.className ="text1"

//             //console.log(data[i].title)
//             buttons.push(temp)
//             temp_div.appendChild(temp)
//             new_div.appendChild(temp_div)
//         }
        

//         buttons.forEach(button => {
//             button.addEventListener('click', function() {
//                 open_book(button.textContent)
//             });
            
//         });
        


//     }else {

// // file dosent exist




        
//     }
// }
start(); 
//add story
function addStory(story) {
    data=JSON.parse(fs.readFileSync(fileName, 'utf-8'))
    //log(data.book_count);
    //newBookName = {name:"text"+data.book_count}
    //data[newBookName.name] = story;
    //data.book_count =data.book_count + 1;
    data.push(story)
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
    
}
//
//
//







function confirm() {

    let title = document.getElementById("manualTitle").innerHTML;//string
    let author = document.getElementById("manualAuthor").innerHTML;//string
    let manualStarRateVar = getStarRate(true)
    let manualFavoriteBool = getFavorite(true)
    
    let description = document.getElementById("manualDescription").innerHTML;//string
    let content = "";
    
    if (fs.existsSync("src/tempDataForFileEntry.json")) {
        
        tempData=JSON.parse(fs.readFileSync("src/tempDataForFileEntry.json", 'utf-8'))
    }

    
    function titleExists(title) {
        if (fs.existsSync("src/data.json")) {
            tempData=JSON.parse(fs.readFileSync("src/data.json", 'utf-8'))
            tempData.forEach(e => {
                if (e.title == title) {
                    return true
                }
            });
        } else {
            console.error("erro2")
            return false
        }
        return false
    }
    let path = tempData.path
    let imagebool = tempData.imagebool
    if (title == "Title") {
        errorAlert("Error: Invalid Title", "Title must have another name besides 'Title'")
    }else if(title == ""){
        errorAlert("Error: Invalid Title", "Title cannot be empty, you must enter one")
    }else if(title.includes("/")){
        errorAlert("Error: Invalid Title", "Title cannot contain the symbol '/' this interferes with processing")
    }else if(titleExists(title)){
        errorAlert("Error: Invalid Title", "Title already exists in data file, cannot have two entries with the same title")
        //title exists
    }else if(author == "Author"){
        errorAlert("Error: Invalid Author", "Author must have another name besides 'Author'")
    }else if(author == ""){
        errorAlert("Error: Invalid Author", "Author cannot be empty, you must enter one")
    }else if (manualStarRateVar == 0) {
        errorAlert("Error: Invalid Rating", "Rating cannot be empty, you must select one of the five stars")
        console.log("star rating invalid")
    }else if (description == "Description") {
        errorAlert("Error: Invalid Description", "Description must have another name besides 'Description'")
    }else if(description == ""){
        errorAlert("Error: Invalid Description", "Description cannot be empty, you must enter one")
    }else{
        

        
        if (tempData.imagebool==false){
            content = document.getElementById("manualContent").innerHTML;//string
        } else {

            //comics




            //set content to be null or whatever has been entered
            const folder = fs.readdirSync('src/tempFolderForImages');
            fs.mkdir('./Local/'+title, (err) => {
                if (err) {
                    console.error('Failed to create directory', err);
                    return;
                }
                console.log('Directory created successfully!');
            })
            
            for (let i = 0; i < folder.length; i++) {
                //make directory for name of comic
                
                fs.rename('src/tempFolderForImages/'+folder[i],'./Local/'+title+'/'+folder[i], (err) => {
                    if (err) throw err;
                    console.log('File renamed!');
                })

            }
            
            let completeStoryData = {
                "title":title,
                "author":author,
                "rating":manualStarRateVar,
                "favorite":manualFavoriteBool,
                "description":description,
                "content":null,
                "path":'./Local/'+title+'/',//includes / sign
                "images":true
            }
            addStory(completeStoryData);



        }


   

    }
    tempData.path = 'path'
    tempData.imagebool = false
    fs.writeFileSync("src/tempDataForFileEntry.json", JSON.stringify(tempData, null, 2));
    
}





document.querySelectorAll('[id*="manualStarDiv"]').forEach(element => {
    element.addEventListener('click',() =>{
        
        starRate(element.dataset.num, "manualS")
    })
});


document.getElementById("manualFavoriteDiv").addEventListener('click',() =>{
    favorite("manualF")
})






document.querySelectorAll('[id*="starDiv"]').forEach(element => {
    element.addEventListener('click',() =>{
        
        starRate(element.dataset.num, "s")
    })
});


document.getElementById("favoriteDiv").addEventListener('click',() =>{
    favorite("f")
})







document.querySelectorAll('[id*="sidebarStarDiv"]').forEach(element => {
    element.addEventListener('click',() =>{
        
        starRate(element.dataset.num, "sidebarS")
    })
});


document.getElementById("sidebarFavoriteDiv").addEventListener('click',() =>{
    favorite("sidebarF")
})




document.getElementById("OpenFileButtonBegining").addEventListener('click',() =>{
    openFile(document.getElementById("titleSecondSidebar").innerHTML, 0)
})
document.getElementById("OpenFileButton").addEventListener('click',() =>{
    title = document.getElementById("titleSecondSidebar").innerHTML
    page = getBookData(title, "page")
    if(page == false){
        page = 0
    }
    console.log("aaaa"+page)
    openFile(title, page)
})


// function openFile(title, fromP0) {
//     document.getElementById("imageSection").style.display = "none"
//     document.getElementById("textSection").style.display = "none"

//     //console.log(title)
//     images = getBookData(title, "images")
//     path = getBookData(title, "path")
//     console.log(images)
//     console.log(path)
//     if(images){
//         imageArr = fs.readdirSync(path)
//         console.log(imageArr)
//         document.getElementById("imageSection").style.display = "inline-block"
//         if (fromP0) {
//             console.log(imageArr[0])
//             document.getElementById("bodyImage").src = "." + path + imageArr[0]
//         }else{
//             page = getBookData(title, "page")
//             console.log(imageArr[page])
//             document.getElementById("bodyImage").src = "." + path + imageArr[page]
//         }
        
//     }else{
//         document.getElementById("textSection").style.display = "inline-block"
//     }
// }
function openFile(title, loc) {
    if (loc == 0) {
        data=JSON.parse(fs.readFileSync("./src/data.json", 'utf-8'))
        //console.log("run increase page")
        data.forEach(e => {
            if(e.title == title){
                e.page =0
                //console.log(e.page)
            }
        });
    
        fs.writeFileSync("./src/data.json", JSON.stringify(data, null, 2));
    }
    document.getElementById("imageSection").style.display = "none"
    document.getElementById("textSection").style.display = "none"

    //console.log(title)
    images = getBookData(title, "images")
    path = getBookData(title, "path")
    console.log(images)
    console.log(path)
    if(images){
        imageArr = fs.readdirSync(path)
        console.log(imageArr)
        document.getElementById("imageSection").style.display = "inline-block"
        document.getElementById("bodyImage").src = "." + path + imageArr[loc]
        
        
    }else{
        document.getElementById("textSection").style.display = "inline-block"
    }
}













document.getElementById("previousimageButton").addEventListener('click',() =>{
    title = document.getElementById("titleSecondSidebar").innerHTML
    console.log("run previous image" + title)
    page = getBookData(title, "page")
    

    if (page == false) {
        page = 0
    } 
    // else if(page == true){
    //     maxPage = 1
    // }

    console.log(page)

    if (page -1 >= 0) {
        console.log("next page available")
        decreasePage(title)
        
        openFile(title, page-1)
    }

})


















document.getElementById("nextimageButton").addEventListener('click',() =>{
    title = document.getElementById("titleSecondSidebar").innerHTML
    console.log("run next image" + title)
    page = getBookData(title, "page")
    maxPage = getBookData(title, "max-page")

    if (page == false) {
        page = 0
    } 
    // else if(page == true){
    //     maxPage = 1
    // }
    if (maxPage == false) {
        maxPage = 0
    } 
    // else if(maxPage==true){
    //     maxPage = 1
    // }

    console.log(page)
    console.log(maxPage)
    console.log(page + 1 <= maxPage)
    if (page + 1 <= maxPage) {
        console.log("next page available")
        increasePage(title)
        openFile(title, page+1)
    }
})