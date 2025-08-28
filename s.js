// site root / import_modules / title

const before_title = "Mathématiques - ";
const icon = "έ";
const name_script = "s.js";

const root_path = document.head.getElementsByTagName("script")[0].getAttribute("src").replace(name_script, '');
const import_module = document.head.getElementsByTagName("script")[0].hasAttribute("data-import") ? document.head.getElementsByTagName("script")[0].getAttribute("data-import").split(" ") : [];
//console.log("root_path : "+root_path);
//console.log("import_module : " + import_module);


// Modules
const modules_head = {
    "style": [{ "path": "styles/style.css", "default": true }],
    "nav": [{ "path": "styles/nav.css", "default": true },],
    "mathjax": [{
        "path": "scripts/MathJax-master/es5/tex-mml-chtml.js",
        "default": true,
        "attr": { "async": "true" }
    }],
    "prism": [{
        "path": "scripts/prism/prism.css",
        "default": false
    },
    {
        "path": "scripts/prism/prism.js",
        "default": false, "attr": { "async": "true" }
    }
    ],

}


function inject_cssjs(hashtable, recipient, import_module) {
    for (var key in hashtable) {
        for (var item of hashtable[key]) {
            console.log("path : " + item["path"] + "| default : " + item["default"]);
            if ((item["path"].endsWith(".css")) && (item["default"] || (import_module.includes(key)))) {
                const element = document.createElement("link");
                element.setAttribute("href", root_path + item["path"]);
                element.setAttribute("rel", "stylesheet");
                element.setAttribute("type", "text/css");
                for (attr in item["attr"]) {
                    element.setAttribute(attr, item["attr"][attr])
                };
                recipient.appendChild(element);
            }
            if ((item["path"].endsWith("js")) && ((item["default"]) || (import_module.includes(key)))) {
                const element = document.createElement("script");
                for (attr in item["attr"]) {
                    element.setAttribute(attr, item["attr"][attr])
                };
                element.setAttribute("src", root_path + item["path"]);
                element.setAttribute("type", "text/javascript");
                recipient.appendChild(element);

            }
        }
        /* special cases */
        /* prism line numbering */
        if (import_module.includes("prism")) {
            document.body.classList.add("line-numbers")
        }
    }
};

// Class rootpath href/src modification

function apply_rootpaths() {
    function apply_rootpath(item) {
        for (attr of ["src", "href"]) {
            if (item.hasAttribute(attr)) {
                item.setAttribute(attr, root_path + item.getAttribute(attr));
            };
        };
    };
    Array.from(document.querySelectorAll(".rootpath")).forEach(apply_rootpath);
};

// Images full screen onclick
function full_screen_imgs() {
    const full_page = document.createElement("div");
    full_page.id = "fullpage";
    full_page.style.cssText = `display: none;
  position: absolute;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: contain;
  background-repeat: no-repeat no-repeat;
  background-position: center center;
  background-color: white;`;
    full_page.addEventListener("click", function() {
        full_page.style["display"] = "none";
    });
    document.body.appendChild(full_page);

    Array.from(document.getElementsByTagName("img")).forEach(img => {
        img.addEventListener("click", function() {
            full_page.style["background-image"] = `url(${img.src})`;
            full_page.style["display"] = "block";
            full_page.style["top"] = `${window.scrollY}px`;
            full_page.style["left"] = `${window.scrollX}px`;
        });
    });
}

// Lists
function ul_collapsible() {
    let icon_open = " 📂 ";
    let icon_closed = " 📁 ";
    let icon_file = " 📄 "
    Array.from(document.querySelectorAll("ul.collapsible, ol.collapsible")).forEach(el => {
        if (el.tagName === "UL") {
            el.style["list-style"] = "none";
        }
        Array.from(el.querySelectorAll("li")).forEach(li => {
            let uls = li.children;
            if (uls) {
                uls = Array.from(uls).filter((elem) => ["UL", "OL"].includes(elem.tagName));
            }
            if (uls.length) {
                start = true;
                let ul_child_last = uls[0];
                uls.forEach(ul_child => {
                    if (ul_child.tagName === "UL") {
                        ul_child.style["list-style"] = "none";
                    }
                    let icon = document.createElement("span");
                    let icon_content = document.createTextNode(icon_open);
                    icon.appendChild(icon_content);
                    if (start) {
                        li.prepend(icon);
                        start = false;
                    } else {
                        li.insertBefore(icon, ul_child_last.nextSibling);
                        li.insertBefore(document.createElement("br"), ul_child_last.nextSibling);
                    }
                    if (!ul_child.classList.contains("open")) {
                        icon_content.nodeValue = icon_closed;
                        ul_child.style["display"] = "none";
                    }
                    icon.addEventListener("click", function() {
                        if (ul_child.style["display"] === "none") {
                            ul_child.style["display"] = "";
                            icon_content.nodeValue = icon_open;
                        } else {
                            ul_child.style["display"] = "none";
                            icon_content.nodeValue = icon_closed;
                        }
                    });
                    ul_child_last = ul_child;
                });
            } else {
                let icon = document.createElement("span");
                let icon_content = document.createTextNode(icon_file);
                icon.appendChild(icon_content);
                li.prepend(icon);
            }
        });
    });
}

// Corrections
function corrections() {
    const button_correction = document.createElement("button");
    button_correction.appendChild(document.createTextNode("Afficher les corrigés"));
    button_correction.style.cssText = "background-color:gray; color:black; height:2em; width:22em; text-align:center; border: 2px solid black; border-radius:0.2em; margin: 1em;";
    button_correction.classList.add("hidden-print");
    let first_h1 = document.getElementsByTagName("h1")[0];
    if (first_h1) {
        first_h1.parentNode.insertBefore(button_correction, first_h1.nextSibling);
    } else {
        document.body.appendChild(button_correction);
    }
    button_correction.addEventListener("click", function() {
        if (!button_correction.classList.contains("open")) {
            Array.from(document.getElementsByClassName("corr")).forEach(corr => {
                corr.classList.add("open");
            });
            button_correction.classList.add("open");
            button_correction.style["background-color"] = "#040";
            button_correction.style["color"] = "#0F0";
        }
        else {
            Array.from(document.getElementsByClassName("corr")).forEach(corr => {
                corr.classList.remove("open");
            });
            button_correction.classList.remove("open");
            button_correction.style["background-color"] = "gray";
            button_correction.style["color"] = "black";
        }
    });
    Array.from(document.getElementsByClassName("corr")).forEach(corr => {
        corr.addEventListener("click", function() {
            corr.classList.toggle("open");
        });
    });
}

function build_head(before = before_title) {
    let page_title = before + document.getElementsByTagName("h1")[0].textContent.trim();
    let title = document.head.getElementsByTagName("title")[0];
    if (!title) { title = document.createElement("title"); document.head.appendChild(title); }
    title.text = page_title;
    let favicon = document.createElement("link");
    favicon.setAttribute("rel", "icon");
    favicon.setAttribute("href", `data:image/svg+xml, <svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22 fill=%22limegreen%22>${icon}</text></svg>`);
    document.head.appendChild(favicon);
    Array.from(document.head.getElementsByTagName("meta")).forEach(function(el) {
        console.log(el); // afaire
    });
    return page_title;
}

function body() {
    let page_title = build_head();
    inject_cssjs(modules_head, document.head, import_module);
    apply_rootpaths();
    full_screen_imgs();
    if (document.getElementsByClassName("corr")[0]) { corrections(); }
    if (document.querySelector("ul.collapsible, ol.collapsible")) { ul_collapsible(); }

    // body : add header with nav
    const header = document.createElement("header");
    document.body.prepend(header);
    header.innerHTML += `
<nav class="navbar">
<input type="checkbox" id="menu-switch" style="display:none;"/>
<label for="menu-switch" class="icon"></label>
    <div class="collapse">
        <div class="group">                    
            <div class="item">
	        <div class="text" style="font-size:larger;font-weight:bold;">Math<span style="color:limegreen;">έ</span>matiques</div>
	        <div class="text">Cours</div>
            </div>
        </div>
	<div class="group">
	    <a class="item" href="${root_path}/index.html">
	        <div class="icon">⌂</div>
	        <div class="text">home</div>
	    </a>
	    <a class="item" href="./assets/print.pdf" download="${page_title}.pdf">
	        <div class="icon">🗎 </div>
	        <div class="text">pdf</div>
	    </a>
	    <a class="item" href="#" onclick="window.print();return false;">
	        <div class="icon">⎙</div>
	        <div class="text">print</div>
	    </a>
	</div>
	<div class="group">
	    <a class="item" href="https://www.geogebra.org/classic" target="_blank">
	        <div class="icon">📐</div>
	        <div class="text">ggb</div>
	    </a>
	    <a class="item" href="${root_path}scripts/pyscript/pyscript.html" target="_blank">
	        <div class="icon">🐍</div>
	        <div class="text">py</div>
	    </a>
	    <a class="item" href="https://ethercalc.net/" target="_blank">
	        <div class="icon">📑</div>
	        <div class="text">odt</div>
	    </a>
	</div>
	<div class="group">
	    <a class="item" href="${root_path}pages/links/links.html">
	        <div class="icon">🖇</div>
	        <div class="text">links</div>
	    </a>
	    <a class="item" href="https://github.com/f83y55/math/archive/refs/heads/master.zip" download>
	        <div class="icon">⤓</div>
	        <div class="text">download</div>
	    </a>
	</div>
    </div>
</nav>`

    // body : add footer
    //const footer = document.createElement("footer");
    //document.body.append(footer);

};

// add code (prism)
function add_code(el_id, text = "Text", lang = "python") {
    let el = document.getElementById(el_id);
    let code_node = document.createElement("code");
    code_node.classList.add(`language-${lang}`);
    let text_node = document.createTextNode(text);
    code_node.appendChild(text_node);
    el.appendChild(code_node);
}
