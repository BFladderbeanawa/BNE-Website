export default {
  title: 'HFI 学生中心',
  description: 'A VitePress Site',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '导师预约', link: '/booking/' },
      { text: '资料共享', link: '/files/' }
      // { text: '管理员', link: '/admin/' }
    ],
    sidebar: {
      '/articles/': [
        {
          text: '往期文章',
          items: [
            { text: '欢迎新生', link: '/articles/2025-08-24-welcome' },
            { text: '新功能介绍', link: '/articles/2025-08-23-new-feature' }
          ]
        }
      ]
    }
  }
}