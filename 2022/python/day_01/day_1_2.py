import functools
inp = open("input.txt", "r").read().replace(r"\r\n", "").split("\n\n")

values = list(map((lambda elf: list(map((lambda food: int(food)), elf.split("\n")))), inp))

total_calories = list(map(lambda elf: functools.reduce(lambda a, b: a+b, elf), values))
total_calories.sort(reverse=True)

print(f'The sum of the fullest backpacks is {functools.reduce(lambda a, b: a+b, total_calories[0:3])}')