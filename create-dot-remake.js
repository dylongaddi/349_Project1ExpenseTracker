#!/usr/bin/env node

module.paths.push('./_remake')

const nanoidGenerate = require('nanoid/generate')
const dotRemake = require('utils/dot-remake')

dotRemake.writeDotRemake({
  port: 3000,
  sessionSecret: nanoidGenerate('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 30)
})