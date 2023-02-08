export function calculateHumidityDiscount(humidity: number, cultivationId: number) {
    let convertedHumidity = humidity;
    if (cultivationId !== 1 && cultivationId !== 2) {
      return 0;
    }
    if (Number.isNaN(convertedHumidity) || !humidity) {
      return 0;
    }
  
    // if (typeof humidity === 'string') {
    //   convertedHumidity = parseFloat(
    //     Math.floor(parseFloat(humidity.replace(',', '.')) * 10) / (10).toFixed(1)
    //   );
    // }
  
    if (cultivationId === 2) {
      if (convertedHumidity < 14.1) {
        return 0;
      }
  
      if (convertedHumidity > 38) {
        return 51.0;
      }
  
      if (convertedHumidity < 20.5) {
        return 2.5 * convertedHumidity - 35;
      }
  
      if (convertedHumidity >= 20.5) {
        return 2 * convertedHumidity - 25;
      }
      return 0;
    }
    if (cultivationId === 1) {
      if (convertedHumidity < 14.1) {
        return 0;
      }
  
      if (convertedHumidity > 38) {
        return 37.2;
      }
  
      const lookupTable = [
        {
          humidity: 14.1,
          discount: 0.15,
        },
        {
          humidity: 14.2,
          discount: 0.31,
        },
        {
          humidity: 14.3,
          discount: 0.46,
        },
        {
          humidity: 14.4,
          discount: 0.62,
        },
        {
          humidity: 14.5,
          discount: 0.77,
        },
        {
          humidity: 14.6,
          discount: 0.93,
        },
        {
          humidity: 14.7,
          discount: 1.08,
        },
        {
          humidity: 14.8,
          discount: 1.24,
        },
        {
          humidity: 14.9,
          discount: 1.39,
        },
        {
          humidity: 15,
          discount: 1.55,
        },
  
        {
          humidity: 15.1,
          discount: 1.7,
        },
        {
          humidity: 15.2,
          discount: 1.86,
        },
        {
          humidity: 15.3,
          discount: 2.01,
        },
        {
          humidity: 15.4,
          discount: 2.17,
        },
        {
          humidity: 15.5,
          discount: 2.32,
        },
        {
          humidity: 15.6,
          discount: 2.48,
        },
        {
          humidity: 15.7,
          discount: 2.63,
        },
        {
          humidity: 15.8,
          discount: 2.79,
        },
        {
          humidity: 15.9,
          discount: 2.94,
        },
        {
          humidity: 16,
          discount: 3.1,
        },
        {
          humidity: 16.1,
          discount: 3.25,
        },
        {
          humidity: 16.2,
          discount: 3.41,
        },
        {
          humidity: 16.3,
          discount: 3.56,
        },
        {
          humidity: 16.4,
          discount: 3.72,
        },
        {
          humidity: 16.5,
          discount: 3.87,
        },
        {
          humidity: 16.6,
          discount: 4.03,
        },
        {
          humidity: 16.7,
          discount: 4.18,
        },
        {
          humidity: 16.8,
          discount: 4.34,
        },
        {
          humidity: 16.9,
          discount: 4.49,
        },
        {
          humidity: 17,
          discount: 4.65,
        },
        {
          humidity: 17.1,
          discount: 4.8,
        },
        {
          humidity: 17.2,
          discount: 4.96,
        },
        {
          humidity: 17.3,
          discount: 5.11,
        },
        {
          humidity: 17.4,
          discount: 5.27,
        },
        {
          humidity: 17.5,
          discount: 5.42,
        },
        {
          humidity: 17.6,
          discount: 5.58,
        },
        {
          humidity: 17.7,
          discount: 5.73,
        },
        {
          humidity: 17.8,
          discount: 5.89,
        },
        {
          humidity: 17.9,
          discount: 6.04,
        },
        {
          humidity: 18,
          discount: 6.2,
        },
        {
          humidity: 18.1,
          discount: 6.35,
        },
        {
          humidity: 18.2,
          discount: 6.51,
        },
        {
          humidity: 18.3,
          discount: 6.66,
        },
        {
          humidity: 18.4,
          discount: 6.82,
        },
        {
          humidity: 18.5,
          discount: 6.97,
        },
        {
          humidity: 18.6,
          discount: 7.13,
        },
        {
          humidity: 18.7,
          discount: 7.28,
        },
        {
          humidity: 18.8,
          discount: 7.44,
        },
        {
          humidity: 18.9,
          discount: 7.59,
        },
        {
          humidity: 19,
          discount: 7.75,
        },
        {
          humidity: 19.1,
          discount: 7.9,
        },
        {
          humidity: 19.2,
          discount: 8.06,
        },
        {
          humidity: 19.3,
          discount: 8.21,
        },
        {
          humidity: 19.4,
          discount: 8.37,
        },
        {
          humidity: 19.5,
          discount: 8.52,
        },
        {
          humidity: 19.6,
          discount: 8.68,
        },
        {
          humidity: 19.7,
          discount: 8.83,
        },
        {
          humidity: 19.8,
          discount: 8.99,
        },
        {
          humidity: 19.9,
          discount: 9.14,
        },
        {
          humidity: 20,
          discount: 9.3,
        },
        {
          humidity: 20.1,
          discount: 9.45,
        },
        {
          humidity: 20.2,
          discount: 9.61,
        },
        {
          humidity: 20.3,
          discount: 9.76,
        },
        {
          humidity: 20.4,
          discount: 9.92,
        },
        {
          humidity: 20.5,
          discount: 10.07,
        },
        {
          humidity: 20.6,
          discount: 10.23,
        },
        {
          humidity: 20.7,
          discount: 10.38,
        },
        {
          humidity: 20.8,
          discount: 10.54,
        },
        {
          humidity: 20.9,
          discount: 10.69,
        },
        {
          humidity: 21,
          discount: 10.85,
        },
        {
          humidity: 21.1,
          discount: 11.0,
        },
        {
          humidity: 21.2,
          discount: 11.16,
        },
        {
          humidity: 21.3,
          discount: 11.31,
        },
        {
          humidity: 21.4,
          discount: 11.47,
        },
        {
          humidity: 21.5,
          discount: 11.62,
        },
        {
          humidity: 21.6,
          discount: 11.78,
        },
        {
          humidity: 21.7,
          discount: 11.93,
        },
        {
          humidity: 21.8,
          discount: 12.09,
        },
        {
          humidity: 21.9,
          discount: 12.24,
        },
        {
          humidity: 22,
          discount: 12.4,
        },
        {
          humidity: 22.1,
          discount: 12.55,
        },
        {
          humidity: 22.2,
          discount: 12.71,
        },
        {
          humidity: 22.3,
          discount: 12.86,
        },
        {
          humidity: 22.4,
          discount: 13.02,
        },
        {
          humidity: 22.5,
          discount: 13.17,
        },
        {
          humidity: 22.6,
          discount: 13.33,
        },
        {
          humidity: 22.7,
          discount: 13.48,
        },
        {
          humidity: 22.8,
          discount: 13.64,
        },
        {
          humidity: 22.9,
          discount: 13.79,
        },
        {
          humidity: 23,
          discount: 13.95,
        },
        {
          humidity: 23.1,
          discount: 14.1,
        },
        {
          humidity: 23.2,
          discount: 14.26,
        },
        {
          humidity: 23.3,
          discount: 14.41,
        },
        {
          humidity: 23.4,
          discount: 14.57,
        },
        {
          humidity: 23.5,
          discount: 14.72,
        },
        {
          humidity: 23.6,
          discount: 14.88,
        },
        {
          humidity: 23.7,
          discount: 15.03,
        },
        {
          humidity: 23.8,
          discount: 15.19,
        },
        {
          humidity: 23.9,
          discount: 15.34,
        },
        {
          humidity: 24,
          discount: 15.5,
        },
        {
          humidity: 24.1,
          discount: 15.65,
        },
        {
          humidity: 24.2,
          discount: 15.81,
        },
        {
          humidity: 24.3,
          discount: 15.96,
        },
        {
          humidity: 24.4,
          discount: 16.12,
        },
        {
          humidity: 24.5,
          discount: 16.27,
        },
        {
          humidity: 24.6,
          discount: 16.43,
        },
        {
          humidity: 24.7,
          discount: 16.58,
        },
        {
          humidity: 24.8,
          discount: 16.74,
        },
        {
          humidity: 24.9,
          discount: 16.89,
        },
        {
          humidity: 25,
          discount: 17.05,
        },
        {
          humidity: 25.1,
          discount: 17.2,
        },
        {
          humidity: 25.2,
          discount: 17.36,
        },
        {
          humidity: 25.3,
          discount: 17.51,
        },
        {
          humidity: 25.4,
          discount: 17.67,
        },
        {
          humidity: 25.5,
          discount: 17.82,
        },
        {
          humidity: 25.6,
          discount: 17.98,
        },
        {
          humidity: 25.7,
          discount: 18.13,
        },
        {
          humidity: 25.8,
          discount: 18.29,
        },
        {
          humidity: 25.9,
          discount: 18.44,
        },
        {
          humidity: 26,
          discount: 18.6,
        },
        {
          humidity: 26.1,
          discount: 18.75,
        },
        {
          humidity: 26.2,
          discount: 18.91,
        },
        {
          humidity: 26.3,
          discount: 19.06,
        },
        {
          humidity: 26.4,
          discount: 19.22,
        },
        {
          humidity: 26.5,
          discount: 19.37,
        },
        {
          humidity: 26.6,
          discount: 19.53,
        },
        {
          humidity: 26.7,
          discount: 19.68,
        },
        {
          humidity: 26.8,
          discount: 19.84,
        },
        {
          humidity: 26.9,
          discount: 19.99,
        },
        {
          humidity: 27,
          discount: 20.15,
        },
        {
          humidity: 27.1,
          discount: 20.3,
        },
        {
          humidity: 27.2,
          discount: 20.46,
        },
        {
          humidity: 27.3,
          discount: 20.61,
        },
        {
          humidity: 27.4,
          discount: 20.77,
        },
        {
          humidity: 27.5,
          discount: 20.92,
        },
        {
          humidity: 27.6,
          discount: 21.08,
        },
        {
          humidity: 27.7,
          discount: 21.23,
        },
        {
          humidity: 27.8,
          discount: 21.39,
        },
        {
          humidity: 27.9,
          discount: 21.54,
        },
        {
          humidity: 28,
          discount: 21.7,
        },
        {
          humidity: 28.1,
          discount: 21.85,
        },
        {
          humidity: 28.2,
          discount: 22.01,
        },
        {
          humidity: 28.3,
          discount: 22.16,
        },
        {
          humidity: 28.4,
          discount: 22.32,
        },
        {
          humidity: 28.5,
          discount: 22.47,
        },
        {
          humidity: 28.6,
          discount: 22.63,
        },
        {
          humidity: 28.7,
          discount: 22.78,
        },
        {
          humidity: 28.8,
          discount: 22.94,
        },
        {
          humidity: 28.9,
          discount: 23.09,
        },
        {
          humidity: 29,
          discount: 23.25,
        },
        {
          humidity: 29.1,
          discount: 23.4,
        },
        {
          humidity: 29.2,
          discount: 23.56,
        },
        {
          humidity: 29.3,
          discount: 23.71,
        },
        {
          humidity: 29.4,
          discount: 23.87,
        },
        {
          humidity: 29.5,
          discount: 24.02,
        },
        {
          humidity: 29.6,
          discount: 24.18,
        },
        {
          humidity: 29.7,
          discount: 24.33,
        },
        {
          humidity: 29.8,
          discount: 24.49,
        },
        {
          humidity: 29.9,
          discount: 24.64,
        },
        {
          humidity: 30,
          discount: 24.8,
        },
        {
          humidity: 30.1,
          discount: 24.95,
        },
        {
          humidity: 30.2,
          discount: 25.11,
        },
        {
          humidity: 30.3,
          discount: 25.26,
        },
        {
          humidity: 30.4,
          discount: 25.42,
        },
        {
          humidity: 30.5,
          discount: 25.57,
        },
        {
          humidity: 30.6,
          discount: 25.73,
        },
        {
          humidity: 30.7,
          discount: 25.88,
        },
        {
          humidity: 30.8,
          discount: 26.04,
        },
        {
          humidity: 30.9,
          discount: 26.19,
        },
        {
          humidity: 31,
          discount: 26.35,
        },
        {
          humidity: 31.1,
          discount: 26.5,
        },
        {
          humidity: 31.2,
          discount: 26.66,
        },
        {
          humidity: 31.3,
          discount: 26.81,
        },
        {
          humidity: 31.4,
          discount: 26.97,
        },
        {
          humidity: 31.5,
          discount: 27.12,
        },
        {
          humidity: 31.6,
          discount: 27.28,
        },
        {
          humidity: 31.7,
          discount: 27.43,
        },
        {
          humidity: 31.8,
          discount: 27.59,
        },
        {
          humidity: 31.9,
          discount: 27.74,
        },
        {
          humidity: 32,
          discount: 27.9,
        },
        {
          humidity: 32.1,
          discount: 28.05,
        },
        {
          humidity: 32.2,
          discount: 28.21,
        },
        {
          humidity: 32.3,
          discount: 28.36,
        },
        {
          humidity: 32.4,
          discount: 28.52,
        },
        {
          humidity: 32.5,
          discount: 28.67,
        },
        {
          humidity: 32.6,
          discount: 28.83,
        },
        {
          humidity: 32.7,
          discount: 28.98,
        },
        {
          humidity: 32.8,
          discount: 29.14,
        },
        {
          humidity: 32.9,
          discount: 29.29,
        },
        {
          humidity: 33,
          discount: 29.45,
        },
        {
          humidity: 33.1,
          discount: 29.6,
        },
        {
          humidity: 33.2,
          discount: 29.76,
        },
        {
          humidity: 33.3,
          discount: 29.91,
        },
        {
          humidity: 33.4,
          discount: 30.07,
        },
        {
          humidity: 33.5,
          discount: 30.22,
        },
        {
          humidity: 33.6,
          discount: 30.38,
        },
        {
          humidity: 33.7,
          discount: 30.53,
        },
        {
          humidity: 33.8,
          discount: 30.69,
        },
        {
          humidity: 33.9,
          discount: 30.84,
        },
        {
          humidity: 34,
          discount: 31.0,
        },
        {
          humidity: 34.1,
          discount: 31.15,
        },
        {
          humidity: 34.2,
          discount: 31.31,
        },
        {
          humidity: 34.3,
          discount: 31.46,
        },
        {
          humidity: 34.4,
          discount: 31.62,
        },
        {
          humidity: 34.5,
          discount: 31.77,
        },
        {
          humidity: 34.6,
          discount: 31.93,
        },
        {
          humidity: 34.7,
          discount: 32.08,
        },
        {
          humidity: 34.8,
          discount: 32.24,
        },
        {
          humidity: 34.9,
          discount: 32.39,
        },
        {
          humidity: 35,
          discount: 32.55,
        },
        {
          humidity: 35.1,
          discount: 32.7,
        },
        {
          humidity: 35.2,
          discount: 32.86,
        },
        {
          humidity: 35.3,
          discount: 33.01,
        },
        {
          humidity: 35.4,
          discount: 33.17,
        },
        {
          humidity: 35.5,
          discount: 33.32,
        },
        {
          humidity: 35.6,
          discount: 33.48,
        },
        {
          humidity: 35.7,
          discount: 33.63,
        },
        {
          humidity: 35.8,
          discount: 33.79,
        },
        {
          humidity: 35.9,
          discount: 33.94,
        },
        {
          humidity: 36,
          discount: 34.1,
        },
        {
          humidity: 36.1,
          discount: 34.25,
        },
        {
          humidity: 36.2,
          discount: 34.41,
        },
        {
          humidity: 36.3,
          discount: 34.56,
        },
        {
          humidity: 36.4,
          discount: 34.72,
        },
        {
          humidity: 36.5,
          discount: 34.87,
        },
        {
          humidity: 36.6,
          discount: 35.03,
        },
        {
          humidity: 36.7,
          discount: 35.18,
        },
        {
          humidity: 36.8,
          discount: 35.34,
        },
        {
          humidity: 36.9,
          discount: 35.49,
        },
        {
          humidity: 37,
          discount: 35.65,
        },
        {
          humidity: 37.1,
          discount: 35.8,
        },
        {
          humidity: 37.2,
          discount: 35.96,
        },
        {
          humidity: 37.3,
          discount: 36.11,
        },
        {
          humidity: 37.4,
          discount: 36.27,
        },
        {
          humidity: 37.5,
          discount: 36.42,
        },
        {
          humidity: 37.6,
          discount: 36.58,
        },
        {
          humidity: 37.7,
          discount: 36.73,
        },
        {
          humidity: 37.8,
          discount: 36.89,
        },
        {
          humidity: 37.9,
          discount: 37.04,
        },
        {
          humidity: 38,
          discount: 37.2,
        },
      ];
      const tableObjectFound = lookupTable.find(
        item => item.humidity === convertedHumidity
      );
  
      if (tableObjectFound) {
        return tableObjectFound.discount;
      }
  
      return 0;
    }
    return 0;
  }