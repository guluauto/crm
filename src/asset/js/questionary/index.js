import '../../less/global/global.less';
import '../../less/component/form.less';
import './index.less';

import Loading from '../loading/';

let $form = $('.form');

$form.on('submit', (e) => {
  e.preventDefault();
  e.stopPropagation();

  Loading.show('提交中...');

  console.log($form.serialize());

  $.post('/api/survey', $form.serialize(), (res) => {
    if (res.code !== 200) {
      alert('提交失败，请重试!\n错误信息:\n' + res.msg);

      return;
    }

    Loading.close();
    alert('提交成功');

    location.reload();
  });
});
