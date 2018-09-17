Mr Accordion library - Vanilla ES5
======

What is Mr-Accordion?
------
Mr Accordion is a vanilla ES5 library to create accordions with different settings such as animated, non animated, speed, toggle on/off other open modules.

Operating instructions
------
**You need to pass the following required settings when initializing it:**
```
1. @param {Object} settings.accordion__btn - Html tag's CSS class
2. @param {Object} settings.accordion__module - Html tag's CSS class
3. @param {string} settings.type - 'animated' or 'non-animated'
```

**There are also a couple of optional settings:**
```
1. @param {number} [settings.speed=0.4] - Speed number
2. @param {boolean} [settings.toggleOnOpen=false] - If other non clicked modules should collapse
```

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
│   └── /index/                 # The accordion index file
│── .gitignore                  # Git ignore rules
└── README.md                   # Information about Mr Accordion
```

Author
------
**Carlos Aguilar Montoya**
 * github.com/caguilarmon

Copyright and licensing information
------
Copyright (c) 2018 Carlos Aguilar Montoya Released under the MIT license
