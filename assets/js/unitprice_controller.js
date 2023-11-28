(() => {
  const application = Stimulus.Application.start();

  application.register(
    'unitprice',
    class extends Stimulus.Controller {
      static targets = ['unitprice', 'show'];

      calculate() {
        this.getUnitPrice();
        this.showUnitPrice();
        this.showTarget.dataset.costInCents = this.getUnitPrice()
      }

      getUnitPrice() {
        const element = this.unitpriceTarget;
        const value = element.value;
        return this.toCentValue(value);
      }

      showUnitPrice() {
        this.showTarget.innerHTML = this.toDollarString(this.getUnitPrice());
      }

      toCentValue(dollarString) {
        let dollarValue = parseFloat(dollarString) || 0.00
        let centValue = dollarValue * 100
    
        return Math.round(centValue)
      }
    
      toDollarString(centValue) {
        let dollarValue = centValue / 100
        return `$${parseFloat(dollarValue.toFixed(2)).toLocaleString(undefined, { minimumFractionDigits: 2 })}`
      }
    }
  );
})();
