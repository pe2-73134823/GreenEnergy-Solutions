if (localStorage.getItem("lang") == "swe") {
    langInit("swe");
}
function changeLanguage() {
    if (localStorage.getItem("lang") == "swe") {
        localStorage.removeItem("lang");
        location.reload();
    } else {
        localStorage.setItem("lang", "swe")
        langInit("swe");
    }   
}
async function langInit(langpicked) {
    let langfiletofetch = "../../assets/translations/" + langpicked + ".txt"
    let langarray = await loadTxtFile(langfiletofetch);
    let langidarray = await loadTxtFile("../../assets/translations/ids.txt");
    for (let i = 0; i < langarray.length; i++) {
        try{
            document.getElementById(langidarray[i]).innerHTML = langarray[i];
        } catch(e){
            
        }
        
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