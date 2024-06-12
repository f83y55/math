import random

hauteurs = ["7", "8", "9" , "10", "V", "D", "R", "1"]
couleurs = ["♠", "♣", "♥", "♦"]
jeu = [(h, c) for h in hauteurs for c in couleurs]
main = random.sample(jeu, 5)
print([f"{carte[0]} de {carte[1]}" for carte in main])

