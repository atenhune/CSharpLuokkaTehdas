document.addEventListener("DOMContentLoaded", () => {
    const tyhjennä_button = document.getElementById("tyhjennä");
    const luo_button = document.getElementById("luo");
    const copy_button = document.getElementById("copy");
    var input_area = document.getElementById("input_area");
    var output_area = document.getElementById("output_area");
    
    luo_button.addEventListener("click", () => {
        output_area.value = convert(input_area.value);
        console.log("luo nappia painettiin.");
    })
    
    tyhjennä_button.addEventListener("click", () => {
        input_area.value = "";
        output_area.value = "";
        console.log("tyhjennä nappia painettiin.");
    })

    copy_button.addEventListener("click", () => {
        navigator.clipboard.writeText(output_area.value);
        console.log("copy nappia painettiin.");
    })

})

const typeMapping = {
    "integer": "int",
    "date": "DateTime",
    "dateonly": "DateTime",
    "boolean": "bool",
    "bit": "bool",
}

function convert(input_text) {
    input_text = removeSpacesAndConsolidateNewlines(input_text);
    var rivit = input_text.split("\n");
    var palat = getTypesAndNames(rivit);
    var output_text = createOutputString(palat);
    return (output_text);
}

function removeSpacesAndConsolidateNewlines(inputString) {
    return inputString.trim().replace(/[ \t]+/g, '').replace(/\n{2,}/g, '\n');
  }

function getTypesAndNames(rivit){
    var nimet = [];
    var tyypit = [];

    for(let i = 0; i<rivit.length;i++){
       if(i % 2 === 0){
        nimet.push(rivit[i]);
       } 
       else{
        tyypit.push(typeMapping[rivit[i]] || rivit[i]);
       }
    }
    return{ nimet: nimet, tyypit: tyypit };
}

function createOutputString(palat){
    let rivit = [];

    rivit.push("public class VaihdaNimi!!\n{")
    for(let i = 0; i < palat.nimet.length; i++){
        rivit.push(`\tpublic ${palat.tyypit[i]}? ${palat.nimet[i]} { get; set; }`);
    }
    rivit.push("}");
    return(rivit.join("\n"));
}
