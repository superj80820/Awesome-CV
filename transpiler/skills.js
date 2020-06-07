const input = `▪ Programming:
▫ JavaScript, Node.js, TypeScript
▫ Golang
▫ Python

▪ Backend:
▫ Microservice, Monolithic
▫ Express, NestJS, Gin, Flask
▫ RESTful API
▫ Serverless, AWS Lambda
▫ Envoy

▪ Frontend:
▫ Vue.js, React.js
▫ Redux, Vuex, Redux Observable
▫ Rx.js
▫ SPA
▫ Webpack
▫ jQuery
▫ EJS
▫ HBS

▪ Software:
▫ Electron.js

▪ DevOps:
▫ Docker, Watchtower
▫ Jenkins, Gitlab-CI, Travis
▫ Agile, Scrum
▫ AWS EC2, Load Balancer, ELK
▫ Swagger
▫ Git
▫ Linux

▪ Security:
▫ 非對稱加密, 對稱加密
▫ 2FA authentication
▫ JWT

▪ Test:
▫ TDD, Jest.js
▫ Selenium, Robot Framework

▪ DB:
▫ PostgreSQL, MySQL
▫ MongoDB, AWS DynamoDB, Redis
▫ ORM, ODM
▫ AWS S3

▪ Other:
▫ Codewars level 5
▫ noVNC `

console.log(
  input
    .split('\n\n')
    .map(item => item
      .split('\n▫ ')
      .reduce((pre, cur, index) => {
        if (index === 0) pre.category = cur.slice(2, cur.length - 1)
        else pre.skills.push(cur)
        return pre
      }, { category: '', skills: [] }))
    .map(item => {
      item.skills = item.skills.join(', ')
      return item
    })
    .map(item => `
  \\cvskill
    {${item.category}} % Category
    {${item.skills}} % Skills`)
    .join('\n\n%---------------------------------------------------------')
)