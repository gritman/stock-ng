import { StockNgPage } from './app.po';

describe('stock-ng App', () => {
  let page: StockNgPage;

  beforeEach(() => {
    page = new StockNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
