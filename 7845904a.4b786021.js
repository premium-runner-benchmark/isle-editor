(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{201:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return o})),a.d(t,"metadata",(function(){return l})),a.d(t,"rightToc",(function(){return s})),a.d(t,"default",(function(){return c}));var n=a(1),i=a(10),r=(a(0),a(255)),o={id:"including-data",title:"Including Data",sidebar_label:"Including Data"},l={id:"tutorials/including-data",title:"Including Data",description:"## Data Tables",source:"@site/docs/tutorials/including-data.md",permalink:"/docs/tutorials/including-data",editUrl:"https://github.com/isle-project/isle-editor/edit/master/docusaurus/website/docs/tutorials/including-data.md",lastUpdatedBy:"Planeshifter",lastUpdatedAt:1584925264,sidebar_label:"Including Data",sidebar:"docs",previous:{title:"How to Use Questions",permalink:"/docs/tutorials/question-components"},next:{title:"Examples of ISLE Use Cases",permalink:"/docs/tutorials/examples"}},s=[{value:"Data Tables",id:"data-tables",children:[{value:"JSON Format",id:"json-format",children:[]},{value:"Converting Data to JSON",id:"converting-data-to-json",children:[]}]},{value:"Data Explorer",id:"data-explorer",children:[{value:"Data",id:"data",children:[]},{value:"Variable Types",id:"variable-types",children:[]},{value:"Toolbox",id:"toolbox",children:[]},{value:"Editor",id:"editor",children:[]}]}],b={rightToc:s};function c(e){var t=e.components,a=Object(i.a)(e,["components"]);return Object(r.b)("wrapper",Object(n.a)({},b,a,{components:t,mdxType:"MDXLayout"}),Object(r.b)("h2",{id:"data-tables"},"Data Tables"),Object(r.b)("p",null,"The ",Object(r.b)("inlineCode",{parentName:"p"},"<DataTable/>")," tag in ISLE allows you to include a ",Object(r.b)("a",Object(n.a)({parentName:"p"},{href:"https://isledocs.com/docs/data-table"}),"Data Table"),", which users can then explore. For example, here is a gif of an ISLE file that includes data on airline flights, and the resulting table as displayed to users:"),Object(r.b)("p",null,Object(r.b)("img",Object(n.a)({parentName:"p"},{src:"/gifs/data_table.gif",alt:"Data Table"}))),Object(r.b)("p",null,"The code shown here is"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{}),'---\ntitle: "Looking at Airline Flights"\nauthor: Ciaran\ndate: 17/07/2019\nrequire:\n    airlines: "./airlines.json"\n    airline_info: "./airline_info.json"\nstate:\n---\n\n<DataTable\n    data={airlines}\n    dataInfo={airline_info}\n/>\n')),Object(r.b)("p",null,"Note that this piece of example code includes the preamble to the document, whereas in previous tutorials we've omitted the preamble. The preamble is included here because in this case the ",Object(r.b)("inlineCode",{parentName:"p"},"<DataTable/>")," tag interacts with the preamble, whereas in the earlier examples no changes to the preamble needed to be made for the code to work."),Object(r.b)("p",null,"There are a few important components to this code:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},Object(r.b)("strong",{parentName:"p"},Object(r.b)("inlineCode",{parentName:"strong"},"require")),": the ",Object(r.b)("inlineCode",{parentName:"p"},"require")," statement in the preamble is used to import files. Here we have imported two files, ",Object(r.b)("inlineCode",{parentName:"p"},"airlines.json")," and ",Object(r.b)("inlineCode",{parentName:"p"},"airline_info.json"),", by providing the ",Object(r.b)("em",{parentName:"p"},"local path")," to these files (in this case, the two files are in the same directory as the ISLE file). To reference the content of these files, we have assigned names (respectively ",Object(r.b)("inlineCode",{parentName:"p"},"airlines")," and ",Object(r.b)("inlineCode",{parentName:"p"},"airline_info"),") to the imported content. In this case, the names we chose match the base name of the files, but this is not necessary. We then use this content in the ",Object(r.b)("inlineCode",{parentName:"p"},"<DataTable/>")," tag through the names we chose in the ",Object(r.b)("inlineCode",{parentName:"p"},"require")," statement.")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},Object(r.b)("strong",{parentName:"p"},"the data file"),": this file contains the data we want to display in the Data Table, using the ",Object(r.b)("inlineCode",{parentName:"p"},"data")," field of the ",Object(r.b)("inlineCode",{parentName:"p"},"<DataTable>")," tag. Here, the data file is ",Object(r.b)("inlineCode",{parentName:"p"},"airlines.json"),". The file can be provided in CSV or JSON format, more details will be provided below. You can download a zipped folder containing the two files used in this example ",Object(r.b)("a",Object(n.a)({parentName:"p"},{href:"https://isle.heinz.cmu.edu/Demo_airline_data.zip"}),"here"),".")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},Object(r.b)("strong",{parentName:"p"},"the data info file"),": this (optional) file contains information about the data, such as the name of the data set, a short description of the data and its source, and variable descriptions for each of the columns. The data info is displayed by using the ",Object(r.b)("inlineCode",{parentName:"p"},"dataInfo")," field of the ",Object(r.b)("inlineCode",{parentName:"p"},"<DataTable/>")," tag. The data info needs to be in JSON format (see below). "))),Object(r.b)("h3",{id:"json-format"},"JSON Format"),Object(r.b)("p",null,Object(r.b)("a",Object(n.a)({parentName:"p"},{href:"https://www.json.org/"}),"JSON")," is a nice way of storing data. Here is what a very small JSON data file might look like:"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{}),'{\n    "Age": [3, 4, 3, 6],\n    "FavColor": ["red", "blue", "purple", "green"],\n    "HairColor": ["black", "brown", "brown", "blonde"]\n}\n')),Object(r.b)("p",null,"Each variable name is provided in quotes (",Object(r.b)("inlineCode",{parentName:"p"},'" "'),"), followed by a colon (",Object(r.b)("inlineCode",{parentName:"p"},":"),"). After the colon, we list all of the observed values for that variable, in the order they will appear in the data table. The observed values are separated by commas, and the variables are also separated by commas. Finally, the variables are all wrapped in ",Object(r.b)("inlineCode",{parentName:"p"},"{ }"),". "),Object(r.b)("p",null,"Here is what the corresponding data info file might look like:"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{}),'{\n    "name": "Colors",\n    "info": [\n        "This is a toy dataset on four young children.",\n        "We record age, favorite color, and hair color."\n    ],\n    "variables": {\n        "Age": "The child\'s age in years.",\n        "FavColor": "The child\'s favorite color.",\n        "HairColor": "The child\'s hair color."\n    }\n}\n')),Object(r.b)("p",null,"Rather than representing different variables, each element of the data info file provides a different piece of information about the dataset: the name of the dataset (",Object(r.b)("inlineCode",{parentName:"p"},"name"),"), a description of the data (",Object(r.b)("inlineCode",{parentName:"p"},"info"),"), and descriptions of each variable in the data (",Object(r.b)("inlineCode",{parentName:"p"},"variables"),"). For the ",Object(r.b)("inlineCode",{parentName:"p"},"info")," field, each line of text is entered separately and separated by commas - the two strings shown in the example here will appear on different lines. Note that the ",Object(r.b)("inlineCode",{parentName:"p"},"info")," field uses square brackets (",Object(r.b)("inlineCode",{parentName:"p"},"[ ]"),") whereas the ",Object(r.b)("inlineCode",{parentName:"p"},"variables")," field uses curly brackets (",Object(r.b)("inlineCode",{parentName:"p"},"{ }"),")."),Object(r.b)("p",null,"If we save these as JSON files and import them into the editor in the same way we did the airlines data, the resulting data table looks like this:"),Object(r.b)("p",null,Object(r.b)("img",Object(n.a)({parentName:"p"},{src:"/gifs/data_table_toy_example.gif",alt:"Toy Table GIF"}))),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Alternatively"),", because the data and data info are so small in this example, we could directly enter them into the ",Object(r.b)("inlineCode",{parentName:"p"},"<DataTable/>")," tag without saving them as JSON files. Here is what the ISLE file looks like to produce the Colors data table shown in the gif:"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{}),'---\ntitle: "A Toy Data Table"\nauthor: Ciaran\ndate: 17/07/2019\nstate:\n---\n\n<DataTable\n    data={{\n        "Age": [3, 4, 3, 6],\n        "FavColor": ["red", "blue", "purple", "green"],\n        "HairColor": ["black", "brown", "brown", "blonde"]\n    }}\n    dataInfo={{\n        "name": "Colors",\n        "info": [\n            "This is a toy dataset on four young children.",\n            "We record age, favorite color, and hair color."\n        ],\n        "variables": {\n            "Age": "The child\'s age in years.",\n            "FavColor": "The child\'s favorite color.",\n            "HairColor": "The child\'s hair color."\n        }\n    }}\n/>\n')),Object(r.b)("p",null,"Note that for this example, the preamble does not interact with the ",Object(r.b)("inlineCode",{parentName:"p"},"<DataTable/>")," code because we are not importing the data that we display."),Object(r.b)("h3",{id:"converting-data-to-json"},"Converting Data to JSON"),Object(r.b)("p",null,"If you are an ",Object(r.b)("inlineCode",{parentName:"p"},"R")," user, it is pretty straightforward to convert data to JSON using the ",Object(r.b)("inlineCode",{parentName:"p"},"toJSON")," function in the ",Object(r.b)("inlineCode",{parentName:"p"},"jsonlite")," package. Here is the ",Object(r.b)("inlineCode",{parentName:"p"},"R")," code we used to make the ",Object(r.b)("inlineCode",{parentName:"p"},"airlines.json")," file used in this tutorial:"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{}),"library(jsonlite)\n\nairlines = read.table( file = './airlinesnew.txt' )\nwrite( toJSON( airlines, dataframe = 'columns' ), 'airlines.json' )\n")),Object(r.b)("br",null),Object(r.b)("h2",{id:"data-explorer"},"Data Explorer"),Object(r.b)("p",null,"While a Data Table allows you to display data that students can interact with, a ",Object(r.b)("a",Object(n.a)({parentName:"p"},{href:"https://isledocs.com/docs/data-explorer"}),"Data Explorer")," enhances a Data Table by providing additional tools to analyze and write about the data. Here is an example of a data explorer created for the airlines data:"),Object(r.b)("p",null,Object(r.b)("img",Object(n.a)({parentName:"p"},{src:"/gifs/data_explorer.gif",alt:"Data Explorer"}))),Object(r.b)("p",null,"This example shows each of the possible data explorer features:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"the ",Object(r.b)("strong",{parentName:"li"},"data")),Object(r.b)("li",{parentName:"ul"},"a ",Object(r.b)("strong",{parentName:"li"},"toolbox")," for calculating statistics, creating tables and plots, carrying out hypothesis tests, and transforming variables"),Object(r.b)("li",{parentName:"ul"},"an ",Object(r.b)("strong",{parentName:"li"},"output")," area displaying the toolbox output"),Object(r.b)("li",{parentName:"ul"},"an ",Object(r.b)("strong",{parentName:"li"},"editor")," that allows users to write reports and data analyses"),Object(r.b)("li",{parentName:"ul"},"a ",Object(r.b)("strong",{parentName:"li"},"distributions")," tab that allows users to explore a few common distributions")),Object(r.b)("p",null,"The code to generate the data explorer illustrated here is"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{}),"---\ntitle: \"Looking at Airline Flights\"\nauthor: Ciaran\ndate: 17/07/2019\nrequire:\n    airlines: \"./airlines.json\"\n    airline_info: \"./airline_info.json\"\nstate:\n---\n\n<DataExplorer\n    data={airlines}\n    dataInfo={airline_info}\n    categorical={['Month', 'DayOfWeek', 'Diverted', 'Carrier',\n    'Weather', 'NAS', 'Security', 'LateAircraft']}\n    quantitative={['AirTime', 'Distance', 'TaxiIn', 'TaxiOut', 'ArrDelay',\n    'DepDelay']}\n/>\n")),Object(r.b)("h3",{id:"data"},"Data"),Object(r.b)("p",null,"Data and data info is included in the explorer in the same way as for the Data Table. As above, we can import CSV or JSON files in the preamble and use the ",Object(r.b)("inlineCode",{parentName:"p"},"data")," and ",Object(r.b)("inlineCode",{parentName:"p"},"dataInfo")," fields of the ",Object(r.b)("inlineCode",{parentName:"p"},"<DataExplorer/>")," tag. The ",Object(r.b)("strong",{parentName:"p"},"Data")," tab of the explorer shows the resulting data table. If you do not wish to display the data table in the explorer, you can set the ",Object(r.b)("inlineCode",{parentName:"p"},"dataTable")," option to ",Object(r.b)("inlineCode",{parentName:"p"},"false")," (see the ",Object(r.b)("a",Object(n.a)({parentName:"p"},{href:"https://isledocs.com/docs/data-explorer"}),"data explorer docs")," for more details)."),Object(r.b)("h3",{id:"variable-types"},"Variable Types"),Object(r.b)("p",null,"Certain tests, statistics, and plots require specific variable types. For example, it doesn't make sense to make a scatterplot with a categorical variable. Hence, the ",Object(r.b)("inlineCode",{parentName:"p"},"<DataExplorer/>")," tag requires that all variables be listed either as categorical (in the ",Object(r.b)("inlineCode",{parentName:"p"},"categorical")," option) or quantitative (in the ",Object(r.b)("inlineCode",{parentName:"p"},"quantitative")," option)."),Object(r.b)("h3",{id:"toolbox"},"Toolbox"),Object(r.b)("p",null,"The explorer's toolbox allows users to perform data analysis. There are several tabs of the toolbox:"),Object(r.b)("h4",{id:"statistics"},"Statistics"),Object(r.b)("p",null,"The ",Object(r.b)("strong",{parentName:"p"},"Statistics")," tab allows users to calculate summary statistics on variables. The currently available statistics are Mean, Median, Min, Max, Range, Interquartile Range, Standard Deviation, Variance, and Correlation. By default, all these measures are available in the Statistics tab. To show only a subset, use the ",Object(r.b)("inlineCode",{parentName:"p"},"statistics")," option of the ",Object(r.b)("inlineCode",{parentName:"p"},"<DataExplorer/>")," tag (see below for an example)."),Object(r.b)("h4",{id:"tables"},"Tables"),Object(r.b)("p",null,"The ",Object(r.b)("strong",{parentName:"p"},"Tables")," tab allows users to make tables from variables. The currently available tables are Frequency Tables and Contingency Tables. By default, these two tables are available in the Tables tab. To show only a subset, use the ",Object(r.b)("inlineCode",{parentName:"p"},"tables")," option of the ",Object(r.b)("inlineCode",{parentName:"p"},"<DataExplorer/>")," tag (see below for an example)."),Object(r.b)("h4",{id:"plots"},"Plots"),Object(r.b)("p",null,"The ",Object(r.b)("strong",{parentName:"p"},"Plots")," tab allows users to make plots with the data. The currently available plots are Bar Chart, Pie Chart, Histogram, Box Plot, Scatterplot, Heat Map, Mosaic Plot, and Contour Chart. By default, all plots are available in the Plots tab. To show only a subset, use the ",Object(r.b)("inlineCode",{parentName:"p"},"plots")," option of the ",Object(r.b)("inlineCode",{parentName:"p"},"<DataExplorer/>")," tag (see below for an example)."),Object(r.b)("h4",{id:"tests"},"Tests"),Object(r.b)("p",null,"The ",Object(r.b)("strong",{parentName:"p"},"Tests")," tab allows users to carry out hypothesis tests. The currently available tests are One-Sample Mean Test, One-Sample Proportion Test, Two-Sample Mean Test, Two-Sample Proportion Test, Correlation Test, Chi-squared Independence Test, and One-Way ANOVA. By default, all tests are available in the Tests tab. To show only a subset, use the ",Object(r.b)("inlineCode",{parentName:"p"},"tests")," option of the ",Object(r.b)("inlineCode",{parentName:"p"},"<DataExplorer/>")," tag (see below for an example). Hypothesis tests in ISLE also show a test decision based on a provided significance threshold and the calculated p-value. To display only the p-value, and not the test decision, set ",Object(r.b)("inlineCode",{parentName:"p"},"showTestDecisions")," to ",Object(r.b)("inlineCode",{parentName:"p"},"false"),"."),Object(r.b)("h4",{id:"models"},"Models"),Object(r.b)("p",null,"The ",Object(r.b)("strong",{parentName:"p"},"Models")," tab allows users to fit models to the data. The currently available models are Simple Linear Regression. To show only a subset, use the ",Object(r.b)("inlineCode",{parentName:"p"},"models")," option of the ",Object(r.b)("inlineCode",{parentName:"p"},"<DataExplorer/>")," tag (see below for an example)."),Object(r.b)("h4",{id:"transform"},"Transform"),Object(r.b)("p",null,"The ",Object(r.b)("strong",{parentName:"p"},"Transform")," tab allows users to create new variables through variable transformations. By default, the Transform tab is visible. To hide the Transform tab, set ",Object(r.b)("inlineCode",{parentName:"p"},"transformer={false}")," option in the ",Object(r.b)("inlineCode",{parentName:"p"},"<DataExplorer/>")," tab, as seen in the data explorer example above."),Object(r.b)("h4",{id:"customizing-the-toolbox"},"Customizing the Toolbox"),Object(r.b)("p",null,"Suppose we want to customize the toolbox in the following ways:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"For statistics: Mean and Median"),Object(r.b)("li",{parentName:"ul"},"For tables: Contingency Table"),Object(r.b)("li",{parentName:"ul"},"All plots"),Object(r.b)("li",{parentName:"ul"},"For tests: One-Sample Mean Test, Correlation Test, Chi-squared Independence Test. And do not show test decisions"),Object(r.b)("li",{parentName:"ul"},"No models"),Object(r.b)("li",{parentName:"ul"},"Show the variable transformer")),Object(r.b)("p",null,"Then our ",Object(r.b)("inlineCode",{parentName:"p"},"<DataExplorer/>")," tag could look as follows:"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{}),"<DataExplorer\n    data={airlines}\n    dataInfo={airline_info}\n    categorical={['Month', 'DayOfWeek', 'Diverted', 'Carrier',\n    'Weather', 'NAS', 'Security', 'LateAircraft']}\n    quantitative={['AirTime', 'Distance', 'TaxiIn', 'TaxiOut', 'ArrDelay',\n    'DepDelay']}\n    statistics={[\"Mean\",\"Median\"]}\n    tables={[\"Contingency Table\"]}\n    tests={[\"One-Sample Mean Test\", \"Correlation Test\", \"Chi-squared Independence Test\"]}\n    showTestDecisions={false}\n    models={[]}\n/>\n")),Object(r.b)("h3",{id:"editor"},"Editor"),Object(r.b)("p",null,"In the editor, students can write up their data analysis, using basic Markdown for text formatting, and dragging and dropping output images and tables directly into the report. By default, the editor is visible; to hide the editor, set ",Object(r.b)("inlineCode",{parentName:"p"},"editor={false}")," in the ",Object(r.b)("inlineCode",{parentName:"p"},"<DataExplorer/>")," tag (as in the examples above). By default, the name of the editor tab is ",Object(r.b)("strong",{parentName:"p"},"Report"),", but you can change this if you wish using the ",Object(r.b)("inlineCode",{parentName:"p"},"editorTitle")," option."))}c.isMDXComponent=!0},255:function(e,t,a){"use strict";a.d(t,"a",(function(){return p})),a.d(t,"b",(function(){return u}));var n=a(0),i=a.n(n);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var b=i.a.createContext({}),c=function(e){var t=i.a.useContext(b),a=t;return e&&(a="function"==typeof e?e(t):l({},t,{},e)),a},p=function(e){var t=c(e.components);return i.a.createElement(b.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},h=Object(n.forwardRef)((function(e,t){var a=e.components,n=e.mdxType,r=e.originalType,o=e.parentName,b=s(e,["components","mdxType","originalType","parentName"]),p=c(a),h=n,u=p["".concat(o,".").concat(h)]||p[h]||d[h]||r;return a?i.a.createElement(u,l({ref:t},b,{components:a})):i.a.createElement(u,l({ref:t},b))}));function u(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var r=a.length,o=new Array(r);o[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:n,o[1]=l;for(var b=2;b<r;b++)o[b]=a[b];return i.a.createElement.apply(null,o)}return i.a.createElement.apply(null,a)}h.displayName="MDXCreateElement"}}]);