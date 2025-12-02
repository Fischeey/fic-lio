const { ipcRenderer, Menu } = require('electron');
const ipc = ipcRenderer;

var sidebarIsOut = false;
var fileIsOut = false;
var folderIsOut = false;
var filterIsOut = false;
var searchIsOut = false;
var settingsIsOut = false;
var addIsOut = false;

window.onload = function() {
    fileIsOut = false;
sidebarIsOut = false;
    console.log(sidebarIsOut);
}

const quitBtn = document.getElementById("quitBtn");
quitBtn.addEventListener('click', ()=>{
    ipc.send('closeApp')
})

const minus = document.getElementById("minusBtn");
minus.addEventListener('click', ()=>{
    ipc.send('minus')
})

min = true;
const minMax = document.getElementById("minMax");
minMax.addEventListener('click', ()=>{
    if (min) {
        min = false
        ipc.send('max')
        document.getElementById("minArrows").style.display = "initial"
        document.getElementById("minArrows").style.width = "24"

        document.getElementById("maxSquare").style.display = "none"
        document.getElementById("maxSquare").style.width = "0"
    } else {
        min = true
        ipc.send('min')
        document.getElementById("maxSquare").style.display = "initial"
        document.getElementById("maxSquare").style.width = "24"

        document.getElementById("minArrows").style.display = "none"
        document.getElementById("minArrows").style.width = "0"
    }
})

function clearSidebar() {
    document.getElementById("sidebarFile").style.display="none";
    document.getElementById("sidebarFolder").style.display="none";
    document.getElementById("sidebarFilter").style.display="none";
    document.getElementById("sidebarSearch").style.display="none";
    document.getElementById("sidebarSettings").style.display="none";
    document.getElementById("sidebarAdd").style.display="none";

    document.getElementById("sidebarFile").style.height="0px";
    document.getElementById("sidebarFolder").style.height="0px";
    document.getElementById("sidebarFilter").style.height="0px";
    document.getElementById("sidebarSearch").style.height="0px";
    document.getElementById("sidebarSettings").style.height="0px";
    document.getElementById("sidebarAdd").style.height="0px";

    document.getElementById("sidebarIcon_File").style.backgroundColor="#242424";
    document.getElementById("sidebarIcon_Folder").style.backgroundColor="#242424";
    document.getElementById("sidebarIcon_Filter").style.backgroundColor="#242424";
    document.getElementById("sidebarIcon_Search").style.backgroundColor="#242424";
    document.getElementById("sidebarIcon_Settings").style.backgroundColor="#242424";
    document.getElementById("sidebarIcon_Add").style.backgroundColor="#242424";
    fileIsOut = false;
    folderIsOut = false;
    filterIsOut = false;
    searchIsOut = false;
    settingsIsOut = false;
    addIsOut = false;
}
function sidebarOut() {
        document.getElementById("movingSidebar").style.marginLeft="0";
        sidebarIsOut = true;
}
function sidebarClose() {

    document.getElementById("movingSidebar").style.marginLeft="-100%";
    sidebarIsOut = false;
}
function sidebarFile() {
    if (sidebarIsOut&&fileIsOut) {
        clearSidebar();
        sidebarClose();
    } else if(sidebarIsOut&&!fileIsOut){
        clearSidebar();
        document.getElementById("sidebarIcon_File").style.backgroundColor="#ff6600";
        document.getElementById("sidebarFile").style.display="initial";

        //there is another sidebar icon deployed and we want to display file data
        //clear sidebar data()
        //add file data()
        fileIsOut = true;
    } else{
        clearSidebar();
        document.getElementById("sidebarIcon_File").style.backgroundColor="#ff6600";
        document.getElementById("sidebarFile").style.display="initial";
        sidebarOut();
        fileIsOut = true;
    }
}
function sidebarFolder() {
    if (sidebarIsOut&&folderIsOut) {
        clearSidebar();

        sidebarClose();
    } else if(sidebarIsOut&&!folderIsOut){
        clearSidebar();
        document.getElementById("sidebarIcon_Folder").style.backgroundColor="#ff6600";
        document.getElementById("sidebarFolder").style.display="initial";
        //there is another sidebar icon deployed and we want to display folder data
        //clear sidebar data()
        //add folder data()
        folderIsOut = true;
    } else{
        clearSidebar();
        document.getElementById("sidebarIcon_Folder").style.backgroundColor="#ff6600";
        document.getElementById("sidebarFolder").style.display="initial";
        sidebarOut();
        folderIsOut = true;
    }
}
function sidebarFilter() {
    if (sidebarIsOut&&filterIsOut) {
        clearSidebar();

        sidebarClose();
    } else if(sidebarIsOut&&!filterIsOut){
        clearSidebar();
        document.getElementById("sidebarIcon_Filter").style.backgroundColor="#ff6600";
        document.getElementById("sidebarFilter").style.display="initial";
        //there is another sidebar icon deployed and we want to display filter data
        //clear sidebar data()
        //add filter data()
        filterIsOut = true;
    } else{
        clearSidebar();
        document.getElementById("sidebarIcon_Filter").style.backgroundColor="#ff6600";
        document.getElementById("sidebarFilter").style.display="initial";
        sidebarOut();
        filterIsOut = true;
    }
}
function sidebarSearch() {
    if (sidebarIsOut&&searchIsOut) {
        clearSidebar();

        sidebarClose();
    } else if(sidebarIsOut&&!searchIsOut){
        clearSidebar();
        document.getElementById("sidebarIcon_Search").style.backgroundColor="#ff6600";
        document.getElementById("sidebarSearch").style.display="initial";
        //there is another sidebar icon deployed and we want to display Search data
        //clear sidebar data()
        //add Search data()
        searchIsOut = true;
    } else{
        clearSidebar();
        document.getElementById("sidebarIcon_Search").style.backgroundColor="#ff6600";
        document.getElementById("sidebarSearch").style.display="initial";
        sidebarOut();
        searchIsOut = true;
    }
}
function sidebarSettings() {
    if (sidebarIsOut&&settingsIsOut) {
        clearSidebar();

        sidebarClose();
    } else if(sidebarIsOut&&!settingsIsOut){
        clearSidebar();
        document.getElementById("sidebarIcon_Settings").style.backgroundColor="#ff6600";
        document.getElementById("sidebarSettings").style.display="initial";
        //there is another sidebar icon deployed and we want to display settings data
        //clear sidebar data()
        //add settings data()
        settingsIsOut = true;
    } else{
        clearSidebar();
        document.getElementById("sidebarIcon_Settings").style.backgroundColor="#ff6600";
        document.getElementById("sidebarSettings").style.display="initial";
        sidebarOut();
        settingsIsOut = true;
    }
}
function sidebarAdd() {
    if (sidebarIsOut&&addIsOut) {
        clearSidebar();

        sidebarClose();
    } else if(sidebarIsOut&&!addIsOut){
        clearSidebar();
        document.getElementById("sidebarIcon_Add").style.backgroundColor="#ff6600";
        document.getElementById("sidebarAdd").style.display="initial";
        //there is another sidebar icon deployed and we want to display settings data
        //clear sidebar data()
        //add settings data()
        addIsOut = true;
    } else{
        clearSidebar();
        document.getElementById("sidebarIcon_Add").style.backgroundColor="#ff6600";
        document.getElementById("sidebarAdd").style.display="initial";
        sidebarOut();
        addIsOut = true;
    }
}
//end of sidebar controls
//
//
//
//
//
function starHover(starHoverVal) {
    for (let i = starHoverVal; i > 0; i--) {
        document.getElementById("star-" + i).style.stroke = "white";
    }
}
function starLeave() {
    for (let i = 5; i > 0; i--) {
        document.getElementById("star-" + i).style.stroke = "#b3b3b3";

    }
}

function manualStarHover(starHoverVal) {
    for (let i = starHoverVal; i > 0; i--) {
        document.getElementById("manualStar-" + i).style.stroke = "white";
    }
}
function manualStarLeave() {
    for (let i = 5; i > 0; i--) {
        document.getElementById("manualStar-" + i).style.stroke = "#b3b3b3";

    }
}

function favoriteHover() {
    document.getElementById("favorite").style.stroke = "white";
}
function favoriteLeave() {
    document.getElementById("favorite").style.stroke = "#b3b3b3";
}
function manualFavoriteHover() {
    document.getElementById("manualFavorite").style.stroke = "white";
}
function manualFavoriteLeave(params) {
    document.getElementById("manualFavorite").style.stroke = "#b3b3b3";
}