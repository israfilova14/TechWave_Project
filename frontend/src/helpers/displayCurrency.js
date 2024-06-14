const displayCurrency = (num) => {
    const formatter = new Intl.NumberFormat('az-AZ', {
      style: "currency",
      currency: 'AZN',
      minimumFractionDigits: 2
    });
    return formatter.format(num);
  }
  
  export default displayCurrency;  