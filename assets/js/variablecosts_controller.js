(() => {
  const application = Stimulus.Application.start();

  application.register(
    'variablecosts',
    class extends Stimulus.Controller {
      static targets = ['labels', 'prep', 'other', 'show'];

      calculate() {
        this.sum();
        this.showVariableCosts();
        this.showTarget.dataset.costInCents = this.sum();
      }

      sum() {
        var total = 0;
        total += this.getLabels();
        total += this.getPrep();
        total += this.getOther();
        return total;
      }

      getLabels() {
        const element = this.labelsTarget;
        const value = element.value;
        return this.toCentValue(value);
      }

      getPrep() {
        const element = this.prepTarget;
        const value = element.value;
        return this.toCentValue(value);
      }

      getOther() {
        const element = this.otherTarget;
        const value = element.value;
        return this.toCentValue(value);
      }

      showVariableCosts() {
        this.showTarget.innerHTML = this.toDollarString(this.sum());
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
