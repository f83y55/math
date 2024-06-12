import random

loto_num = list(range(1,50))
loto_ch = list(range(1,11))

print("LOTO :\n", "numéros : ", sorted(random.sample(loto_num, 5)), " et nombre chance : ", random.choice(loto_ch))

