/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/google-blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview SEAL blocks for Blockly.
 * @author leo@selavo.com	(Leo Selavo)
 */

if (!Blockly.Language) {
  Blockly.Language = {};
}

/**
 * Create a namespace for the Seal.
 */
var Seal = {};
Seal.block_color = 15

Blockly.Seal = Blockly.Generator.get('Seal');
Blockly.Javascript = Blockly.Generator.get('Javascript');

// SEAL: use <id> <param_list> ;
//-------------------------------------
Blockly.Language.seal_use = {
  category: 'Seal',
  helpUrl: 'http://mansos.net/',
  init: function() {
    this.setColour(Seal.block_color);
    this.appendTitle('use');
    this.setPreviousStatement(true);
    this.setNextStatement(true);

    var dropdown = new Blockly.FieldDropdown(function() {
      return Blockly.Language.seal_use.RESOURCES;
    });
    this.appendTitle(dropdown, 'USE');
    this.appendInput('', Blockly.INPUT_VALUE, 'ARGS');
       
    this.setTooltip(function() {
      var mode = thisBlock.getInputLabelValue('USE');
      return Blockly.Language.seal_use.TOOLTIPS[mode];
    });
   
    this.setTooltip('Use or enable a resource.');
  }
};
Blockly.Seal.seal_use = function() {
  // Generate JavaScript for moving forward or backwards.

  return 'Use ' + this.getTitleValue('USE') + Blockly.Seal.valueToCode(this, 'ARGS')+ ';\n';
};

Blockly.Language.seal_use.RESOURCES =
    [['RedLed', 'RedLed'],
     ['GreenLed', 'GreenLed'],
     ['BlueLed', 'BlueLed'],
     ['Led', 'Led']];

Blockly.Language.seal_use.TOOLTIPS ={
  REDLED: 'Use the red LED.',
  GREENLED: 'Use the green LED.',
  BLUELED: 'Use the blue LED.',
  LED: 'Use the default LED.'
};


// SEAL: read <id> <param_list> ;
//-------------------------------------
Blockly.Language.seal_read = {
  category: 'Seal',
  helpUrl: 'http://mansos.net/',
  init: function() {
    this.setColour(Seal.block_color);
    this.appendTitle('read');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    
    var dropdown = new Blockly.FieldDropdown(function() {
      return Blockly.Language.seal_read.RESOURCES;
    });
    this.appendTitle(dropdown, 'READ');
    this.appendInput('', Blockly.INPUT_VALUE, 'ARGS');
    
    this.setTooltip('Read a resource.');
  }
};

Blockly.Seal.seal_read = function() {
  // Generate JavaScript for moving forward or backwards.

  return 'Read ' + this.getTitleValue('READ') + Blockly.Seal.valueToCode(this, 'ARGS')+ ';\n';
};

Blockly.Language.seal_read.RESOURCES =
    [['ADC', 'ADC'],
     ['Light', 'Light'],
     ['Humidity', 'Humidity'],
     ['Temperature', 'Temperature']];


// SEAL: output <id> <param_list> ;
//-------------------------------------
Blockly.Language.seal_output = {
  category: 'Seal',
  helpUrl: 'http://mansos.net/',
  init: function() {
    this.setColour(Seal.block_color);
    this.appendTitle('output');
    this.setPreviousStatement(true);
    this.setNextStatement(true);

    var dropdown = new Blockly.FieldDropdown(function() {
      return Blockly.Language.seal_output.RESOURCES;
    });
    this.appendTitle(dropdown, 'OUTPUT');
    this.appendInput('', Blockly.INPUT_VALUE, 'ARGS');

    this.setTooltip('Output.');
  }
};

Blockly.Seal.seal_output = function() {
  // Generate JavaScript for moving forward or backwards.

  return 'Use ' + this.getTitleValue('OUTPUT') + Blockly.Seal.valueToCode(this, 'ARGS')+ ';\n';
};


Blockly.Language.seal_output.RESOURCES =
    [['Radio', 'Radio'],
     ['Serial', 'Serial']];


// SEAL: output <id> <param_list> ;
//-------------------------------------
Blockly.Language.seal_touple2 = {
  category: 'Seal',
  helpUrl: 'http://mansos.net/',
  init: function() {
    this.setColour(Seal.block_color);
    this.appendTitle('');
	this.setOutput(true);
    this.setInputsInline(true);
    this.appendInput('', Blockly.INPUT_VALUE, 'ARG1');
    this.appendInput(',', Blockly.INPUT_VALUE, 'ARG2');
  }
};

Blockly.Seal.seal_touple2 = function() {
  // Generate JavaScript for moving forward or backwards.

  return Blockly.Seal.valueToCode(this, 'ARG1') + Blockly.Seal.valueToCode(this, 'ARG2');
};


//-------------------------------------
Blockly.Language.seal_period = {
  category: 'Seal',
  helpUrl: 'http://mansos.net/',
  init: function() {
    this.setColour(Seal.block_color);
    this.appendTitle('period');
	this.setOutput(true);

    //this.appendInput('', Blockly.INPUT_VALUE, 'INT');

    var dropdown = new Blockly.FieldDropdown(function() {
      return Blockly.Language.seal_period.TIME;
    });
    var value = new Blockly.FieldTextInput('1000', function(text) {
      var n = window.parseFloat(text || 0);
      return window.isNaN(n) ? null : String(n);
    })
    this.appendTitle(value, 'NUM');
    this.appendTitle(dropdown, 'TEXT');
  }
};

Blockly.Seal.seal_period = function() {
  // Generate JavaScript for moving forward or backwards.

  return ', period ' + this.getTitleValue('NUM').toLowerCase() + this.getTitleValue('TEXT');
};

Blockly.Language.seal_period.TIME =
    [['ms', 'ms'],
     ['s', 's']];


//-------------------------------------
Blockly.Language.seal_baudrate = {
  category: 'Seal',
  helpUrl: 'http://mansos.net/',
  init: function() {
    this.setColour(Seal.block_color);
    this.appendTitle('baudrate');
	this.setOutput(true);

    var dropdown = new Blockly.FieldDropdown(function() {
      return Blockly.Language.seal_baudrate.BAUD;
    });
    dropdown.setValue('9600');
    this.appendTitle(dropdown, 'TEXT');
  }
};


Blockly.Seal.seal_baudrate = function() {
  // Generate JavaScript for moving forward or backwards.

  return ', baudrate ' + this.getTitleValue('TEXT').toLowerCase();
};

Blockly.Language.seal_baudrate.BAUD =
    [['2400', '2400'],
     ['4800', '4800'],
     ['9600', '9600'],
     ['19200', '19200'],
     ['38400', '38400'],
     ['57600', '57600'],
     ['115200', '115200']];


//-------------------------------------
Blockly.Language.seal_value = {
  category: 'Seal',
  helpUrl: 'http://mansos.net/',
  init: function() {
    this.setColour(Seal.block_color);
    this.appendTitle('value');
	this.setOutput(true);

    this.appendTitle(new Blockly.FieldTextInput('0', function(text) {
      var n = window.parseFloat(text || 0);
      return window.isNaN(n) ? null : String(n);
    }), 'NUM');

  }
};

