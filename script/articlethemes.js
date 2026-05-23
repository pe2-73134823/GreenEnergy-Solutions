const addCSS = css => document.head.appendChild(document.createElement("style")).innerHTML=css;

if (localStorage.getItem("theme") == "dark") {
    themeInit("dark");
}
function changeTheme() {
    if (localStorage.getItem("theme") == "dark") {
        localStorage.removeItem("theme");
        location.reload();
    } else {
        localStorage.setItem("theme", "dark")
        themeInit("dark");
    }   
}
async function themeInit(themepicked) {
    const themefiletofetch = "../../assets/themes/" + themepicked + ".txt"
    let themearray = await loadTxtFile(themefiletofetch);
    document.querySelector(':root').style.setProperty('--primary-text-color', themearray[0]);
    document.querySelector(':root').style.setProperty('--reverse-text-color', themearray[1]);
    document.querySelector(':root').style.setProperty('--header-footer', themearray[2]);
    document.querySelector(':root').style.setProperty('--background-color-base', themearray[3]);
    document.querySelector(':root').style.setProperty('--item-color', themearray[4]);
    if (themepicked == "dark") {
        addCSS(".content > span > img{ filter:invert(); }")
    }
}


async function loadTxtFile(filetofetch) {
  try {
    const fileresponse = await fetch(filetofetch);
    if (!fileresponse.ok) {
      throw new Error(`err: ${fileresponse.status}`);
    }
    const textFileContent = await fileresponse.text();
    const textFileArray = textFileContent.split(/\r\n|\n/)
    return textFileArray;
  } catch (error) {
    console.error('file loading err:', error);
  }
}