import csv, json, sys, os

def list_to_html_table(ls:list=[], table_id:str="", start_row:int=1, start_column:int=1, indent:int=2, footer:bool=False, css:str="") -> str :
    css = css.replace(".mytable", f"#{table_id}")    # replace class by id table in css
    table = f"<table id=\"{table_id}\" class=\"mytable\">\n"
    table += indent*" "+"<style scoped>\n"
    table += 2*indent*" "+f"{css}"+"\n"
    table += indent*" "+"</style>\n"
    table += indent*" "+"<caption>\n"
    table += 2*indent*" "+f"{table_id}\n"
    table += indent*" "+"</caption>\n"
    if ls :
        table += indent*" "+"<thead>\n"
        table += 2*indent*" "+f"<tr class=\"table_row_tr_{start_row-1}\">\n"
        for j, el in enumerate(ls.pop(0), start=start_column) :
            table += 3*indent*" "+f"<th class=\"table_row_{start_row-1} table_column_{j}\">\n"
            table += 4*indent*" "+f"{el}\n"
            table += 3*indent*" "+"</th>\n"
        table += 2*indent*" "+"</tr>\n"
        table += indent*" "+"</thead>\n"
        table += indent*" "+"<tbody>\n"
        for i, row in enumerate(ls, start=start_row) :
            if i-start_row == len(ls)-1 :
                if not(footer) :
                    table += indent*" "+"<!--\n"
                table += indent*" "+"</tbody>\n"
                table += indent*" "+"<tfoot>\n"
                if not(footer) :
                    table += indent*" "+"-->\n"
            table += 2*indent*" "+f"<tr class=\"table_row_tr_{i}\">\n"
            for j, el in enumerate(row, start=start_column) :
                table += 3*indent*" "+f"<td class=\"table_row_{i} table_column_{j}\">\n"
                table += 4*indent*" "+f"{el}\n"
                table += 3*indent*" "+"</td>\n"
            table += 2*indent*" "+"</tr>\n"
        if not(footer) :
            table += indent*" "+"<!--\n"
            table += indent*" "+"</tfoot>\n"
            table += indent*" "+"-->\n"
            table += indent*" "+"</tbody>\n"
        else : 
            table += indent*" "+"</tfoot>\n"
    table += "</table>\n"
    return table


settings = {
        "DELIMITER" : ",",       # séparateur csv
        "MAINROOT" : ".",        # répertoire de travail
        "DONE" : "done",         # sous-répertoire de sortie
        "start_row" : 1,         # numérotation des classes css lignes/colonnes
        "start_column" : 1,
        "indent" : 2,            # taille indentation dans le code html (en espaces)
        "footer" : True,         # table avec tfoot en dernière ligne
        "css" : """
      @media screen, print {
        .mytable {
          display: block;
          margin: 1.5em;
          border-collapse: collapse;
          font-family: monospace;
          break-inside: avoid;
          -webkit-print-color-adjust:exact !important;
          print-color-adjust:exact !important;
        }
        .mytable caption {
          font-weight: bold;
        }
        .mytable tr:nth-child(even) {background-color: #ccc}
        .mytable tr:nth-child(odd) {background-color: #ddd}
        .mytable th {
          text-align: left;
          background-color: #bbb;
          border: 2px solid black;
          padding: 0.5em;
        }
        .mytable td {
          text-align: left;
          border: 1px solid black;
          padding: 0.5em;
        }
      }
"""
}

if __name__ == "__main__" :
    try :
        os.makedirs(os.path.join(settings["MAINROOT"], settings["DONE"]), exist_ok=True)
    except Exception as e :
        print(f"Exception : {e}")
    if len(sys.argv)>1 :               # les fichiers à traiter sont en argument
        filejsons = [el for el in sys.argv[1:] if el.endswith(".json")]
        filecsss = [el for el in sys.argv[1:] if el.endswith(".css")]
        delimiters = [el for el in sys.argv[1:] if len(el)==1]
        filenames = [el for el in sys.argv[1:] if el.endswith(".csv")]
    else :                             # sinon tous les fichiers .csv sont traités
        filejsons = [el for el in os.listdir(settings["MAINROOT"]) if el.endswith(".json")]
        filecsss = [el for el in os.listdir(settings["MAINROOT"]) if el.endswith(".css")]
        delimiters = [settings["DELIMITER"]]
        filenames = [el for el in os.listdir(settings["MAINROOT"]) if el.endswith(".csv")]
    if filejsons :
        with open(filejsons[0]) as jsonfile :
            json_dic = json.load(jsonfile)
            if all(item in settings.keys() for item in json_dic.keys()) :
                settings = json_dic
    if filecsss :
        with open(filecsss[0]) as cssfile :
            settings["css"] = cssfile.read()
    if delimiters :
        settings["DELIMITER"] = delimiters[0]
    st_all = "<div style=\"display:flex;flex-wrap:wrap;\">\n\n"
    for filename in filenames :
        with open(filename, newline='') as csvfile :
            reader = csv.reader(csvfile, delimiter=settings["DELIMITER"])
            ls = [el for el in reader]
        st = list_to_html_table(ls, f"{filename[:-4]}", 
                                start_row=settings["start_row"], 
                                start_column=settings["start_column"],
                                indent=settings["indent"],
                                footer=settings["footer"],
                                css=settings["css"]
                                )
        st_all += st+"\n\n"
        with open(os.path.join(settings["MAINROOT"], settings["DONE"], f"{filename[:-4]}.html"), 'w') as file :
            file.write(st)
    with open(os.path.join(settings["MAINROOT"], "csv_to_html_settings.json"), 'w') as file :
        file.write(json.dumps(settings, indent=settings["indent"]))
    st_all += "</div>\n"
    with open(os.path.join(settings["MAINROOT"], settings["DONE"], f"000_all.html"), 'w') as file :
        file.write(st_all)



