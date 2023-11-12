import sympy.core, sympy.parsing.sympy_parser


def sum_poly(P, X) :
    N, Q, s = sympy.degree(P)+1, 0, 0
    for i in range(N+1) :
        L = sympy.prod([X-j for j in range(N+1) if j != i])
        s += P.subs(X, i)
        Q += sympy.Rational((-1)**(N-i), sympy.factorial(i)*sympy.factorial(N-i)) * s * L
    return sympy.factor(Q), sympy.expand(Q)



def go() :
    x = input("# Choose a symbol (defaut : x) :\n")
    x, n = sympy.symbols(x) if x else sympy.symbols('x'), sympy.symbols('n')
    html_str = html_add()
    lsP = input(f"# Enter a sequence of polynomial expressions (symbol : {x}, separator : ; ) :\n")
    lsP = [sympy.parsing.sympy_parser.parse_expr(P.strip()) if P.strip() else 0 for P in lsP.split(';')]
    lsQ = [sum_poly(P, x) for P in lsP]
    [print(f"# SUM for {P} from 0 to {n} : \n#   Factor : {Q[0].subs(x, n)}\n#   Expand : {Q[1].subs(x, n)}") for P, Q in zip(lsP, lsQ)]
    html_str = html_add(html_str, " <br>\n".join(latex_convert(P, Q, x, n) for P, Q in zip(lsP, lsQ)))
    with open("sum_poly.html", 'w') as f :
        f.write(html_str)


def latex_convert(P, Q, X, n) :
    latex_str = f"\(  \displaystyle\sum_{{ {X}=0 }}^{{ {n} }} {sympy.latex(P)} = {sympy.latex(Q[0].subs(X,n))} = {sympy.latex(Q[1].subs(X,n))} \)"
    return latex_str


def html_add(html_str:str="", html_str_include:str=""):
    html_str_default = """
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8"/> <title>sum_poly</title>
            <!-- online MathJax -->
            <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
            <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
            <!-- offline MathJax -->
            <script id="MathJax-script" async src="MathJax-master/es5/tex-mml-chtml.js"></script>
        </head>
        <body>
        <!--insert--here-->
        </body>
        </html>
        """
    if not(html_str) :
        html_str = html_str_default
    if '<!--insert--here-->' in html_str :
        html_str = html_str.replace('<!--insert--here-->', html_str_include+'\n<!--insert--here-->')
    return html_str

        

if __name__ == "__main__":
    while not(input("\n# Welcome to sum_poly !\n# Press enter to continue...")) :
        go()

