(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function addLoadedClass() {
        window.addEventListener("load", (function() {
            if (document.querySelector("body")) setTimeout((function() {
                document.querySelector("body").classList.add("_loaded");
            }), 200);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    if (sessionStorage.getItem("preloader")) {
        if (document.querySelector(".preloader")) document.querySelector(".preloader").classList.add("_hide");
        document.querySelector(".wrapper").classList.add("_visible");
    }
    if (sessionStorage.getItem("money")) {
        if (document.querySelector(".check")) document.querySelectorAll(".check").forEach((el => {
            el.textContent = sessionStorage.getItem("money");
        }));
    } else {
        sessionStorage.setItem("money", 30);
        if (document.querySelector(".check")) document.querySelectorAll(".check").forEach((el => {
            el.textContent = sessionStorage.getItem("money");
        }));
    }
    if (document.querySelector(".game")) if (+sessionStorage.getItem("money") >= 5) {
        sessionStorage.setItem("current-bet", 5);
        document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
    } else {
        sessionStorage.setItem("current-bet", 0);
        document.querySelector(".block-bet__coins").textContent = 0;
    }
    const preloader = document.querySelector(".preloader");
    const wrapper = document.querySelector(".wrapper");
    document.documentElement.clientWidth;
    document.documentElement.clientHeight;
    function deleteMoney(count, block) {
        let money = +sessionStorage.getItem("money");
        sessionStorage.setItem("money", money - count);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.add("_delete-money")));
            document.querySelectorAll(block).forEach((el => el.textContent = sessionStorage.getItem("money")));
        }), 500);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_delete-money")));
        }), 1900);
    }
    function checkRemoveAddClass(block, className, elem) {
        document.querySelectorAll(block).forEach((item => item.classList.remove(className)));
        elem.classList.add(className);
    }
    function noMoney(block) {
        document.querySelectorAll(block).forEach((el => el.classList.add("_no-money")));
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_no-money")));
        }), 1400);
    }
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function getRandom_2(min, max) {
        return (Math.random() * (max - min) + min).toFixed(2);
    }
    function addMoney(count, block, delay, delay_off) {
        let money = Math.floor(+sessionStorage.getItem("money") + count);
        setTimeout((() => {
            sessionStorage.setItem("money", money);
            document.querySelectorAll(block).forEach((el => el.textContent = sessionStorage.getItem("money")));
            document.querySelectorAll(block).forEach((el => el.classList.add("_anim-add-money")));
        }), delay);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_anim-add-money")));
        }), delay_off);
    }
    let anim_items = document.querySelectorAll(".icon-anim img");
    function getRandomAnimate() {
        let number = getRandom(0, 3);
        let arr = [ "jump", "scale", "rotate" ];
        let random_item = getRandom(0, anim_items.length);
        anim_items.forEach((el => {
            if (el.classList.contains("_anim-icon-jump")) el.classList.remove("_anim-icon-jump"); else if (el.classList.contains("_anim-icon-scale")) el.classList.remove("_anim-icon-scale"); else if (el.classList.contains("_anim-icon-rotate")) el.classList.remove("_anim-icon-rotate");
        }));
        setTimeout((() => {
            anim_items[random_item].classList.add(`_anim-icon-${arr[number]}`);
        }), 100);
    }
    if (document.querySelector(".icon-anim img")) setInterval((() => {
        getRandomAnimate();
    }), 2e4);
    const prices = {
        price_1: 3500,
        price_2: 4500,
        price_3: 5500
    };
    if (document.querySelector(".main") && document.querySelector(".preloader").classList.contains("_hide")) {
        document.querySelector(".main").classList.add("_active");
        drawPrices();
        checkBoughtAirplanes();
    }
    function drawPrices() {
        document.querySelector('[data-price="1"]').textContent = prices.price_1;
        document.querySelector('[data-price="2"]').textContent = prices.price_2;
        document.querySelector('[data-price="3"]').textContent = prices.price_3;
    }
    function checkBoughtAirplanes() {
        if (sessionStorage.getItem("airplane-2")) {
            document.querySelector('[data-shop-button="2"] p').textContent = "select";
            document.querySelector('[data-shop-button="2"]').classList.add("_bought");
        }
        if (sessionStorage.getItem("airplane-3")) {
            document.querySelector('[data-shop-button="3"] p').textContent = "select";
            document.querySelector('[data-shop-button="3"]').classList.add("_bought");
        }
    }
    function drawStartAirplane() {
        if (!sessionStorage.getItem("current-airplane")) sessionStorage.setItem("current-airplane", 1);
    }
    const config_game = {
        state: 1,
        height_field: document.querySelector(".game") ? document.querySelector(".field__body").clientHeight : false,
        current_win: 0,
        current_coeff: 0,
        start_coeff: 0,
        coeff_up: .01,
        speed_up: .3,
        speed_right: .4,
        timerId: false,
        timerCoeff: false,
        timerDraw: false
    };
    const config_canvas = {
        width: 0,
        height: 0,
        color_line: 0
    };
    if (document.querySelector(".game") && document.querySelector(".preloader").classList.contains("_hide")) {
        drawCurrentAirplane();
        drawMeasureSvgCircle();
        setCanvas();
    }
    function drawCurrentAirplane() {
        document.querySelector(".field__airplane img").setAttribute("src", `img/game/airplane-${sessionStorage.getItem("current-airplane")}.svg`);
    }
    function drawMeasureSvgCircle() {
        let svg = document.querySelector(".field__circle circle");
        let svg_m = document.querySelector(".field__circle svg");
        svg.setAttribute("r", 4 * config_game.height_field);
        svg.setAttribute("stroke-width", 8 * config_game.height_field);
        svg_m.setAttribute("width", 8 * config_game.height_field);
        svg_m.setAttribute("height", 8 * config_game.height_field);
        document.querySelector(".field__circle").style.left = `-${4 * config_game.height_field}px`;
        document.querySelector(".field__circle").style.bottom = `${3 * config_game.height_field}px`;
    }
    function addRotateCircleBg() {
        document.querySelector(".field__circle svg").classList.add("_rotate");
    }
    function removeRotateCircleBg() {
        if (document.querySelector(".field__circle svg").classList.contains("_rotate")) document.querySelector(".field__circle svg").classList.remove("_rotate");
    }
    function startGame() {
        config_game.state = 2;
        config_game.current_coeff = +getRandom_2(1.1, generateCoeff());
        deleteMoney(+sessionStorage.getItem("current-bet"), ".check");
        addRotateCircleBg();
        generateStartSpeed();
        generateLineColor();
        moovePlayer();
        intervalCoeff();
    }
    function generateCoeff() {
        let state = +getRandom(1, 10);
        if (state > 0 && state <= 3) return 2; else if (state > 3 && state <= 7) return 3; else if (state > 7) return 5;
    }
    function generateStartSpeed() {
        config_game.speed_up = +getRandom_2(.11, .25);
        config_game.speed_right = +getRandom_2(.4, .7);
    }
    function generateLineColor() {
        config_canvas.color_line = `${getRandom(0, 255)},${getRandom(0, 255)},${getRandom(0, 255)}`;
    }
    function moovePlayer() {
        let bottom = 0;
        let left = 0;
        let rotate = -5;
        let player = document.querySelector(".field__airplane");
        drawCanvas();
        config_game.timerId = setInterval((() => {
            if (left <= 15) bottom += config_game.speed_up; else if (left > 15 && left <= 30) bottom += 1.5 * config_game.speed_up; else if (left > 30 && left <= 45) bottom += 2 * config_game.speed_up; else if (left > 45) bottom += 4 * config_game.speed_up;
            left += config_game.speed_right;
            if (rotate >= -20) rotate -= .2;
            player.style.bottom = `${bottom}%`;
            player.style.left = `${left}%`;
            player.style.transform = `rotate(${rotate}deg)`;
            if (config_game.start_coeff >= config_game.current_coeff) {
                player.style.transition = `all 2s ease 0s`;
                player.style.left = `150%`;
                player.style.bottom = `110%`;
                config_game.state = 3;
                stopAnimation();
                addLooseColorButtons();
                document.querySelector(".footer__button-cash").classList.add("_hold");
                setTimeout((() => {
                    clearCanvas();
                    resetGame();
                }), 2e3);
            }
        }), 35);
    }
    function setCanvas() {
        let canvas = document.querySelector(".ctx");
        let block = document.querySelector(".field__body");
        config_canvas.width = block.clientWidth;
        config_canvas.height = block.clientHeight;
        canvas.setAttribute("width", `${config_canvas.width}px`);
        canvas.setAttribute("height", `${config_canvas.height}px`);
    }
    function createLineCanvas(x, y, color, start_position, lineWidth, rx, ry) {
        let canvas = document.querySelector(".ctx");
        let ctx = canvas.getContext("2d");
        ctx.lineWidth = lineWidth;
        let gradient = ctx.createLinearGradient(0, config_canvas.height, x, y);
        gradient.addColorStop(0, `rgba(${color},0.1)`);
        gradient.addColorStop(1, `rgba(${color},1)`);
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(start_position, config_canvas.height);
        ctx.quadraticCurveTo(x - rx, y + ry, x, y);
        ctx.stroke();
    }
    function clearCanvas() {
        let canvas = document.querySelector(".ctx");
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, config_canvas.width, config_canvas.height);
    }
    function drawCanvas() {
        let pin = document.querySelector(".field__pin");
        let canvas = document.querySelector(".ctx");
        let ctx = canvas.getContext("2d");
        config_game.timerDraw = setInterval((() => {
            if (3 == config_game.state) setTimeout((() => {
                clearInterval(config_game.timerDraw);
            }), 800);
            let coord_x = pin.getBoundingClientRect().left - 40;
            let coord_y = pin.getBoundingClientRect().top - 30;
            ctx.clearRect(0, 0, config_canvas.width, config_canvas.height);
            createLineCanvas(coord_x, coord_y, config_canvas.color_line, 0, "3", 10, 15);
        }), 50);
    }
    function intervalCoeff() {
        config_game.timerCoeff = setInterval((() => {
            config_game.start_coeff += config_game.coeff_up;
            drawCurrentCoeff();
            drawCurrentCount();
        }), 10);
    }
    function drawCurrentCoeff() {
        document.querySelector(".field__coeff").textContent = `${config_game.start_coeff.toFixed(2)}x`;
    }
    function drawCurrentCount() {
        let bet = +sessionStorage.getItem("current-bet");
        config_game.current_win = Math.floor(bet * config_game.start_coeff);
        document.querySelector(".footer__current-count").textContent = config_game.current_win;
    }
    function stopAnimation() {
        clearInterval(config_game.timerId);
        clearInterval(config_game.timerCoeff);
    }
    function addLooseColorButtons() {
        document.querySelector(".footer__button-cash").classList.add("_loose");
        document.querySelector(".footer__button-bet").classList.add("_loose");
    }
    function removeLooseColorButtons() {
        if (document.querySelector(".footer__button-cash").classList.contains("_loose")) document.querySelector(".footer__button-cash").classList.remove("_loose");
        if (document.querySelector(".footer__button-bet").classList.contains("_loose")) document.querySelector(".footer__button-bet").classList.remove("_loose");
    }
    function resetGame() {
        let player = document.querySelector(".field__airplane");
        config_game.current_win = 0;
        config_game.start_coeff = 0;
        config_game.state = 1;
        player.style.transition = `none`;
        player.style.left = `2%`;
        player.style.bottom = `7%`;
        player.style.transform = `rotate(-5deg)`;
        document.querySelector(".footer__current-count").textContent = 0;
        document.querySelector(".field__coeff").textContent = "0x";
        removeLooseColorButtons();
        removeRotateCircleBg();
        document.querySelector(".field__body").classList.add("_loader");
        setTimeout((() => {
            document.querySelector(".field__body").classList.remove("_loader");
            if (document.querySelector(".footer__bet-box").classList.contains("_hold")) document.querySelector(".footer__bet-box").classList.remove("_hold");
            if (document.querySelector(".footer__button-cash").classList.contains("_hold")) document.querySelector(".footer__button-cash").classList.remove("_hold");
        }), 5e3);
    }
    document.addEventListener("click", (e => {
        let targetElement = e.target;
        let bank = +sessionStorage.getItem("money");
        let current_bet = +sessionStorage.getItem("current-bet");
        if (targetElement.closest(".preloader__button")) {
            sessionStorage.setItem("preloader", true);
            preloader.classList.add("_hide");
            wrapper.classList.add("_visible");
            if (document.querySelector(".main") && document.querySelector(".preloader").classList.contains("_hide")) {
                document.querySelector(".main").classList.add("_active");
                drawPrices();
                drawStartAirplane();
            }
        }
        if (targetElement.closest(".main__button_shop")) document.querySelector(".main__body").classList.add("_shop");
        if (targetElement.closest(".main__button-back")) document.querySelector(".main__body").classList.remove("_shop");
        if (targetElement.closest('[data-shop-button="1"]')) {
            checkRemoveAddClass(".shop__item", "_selected", document.querySelectorAll(".shop__item")[0]);
            sessionStorage.setItem("current-airplane", 1);
        }
        if (targetElement.closest('[data-shop-button="2"]') && !targetElement.closest('[data-shop-button="2"]').classList.contains("_bought")) if (bank >= prices.price_2) {
            deleteMoney(prices.price_2, ".check");
            sessionStorage.setItem("airplane-2", true);
            checkBoughtAirplanes();
        } else noMoney(".check"); else if (targetElement.closest('[data-shop-button="2"]') && targetElement.closest('[data-shop-button="2"]').classList.contains("_bought")) {
            checkRemoveAddClass(".shop__item", "_selected", document.querySelectorAll(".shop__item")[1]);
            sessionStorage.setItem("current-airplane", 2);
        }
        if (targetElement.closest('[data-shop-button="3"]') && !targetElement.closest('[data-shop-button="3"]').classList.contains("_bought")) if (bank >= prices.price_3) {
            deleteMoney(prices.price_3, ".check");
            sessionStorage.setItem("airplane-3", true);
            checkBoughtAirplanes();
        } else noMoney(".check"); else if (targetElement.closest('[data-shop-button="3"]') && targetElement.closest('[data-shop-button="3"]').classList.contains("_bought")) {
            checkRemoveAddClass(".shop__item", "_selected", document.querySelectorAll(".shop__item")[2]);
            sessionStorage.setItem("current-airplane", 3);
        }
        if (targetElement.closest(".block-bet__minus")) if (current_bet > 5) {
            sessionStorage.setItem("current-bet", current_bet - 5);
            document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
        }
        if (targetElement.closest(".block-bet__plus")) if (bank - 4 > current_bet) {
            sessionStorage.setItem("current-bet", current_bet + 5);
            document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
        } else noMoney(".check");
        if (targetElement.closest('[data-footer-button="bet"]')) if (!targetElement.closest('[data-footer-button="bet"]').classList.contains("_active")) checkRemoveAddClass(".footer__button", "_active", targetElement.closest('[data-footer-button="bet"]'));
        if (targetElement.closest('[data-footer-button="auto"]')) {
            checkRemoveAddClass(".footer__button", "_active", targetElement.closest('[data-footer-button="auto"]'));
            document.querySelector(".footer__bet-box").classList.add("_hold");
        }
        if (targetElement.closest(".footer__button-bet")) {
            document.querySelector(".footer__bet-box").classList.add("_hold");
            startGame();
        }
        if (targetElement.closest(".footer__button-cash") && 2 == config_game.state) {
            stopAnimation();
            config_game.state = 3;
            document.querySelector(".footer__button-cash").classList.add("_hold");
            setTimeout((() => {
                resetGame();
            }), 2e3);
            addMoney(config_game.current_win, ".check", 1e3, 2e3);
        }
    }));
    window["FLS"] = true;
    isWebp();
    addLoadedClass();
})();