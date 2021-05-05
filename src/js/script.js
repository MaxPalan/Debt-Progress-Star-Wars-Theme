class ExchangeModel {
  constructor() {
    this.exchange = [];
    this.apiUrl = 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11'
  }
  getExchangde() {
    axios.get(this.apiUrl).then((res) => {
      this.exchange = res.data;
      console.log(this.exchange);
    });
  }
}

class ExchangeController {
  constructor() {
    this.model = new ExchangeModel();
    this.init();
  }

  init() {
    this.model.getExchangde();
  }
}

const exchangeController = new ExchangeController();