const nrOfTabs = 5;

function setUpTabs() {
    const tabContainer = document.querySelector('.tabs-container');
    for (i = 0; i < nrOfTabs; i++) {
        tabContainer.insertAdjacentHTML("beforeend", `
            <div class="tab tab_${i}"> Tab ${i} </div>
        `);
        document.querySelector(`.tab_${i}`).addEventListener("click", tabClicked(i));
    }
}

function tabClicked(i) {
    document.querySelector(`.tab_${i}`).addEventListener("click", () => {
        for (tab = 0; tab < nrOfTabs; tab++) {
            document.querySelector(`.tab_${tab}`).style.color = "#b3b3b3";
            document.querySelector(`.tab_${tab}`).style.borderBottom = "none";
        }
        document.querySelector(`.tab_${i}`).style.color = "#000000";
        document.querySelector(`.tab_${i}`).style.borderBottom = "solid 0.02em #000000";
    });
}