(() => {
  const application = Stimulus.Application.start();

  application.register(
    'summary',
    class extends Stimulus.Controller {
      static targets = [
        'purchasequantity',
        'showSellPrice',
        'showReferralFee',
        'showFBAFee',
        'showUnitPrice',
        'showVariableCosts',
        'showFixedCosts',
        'summaryUnitRevenue',
        'summaryOrderRevenue',
        'summaryUnitCost',
        'summaryOrderCost',
        'summaryUnitProfit',
        'summaryOrderProfit',
        'summaryMargin',
        'summaryROI',
        'summaryBreakeven',
      ];

      calculate() {
        this.summaryUnitRevenueTarget.innerHTML = this.toDollarString(
          this.calculateUnitRevenue()
        );
        this.summaryUnitCostTarget.innerHTML = this.toDollarString(
          this.calculateUnitCost()
        );
        this.summaryUnitProfitTarget.innerHTML = this.toDollarString(
          this.calculateUnitProfit()
        );
        this.summaryOrderRevenueTarget.innerHTML = this.toRoundedDollarString(
          this.calculateOrderRevenue()
        );
        this.summaryOrderCostTarget.innerHTML = this.toRoundedDollarString(
          this.calculateOrderCost()
        );
        this.summaryOrderProfitTarget.innerHTML = this.toRoundedDollarString(
          this.calculateOrderProfit()
        );
        this.summaryMarginTarget.innerHTML = `${this.calculateMargin().toFixed(
          1
        )}%`;
        this.summaryROITarget.innerHTML = `${this.calculateROI().toFixed(1)}%`;
        this.summaryBreakevenTarget.innerHTML = `${this.calculateBreakeven()}pcs`;
      }

      getPurchaseQuantity() {
        return parseInt(this.purchasequantityTarget.value || 0);
      }

      getSellPrice() {
        return parseInt(this.showSellPriceTarget.dataset.costInCents) || 0;
      }

      getReferralFee() {
        return parseInt(this.showReferralFeeTarget.dataset.costInCents) || 0;
      }

      getFBAFee() {
        return parseInt(this.showFBAFeeTarget.dataset.costInCents) || 0;
      }

      getUnitPrice() {
        return parseInt(this.showUnitPriceTarget.dataset.costInCents) || 0;
      }

      getVariableCosts() {
        return parseInt(this.showVariableCostsTarget.dataset.costInCents) || 0;
      }

      getFixedcosts() {
        return parseInt(this.showFixedCostsTarget.dataset.costInCents) || 0;
      }

      calculateUnitRevenue() {
        return this.getSellPrice();
      }

      calculateUnitCapitalCost() {
        let total = 0;
        total += this.getUnitPrice();
        total += this.getVariableCosts();
        total += this.getFixedcosts();

        return total;
      }

      calculateUnitCost() {
        let total = 0;
        total += this.calculateUnitCapitalCost();
        total += this.getReferralFee();
        total += this.getFBAFee();

        return total;
      }

      calculateUnitProfit() {
        return this.calculateUnitRevenue() - this.calculateUnitCost();
      }

      calculateOrderRevenue() {
        return this.getPurchaseQuantity() * this.calculateUnitRevenue();
      }

      calculateOrderCapitalCost() {
        return this.getPurchaseQuantity() * this.calculateUnitCapitalCost();
      }

      calculateOrderCost() {
        return this.getPurchaseQuantity() * this.calculateUnitCost();
      }

      calculateOrderProfit() {
        return this.getPurchaseQuantity() * this.calculateUnitProfit();
      }

      calculateMargin() {
        let revenue = this.calculateUnitRevenue();
        let profit = this.calculateUnitProfit();

        if (revenue == 0) {
          return 0;
        } else {
          let margin = (100 * profit) / revenue;
          return margin;
        }
      }

      calculateROI() {
        let capitalCost = this.calculateUnitCapitalCost();
        if (capitalCost == 0) {
          return 0;
        }

        return (100 * this.calculateUnitProfit()) / capitalCost;
      }

      calculateBreakeven() {
        if (this.calculateOrderCapitalCost() == 0) {
          return 0;
        }

        return Math.ceil(
          this.calculateOrderCapitalCost() /
            (this.getSellPrice() - this.getReferralFee() - this.getFBAFee())
        );
      }

      toDollarString(centValue) {
        let dollarValue = centValue / 100;
        return `$${parseFloat(dollarValue.toFixed(2)).toLocaleString(
          undefined,
          { minimumFractionDigits: 2 }
        )}`;
      }

      toRoundedDollarString(centValue) {
        let dollarValue = centValue / 100;
        return `$${parseInt(dollarValue.toFixed(0)).toLocaleString()}`;
      }
    }
  );
})();
