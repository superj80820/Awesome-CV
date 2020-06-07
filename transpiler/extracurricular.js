const input = `w3HexSchool 鼠年全馬鐵人挑戰 - 技術文章撰寫
2020 年 2 月 – 目前

專案說明▪ 文章網址：https://ithelp.ithome.com.tw/users/20122925/articles?page=1
▪ 內容：這是由六角學院所推出的 w3HexSchool 活動，有如全馬挑戰一般，是屬於常態且長期性寫文活動，透過此活動進而推動自我成長與幫助網路社群。

查看專案 w3HexSchool 鼠年全馬鐵人挑戰 - 技術文章撰寫查看專案
Side project: 鴨發Go! - 前端設計
2017 年 12 月 – 目前

專案說明▪ 原始碼：https://github.com/superj80820/Ahfargo_bus_bot
▪ 內容：Line軟體結合市政公車系統 以提供公車查詢功能，不需要另外安裝App，即可查詢公車。

查看專案 Side project: 鴨發Go! - 前端設計查看專案
Side project: 髒沙發 - 前端設計
2017 年 6 月 – 目前

專案說明▪ 原始碼：https://github.com/superj80820/star_line_bot_admin
▪ 獲獎：獲得Line today、電腦王阿達、新聞雲ETtoday、知名Youtuber報導，約10萬人使用。
▪ 內容：透過Vue.js，使用AJAX與後端交互資料，提供一個界面供管理人員新增女星資料。

查看專案 Side project: 髒沙發 - 前端設計查看專案
Side project: 髒沙發 - 後端設計
2017 年 6 月 – 目前

專案說明▪ https://github.com/superj80820/messfar-line-service
▪ 獲獎：獲得Line today、電腦王阿達、新聞雲ETtoday、知名Youtuber報導，約10萬人使用。
▪ 內容：持續成長中。透過人臉辨識查詢女星，後端原為Flask，現改為Express處理Line Webhook，並提供管理人員的API供Admin前端使用。

查看專案 Side project: 髒沙發 - 後端設計查看專案
Side project: generate curl - 後端設計
2020 年 3 月 - 2020 年 4 月

專案說明▪ https://github.com/superj80820/generate-curl
▪ 內容：在後端收到requests時，常常需要將這些requests參數複製下來至postman或者insomnia重組，這十分的麻煩。generate-curl提供將requests轉換成curl的功能，讓後端人員可以使用此curl直接轉換至postman, insomnia, terminal來debug。另外，generate-curl也提供函數來讓重要資訊隱藏。

查看專案 Side project: generate curl - 後端設計查看專案
Side project: everyvideo - Chrome extension
2020 年 2 月 - 2020 年 3 月

專案說明▪ 原始碼：https://github.com/superj80820/evervideo
▪ 內容：可以讓Netflix以一個小視窗顯示在螢幕上方，然後邊做事邊看片的chrome插件（可顯示字幕）。

查看專案 Side project: everyvideo - Chrome extension查看專案`

console.log(
  input
    .split('查看專案')
    .reduce((pre, cur, index) => {
      if (index % 2 === 0) pre.push(cur.slice(1, cur.length - 2))
      return pre
    }, [])
    .slice(0, -1)
    .map(one => {
      return one
        .split('\n')
        .reduce((pre, cur, index) => {
          if (index === 0) pre[0].organizationAndRole = cur
          else if (index === 1) pre[0].date = cur
          else if (cur !== '') {
            const description = cur.match(/▪ (.*)/) || []
            pre[0].description.push(`\\item {${description[1]}}`)
          }
          return pre
        }, [{ organizationAndRole: '', date: '', description: []}])
        .map(item => {
          item.description = item.description.join('\n        ')
          return item
        })
        .map(item => `
  \\cventry
    {${item.organizationAndRole.match(/- (.*)/)[1]}} % Affiliation/role
    {${item.organizationAndRole.match(/(.*) -/)[1]}} % Organization/group
    {台灣} % Location
    {${item.date}} % Date(s)
    {
      \\begin{cvitems} % Description(s) of experience/contributions/knowledge
        ${item.description}
      \\end{cvitems}
    }`)
        .join('')
    })
    .join('\n%---------------------------------------------------------')
)