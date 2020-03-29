module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'com.dogvelopers.www',
        nsis: {
          shortcutName: '개키우는개발자'
        },
        win: {
          target: [
            {
              target: 'nsis',
              arch: [
                'x64',
                'ia32'
              ]
            }
          ]
        }
      }
    }
  }
}
