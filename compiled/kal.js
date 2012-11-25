(function () {
  var coffee, sugar, lexer, parser, generator, fs, assert, fnames, out_dir, ki$1, kobj$1, fname, code;
  
  coffee = require('coffee-script');
  sugar = require('./sugar');
  lexer = require('./lexer');
  parser = require('./parser');
  generator = require('./generator');
  fs = require('fs');
  function compile (code) {
    var token_rv, raw_tokens, comments, tokens, root_node;
    token_rv = lexer.tokenize(code);
    
    raw_tokens = token_rv[0];
    
    comments = token_rv[1];
    
    
    tokens = sugar.translate_sugar(raw_tokens);
    
    root_node = parser.parse(tokens, comments);
    
    generator.load(parser.Grammar);
    
    return root_node.js();
    
    
  };
  if (require.extensions) {
    require.extensions['.kal'] = function  (module, filename) {
      var content;
      content = compile(fs.readFileSync(filename, 'utf8'));
      
      module._compile(content, filename);
      
    };
  }
  if (!(module.parent)) {
    fs = require('fs');
    
    assert = require('assert');
    
    if (process.argv[2] === '-c') {
      fnames = process.argv.slice(3, 0 - 1);
      
      out_dir = process.argv.slice(0 - 1)[0];
      
    } else {
      fnames = [process.argv[2]];
      
      out_dir = process.argv[3];
      
    }
    kobj$1 = fnames;
    for (ki$1 = 0; ki$1 < kobj$1.length; ki$1++) {
      fname = kobj$1[ki$1];
        code = compile(fs.readFileSync(fname));
        
        if (out_dir) {
          fs.writeFileSync(out_dir + fname.split('/').slice(0 - 1)[0].replace('.kal', '.js'), code);
          
        } else {
          console.log(code);
          
          console.log(eval(code));
          
          
        }
    }
  }
})()
