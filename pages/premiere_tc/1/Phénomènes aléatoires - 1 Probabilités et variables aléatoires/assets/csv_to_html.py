import csv, sys, os

def list_to_html_table(ls:list=[], table_id:str="", start_column:int=1, indent:int=2) -> str :
    table = f"<table id=\"{table_id}\" class=\"mytable\">\n"
    if ls :
        table += indent*" "+"<tr class=\"table_row_tr_0\">\n"
        for j, el in enumerate(ls.pop(0), start=start_column) :
            table += 2*indent*" "+f"<th class=\"table_row_0 table_column_{j}\">{el}</th>\n"
        table += indent*" "+"</tr>\n"
        for i, row in enumerate(ls, start=1) :
            table += indent*" "+f"<tr class=\"table_row_tr_{i}\">\n"
            for j, el in enumerate(row, start=start_column) :
                table += 2*indent*" "+f"<td class=\"table_row_{i} table_column_{j}\">{el}</td>\n"
            table += indent*" "+"</tr>\n"
    table += "</table>\n"
    return table


def write_text(filename:str, st:str) :
    with open(filename, 'w') as file :
        file.write(st)

if __name__ == "__main__" :
    DELIMITER = ';'
    MAINROOT = "."        # repertoire de travail
    DONE = "done"         # sous-répertoire de sortie
    DISPLAY = True        # affiche les questions traitées dans la console 1 à 1
    try :
        os.makedirs(os.path.join(MAINROOT, DONE), exist_ok=True)
    except Exception as e :
        print(f"Exception : {e}")
    if len(sys.argv)>1 :               # les fichiers à traiter sont en argument
        filenames = [el for el in sys.argv[1:] if el.endswith(".csv")]
        separators = [el for el in sys.argv[1:] if len(el)==1]
        if separators :
            DELIMITER = separators[0]
    else :                             # sinon tous les fichiers .csv sont traités
        filenames = [el for el in os.listdir(MAINROOT) if el.endswith(".csv")]
    for filename in filenames :
        with open(filename, newline='') as csvfile:
            reader = csv.reader(csvfile, delimiter=DELIMITER)
            ls = [el for el in reader]
        st = list_to_html_table(ls, f"{filename[:-4]}")
        write_text(os.path.join(MAINROOT, DONE, f"{filename[:-4]}.html"), st)

