  const fs = require("fs");
const { title } = require("process");



function log(data) {
    document.getElementById("log").innerHTML += data;
}


let fileName = "src/data.json"
let favoriteBool = false;
let manualFavoriteBool = false;
let manualStarRateVar;


let baseData = [{title:"title",author:"author",rating:null,favorite:false,description:"base_book",content:"content"}];

let data;
function start() {
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

}
const folderButton = document.getElementById("sidebarBtnFolder")

folderButton.addEventListener('click', function() {
        // Code to execute when the button is clicked
        //alert("asdf")
        console.log("file4")
        get_books()
 });




function get_books() {
    console.log("file3")
    if (fs.existsSync(fileName)) {
        //alert("file1")
        data=JSON.parse(fs.readFileSync(fileName, 'utf-8'))
        const prent = document.getElementById("sidebarFolder")
        const old_div = document.getElementById("accessed_div")
        //alert("check 2")
        old_div.remove()
        new_div = 0
        new_div = document.createElement("div")
        new_div.id = "accessed_div"
        new_div.className = "manualEntrees-container"
        prent.appendChild(new_div)
        const temp_div = document.createElement("div")
        temp_div.className = "singleLineDiv"
        for (let i = 1; i < data.length; i++) {

            const temp = document.createElement("p")
            //temp_div.className = "multiLineDiv"
            temp.textContent = data[i].title
            temp.id = "book"+ toString(i)
            temp.className ="text1"
            //alert(data[i].title)
            
            temp_div.appendChild(temp)
            new_div.appendChild(temp_div)
        }
        //new_div.appendChild(temp_div)
        //data.forEach(book => {
        // for (let i = 1; i <= data.book_count; index++) {
        //                 alert(i)
        //     const temp = document.createElement("div")
        //     temp.textContent = toString(data.title)
        //     prent.appendChild(temp)
            
        //}

        //});

    }else {

// file dosent exist



        // console.log("trying to create")
        // fs.open(fileName, "w+", (err, file) => {
        //     if (err) throw err;
        //     console.log(file);
        // });
        // fs.writeFile(fileName, JSON.stringify(baseData, null, 2), err => {
        //     if (err) {
        //         console.error("fail");
        //     } else {
        //         console.log("success");
        //     }
        //     data=JSON.parse(fs.readFileSync(fileName, 'utf-8'))
        // });
        
    }
}
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

function starRate(starRateVal) {
    console.log("rate");
    console.log(starRateVal);
    for (let i = 5; i > 0; i--) {
        document.getElementById("star-" + i).style.fill = "none";
    }
    for (let i = starRateVal; i > 0; i--) {
        document.getElementById("star-" + i).style.fill = "#ff6600";
        console.log(i);
    }
}

function manualStarRate(starRateVal) {
    manualStarRateVar = starRateVal;
    console.log("rate");
    console.log(starRateVal);
    for (let i = 5; i > 0; i--) {
        document.getElementById("manualStar-" + i).style.fill = "none";
    }
    for (let i = starRateVal; i > 0; i--) {
        document.getElementById("manualStar-" + i).style.fill = "#ff6600";
        console.log(i);
    }
}
function favorite() {
    if (favoriteBool) {
        favoriteBool = false;
        document.getElementById("favorite").style.fill = "none"
    } else if(!favoriteBool){
        favoriteBool = true;
        document.getElementById("favorite").style.fill = "#ff6600"
    } else {
        console.log("error")
    }
}
function manualFavorite() {
    if (manualFavoriteBool) {
        manualFavoriteBool = false;
        document.getElementById("manualFavorite").style.fill = "none"
    } else if(!manualFavoriteBool){
        manualFavoriteBool = true;
        document.getElementById("manualFavorite").style.fill = "#ff6600"
    } else {
        console.log("error")
    }
}




// add from html 

function addFromHTML() {
    
}






function addManual() {
    console.log("add manual")
    let title = document.getElementById("title").innerHTML;//string
    let author = document.getElementById("author").innerHTML;//string
    //manualStarRateVar
    //manualFavoriteBool
    let description = document.getElementById("description").innerHTML;//string
    let content = document.getElementById("content").innerHTML;//string

    if(title!="Title"&&author!="Author"&&description!="Description"&&content!="Content"){
        //let completeStoryData = '{\n\t"title":"'+title+'",\n\t"author":"'+ author +'",\n\t"rating":'+ 
        //manualStarRateVar +',\n\t"favorite":'+manualFavoriteBool+',\n\t"description":"'+description+'",\n\t"content":"'+content+'"\n}'

        let completeStoryData = {
            "title":title,
            "author":author,
            "rating":manualStarRateVar,
            "favorite":manualFavoriteBool,
            "description":description,
            "content":content
        }

        addStory(completeStoryData);
    }
}