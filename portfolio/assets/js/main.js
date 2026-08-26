// 開啟 Dialog
$("[data-dialog-open]").click(function () {
    const target = $(this).data("dialog-open");
    const dialog = document.getElementById(target);

    if (dialog) {
        dialog.showModal();
    }
});

// 關閉 Dialog
$("[data-dialog-close]").click(function () {
    const dialog = $(this).closest("dialog")[0];
    
    if (dialog) {
        dialog.close();
    }
});

// 點擊 Dialog 外部關閉
$("dialog").on("click", function (e) {
    const dialog = this;
    const dialogDimensions = dialog.getBoundingClientRect();

    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        dialog.close();
    }
});


document.querySelectorAll(".dialog").forEach(dialog => {

    const images = dialog.dataset.projectImages
        .split(",")
        .map(src => src.trim());

    const content = dialog.querySelector(".dialog__content");
    const img = content.querySelector("img");

    const prevBtn = dialog.querySelector("[data-dialog-prev]");
    const nextBtn = dialog.querySelector("[data-dialog-next]");

    let currentIndex = 0;


    function updateProject() {

        img.src = images[currentIndex];

        // 切換圖片後回到最上方
        content.scrollTop = 0;

        // 第一張 / 最後一張
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === images.length - 1;
    }


    prevBtn.addEventListener("click", () => {

        if (currentIndex > 0) {
            currentIndex--;
            updateProject();
        }

    });


    nextBtn.addEventListener("click", () => {

        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateProject();
        }

    });
    // Dialog 關閉後，自動切回第一張
    dialog.addEventListener("close", () => {
        currentIndex = 0;
        updateProject();
    });
    updateProject();

});