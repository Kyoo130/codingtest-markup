class VendingmachineFunc {
    constructor() {
        this.btnPut = document.querySelector('.btn-put');
        this.myMoney = document.querySelector('.txt-mymoney');
        this.balance = document.querySelector('.txt-balance');
        this.itemList = document.querySelector('.list-item');
        this.inputCostEl = document.querySelector('.inp-put');
        this.btnReturn = document.querySelector('.btn-return');
        this.btnGet = document.querySelector('.btn-get');
        this.stagedList = document.querySelector('.cont-get .list-item-staged');
        this.gotList = document.querySelector('.cont-myitems .list-item-staged');
        this.txtTotal = document.querySelector('.txt-total');
    }

    setup() {
        this.bindEvents();
    }

    bindEvents() {
        this.btnPut.addEventListener('click', () => {
            const inputCost = parseInt(this.inputCostEl.value);
            const myMoneyVal = parseInt(this.myMoney.innerText.replace(',', ''));
            const balanceVal = parseInt(this.balance.innerText.replace(',', ''));

            if (inputCost <= myMoneyVal) {
                this.myMoney.innerText = new Intl.NumberFormat().format(myMoneyVal - inputCost) + ' 원';
                this.balance.innerText = new Intl.NumberFormat().format((balanceVal ? balanceVal : 0) + inputCost) + ' 원';
                this.inputCostEl.value = null;
            } else {
                alert("소지금이 부족합니다.");
                this.inputCostEl.value = null;
            }

        })
    }
}

export default VendingmachineFunc;