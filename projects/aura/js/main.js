const swiper = new Swiper('.new-stickers__slider', {
    direction: 'horizontal',
    loop: true,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: (idx, className) => {
            return `<span class="${className} new-stickers__page">${idx + 1}</span>`
        }
    },
})

let auctionsContainer = document.getElementById("auctions-content")

updateOtherAuctions(auctionsContainer)

window.addEventListener("resize", () => {
    updateOtherAuctions(auctionsContainer)
})



function updateOtherAuctions(auctionsContainer) {
    let renderMode = (() => {
        if (window.matchMedia("(max-width: 540px)").matches) {
            return "slider"
        }
        else if (window.matchMedia("(max-width: 1024px)").matches) {
            return "grid-6"
        }
        else {
            return "grid-8"
        }
    })()

    if (this.renderMode === renderMode) {
        return
    }
    this.renderMode = renderMode

    if (this.renderMode === "slider") {
        let auctions = fetchAuctions(6)
        renderAuctionsAsSlider(auctionsContainer, auctions)
    } else {
        let auctions = this.renderMode === "grid-6" ? fetchAuctions(6) : fetchAuctions(8)
        renderAuctionsAsList(auctionsContainer, auctions)
    }
}

function renderAuctionsAsList(auctionsContainer, auctions) {
    let auctionsHtml = auctions.map((x) => `
        <li class="auction-card other-auctions__item">
            <div class="auction-card__sticker-img">
                <img src="${x.sticker.img}">
            </div>
            <div class="auction-card__data">
                <div class="auction-card__owner">
                    <img src="${x.owner.avatar}" class="auction-card__owner-avatar">
                    <span class="auction-card__owner-nick">${x.owner.nick}</span>
                </div>
                <span class="auction-card__sticker-name">${x.sticker.name}</span>
                <span class="auction-card__price">${x.price}</span>
                <span class="auction-card__timer">${x.timer}</span>
            </div>
        </li>
    `).join("");
    auctionsHtml = `<ul class="other-auctions__list">${auctionsHtml}</ul>`

    auctionsContainer.innerHTML = auctionsHtml
}

function renderAuctionsAsSlider(auctionsContainer, auctions) {
    let auctionsHtml = auctions.map((x) => `
        <div class="swiper-slide">
            <div class="auction-card other-auctions__item">
                <div class="auction-card__sticker-img">
                    <img src="${x.sticker.img}">
                </div>
                <div class="auction-card__data">
                    <div class="auction-card__owner">
                        <img src="${x.owner.avatar}" class="auction-card__owner-avatar">
                        <span class="auction-card__owner-nick">${x.owner.nick}</span>
                    </div>
                    <span class="auction-card__sticker-name">${x.sticker.name}</span>
                    <span class="auction-card__price">${x.price}</span>
                    <span class="auction-card__timer">${x.timer}</span>
                </div>
            </div>
        </div>
    `).join("");
    auctionsHtml = `<div class="swiper other-auctions__slider"><div class="swiper-wrapper">${auctionsHtml}</div><div class="swiper-pagination"></div></div>`

    auctionsContainer.innerHTML = auctionsHtml
    new Swiper(".other-auctions__slider", {
        direction: "horizontal",
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    })
}

// Imitates auctions fetching from backend
function fetchAuctions(count) {
    let auctions = [
        {
            sticker: {
                img: "img/other-1.png",
                name: "Alien (green) e_e",
            },
            owner: {
                avatar: "img/other-owner-1.png",
                nick: "Frank.Nagval",
            },
            price: "0.02 ETH",
            timer: "03 часа 25 мин 23 сек",
        },
        {
            sticker: {
                img: "img/other-2.png",
                name: "CoBRRRa",
            },
            owner: {
                avatar: "img/other-owner-2.png",
                nick: "CPH_777",
            },
            price: "0.5 ETH",
            timer: "15 мин 03 сек",
        },
        {
            sticker: {
                img: "img/other-3.png",
                name: "Diamonds (4)",
            },
            owner: {
                avatar: "img/other-owner-3.png",
                nick: "sUpah_kiLLah",
            },
            price: "0.008 ETH",
            timer: "23 часа 05 мин 08 сек",
        },
        {
            sticker: {
                img: "img/other-4.png",
                name: "Holofobia-2",
            },
            owner: {
                avatar: "img/other-owner-4.png",
                nick: "ttgs",
            },
            price: "1.0 ETH",
            timer: "01 час 15 мин 55 сек",
        },
        {
            sticker: {
                img: "img/other-5.png",
                name: "Baby Yoda 1",
            },
            owner: {
                avatar: "img/other-owner-5.png",
                nick: "Peppppe22",
            },
            price: "0.2 ETH",
            timer: "01 час 28 мин 11 сек",
        },
        {
            sticker: {
                img: "img/other-6.png",
                name: "alien vs. predator (01)",
            },
            owner: {
                avatar: "img/other-owner-6.png",
                nick: "1300e1440",
            },
            price: "0.09 ETH",
            timer: "08 часов 44 мин 43 сек",
        },
        {
            sticker: {
                img: "img/other-7.png",
                name: "IAMDECEPTICON",
            },
            owner: {
                avatar: "img/other-owner-7.png",
                nick: "Robert_Wward",
            },
            price: "0.1 ETH",
            timer: "55 мин 18 сек",
        },
        {
            sticker: {
                img: "img/other-8.png",
                name: "Ghostbusterrrrrrrs",
            },
            owner: {
                avatar: "img/other-owner-8.png",
                nick: "ttgs",
            },
            price: "0.09 ETH",
            timer: "18 мин 12 сек",
        },
    ]

    return auctions.slice(0, count)
}

