{translate_sugar} = require './sugar'
{tokenize} = require './lexer'
{parse, Grammar} = require './parser'
{load} = require './generator'

exports.compile = (code) ->
  translated_code = translate_sugar code
  [tokens, comments] = tokenize translated_code
  root_node = parse tokens, comments
  load Grammar
  return root_node.js()
  
  
fs = require 'fs'
assert = require 'assert'
code = exports.compile fs.readFileSync process.argv[2] if process.argv[2]?
console.log code
console.log eval(code)