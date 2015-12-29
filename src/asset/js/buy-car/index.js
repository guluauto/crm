import '../../less/global/global.less';
import '../../less/component/form.less';
import './index.less';

import Loading from '../loading/';
import Selector from '../selector/';
import ModelSel from '../model-sel/';

let $form = $('[eid="form"]');
let $consignor = $('[name="consignor"]');
// let $date = $('[name="date"]');
let $car_master = $('[name="car_master"]');
let $contact = $('[name="contact"]');
let $card_claim = $('[name="card_claim"]');
let $money = $('[name="money"]');
let $model = $('[name="car_model_1"]');

let validate = () => {
  if ($.trim($consignor.val()) === '') {
    alert('请填写委托人');
    return false;
  }

  if ($.trim($car_master.val()) === '') {
    alert('车主姓名');
    return false;
  }

  if ($.trim($contact.val()) === '') {
    alert('联系方式');
    return false;
  }

  if ($.trim($card_claim.val()) === '') {
    alert('上牌要求');
    return false;
  }

  if ($.trim($money.val()) === '') {
    alert('预算');
    return false;
  }

  if ($.trim($model.val()) === '') {
    alert('请选择一个车型');
    return false;
  }

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
