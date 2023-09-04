import numpy as np
import matplotlib.pyplot as plt

def f(x):
    return (x*3**.5-1)/(x+3**.5)

u = [2]  # u_0
N = 10     # iterations
x = np.arange(-17,11,0.01)   # def (Ox)


# ---------------------------------------------------------------------- #

for k in range(N):
    u.append(f(u[k]))
    print(f"u[{k}] = {u[k]}")

plt.plot(x, f(x), 'r-', x, x, 'k-')
ax = plt.gca()
ax.spines['right'].set_color('none')
ax.spines['top'].set_color('none')
ax.xaxis.set_ticks_position('bottom')
ax.spines['bottom'].set_position(('data',0))
ax.yaxis.set_ticks_position('left')
ax.spines['left'].set_position(('data',0))

for k in range(N-1) :
    plt.plot([u[k], u[k+1]], [u[k+1], u[k+1]], 'g-')
    plt.plot([u[k+1], u[k+1]], [u[k+1], u[k+2]], 'g-')
    plt.plot([u[k], u[k]], [0, u[k+1]], 'g--')
plt.plot([u[N-1], u[N-1]], [0, u[N]], 'g--')    # last one !

plt.annotate('$u_0$', xy=(u[0], 0), xytext=(u[0]+.1, .1),
            arrowprops=dict(arrowstyle="->",
                            connectionstyle="arc3")
            )

plt.annotate('$u_1$', xy=(u[1], 0), xytext=(u[1]+.1, .1),
            arrowprops=dict(arrowstyle="->",
                            connectionstyle="arc3")
            )

plt.title('$u_{n+1}=f(u_n)$')
plt.show()
