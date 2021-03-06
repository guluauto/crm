import '../../less/global/global.less';
import './index.less';

import Loading from '../loading/';
import jqtpl from 'jqtpl';
import tpl from './index.htm';
import itemTpl from './item.htm';

const defaultOpts = {
  onSelect: () => {},
  tpl: itemTpl,
  data: []
}

export default class Selector {
  constructor(opts) {
    this.opts = $.extend({}, defaultOpts, opts || {});

    this.show();
  }

  show() {
    $(window).scrollTop(0);
    let minH = $(document).height();

    this.$tpl = $(tpl).css({
      'min-height': minH
    }).appendTo(document.body);

    this.$list = $('[eid="list"]', this.$tpl);

    if (this.opts.data.length) {
      let html = jqtpl.tmpl(this.opts.tpl, this.opts.data);
      this.$list.html(html);
    }

    this.bind();
  }

  bind() {
    this.$list.on('click', '.item', (e) => {
      e.preventDefault();
      e.stopPropagation();

      let id = parseInt($(e.currentTarget).attr('data-id'));

      let f = this.opts.data.filter((item) => {
        return item.id === id;
      });

      if (f && f.length) {
        this.opts.onSelect.call(this, f[0]);
      }

      this.$tpl.remove();
    });

    $(document).on('click', () => {
      this.$tpl.remove();
    });
  }
}
