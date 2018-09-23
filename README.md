Mr Accordion library
======

What is Mr-Accordion?
------
Mr Accordion is a vanilla ES5 library to create accordions with custom settings such as animated, non animated, speed, toggle on/off other open modules.

Operating instructions
------
**Parameters**

|Name                       |Type    |Description                                                  |Required |
|---------------------------|--------|-------------------------------------------------------------|---------|
|settings.accordion__btn    |Object  |Html tag's CSS class                                         |Yes      |
|settings.accordion__module |Object  |Html tag's CSS class                                         |Yes      |
|settings.type              |string  |'animated' or 'non-animated'                                 |Yes      |
|settings.speed             |number  |Speed number - Default=0,4                                   |No       |
|settings.toggleOnOpen      |boolean |If other non clicked modules should collapse - Default=false |No       |


**Sample initialization:**
```javascript
accordion({accordion__btn:'accordion__btn', accordion__module:'accordion__module', type:'animated', speed:1, toggleOnOpen:true});
```

Directory Layout
------
```
├── /src/                       # The source code for Mr Accordion
│   ├── /css/                   # The styles used to animate the accordion
│   ├── /js/                    # JS source code for the accordion
├── /test/                      # Contains a sample accordion in use
│   ├── /css/                   # The styles for the sample accordion
│   ├── /js/                    # JS initialization sample for the accordion
│   └── index.html              # The accordion's index file
│── .gitignore                  # Git ignore rules
└── README.md                   # Information about Mr Accordion
```

Author
------
**Carlos Aguilar Montoya**
 * [github.com/caguilarmon](https://github.com/caguilarmon)

Copyright and licensing information
------
Copyright (c) 2018 Carlos Aguilar Montoya Released under the MIT license
