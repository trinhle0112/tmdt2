(() => {
  const application = Stimulus.Application.start();

  application.register(
    'fbafee',
    class extends Stimulus.Controller {
      static targets = [
        'longestside',
        'medianside',
        'shortestside',
        'pounds',
        'ounces',
        'show',
        'message',
      ];

      calculate() {
        if (this.missingRequiredFields()) {
          this.showTarget.innerHTML = this.toDollarString(0);
          this.showTarget.dataset.costInCents = 0;
          this.messageTarget.innerHTML = '';
        } else {
          this.showTarget.innerHTML = this.toDollarString(
            this.findRateTier().fulfillmentCost()
          );
          this.showTarget.dataset.costInCents = this.findRateTier().fulfillmentCost();
          this.messageTarget.innerHTML = `${
            this.findRateTier().name
          }, ${this.findRateTier().weightInformationString()}`;
        }
      }

      missingRequiredFields() {
        return (
          this.getWeightInOunces() == 0 ||
          this.getLongestSide() == 0 ||
          this.getMedianSide() == 0 ||
          this.getShortestSide() == 0
        );
      }

      findRateTier() {
        return this.rateTiers().find((rateTier) => {
          return rateTier.valid(
            this.getWeightInOunces(),
            this.getLongestSide(),
            this.getMedianSide(),
            this.getShortestSide()
          );
        });
      }

      rateTiers() {
        return [
          {
            name: 'Small Standard',
            maxShippingWeight: 16,
            packagingWeight: 4,
            maxLongestSide: 15,
            maxMedianSide: 12,
            maxShortestSide: 0.75,
            valid: function (
              unitWeight,
              longestSide,
              medianSide,
              shortestSide
            ) {
              this.unitWeight = unitWeight;
              this.longestSide = longestSide;
              this.medianSide = medianSide;
              this.shortestSide = shortestSide;
              this.shippingWeight = Math.ceil(
                this.unitWeight + this.packagingWeight
              );
              this.lengthAndGirth = this.calculateLengthAndGirth();

              return (
                this.shippingWeight <= this.maxShippingWeight &&
                this.longestSide <= this.maxLongestSide &&
                this.medianSide <= this.maxMedianSide &&
                this.shortestSide <= this.maxShortestSide
              );
            },
            fulfillmentCost: function () {
              if (this.shippingWeight <= 10) {
                return 250;
              } else {
                return 263;
              }
            },
            weightInformationString: function () {
              return `${this.shippingWeight.toFixed(1)}oz Shipping Weight`;
            },
            dimensionalWeight: function () {
              return (
                (this.longestSide * this.medianSide * this.shortestSide) / 139
              );
            },
            calculateLengthAndGirth() {
              return (
                this.longestSide + 2 * (this.medianSide + this.shortestSide)
              );
            },
          },
          {
            name: 'Large Standard',
            maxShippingWeight: 16,
            packagingWeight: 4,
            maxLongestSide: 18,
            maxMedianSide: 14,
            maxShortestSide: 8,
            basePrice: 331,
            valid: function (
              unitWeight,
              longestSide,
              medianSide,
              shortestSide
            ) {
              this.unitWeight = unitWeight;
              this.longestSide = longestSide;
              this.medianSide = medianSide;
              this.shortestSide = shortestSide;
              this.shippingWeight = Math.ceil(
                this.unitWeight + this.packagingWeight
              );
              this.lengthAndGirth = this.calculateLengthAndGirth();

              return (
                this.shippingWeight <= this.maxShippingWeight &&
                this.longestSide <= this.maxLongestSide &&
                this.medianSide <= this.maxMedianSide &&
                this.shortestSide <= this.maxShortestSide
              );
            },
            fulfillmentCost: function () {
              if (this.shippingWeight <= 10) {
                return 331;
              } else {
                return 348;
              }
            },
            weightInformationString: function () {
              return `${this.shippingWeight.toFixed(1)}oz Shipping Weight`;
            },
            dimensionalWeight: function () {
              return (
                (this.longestSide * this.medianSide * this.shortestSide) / 139
              );
            },
            calculateLengthAndGirth() {
              return (
                this.longestSide + 2 * (this.medianSide + this.shortestSide)
              );
            },
          },
          {
            name: 'Large Standard',
            maxShippingWeight: 336,
            packagingWeight: 4,
            maxLongestSide: 18,
            maxMedianSide: 14,
            maxShortestSide: 8,
            basePrice: 542,
            adderPrice: 38,
            adderWeight: 3,
            valid: function (
              unitWeight,
              longestSide,
              medianSide,
              shortestSide
            ) {
              this.unitWeight = unitWeight;
              this.longestSide = longestSide;
              this.medianSide = medianSide;
              this.shortestSide = shortestSide;
              this.shippingWeight = this.calculateShippingWeight();
              this.lengthAndGirth = this.calculateLengthAndGirth();

              return (
                this.shippingWeight <= this.maxShippingWeight / 16 &&
                this.longestSide <= this.maxLongestSide &&
                this.medianSide <= this.maxMedianSide &&
                this.shortestSide <= this.maxShortestSide
              );
            },
            fulfillmentCost: function () {
              if (this.shippingWeight <= 2) {
                return 490;
              } else if (this.shippingWeight <= 21) {
                let adders = Math.max(
                  0,
                  this.shippingWeight - this.adderWeight
                );
                return this.basePrice + adders * this.adderPrice;
              }
            },
            weightInformationString: function () {
              return `${this.shippingWeight.toFixed(1)}lbs Shipping Weight`;
            },
            dimensionalWeight: function () {
              return (
                (this.longestSide * this.medianSide * this.shortestSide) / 139
              );
            },
            calculateShippingWeight() {
              let actualShippingWeight = Math.ceil(
                this.unitWeight / 16 + this.packagingWeight / 16
              );
              let dimensionalShippingWeight = Math.ceil(
                this.dimensionalWeight() + this.packagingWeight / 16
              );

              if (actualShippingWeight <= 1) {
                return actualShippingWeight;
              } else {
                return Math.max(
                  actualShippingWeight,
                  dimensionalShippingWeight
                );
              }
            },
            calculateLengthAndGirth() {
              return (
                this.longestSide + 2 * (this.medianSide + this.shortestSide)
              );
            },
          },
          {
            name: 'Small Oversize',
            maxShippingWeight: 1136,
            packagingWeight: 16,
            maxLongestSide: 60,
            maxMedianSide: 30,
            maxLengthAndGirth: 130,
            basePrice: 826,
            adderPrice: 38,
            adderWeight: 2,
            valid: function (
              unitWeight,
              longestSide,
              medianSide,
              shortestSide
            ) {
              this.unitWeight = unitWeight;
              this.longestSide = longestSide;
              this.medianSide = medianSide;
              this.shortestSide = shortestSide;
              this.shippingWeight = this.calculateShippingWeight();
              this.lengthAndGirth = this.calculateLengthAndGirth();

              return (
                this.shippingWeight <= this.maxShippingWeight / 16 &&
                this.longestSide <= this.maxLongestSide &&
                this.medianSide <= this.maxMedianSide &&
                this.lengthAndGirth <= this.maxLengthAndGirth
              );
            },
            fulfillmentCost: function () {
              let adders = Math.max(0, this.shippingWeight - this.adderWeight);
              return this.basePrice + adders * this.adderPrice;
            },
            weightInformationString: function () {
              return `${this.shippingWeight.toFixed(1)}lbs Shipping Weight`;
            },
            dimensionalWeight: function () {
              return (
                (Math.max(2, this.longestSide) *
                  Math.max(2, this.medianSide) *
                  Math.max(2, this.shortestSide)) /
                139
              );
            },
            calculateShippingWeight() {
              let actualShippingWeight = Math.ceil(
                this.unitWeight / 16 + this.packagingWeight / 16
              );
              let dimensionalShippingWeight = Math.ceil(
                this.dimensionalWeight() + this.packagingWeight / 16
              );

              return Math.max(actualShippingWeight, dimensionalShippingWeight);
            },
            calculateLengthAndGirth() {
              return (
                this.longestSide + 2 * (this.medianSide + this.shortestSide)
              );
            },
          },
          {
            name: 'Medium Oversize',
            maxShippingWeight: 2416,
            packagingWeight: 16,
            maxLongestSide: 108,
            maxLengthAndGirth: 130,
            basePrice: 1137,
            adderPrice: 39,
            adderWeight: 2,
            valid: function (
              unitWeight,
              longestSide,
              medianSide,
              shortestSide
            ) {
              this.unitWeight = unitWeight;
              this.longestSide = longestSide;
              this.medianSide = medianSide;
              this.shortestSide = shortestSide;
              this.shippingWeight = this.calculateShippingWeight();
              this.lengthAndGirth = this.calculateLengthAndGirth();

              return (
                this.shippingWeight <= this.maxShippingWeight / 16 &&
                this.longestSide <= this.maxLongestSide &&
                this.lengthAndGirth <= this.maxLengthAndGirth
              );
            },
            fulfillmentCost: function () {
              let adders = Math.max(0, this.shippingWeight - this.adderWeight);
              return this.basePrice + adders * this.adderPrice;
            },
            weightInformationString: function () {
              return `${this.shippingWeight.toFixed(1)}lbs Shipping Weight`;
            },
            dimensionalWeight: function () {
              return (
                (Math.max(2, this.longestSide) *
                  Math.max(2, this.medianSide) *
                  Math.max(2, this.shortestSide)) /
                139
              );
            },
            calculateShippingWeight() {
              let actualShippingWeight = Math.ceil(
                this.unitWeight / 16 + this.packagingWeight / 16
              );
              let dimensionalShippingWeight = Math.ceil(
                this.dimensionalWeight() + this.packagingWeight / 16
              );

              return Math.max(actualShippingWeight, dimensionalShippingWeight);
            },
            calculateLengthAndGirth() {
              return (
                this.longestSide + 2 * (this.medianSide + this.shortestSide)
              );
            },
          },
          {
            name: 'Large Oversize',
            maxShippingWeight: 2416,
            packagingWeight: 16,
            maxLongestSide: 108,
            maxLengthAndGirth: 165,
            basePrice: 7578,
            adderPrice: 79,
            adderWeight: 90,
            valid: function (
              unitWeight,
              longestSide,
              medianSide,
              shortestSide
            ) {
              this.unitWeight = unitWeight;
              this.longestSide = longestSide;
              this.medianSide = medianSide;
              this.shortestSide = shortestSide;
              this.shippingWeight = this.calculateShippingWeight();
              this.lengthAndGirth = this.calculateLengthAndGirth();

              return (
                this.shippingWeight <= this.maxShippingWeight / 16 &&
                this.longestSide <= this.maxLongestSide &&
                this.lengthAndGirth <= this.maxLengthAndGirth
              );
            },
            fulfillmentCost: function () {
              let adders = Math.max(0, this.shippingWeight - this.adderWeight);
              return this.basePrice + adders * this.adderPrice;
            },
            weightInformationString: function () {
              return `${this.shippingWeight.toFixed(1)}lbs Shipping Weight`;
            },
            dimensionalWeight: function () {
              return (
                (Math.max(2, this.longestSide) *
                  Math.max(2, this.medianSide) *
                  Math.max(2, this.shortestSide)) /
                139
              );
            },
            calculateShippingWeight() {
              let actualShippingWeight = Math.ceil(
                this.unitWeight / 16 + this.packagingWeight / 16
              );
              let dimensionalShippingWeight = Math.ceil(
                this.dimensionalWeight() + this.packagingWeight / 16
              );

              return Math.max(actualShippingWeight, dimensionalShippingWeight);
            },
            calculateLengthAndGirth() {
              return (
                this.longestSide + 2 * (this.medianSide + this.shortestSide)
              );
            },
          },
          {
            name: 'Special Oversize',
            packagingWeight: 16,
            basePrice: 13732,
            adderPrice: 91,
            adderWeight: 90,
            valid: function (
              unitWeight,
              longestSide,
              medianSide,
              shortestSide
            ) {
              this.unitWeight = unitWeight;
              this.longestSide = longestSide;
              this.medianSide = medianSide;
              this.shortestSide = shortestSide;
              this.shippingWeight = this.calculateShippingWeight();
              this.lengthAndGirth = this.calculateLengthAndGirth();

              return true;
            },
            fulfillmentCost: function () {
              let adders = Math.max(0, this.shippingWeight - this.adderWeight);
              return this.basePrice + adders * this.adderPrice;
            },
            weightInformationString: function () {
              return `${this.shippingWeight.toFixed(1)}lbs Shipping Weight`;
            },
            dimensionalWeight: function () {
              return (
                (Math.max(2, this.longestSide) *
                  Math.max(2, this.medianSide) *
                  Math.max(2, this.shortestSide)) /
                139
              );
            },
            calculateShippingWeight() {
              let actualShippingWeight = Math.ceil(
                this.unitWeight / 16 + this.packagingWeight / 16
              );
              return actualShippingWeight;
            },
            calculateLengthAndGirth() {
              return (
                this.longestSide + 2 * (this.medianSide + this.shortestSide)
              );
            },
          },
        ];
      }

      getLongestSide() {
        const element = this.longestsideTarget;
        const value = element.value;
        return value * 1;
      }

      getMedianSide() {
        const element = this.mediansideTarget;
        const value = element.value;
        return value * 1;
      }

      getShortestSide() {
        const element = this.shortestsideTarget;
        const value = element.value;
        return value * 1;
      }

      getPounds() {
        const element = this.poundsTarget;
        const value = element.value;
        return value * 1;
      }

      getOunces() {
        const element = this.ouncesTarget;
        const value = element.value;
        return value * 1;
      }

      getWeightInOunces() {
        var pounds = this.getPounds();
        var ounces = this.getOunces();
        return pounds * 16 + ounces;
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
