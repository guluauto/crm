import '../../less/global/global.less';
import '../../less/component/form.less';
import './index.less';

import Loading from '../loading/';
import Selector from '../selector/';

let $form = $('[eid="form"]');
let $name = $('[name="customer"]');

let validate = () => {
  if ($.trim($name.val()) === '') {
    alert('客户姓名必须填写');

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

    if (v === 'true') {
      v = true;
    }

    if (v === 'false') {
      v = false;
    }

    if (v === '') {
      v = null
    }

    if (k === 'preference') {
      data[k] = data[k] || [];
      data[k].push(v)

      return;
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

let getBrands = (cb) => {
  Loading.show('正在获取品牌...');

  $.ajax({
    url: '/brands',
    type: 'GET',
    success: (res) => {
      Loading.close();

      let data = res.data.map((item) => {
        return {
          id: item[0],
          text: item[1]
        };
      });

      cb(data);
    },
    error: () => {
      Loading.close();

      alert('获取品牌失败');
    }
  });
}

let getSeries = (brandId, cb) => {
  Loading.show('正在获取车系...');

  $.ajax({
    url: '/brands/' + brandId,
    type: 'GET',
    success: (res) => {
      Loading.close();

      let data = res.data.map((item) => {
        return {
          id: item[0],
          text: item[1]
        };
      });

      cb(data);
    },
    error: () => {
      Loading.close();

      alert('获取车系失败');
    }
  });
}

let $phck = $('[eid="phck"]');

$phck.on('click', (e) => {
  e.preventDefault();
  e.stopPropagation();

  let $input = $(e.currentTarget);
  let $_input = $input.parent().find('input[type="hidden"]');

  // let offset = $input.offset();
  let ws = $(window).scrollTop();

  getBrands((data) => {
    let selector = new Selector({
      data: data,
      onSelect: (brand) => {
        getSeries(brand.id, (data) => {
          $input.val(brand.text);
          
          let selector = new Selector({
            data: data,
            onSelect: (series) => {
              $input.val(`${brand.text}-${series.text}`);
              $_input.val(series.seriesId);
              $(window).scrollTop(ws);
            }
          });
        });
      }
    });
  });
})
