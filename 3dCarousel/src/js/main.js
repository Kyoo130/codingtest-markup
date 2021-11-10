(() => {
    const carouselUl = document.querySelector(".carousel-list");
    const imageInput = document.querySelector("#image-upload-input");
    const nextButton = document.querySelector(".next-btn");
    const prevButton = document.querySelector(".prev-btn");

    function moveNext() {
        const items = document.querySelectorAll(".carousel-item");

        if (items.length > 1) {
            const currentItem = document.querySelector(".carousel-front");
            const next = currentItem.nextElementSibling;

            carouselUl.appendChild(currentItem);
            currentItem.classList.remove('carousel-front');
            next.classList.add('carousel-front')
        }
    }

    function moveprev() {
        const items = document.querySelectorAll(".carousel-item");

        if (items.length > 1) {
            const currentItem = document.querySelector(".carousel-front");
            const lastItem = carouselUl.lastElementChild;

            carouselUl.insertBefore(lastItem, items[0]);
            currentItem.classList.remove('carousel-front');
            lastItem.classList.add('carousel-front');
        }
    }

    function createTag(url) {
        const list = document.createElement('li');
        const img = document.createElement('img');
        list.classList.add("carousel-item");
        img.src = url;
        list.appendChild(img);

        const items = document.querySelectorAll(".carousel-item");
        items.forEach(item => {
            item.classList.remove('carousel-front')
        });
        list.classList.add('carousel-front');

        return list;
    }

    function uploadImg(value) {
        const items = document.querySelectorAll(".carousel-item");

        if (value.files) {
            const reader = new FileReader();

            reader.onload = e => {
                const imgUrl = e.target.result;
                carouselUl.insertBefore(createTag(imgUrl), items[0]);
            }

            reader.readAsDataURL(value.files[0]);
        }
    }

    imageInput.addEventListener("change", e => {
        uploadImg(e.target);

    })
    nextButton.addEventListener("click", moveNext);
    prevButton.addEventListener("click", moveprev);
})();