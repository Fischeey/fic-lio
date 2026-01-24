const errorAlert = require("./utils");
const fs = require("fs");
filename = "src/data.json"
function starRate(starRateVal, leader){
    // leader is s, manualS or sidebarS
    data=JSON.parse(fs.readFileSync(filename, 'utf-8'))
    if (leader == "s") {
        fileTitle = document.getElementById("currentFileTitle")
        if (fileTitle.innerHTML == "title") {
            errorAlert("no book selected","cannot rate empty book")
        }else{
            for (let i = 0; i < data.length; i++) {
                if (data[i].title == fileTitle) {
                    console.log("changed data rating")
                    data[i].rating = starRateVal
                    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
                } 
                
            }
        }
    } else if(leader == "sidebarS"){
        fileTitle = document.getElementById("titleSecondSidebar")

        for (let i = 0; i < data.length; i++) {
            if (data[i].title == fileTitle.innerHTML) {
                console.log("changed data rating")
                data[i].rating = starRateVal
                fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
            } 
            
        }

    
    }
    for (let i = 5; i > 0; i--) {
        console.log(leader + "tar-" + i)
        document.getElementById(leader + "tar-" + i).style.fill = "none";
    }
    for (let i = starRateVal; i > 0; i--) {
        document.getElementById(leader + "tar-" + i).style.fill = "#ff6600";
        console.log(i);
    }
}








function favorite(leader) {
    data=JSON.parse(fs.readFileSync(filename, 'utf-8'))

    favoriteBool = getFavorite()
    if (leader == "s") {
        fileTitle = document.getElementById("currentFileTitle")
        if (fileTitle == "title") {
            errorAlert("no book selected","cannot rate empty book")
        }else{
            for (let i = 0; i < data.length; i++) {
                if (data[i].title == fileTitle) {
                    data[i].rating = data[i].starRateVal
                    data[element].favorite = !favoriteBool
                } 
                
            }
        }
    } else if(leader == "sidebarS"){
        fileTitle = document.getElementById("titleSecondSidebar")

        for (let i = 0; i < data.length; i++) {
            if (data[i].title == fileTitle) {
                data[i].rating = data[i].starRateVal
                data[element].favorite = !favoriteBool
            } 
            
        }

    
    }else{

    }
    
    //leader is f, manualF, sidebarF
    if (favoriteBool) {
        
        favoriteBool = false;
        document.getElementById(leader + "avorite").style.fill = "none"
    } else if(!favoriteBool){
        favoriteBool = true;
        document.getElementById(leader + "avorite").style.fill = "#ff6600"
    } else {
        console.log("error")
    }
}





function getStarRate(manual){
    j = 0;
    let manualstr = ""
    if (manual==true){
        manualstr = 'manualS';
    } else {
        manualstr = 's';
    }
    for (let i = 5; i > 0; i--) {
        console.log(manualstr + "tar-" + i.toString())
        if (document.getElementById(manualstr + "tar-" + i.toString()).style.fill == "rgb(255, 102, 0)") {
            console.log("1")
            j ++;
        }

    }
    return j;
}
function getFavorite(manual){
    let manualstr = ""
    if (manual){
        manualstr = 'manualF';
    } else {
        manualstr = 'f';
    }
    if (document.getElementById(manualstr + "avorite").style.fill == "rgb(255, 102, 0)") {
        return true
    } else{
        return false
    }
}

module.exports = {starRate,  favorite, getStarRate, getFavorite};