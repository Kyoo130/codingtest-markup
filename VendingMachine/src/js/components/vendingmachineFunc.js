class VendingmachineFunc {
  constructor() {
    this.btnPut = document.querySelector(".btn-put");
    this.myMoney = document.querySelector(".txt-mymoney");
    this.balance = document.querySelector(".txt-balance");
    this.itemList = document.querySelector(".list-item");
    this.inputCostEl = document.querySelector(".inp-put");
    this.btnReturn = document.querySelector(".btn-return");
    this.btnGet = document.querySelector(".btn-get");
    this.stagedList = document.querySelector(".cont-get .list-item-staged");
    this.gotList = document.querySelector(".cont-myitems .list-item-staged");
    this.txtTotal = document.querySelector(".txt-total");
  }

  setup() {
    this.bindEvents();
  }
  stagedItemGenerator(target) {
    const stagedItem = document.createElement("li");
    stagedItem.dataset.item = target.dataset.item;
    stagedItem.dataset.price = target.dataset.price;

    stagedItem.innerHTML = `
      <img src="./src/images/${target.dataset.img}" alt="" class="img-item">
      <strong class="txt-item">${target.dataset.item}</strong>
      <span class="num-counter">1</span>
      `;
    this.stagedList.appendChild(stagedItem);
  }

  bindEvents() {
    this.btnPut.addEventListener("click", () => {
      const inputCost = parseInt(this.inputCostEl.value);
      const myMoneyVal = parseInt(this.myMoney.innerText.replace(",", ""));
      const balanceVal = parseInt(this.balance.innerText.replace(",", ""));

      if (inputCost <= myMoneyVal) {
        this.myMoney.innerText =
          new Intl.NumberFormat().format(myMoneyVal - inputCost) + " 원";
        this.balance.innerText =
          new Intl.NumberFormat().format(
            (balanceVal ? balanceVal : 0) + inputCost
          ) + " 원";
        this.inputCostEl.value = null;
      } else {
        alert("소지금이 부족합니다.");
        this.inputCostEl.value = null;
      }
    });

    this.btnReturn.addEventListener("click", () => {
      const myMoneyVal = parseInt(this.myMoney.innerText.replace(",", ""));
      const balanceVal = parseInt(this.balance.innerText.replace(",", ""));

      if (balanceVal) {
        this.myMoney.innerText =
          Intl.NumberFormat().format(myMoneyVal + balanceVal) + " 원";
        this.balance.innerText = "원";
      }
    });

    this.itemList.addEventListener("click", (event) => {
      const targetEl = event.target;
      const balanceVal = parseInt(this.balance.innerText.replace(",", ""));
      const targetElBtn = targetEl.querySelector(".btn-item");
      let isStaged = false;

      if (targetEl.tagName === "LI") {
        const targetElPrice = parseInt(targetElBtn.dataset.price);
        if (balanceVal >= targetElPrice) {
          this.balance.innerText =
            new Intl.NumberFormat().format(balanceVal - targetElPrice) + " 원";

          if (this.stagedList.querySelectorAll("li").length > 0) {
            this.stagedList.querySelectorAll("li").forEach((item) => {
              if (item.dataset.item === targetElBtn.dataset.item) {
                item.querySelector(".num-counter").innerText++;
                isStaged = true;
                return;
              }
            });
            if (!isStaged) {
              this.stagedItemGenerator(targetElBtn);
            }
          } else {
            this.stagedItemGenerator(targetElBtn);
          }
          targetElBtn.dataset.count--;
          if (targetElBtn.dataset.count == 0) {
            targetEl.classList.add("sold-out");
          }
        } else {
          alert("잔액이 부족합니다. 소지금을 입금 후 선택해 주세요.");
        }
      }
    });

    this.btnGet.addEventListener("click", () => {
      let totalPrice = 0;
      let isGot = false;
      this.stagedList.querySelectorAll("li").forEach((itemStaged) => {
        this.gotList.querySelectorAll("li").forEach((itemGot) => {
          let itemGotCount = itemGot.querySelector(".num-counter");
          if (itemStaged.dataset.item === itemGot.dataset.item) {
            itemGotCount.innerText =
              parseInt(itemGotCount.innerText) +
              parseInt(itemStaged.querySelector(".num-counter").innerText);
            this.stagedList.removeChild(itemStaged);
            isGot = true;
            return;
          }
        });
        if (!isGot) {
          this.gotList.appendChild(itemStaged);
        }
      });
      this.gotList.querySelectorAll("li").forEach((itemGot) => {
        totalPrice +=
          itemGot.dataset.price *
          parseInt(itemGot.querySelector(".num-counter").innerText);
      });
      this.txtTotal.innerText = `총금액 : ${new Intl.NumberFormat().format(
        totalPrice
      )}원`;
    });
  }
}

export default VendingmachineFunc;
