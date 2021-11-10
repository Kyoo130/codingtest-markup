(() => {
    const carouselUl = document.querySelector(".carousel-list");
    const imageInput = document.querySelector("#image-upload-input");
    const nextButton = document.querySelector(".next-btn");
    const prevButton = document.querySelector(".prev-btn");

    function changeTransform() {
        const items = document.querySelectorAll(".carousel-item");

        items.forEach((e, i) => {
            let degree = 360 / items.length;

            if (items.length > 1) {
                if (i == 0) {
                    e.style.transform = "rotateY(0deg) translateZ(250px)";
                } else {
                    e.style.transform = `rotateY(${degree * i}deg) translateZ(250px) rotateY(-${degree * i}deg)`
                }
            }

            if (items.length >= 5) {
                if (i == 0) {
                    e.style.transform = "rotateY(0deg) translateZ(250px)";
                } else if (i == 1) {
                    e.style.transform = "rotateY(72deg) translateZ(250px) rotateY(-72deg)";
                } else if (i == 2) {
                    e.style.transform = "rotateY(144deg) translateZ(250px) rotateY(-144deg) translateX(400px)";
                } else if (i == items.length - 2) {
                    e.style.transform = "rotateY(216deg) translateZ(250px) rotateY(-216deg) translateX(-400px)";
                } else if (i == items.length - 1) {
                    e.style.transform = "rotateY(288deg) translateZ(250px) rotateY(-288deg)";
                } else {
                    e.style.transform = `rotateY(${degree * i}deg) translateZ(250px) rotateY(-${degree * i}deg)`
                }
            }
        });
    }

    function moveNext() {
        const items = document.querySelectorAll(".carousel-item");

        if (items.length > 1) {
            const currentItem = document.querySelector(".carousel-front");
            const next = currentItem.nextElementSibling;

            carouselUl.appendChild(currentItem);
            currentItem.classList.remove('carousel-front');
            next.classList.add('carousel-front')
        }
        changeTransform();
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
        changeTransform();
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
                changeTransform();
            }

            reader.readAsDataURL(value.files[0]);
        }
    }

    imageInput.addEventListener("change", e => {
        uploadImg(e.target);

    })
    nextButton.addEventListener("click", moveNext);
    prevButton.addEventListener("click", moveprev);

    window.onload = () => {
        changeTransform();
    }
})();