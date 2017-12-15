import Backbone from 'backbone';
import Quote from '../models/quote';
import Order from '../models/order';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model.get('quote'), "change", this.tradeQuote);
  },
  render() {
    const compiledTemplate = this.template(this.model.attributes);
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click button.btn-cancel' : 'cancelOrder'
  },
  cancelOrder: function(e) {
    this.stopListening(this.model.get('quote'), "change",);
    this.model.destroy();
  },
  tradeQuote: function(e) {
    console.log(this.model.get('quote').get('price'));
    if (this.model.get('quote').get('price') <= this.model.get('targetPrice')) {
      console.log('hey u can buy now');
      this.model.get('quote').set('buy', true);
      this.bus.trigger('tradeMe', this.model.get('quote'));
      this.cancelOrder();
    }

  }
});

export default OrderView;
