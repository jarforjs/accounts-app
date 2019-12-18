var hanoi = function (disc, src, aux, dst) {
  if (disc > 0) {
    hanoi(disc - 1, src, dst, aux);
    console.log('移动' + disc + '号圆盘从 ' + src + ' 到 ' + dst);
    hanoi(disc - 1, aux, src, dst)
  }
}

hanoi(3, '左', '中', '右');