let popUpArr = [];

function errorAlert(errorTitle, errorText) {
    if (popUpArr.length > 0) {
         
        popUpArr.forEach(e => {
           
            //tempTop = window.getComputedStyle(document.getElementById(e)).getPropertyValue('top')
            tempTop = document.getElementById(e).style.top.toString()
            splitarr = tempTop.split("-", 3)
            if (splitarr.length>2) {
                console.error("error1")
            } else {
                
                strr = splitarr[1]
                strr = strr.replaceAll(" ", "");
                strr = strr.replaceAll("px)", "");
                strr = parseInt(strr, 10)
                strr = strr + 80;
                if (strr>600) {
                    // Close popup
                    document.getElementById(e).style.left = "100%"
                    //document.getElementById(overDivId).style.visibility="hidden"

                    setTimeout(() => {
                        console.log("removing element")  
                        document.getElementById(e).remove();
                    }, 500);
                    i = popUpArr.indexOf(e)
                    if (i>-1) {
                        popUpArr.splice(i,1)
                    }
                    str1 = document.getElementById(popUpArr[popUpArr.indexOf(e)+1]).style.top.toString()
                    str1 = str1.split("-", 3)
                    str1 = str1[1]
                    str1 = str1.replaceAll(" ", "");
                    str1 = str1.replaceAll("px)", "");
                    str1 = parseInt(str1, 10)
                    str1 = str1 + 80;
                    document.getElementById(popUpArr[popUpArr.indexOf(e)+1]).style.top = "calc(100% - "+str1.toString()+"px)";
                }else {
                    document.getElementById(e).style.top = "calc(100% - "+strr.toString()+"px)";
                }
            }
   
        });
    }
    let overDiv = document.createElement("div")
    overDiv.id = getDivId()
    //overDiv.id = "overDiv"+popUpArr.length.toString()
    overDiv.classList.add("popDiv")
    overDiv.style.top = "calc(100% - 128px)";
    let overHeader = document.createElement("div")
    overHeader.classList.add("popHeader")
    let overBody = document.createElement("div")
    overBody.classList.add("popBody")

    overDiv.appendChild(overHeader)
    overDiv.appendChild(overBody)
    let titleText = overHeader.appendChild(document.createElement("a"))
    titleText.classList.add("popTitleText")
    titleText.innerHTML= errorTitle
    let bodyText = overBody.appendChild(document.createElement("a"))
    bodyText.classList.add("popBodyText")
    bodyText.innerHTML= errorText

    let popX = overHeader.appendChild(document.createElement("button"))

    popX.id = "popXButton"
    popSVG = document.getElementById("quitSVG").cloneNode(true)
    popSVG.classList.remove("titleMenu")
    popSVG.classList.add("popXSVG")
    popX.appendChild(popSVG)
    popX.classList.add("popXButton")
    console.log("create overdiv")
    popX.addEventListener('click', function () {
        if (popUpArr.length > 0) {
            console.log("mnul")
        }
        // Close popup
        const overDivId = popX.parentElement.parentElement.id
        document.getElementById(overDivId).style.left = "100%"
        //document.getElementById(overDivId).style.visibility="hidden"

        setTimeout(() => {
            console.log("removing element")  
            document.getElementById(overDivId).remove();
        }, 500);
        i = popUpArr.indexOf(overDivId)
        if (i>-1) {
            popUpArr.splice(i,1)
        }
    });
    //overDiv.style.left = "320px"
    document.getElementById("main_body").appendChild(overDiv)
    setTimeout(() => {
        overDiv.style.left = "calc(100% - 320px)"
    }, 500);
    
    popUpArr.push(overDiv.id)
    //popUpArr.push("overDiv"+toString(popUpArr.length))
    console.log(popUpArr)

}
function getDivId() {
    for (let i = 0; i < 12; i++) {
        if (popUpArr.indexOf( "overDiv"+i) == -1){
            return  "overDiv"+i;
        }
        
    }
}









function bookExistsInData(title) {
    //console.log("checlk1")
    temp = false
    data=JSON.parse(fs.readFileSync("./src/data.json", 'utf-8'))
    //console.log(data)
    //console.log(title)
    data.forEach(book => {
        //console.log(title.length)
        //console.log(book.title===title)
        if (book.title===title) {
            
            temp = true;
        }
    });
    return temp;
}
function getBookData(title, dataname) {
    //console.log("checlk0")
    temp = "data doesnt exist"
    data=JSON.parse(fs.readFileSync("./src/data.json", 'utf-8'))
    //console.log("Asdfaasdf" +bookExistsInData(title))
    //console.log(bookExistsInData(title))
    if (bookExistsInData(title)==true) {
        //console.log("checlk4")
        data.forEach(book => {
            //console.log("checlk5")
            if (book.title===title) {
                //console.log("returning true")
                //console.log(dataname)
                //console.log(book[dataname])
                temp = book[dataname]
            }
        });
    }
    return temp
}
function increasePage(title) {
    data=JSON.parse(fs.readFileSync("./src/data.json", 'utf-8'))
    console.log("run increase page")
    data.forEach(e => {
        if(e.title == title){
            e.page += 1
            console.log(e.page)
        }
    });
    
    fs.writeFileSync("./src/data.json", JSON.stringify(data, null, 2));
}
function decreasePage(title) {
    data=JSON.parse(fs.readFileSync("./src/data.json", 'utf-8'))
    console.log("run decrease page")
    data.forEach(e => {
        if(e.title == title){
            e.page -= 1
            console.log(e.page)
        }
    });
    
    fs.writeFileSync("./src/data.json", JSON.stringify(data, null, 2));
}
module.exports = {errorAlert, bookExistsInData, getBookData, increasePage, decreasePage};