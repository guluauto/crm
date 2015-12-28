import '../../less/global/global.less';
import '../../less/component/form.less';
import './index.less';

import Loading from '../loading/';
import Selector from '../selector/';
import ModelSel from '../model-sel/';

let $form = $('[eid="form"]');

let validate = () => {
  return true;
}

$form.on('submit', (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (!validate()) {
    return;
  }

  Loading.show('提交中...');

  let url = $form.attr('action');

  let sData = $form.serializeArray();
  let data = {};

  sData.forEach((field) => {
    let k = field.name;
    let v = field.value;

    if (/^\d+$/.test(v)) {
      v = parseInt(v, 10);
    }

    if (v === '') {
      v = null
    }

    data[k] = v;
  });

  $.ajax({
    url: url,
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    dataType: 'json',
    success: (res) => {
      if (res.code !== 0) {
        alert('提交失败，请重试!\n错误信息:\n' + res.msg);

        return;
      }

      Loading.close();
      alert('提交成功');

      history.back();
    },
    error: () => {
      alert('提交失败');
    }
  });
});

ModelSel('[eid="phck"]');
