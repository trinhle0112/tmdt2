(() => {
  const application = Stimulus.Application.start();

  application.register(
    'fixedcosts',
    class extends Stimulus.Controller {
      static targets = [
        'purchasequantity',
        'freightfromvendor',
        'freighttoamazon',
        'customs',
        'other',
        'show',
      ];

      calculate() {
        this.calculateTotal();
        this.showFixedCosts();
        this.showTarget.dataset.costInCents = this.calculateTotal();
      }

      showFixedCosts() {
        this.showTarget.innerHTML = this.toDollarString(this.calculateTotal());
      }

      calculateTotal() {
        if (this.getPurchaseQuantity() === 0) {
          return 0;
        } else {
          var total = 0;
          total += this.getFreightFromVendor();
          total += this.getFreightToAmazon();
          total += this.getCustoms();
          total += this.getOther();
          return total / this.getPurchaseQuantity();
          
        }
      }

      getPurchaseQuantity() {
        const element = this.purchasequantityTarget;
        const value = element.value;
        return value * 1;
      }

      getFreightFromVendor() {
        const element = this.freightfromvendorTarget;
        const value = element.value;
        return this.toCentValue(value);
      }

      getFreightToAmazon() {
        const element = this.freighttoamazonTarget;
        const value = element.value;
        return this.toCentValue(value);
      }

      getCustoms() {
        const element = this.customsTarget;
        const value = element.value;
        return this.toCentValue(value);
      }

      getOther() {
        const element = this.otherTarget;
        const value = element.value;
        return this.toCentValue(value);
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
