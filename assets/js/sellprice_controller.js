(() => {
  const application = Stimulus.Application.start();

  application.register(
    'sellprice',
    class extends Stimulus.Controller {
      static targets = ['sellprice', 'show'];

      calculate() {
        this.getSellPrice();
        this.showSellPrice();
        this.showTarget.dataset.costInCents = this.getSellPrice();
      }

      getSellPrice() {
        const element = this.sellpriceTarget;
        const value = element.value;
        return this.toCentValue(value);
      }

      showSellPrice() {
        this.showTarget.innerHTML = this.toDollarString(this.getSellPrice());
      }

      toCentValue(dollarString) {
        let dollarValue = parseFloat(dollarString) || 0;
        let centValue = dollarValue * 100;

        return Math.round(centValue);
      }

      toDollarString(centValue) {
        let dollarValue = centValue / 100;
        return `$${parseFloat(dollarValue.toFixed(2)).toLocaleString(
          undefined,
          { minimumFractionDigits: 2 }
        )}`;
      }
    }
  );
})();
