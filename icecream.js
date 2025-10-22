const cup = document.getElementById('cup');
const clickchoc = document.getElementById('click-choc');
const clickvanil = document.getElementById('click-vanil');
const clickmint = document.getElementById('click-mint');
const clickstraw = document.getElementById('click-straw');
const choc = document.getElementById('choc');
const vanil = document.getElementById('vanil');
const mint = document.getElementById('mint');
const straw = document.getElementById('straw');
const orders = document.getElementById('orders');
const sprinkplate = document.getElementById('sprink-plate');
const chocplate = document.getElementById('choc-plate');
const cherryplate = document.getElementById('cherry-plate');
const caraplate = document.getElementById('cara-plate');
const sprinkon = document.getElementById('sprink-on');
const caraon = document.getElementById('cara-on');
const cherryon = document.getElementById('cherry-on');
const chocon = document.getElementById('choc-on');
const orderText = document.getElementById('order-text');
const flavorText = document.getElementById('flavor-text');
const toppingsText = document.getElementById('toppings-text');
const submit = document.getElementById('submit');
const reset = document.getElementById('reset');
const moneyText = document.getElementById('money');
const spoon = document.getElementById('spoon');
const correct = document.getElementById('correct');
const shopIcon = document.getElementById('shop-icon');
const shopPopup = document.getElementById('shop-popup');
const closeShop = document.getElementById('close-shop');
const moneyDisplay = document.getElementById('money');

let flavor = 'null';
let topping = 'null';
let currentFlavor = null;
let currentTopping = null;
let money = 0;

let isHolding = false; 
let spoonDefault = { left: 350, bottom: 220 }; 

const flavorList = ['chocolate', 'vanilla', 'mint', 'strawberry'];
const toppingList = ['sprinkles', 'cherry', 'chocolate chips', 'caramel'];

let currentOrder = {flavor: null, topping: null};

function newOrder() {
    currentOrder.flavor = flavorList[Math.floor(Math.random() * flavorList.length)];
    currentOrder.topping = toppingList[Math.floor(Math.random() * toppingList.length)];

    flavorText.textContent = `Flavor: ${currentOrder.flavor}`;
    toppingsText.textContent = `Toppings: ${currentOrder.topping}`;
} 


clickchoc.addEventListener('click', function () {
    flavor = 'chocolate';
    pickUpSpoon();
});

clickvanil.addEventListener('click', function () {
    flavor = 'vanilla';
    pickUpSpoon();

});

clickstraw.addEventListener('click', function () {
    flavor = 'strawberry';
    pickUpSpoon();
});

clickmint.addEventListener('click', function () {
    flavor = 'mint';
    pickUpSpoon();
});

sprinkplate.addEventListener('click', function () {
    topping = 'sprinkles';
});

cherryplate.addEventListener('click', function () {
    topping = 'cherry';
});

chocplate.addEventListener('click', function () {
    topping = 'chocolate chips';
});

caraplate.addEventListener('click', function () {
    topping = 'caramel';
});


cup.addEventListener('click', function () {
    if (flavor !== 'null') {
        choc.style.display = 'none';
        vanil.style.display = 'none';
        straw.style.display = 'none';
        mint.style.display = 'none';

        if (flavor === 'chocolate') {
            choc.style.display = 'block';
        } else if (flavor === 'vanilla') {
            vanil.style.display = 'block';
        } else if (flavor === 'strawberry') {
            straw.style.display = 'block';
        } else if (flavor === 'mint') {
            mint.style.display = 'block';
        }

        currentFlavor = flavor;
        flavor = 'null'; 
        dropSpoon();
    }

    if (topping !== 'null') {
        chocon.style.display = 'none';
        cherryon.style.display = 'none';
        caraon.style.display = 'none';
        sprinkon.style.display = 'none';

        if (topping === 'chocolate chips') {
            chocon.style.display = 'block';
        } else if (topping === 'cherry') {
            cherryon.style.display = 'block';
        } else if (topping === 'caramel') {
            caraon.style.display = 'block';
        } else if (topping === 'sprinkles') {
            sprinkon.style.display = 'block';
        }

        currentTopping = topping;
        topping = 'null'; 
    }
});

submit.addEventListener('click', function() {
    let amount = Math.floor(Math.random() * 6) + 5;

    if (currentFlavor === currentOrder.flavor &&  currentTopping === currentOrder.topping){
        money += amount;
        correct.textContent = `✅`;

    } else {
        correct.textContent = `❌`;
    }
    moneyText.textContent = `$${money}`;
    setTimeout(() => {correct.textContent = ''; }, 2000);
    newCup();
    newOrder();
});

reset.addEventListener('click', function(){
    newCup();
});

function newCup(){
    currentFlavor = null;
    currentTopping = null;
    choc.style.display = 'none';
    vanil.style.display = 'none';
    straw.style.display = 'none';
    mint.style.display = 'none';
    sprinkon.style.display = 'none';
    caraon.style.display = 'none';
    cherryon.style.display = 'none';
    chocon.style.display = 'none';
}

newOrder();

document.addEventListener('mousemove', (e) => {
  if (isHolding) {
    spoon.style.left = `${e.pageX - 50}px`;
    spoon.style.top = `${e.pageY - 50}px`;
    spoon.style.position = 'absolute';
    spoon.style.zIndex = '100';
  }
});

function pickUpSpoon() {
  isHolding = true;
  document.body.style.cursor = 'none';
}

function dropSpoon() {
  isHolding = false;
  spoon.style.left = spoonDefault.left + 'px';
  spoon.style.bottom = spoonDefault.bottom + 'px';
  spoon.style.top = 'auto';
  document.body.style.cursor = 'auto';
}



let ownedItems = {
    roof: ['roof1'],
    cup: ['cup1']
};

let currentItems = {
    roof: 'roof1',
    cup: 'cup1'
};

shopIcon.addEventListener('click', () => {
    updateShopUI();
    shopPopup.classList.remove('hidden');
});

closeShop.addEventListener('click', () => {
    shopPopup.classList.add('hidden');
});

shopPopup.addEventListener('click', (e) => {
    if (e.target.classList.contains('buy')) {
    let price = parseInt(e.target.dataset.price);
    let type = e.target.dataset.type;
    let id = e.target.dataset.id;

    if (money >= price && !ownedItems[type].includes(id)) {
        money -= price;
        ownedItems[type].push(id);
        newMoney();

        const useButton = document.createElement('button');
        useButton.classList.add('use');
        useButton.dataset.type = type;
        useButton.dataset.id = id;
        useButton.textContent = 'Use';

        e.target.parentElement.replaceChild(useButton, e.target);

        updateShopUI();
    }
}

    if (e.target.classList.contains('use')) {
        let type = e.target.dataset.type;
        let id = e.target.dataset.id;

        if (ownedItems[type].includes(id)) {
            currentItems[type] = id;
            updateShopUI();
            updatePage();
        }
    }
});


function newMoney() {
    moneyText.textContent = `$${money}`;
}

function updateShopUI() {
    const buyButtons = document.querySelectorAll('.buy');
    const useButtons = document.querySelectorAll('.use');

    buyButtons.forEach(btn => {
        const type = btn.dataset.type;
        const id = btn.dataset.id;
        if (ownedItems[type].includes(id)) {
            btn.style.display = 'none';
        } else {
            btn.style.display = 'inline-block';
        }
    });

    useButtons.forEach(btn => {
        const type = btn.dataset.type;
        const id = btn.dataset.id;
        if (currentItems[type] === id) {
            btn.classList.add('active');
            btn.textContent = 'Using';
        } else {
            btn.classList.remove('active');
            btn.textContent = 'Use';
        }
    });
}

function updatePage() {

    const roof = document.querySelector('.roof');
    if (currentItems.roof === 'roof1') {
        roof.src = 'images/roof.png';
    } else if (currentItems.roof === 'roof2') {
        roof.src = 'images/roof-yellow.png';
    } else if (currentItems.roof === 'roof3'){
        roof.src = 'images/roof-blue.png';

    }

    
    const cup = document.getElementById('cup');
    if (currentItems.cup === 'cup1') {
        cup.src = 'images/cup.png';
    } else if (currentItems.cup === 'cup2') {
        cup.src = 'images/blue-cup.png';
    } else if (currentItems.cup === 'cup3') {
        cup.src = 'images/green-cup.png';
    }
}

