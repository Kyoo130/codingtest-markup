(() => {
    const carouselUI = document.querySelector(".carousel-list");
    const imageInput = document.querySelector("#image-upload-input");
    const nextButton = document.querySelector(".next-btn");
    const prevButton = document.querySelector(".prev-btn");

    function moveNext() {
        const items = document.querySelectorAll(".carousel-item");

        if (items.length > 1) {
            const currentItem = document.querySelector(".carousel-front");
            const next = currentItem.nextElementSibling;

            carouselUI.appendChild(currentItem);
            currentItem.classList.remove('carousel-front');
            next.classList.add('carousel-front')
        }
    }

    function moveprev() {
        const items = document.querySelectorAll(".carousel-item");

        if (items.length > 1) {
            const currentItem = document.querySelector(".carousel-front");
            const lastItem = carouselUI.lastElementChild;
            
            carouselUI.insertBefore(lastItem, items[0]);
            currentItem.classList.remove('carousel-front');
            lastItem.classList.add('carousel-front');
        }
    }

    nextButton.addEventListener("click", moveNext);
    prevButton.addEventListener("click", moveprev);
})();