window.onload = function() {

    const btn = document.getElementById("add");
    const list = document.getElementById("list");
    const searchBox = document.getElementById("search");
    
    let innCountry;
    let saveUserInput = [];

    //Step1 : Add
    btn.addEventListener("click", () => {
        innCountry = document.getElementById("country").value;

        if(innCountry != ""){
            const newLi = document.createElement("li");
            //give a space between button and text
            newLi.appendChild(document.createTextNode(innCountry));
            newLi.appendChild(document.createTextNode(" "));
            list.appendChild(newLi);

            document.getElementById("country").value = ""
            //this is for Step4
            saveUserInput.push(innCountry);

            //Step2 : Delete
            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "Delete";
            deleteBtn.type = "button";
            newLi.appendChild(deleteBtn);

            deleteBtn.addEventListener("click", () => {
                //this is for Step4
                const index = saveUserInput.indexOf(newLi.firstChild.nodeValue);
                saveUserInput.splice(index,1);
                
                newLi.remove();
            })

        }else {
            console.log("write something in first")
        }
        //console.log(saveUserInput);
    })


    //Step3 : Search functions
    function search(element, searchWord) {
        return (element.toLowerCase()).startsWith(
            searchWord.toLowerCase()); 
    }

    function searchArray(list, searchWord) {
        const resultArr = list.filter(word => search(word, searchWord));
        return resultArr;
    }

    //Step4 : Integrating search
    searchBox.addEventListener("input", () => {
        
        const allLi = list.querySelectorAll("li");
        const resultArr = searchArray(saveUserInput,searchBox.value);

        if(resultArr.length == 0){
            allLi.forEach( li => {
                li.style.display = "none";
            })
        }else if(searchBox.value != ""){
            allLi.forEach( li => {
                if(!resultArr.includes(li.firstChild.nodeValue)){
                    li.style.display = "none";
                }
            })
        }else {
            allLi.forEach( li => {
                li.style.display = "list-item";
            })
        }
    })
}