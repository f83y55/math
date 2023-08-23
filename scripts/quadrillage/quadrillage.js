/*
<canvas id="canvas1" style="--width-print:16cm; --height-print:7cm;"></canvas>
<script language="javascript" type="text/javascript" src="../scripts/quadrillage/quadrillage.js">
    quadrillage("canvas1", 10, 10);
</script>

*/


function quadrillage(element_id, table_height, table_width, flo) {
        const correc = 0.98; // correction
        const cell = 5; // mm
        tbl = document.getElementById(element_id);
        tbl.setAttribute("class", "mytable hidden-web");
        tbl.setAttribute("style", "--cell-width-print:"+cell*correc+"mm; --cell-height-print:"+cell*correc+"mm; --margin:0; --mytable-padding:0; float: "+flo+"; clear:both;");
  const wi = 2*table_width;
  const he = 2*table_height;
  for (let i = 0; i < he; i++) {
    const tr = tbl.insertRow();
    for (let j = 0; j < wi; j++) {
        const td = tr.insertCell();
        td.appendChild(document.createTextNode(''));
        }
      }
}
