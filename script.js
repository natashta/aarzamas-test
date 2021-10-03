let menuButton = document.querySelector(".mob-menu-button");
let menu = document.querySelector(".menu-wrapper");
let innerMenu = menu.querySelector(".menu");
let closeMenu = document.querySelector(".menu-header__close");
let content = document.querySelector(".main");
let menuLinksList = [...document.querySelectorAll(".menu__link")];
let menuItemsList = [...document.querySelectorAll(".menu__item")];
let cardsList = [...document.querySelectorAll(".card")];
let selectedEl;
let oldScrollY = 0;

menuButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    menuButton.classList.add("closed");
    menu.classList.add("open");
    menuLinksList.forEach(function (el) {
        if (el.classList.contains("menu__link_active")) {
            el.classList.remove("menu__link_active");
        }
    });
    menuItemsList.forEach(function (el) {
        if (el.classList.contains("menu__item_active")) {
            el.classList.remove("menu__item_active");
        }
    });
});

closeMenu.addEventListener("click", function (evt) {
    evt.preventDefault();
    menu.classList.add("closed");
    menu.classList.remove("open");
    menuButton.classList.remove("closed");
});

menuLinksList.forEach(function (el) {
    el.addEventListener("click", e => {
        menu.classList.remove("closed");
        selectedEl && selectedEl.classList.remove("menu__link_active");
        menuItemsList.forEach(function (el) {
            if (el.classList.contains("menu__item_active")) {
                el.classList.remove("menu__item_active");
            }
        });
        selectedEl = e.target;
        e.target.classList.add("menu__link_active");
        e.target.parentNode.classList.add("menu__item_active");
    });
});

window.onscroll = function () {
    let c = content.getBoundingClientRect();
    let cardsCoord =  Math.ceil(c.height + c.y - 160);
    let m = innerMenu.getBoundingClientRect();
    let menuCoord = Math.ceil(230 + m.y);

    console.log(cardsCoord, menuCoord);

    if (cardsCoord < menuCoord) {
        menu.classList.add("closed");
        menu.classList.remove("open");
        if (document.body.clientWidth <= 1024) {
            menuButton.classList.remove("closed");
        }
    } else if (cardsCoord > menuCoord) {
        menu.classList.remove("closed");
    }

   for (let i = 0; i < cardsList.length; i++) {

        if ((Math.ceil(cardsList[i].getBoundingClientRect().y)) <= 10) {
            menuLinksList.forEach(function(el) {
                if (el.classList.contains("menu__link_active")) {
                    el.classList.remove("menu__link_active");
                }
            });
            menuLinksList[i].classList.add("menu__link_active");

            menuItemsList.forEach(function (el) {
                if (el.classList.contains("menu__item_active")) {
                    el.classList.remove("menu__item_active");
                }
            });
            menuItemsList[i].classList.add("menu__item_active");
        }
     }
}