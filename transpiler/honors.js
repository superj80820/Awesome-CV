const input = `2019創想星球資訊科技創意大賽 - 第一名
獲獎日期2019 年 3 月 1 日  頒獎單位朝陽科技大學 資訊管理系

獎項說明使用低成本的器具，將教室投影幕轉為觸控。

LINE-HACK 2018 - 前10名
獲獎日期2018 年 9 月 1 日  頒獎單位LINE官方

獎項說明參賽組別全約百組，三百人，物聯網與Line進行結合，提供更好的演講平台。

107勤益電子系專題競賽 - 第一名
獲獎日期2017 年 8 月  頒獎單位勤益電子系

獎項說明使用低成本的器具，將教室投影幕轉為觸控。`

console.log(
  input
    .split('\n\n')
    .reduce((pre, cur, index) => {
      // console.log(cur)
      if (cur.includes('獎項說明')) pre[index - 1] = `${pre[index - 1]}\n${cur}`
      // else pre.push(cur)
      pre.push(cur)
      return pre
    }, [])
    .filter((_, index) => index % 2 === 0)
    .map(item => item
      .replace('獲獎日期', '')
      .replace('獎項說明', ''))
    .map(one => {
      return one
        .split('\n')
        .reduce((pre, cur, index) => {
          if (index === 0) {
            pre[0].award = cur.match(/ - (.*)/)[1]
            pre[0].event = cur.match(/(.*) - /)[1]
          }
          else if (index === 1) {
            pre[0].date = cur.match(/(.*)  頒獎單位/)[1]
          }
          else pre[0].description = cur
          return pre
        }, [{ award: '', event: '', date: '', description: ''}])
        .map(item => `
  \\cvhonor
    {${item.award}} % Award
    {${item.event} - ${item.description}} % Event
    {台灣} % Location
    {${item.date.slice(0, 4)}} % Date(s)`)
        .join('')
    })
    .join('\n%---------------------------------------------------------')
)