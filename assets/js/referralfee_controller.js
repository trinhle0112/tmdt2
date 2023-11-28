(() => {
  const application = Stimulus.Application.start();

  application.register(
    'referralfee',
    class extends Stimulus.Controller {
      static targets = ['referralfee', 'sellprice', 'show'];

      calculate() {
        if (this.hasNotPickedCategory()) {
          this.showTarget.innerHTML = this.toDollarString(this.toCentValue(0));
          this.showTarget.dataset.costInCents = 0;
        } else {
          this.getReferralFee();
          this.showReferralFee();
          this.showTarget.dataset.costInCents = this.findRateTier().referralCost(
            this.getSellPrice()
          );
        }
      }

      hasNotPickedCategory() {
        return this.referralfeeTarget.value == '';
      }

      getReferralFee() {
        const element = this.referralfeeTarget;
        const value = element.value;
        return value;
      }

      findRateTier() {
        return this.rateTiers().find((rateTier) => {
          return rateTier.id == this.getReferralFee();
        });
      }

      rateTiers() {
        return [
          {
            id: 'amazonDeviceAccessories',
            name: 'Amazon Device Accessories',
            baseRate: 45,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'babyProducts',
            name: 'Baby Products (excluding Baby Apparel)',
            baseRate: 8,
            baseRateCutoff: 1000,
            aboveRate: 15,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost;
              if (sellPrice <= this.baseRateCutoff) {
                calculatedCost = (sellPrice * this.baseRate) / 100;
              } else {
                calculatedCost = (sellPrice * this.aboveRate) / 100;
              }

              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'books',
            name: 'Books',
            baseRate: 15,
            closingFee: 180,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return this.closingFee + calculatedCost;
            },
          },
          {
            id: 'cameraAndPhoto',
            name: 'Camera and Photo',
            baseRate: 8,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'cellPhoneDevices',
            name: 'Cell Phone Devices',
            baseRate: 8,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'consumerElectronics',
            name: 'Consumer Electronics',
            baseRate: 8,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'electronicsAccessories',
            name: 'Electronics Accessories',
            baseRate: 15,
            baseRateCutoff: 10000,
            aboveRate: 8,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost;
              if (sellPrice <= this.baseRateCutoff) {
                calculatedCost = (sellPrice * this.baseRate) / 100;
              } else {
                let baseAmount = (this.baseRateCutoff * this.baseRate) / 100;
                let aboveAmount =
                  ((sellPrice - this.baseRateCutoff) * this.aboveRate) / 100;
                calculatedCost = baseAmount + aboveAmount;
              }

              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'furniture',
            name: 'Furniture',
            baseRate: 15,
            baseRateCutoff: 20000,
            aboveRate: 10,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost;
              if (sellPrice <= this.baseRateCutoff) {
                calculatedCost = (sellPrice * this.baseRate) / 100;
              } else {
                let baseAmount = (this.baseRateCutoff * this.baseRate) / 100;
                let aboveAmount =
                  ((sellPrice - this.baseRateCutoff) * this.aboveRate) / 100;
                calculatedCost = baseAmount + aboveAmount;
              }

              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'furnitureMattresses',
            name: 'Furniture (Mattresses)',
            baseRate: 15,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'homeAndGarden',
            name: 'Home & Garden (including Pet Supplies)',
            baseRate: 15,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'kitchen',
            name: 'Kitchen',
            baseRate: 15,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'majorAppliances',
            name: 'Major Appliances',
            baseRate: 15,
            baseRateCutoff: 30000,
            aboveRate: 8,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost;
              if (sellPrice <= this.baseRateCutoff) {
                calculatedCost = (sellPrice * this.baseRate) / 100;
              } else {
                let baseAmount = (this.baseRateCutoff * this.baseRate) / 100;
                let aboveAmount =
                  ((sellPrice - this.baseRateCutoff) * this.aboveRate) / 100;
                calculatedCost = baseAmount + aboveAmount;
              }

              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'music',
            name: 'Music',
            baseRate: 15,
            closingFee: 180,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return this.closingFee + calculatedCost;
            },
          },
          {
            id: 'musicalInstruments',
            name: 'Musical Instruments',
            baseRate: 15,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'officeProducts',
            name: 'Office Products',
            baseRate: 15,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'outdoor',
            name: 'Outdoor',
            baseRate: 15,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'personalComputers',
            name: 'Personal Computers',
            baseRate: 6,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'softwwareAndComputerVideoGames',
            name: 'Software & Computer/Video Games',
            baseRate: 15,
            closingFee: 180,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return this.closingFee + calculatedCost;
            },
          },
          {
            id: 'sports',
            name: 'Sports',
            baseRate: 15,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'toolsAndHomeImprovement',
            name: 'Tools & Home Improvement',
            baseRate: 15,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'toolsAndHomeImprovementBaseEquipmentPowerTools',
            name: 'Tools & Home Improvement (Base Equipment Power Tools)',
            baseRate: 12,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'toysAndGames',
            name: 'Toys & Games',
            baseRate: 15,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'toysAndGamesCollectibleCards',
            name: 'Toys & Games (Collectible Cards)',
            baseRate: 15,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return calculatedCost;
            },
          },
          {
            id: 'unlockedCellPhones',
            name: 'Unlocked Cell Phones',
            baseRate: 8,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'videoAndDVD',
            name: 'Video & DVD',
            baseRate: 15,
            closingFee: 180,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return this.closingFee + calculatedCost;
            },
          },
          {
            id: 'videoGameConsoles',
            name: 'Video Game Consoles',
            baseRate: 8,
            minimum: 30,
            closingFee: 180,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return this.closingFee + Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'everythingElse',
            name: 'Everything Else',
            baseRate: 15,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: '3dPrintedProducts',
            name: '3D Printed Products',
            baseRate: 12,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return calculatedCost;
            },
          },
          {
            id: 'automotiveAndPowersports',
            name: 'Automotive & Powersports',
            baseRate: 12,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'automotiveAndPowersportsTiresAndWheels',
            name: 'Automotive & Powersports (Tires and Wheel Products)',
            baseRate: 10,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'beauty',
            name: 'Beauty',
            baseRate: 8,
            baseRateCutoff: 1000,
            aboveRate: 15,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost;
              if (sellPrice <= this.baseRateCutoff) {
                calculatedCost = (sellPrice * this.baseRate) / 100;
              } else {
                calculatedCost = (sellPrice * this.aboveRate) / 100;
              }

              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'clothingAndAccessories',
            name: 'Clothing & Accessories',
            baseRate: 17,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'collectibleBooks',
            name: 'Collectible Books',
            baseRate: 15,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return calculatedCost;
            },
          },
          {
            id: 'collectibleCoins',
            name: 'Collectible Coins',
            baseRate: 15,
            baseRateCutoff: 25000,
            tierOneRate: 10,
            tierOneCutoff: 100000,
            aboveRate: 6,
            minimum: 30,
            referralCost: function (sellPrice) {
              let baseAmount =
                (Math.min(this.baseRateCutoff, sellPrice) * this.baseRate) /
                100;
              let tierOneAmount =
                (Math.max(
                  0,
                  Math.min(this.tierOneCutoff, sellPrice) - this.baseRateCutoff
                ) *
                  this.tierOneRate) /
                100;
              let aboveAmount =
                (Math.max(0, sellPrice - this.tierOneCutoff) * this.aboveRate) /
                100;
              let calculatedCost = baseAmount + tierOneAmount + aboveAmount;

              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'entertainmentCollectibles',
            name: 'Entertainment Collectibles',
            baseRate: 20,
            baseRateCutoff: 10000,
            tierOneRate: 10,
            tierOneCutoff: 100000,
            aboveRate: 6,
            referralCost: function (sellPrice) {
              let baseAmount =
                (Math.min(this.baseRateCutoff, sellPrice) * this.baseRate) /
                100;
              let tierOneAmount =
                (Math.max(
                  0,
                  Math.min(this.tierOneCutoff, sellPrice) - this.baseRateCutoff
                ) *
                  this.tierOneRate) /
                100;
              let aboveAmount =
                (Math.max(0, sellPrice - this.tierOneCutoff) * this.aboveRate) /
                100;
              let calculatedCost = baseAmount + tierOneAmount + aboveAmount;

              return calculatedCost;
            },
          },
          {
            id: 'fineArt',
            name: 'Fine Art',
            baseRate: 20,
            baseRateCutoff: 10000,
            tierOneRate: 15,
            tierOneCutoff: 100000,
            tierTwoRate: 10,
            tierTwoCutoff: 500000,
            aboveRate: 5,
            minimum: 100,
            referralCost: function (sellPrice) {
              let baseAmount =
                (Math.min(this.baseRateCutoff, sellPrice) * this.baseRate) /
                100;
              let tierOneAmount =
                (Math.max(
                  0,
                  Math.min(this.tierOneCutoff, sellPrice) - this.baseRateCutoff
                ) *
                  this.tierOneRate) /
                100;
              let tierTwoAmount =
                (Math.max(
                  0,
                  Math.min(this.tierTwoCutoff, sellPrice) - this.tierOneCutoff
                ) *
                  this.tierTwoRate) /
                100;
              let aboveAmount =
                (Math.max(0, sellPrice - this.tierTwoCutoff) * this.aboveRate) /
                100;
              let calculatedCost =
                baseAmount + tierOneAmount + tierTwoAmount + aboveAmount;

              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'giftCards',
            name: 'Gift Cards',
            baseRate: 20,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return calculatedCost;
            },
          },
          {
            id: 'groceriesAndGourmetFood',
            name: 'Grocery & Gourmet Food',
            baseRate: 8,
            baseRateCutoff: 1500,
            aboveRate: 15,
            referralCost: function (sellPrice) {
              if (sellPrice <= this.baseRateCutoff) {
                return (sellPrice * this.baseRate) / 100;
              } else {
                return (sellPrice * this.aboveRate) / 100;
              }
            },
          },
          {
            id: 'healthAndPersonalCare',
            name: 'Health & Personal Care (excluding Personal Care Appliances)',
            baseRate: 8,
            baseRateCutoff: 1000,
            aboveRate: 15,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost;
              if (sellPrice <= this.baseRateCutoff) {
                calculatedCost = (sellPrice * this.baseRate) / 100;
              } else {
                calculatedCost = (sellPrice * this.aboveRate) / 100;
              }

              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'industrialAndScientific',
            name:
              'Industrial & Scientific (including Food Service and Janitorial & Sanitation)',
            baseRate: 12,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'jewelry',
            name: 'Jewelry',
            baseRate: 20,
            baseRateCutoff: 25000,
            aboveRate: 5,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost;
              if (sellPrice <= this.baseRateCutoff) {
                calculatedCost = (sellPrice * this.baseRate) / 100;
              } else {
                let baseAmount = (this.baseRateCutoff * this.baseRate) / 100;
                let aboveAmount =
                  ((sellPrice - this.baseRateCutoff) * this.aboveRate) / 100;
                calculatedCost = baseAmount + aboveAmount;
              }

              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'luggageAndTravelAccessories',
            name: 'Luggage & Travel Accessories',
            baseRate: 15,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'shoesHandbangsAndSunglasses',
            name: 'Shoes, Handbags & Sunglasses',
            baseRate: 15,
            baseRateCutoff: 7500,
            aboveRate: 18,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost;
              if (sellPrice <= this.baseRateCutoff) {
                calculatedCost = (sellPrice * this.baseRate) / 100;
              } else {
                calculatedCost = (sellPrice * this.aboveRate) / 100;
              }

              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'sportsCollectibles',
            name: 'Sports Collectibles',
            baseRate: 20,
            baseRateCutoff: 10000,
            tierOneRate: 10,
            tierOneCutoff: 100000,
            aboveRate: 6,
            referralCost: function (sellPrice) {
              let baseAmount =
                (Math.min(this.baseRateCutoff, sellPrice) * this.baseRate) /
                100;
              let tierOneAmount =
                (Math.max(
                  0,
                  Math.min(this.tierOneCutoff, sellPrice) - this.baseRateCutoff
                ) *
                  this.tierOneRate) /
                100;
              let aboveAmount =
                (Math.max(0, sellPrice - this.tierOneCutoff) * this.aboveRate) /
                100;
              let calculatedCost = baseAmount + tierOneAmount + aboveAmount;

              return calculatedCost;
            },
          },
          {
            id: 'watches',
            name: 'Watches',
            baseRate: 16,
            baseRateCutoff: 150000,
            aboveRate: 3,
            minimum: 30,
            referralCost: function (sellPrice) {
              let calculatedCost;
              if (sellPrice <= this.baseRateCutoff) {
                calculatedCost = (sellPrice * this.baseRate) / 100;
              } else {
                let baseAmount = (this.baseRateCutoff * this.baseRate) / 100;
                let aboveAmount =
                  ((sellPrice - this.baseRateCutoff) * this.aboveRate) / 100;
                calculatedCost = baseAmount + aboveAmount;
              }

              return Math.max(this.minimum, calculatedCost);
            },
          },
          {
            id: 'extendedWarranties',
            name:
              'Extended Warranties, Protection Plans, and Service Contracts',
            baseRate: 96,
            referralCost: function (sellPrice) {
              let calculatedCost = (sellPrice * this.baseRate) / 100;
              return calculatedCost;
            },
          },
        ];
      }

      getSellPrice() {
        const element = this.sellpriceTarget;
        const value = element.value;
        return this.toCentValue(value);
      }

      showReferralFee() {
        this.showTarget.innerHTML = this.toDollarString(
          this.findRateTier().referralCost(this.getSellPrice())
        );
      }

      toCentValue(dollarString) {
        let dollarValue = parseFloat(dollarString) || 0.0;
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
