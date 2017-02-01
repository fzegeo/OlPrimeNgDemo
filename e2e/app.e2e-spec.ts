import { OpenLayersNestedLayerControlPage } from './app.po';

describe('open-layers-nested-layer-control App', function() {
  let page: OpenLayersNestedLayerControlPage;

  beforeEach(() => {
    page = new OpenLayersNestedLayerControlPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
