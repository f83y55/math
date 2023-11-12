// site root / import_modules / title


const root_path = document.head.getElementsByTagName("script")[0].getAttribute("src").replace('s.js', '');
console.log("root_path : "+root_path);
const import_module = document.head.getElementsByTagName("script")[0].hasAttribute("data-import") ? document.head.getElementsByTagName("script")[0].getAttribute("data-import").split(" ") : [];
console.log("import_module : " + import_module);

// Modules

const modules_head = {
"style" :          [{"path":"styles/style.css", "default":true}],
"nav" :            [{"path":"styles/nav.css", "default":true},],
		        // {"path":"scripts/nav/nav.js", "default":true}],
"mathjax" :        [{"path":"scripts/MathJax-master/es5/tex-mml-chtml.js", 
		            "default":true,
			        "attr":{"async":"true"}
                   }],
"prism" :          [{"path":"scripts/prism/prism.css", 
                     "default":false},
		            {"path":"scripts/prism/prism.js", 
					 "default":false, "attr":{"async":"true"}}
				    ],
"ul-collapsible" : [{"path":"scripts/ul-collapsible/ul-collapsible.css",
                     "default":false
                   }],
"quadrillage" :    [{"path":"scripts/quadrillage/quadrillage.js",
				      "default":false, 
		              "attr":{"defer":"true"}}],
					  
}


function inject_cssjs (hashtable, recipient, import_module) {
for (var key in hashtable){
	for (var item of hashtable[key]){
		console.log("path : " + item["path"] + "| default : " + item["default"]);
		if ((item["path"].endsWith(".css"))&&(item["default"]||(import_module.includes(key)))) {
			const element = document.createElement("link");
			element.setAttribute("href", root_path + item["path"]);
			element.setAttribute("rel", "stylesheet");
			element.setAttribute("type", "text/css");
			for (attr in item["attr"]) { 
				element.setAttribute(attr, item["attr"][attr])
			};
			recipient.appendChild(element);
		}
		if ((item["path"].endsWith("js"))&&((item["default"])||(import_module.includes(key)))) {
			const element = document.createElement("script");
			for (attr in item["attr"]) { 
				element.setAttribute(attr, item["attr"][attr])
			};
			element.setAttribute("src", root_path + item["path"]);
			element.setAttribute("type", "text/javascript");
			recipient.appendChild(element);

		}

	}
}
};

// Class rootpath href/src modification

function apply_rootpaths() {
	function apply_rootpath(item) {
		for (attr of ["src", "href"]) {
				if (item.hasAttribute(attr)) {
						item.setAttribute(attr, root_path+item.getAttribute(attr));
						};
				};
		};
	Array.from(document.querySelectorAll(".rootpath")).forEach(apply_rootpath);
};




function body () {
    inject_cssjs (modules_head, document.head, import_module);
	apply_rootpaths();

// head : title, metas
const before_title = "Mathématiques - ";
const page_title = before_title + document.getElementsByTagName("h1")[0].textContent.trim();
const title = document.head.getElementsByTagName("title")[0];
title.text = page_title;
Array.from(document.head.getElementsByTagName("meta")).forEach(function(el){
	return 0; // afaire
});

// body : header and footer
const header = document.createElement("header");
document.body.prepend(header);
const footer = document.createElement("footer");
document.body.append(footer);

header.innerHTML += `
<nav class="navbar">
<input type="checkbox" id="navbar-menu-switch" style="display:none;"/>
<label for="navbar-menu-switch" class="navbar-icon navbar-logo"></label>
	<div class="navbar-collapse">
		<div class="navbar-group">                    
			<div class="navbar-item">
			<div class="navbar-text" style="font-size:larger;font-weight:bold;">
			Mathématiques
			</div>
			<div class="navbar-text">
			Cours</div>
			</div>
			</div>
			<div class="navbar-group">
			<a class="navbar-item" id="navbar-index" href="${root_path}/index.html">
			<img class="navbar-icon" src="${root_path}layouts/nav/assets/home.svg"/>
			<div class="navbar-text">home</div>
			</a>
			<a class="navbar-item" href="https://www.geogebra.org/classic" target="_blank">
			<img class="navbar-icon" src="${root_path}layouts/nav/assets/geogebra.svg"/>
			<div class="navbar-text">GeoGebra</div>
			</a>
			<a class="navbar-item" href="./assets/print.pdf" download="${page_title}.pdf">
			<img class="navbar-icon" src="${root_path}layouts/nav/assets/pdf.svg"/>
			<div class="navbar-text">pdf</div>
			</a>
			<a class="navbar-item" href="#" onclick="window.print();return false;">
			<img class="navbar-icon" src="${root_path}layouts/nav/assets/print.svg"/>
			<div class="navbar-text">print</div>
			</a>
			</div>
			<div class="navbar-group">
			<a class="navbar-item" href="${root_path}pages/links/links.html">
			<img class="navbar-icon" src="${root_path}layouts/nav/assets/links.svg"/>
			<div class="navbar-text">links</div>
			</a>
			<a class="navbar-item" href="https://github.com/f83y55/math/archive/refs/heads/master.zip">
			<img class="navbar-icon" src="${root_path}layouts/nav/assets/download.svg"/>
			<div class="navbar-text">download</div>
			</a>
		</div>
	</div>
</nav>
				`
};

