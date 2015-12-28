import Loading from '../loading/';
import Selector from '../selector/';

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

export default (el) => {
  let $el = $(el);

  $el.on('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    let $input = $(e.currentTarget);
    let $_input = $input.parent().find('input[type="hidden"]');

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
                $_input.val(series.id);
                $(window).scrollTop(ws);
              }
            });
          });
        }
      });
    });
  })
}
