import './index.less';
import '../../less/component/icon.less';

import tpl from './index.htm';

let $tpl = $(tpl).appendTo(document.body);
let $msg = $tpl.find('[eid="loading-msg"]');

let Loading = {
  on: false,

  show: (msg) => {
    if (Loading.on) {
      return;
    }
    
    $msg.text(msg);
    $tpl.show();
    Loading.on = true;
  },

  toggle: (msg, timeout=3000) => {
    Loading.show(msg);

    setTimeout(() => {
      Loading.close();
    }, timeout)
  },

  close: () => {
    if (!Loading.on) {
      return;
    }

    $tpl.hide();
    Loading.on = false;
  }
}

export default Loading;
