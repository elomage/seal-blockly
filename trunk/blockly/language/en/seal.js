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
    this.appendInput(dropdown, Blockly.INPUT_VALUE, 'R');
       
    this.setTooltip(function() {
      var mode = thisBlock.getInputLabelValue('R');
      return Blockly.Language.seal_use.TOOLTIPS[mode];
    });
   
    //this.setTooltip('Use or enable a resource.');
  }
};

Blockly.Language.seal_use.RESOURCES =
    [['RedLed', 'REDLED'],
     ['GreenLed', 'GREENLED'],
     ['BlueLed', 'BLUELED'],
     ['Led', 'LED']];

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
    this.appendInput(dropdown, Blockly.INPUT_VALUE, 'R');
    
    this.setTooltip('Read a resource.');
  }
};

Blockly.Language.seal_read.RESOURCES =
    [['ADC', 'ADC'],
     ['Light', 'LIGHT'],
     ['Humidity', 'HUMIDITY'],
     ['Temperature', 'TEMPERATURE']];


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
    this.appendInput(dropdown, Blockly.INPUT_VALUE, 'R');

    this.setTooltip('Output.');
  }
};

Blockly.Language.seal_output.RESOURCES =
    [['Radio', 'RADIO'],
     ['Serial', 'SERIAL']];


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
    this.appendInput('', Blockly.INPUT_VALUE, 'A');
    this.appendInput(',', Blockly.INPUT_VALUE, 'B');
  }
};



//-------------------------------------
Blockly.Language.seal_period = {
  category: 'Seal',
  helpUrl: 'http://mansos.net/',
  init: function() {
    this.setColour(Seal.block_color);
    this.appendTitle('period');
	this.setOutput(true);

    this.appendInput('', Blockly.INPUT_VALUE, 'INT');

    var dropdown = new Blockly.FieldDropdown(function() {
      return Blockly.Language.seal_period.TIME;
    });
    this.appendTitle(dropdown, 'TEXT');
  }
};

Blockly.Language.seal_period.TIME =
    [['ms', 'MS'],
     ['s', 'SEC']];


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
    dropdown.setValue('B9600');
    this.appendTitle(dropdown, 'TEXT');
  }
};

Blockly.Language.seal_baudrate.BAUD =
    [['2400', 'B2400'],
     ['4800', 'B4800'],
     ['9600', 'B9600'],
     ['19200', 'B19200'],
     ['38400', 'B38400'],
     ['57600', 'B57600'],
     ['115200', 'B115200']];


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

