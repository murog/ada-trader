import Backbone from 'backbone';
import _ from 'underscore';

import QuoteView from '../views/quote_view';
import Quote from '../models/quote';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
    this.bus = params.bus;
  },
  render() {
    this.$('#quotes').empty();
    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        bus: this.bus,
        tagName: 'li',
        className: 'quote',
      });
      this.$('#quotes').append(quoteView.render().$el);
    });
    return this;
  },
  events: {

  },
});

export default QuoteListView;
