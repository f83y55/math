import random
n = 10
for i in range(n) :
    for j in range(n) :
        print("□" if random.random()>.5 else ".", end="|")
    print()

