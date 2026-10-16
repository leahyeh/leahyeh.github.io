// 開啟 Dialog
$("[data-dialog-open]").click(function () {
    const target = $(this).data("dialog-open");
    const index = Number($(this).attr("data-dialog-index") || 1);
    const dialog = document.getElementById(target);

    if (dialog) {
        dialog.dataset.startIndex = index;
        dialog.showModal();
        dialog.dispatchEvent(new Event("dialog-open"));
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


document.querySelectorAll(".dialog[data-project-images]").forEach(dialog => {

    const images = dialog.dataset.projectImages
        .split(",")
        .map(src => src.trim())
        .filter(Boolean);

    const content = dialog.querySelector(".dialog__content");
    const img = content.querySelector("img");

    const prevBtn = dialog.querySelector("[data-dialog-prev]");
    const nextBtn = dialog.querySelector("[data-dialog-next]");

    let currentIndex = 0;

    function updateProject() {

        // 切換圖片
        img.src = images[currentIndex];

        // 切換後回到最上方
        content.scrollTop = 0;

        // 第一張 / 最後一張
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === images.length - 1;
    }

    // 開啟時切換到指定圖片
    dialog.addEventListener("dialog-open", () => {

        const index = Number(dialog.dataset.startIndex || 1);

        currentIndex = Number.isFinite(index)
            ? Math.max(0, Math.min(Math.trunc(index) - 1, images.length - 1))
            : 0;

        updateProject();
    });

    // Prev
    prevBtn.addEventListener("click", () => {

        if (currentIndex > 0) {
            currentIndex--;
            updateProject();
        }

    });

    // Next
    nextBtn.addEventListener("click", () => {

        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateProject();
        }

    });

    // 關閉後自動重設第一張
    dialog.addEventListener("close", () => {
        currentIndex = 0;
        updateProject();
    });

    // 初始化
    updateProject();

});