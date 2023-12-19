import historicalSampleData from "./historicalSampleData.json"

export const getSampleData = (type: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (type) {
        case 'history':
          resolve(historicalSampleData);
          break;
      
       
        default:
          resolve('no sample');
      }
    }, 2000);
  });
};

