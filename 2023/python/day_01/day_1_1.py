lines = open("input.txt", "r").read().replace(r"\r", "").split("\n")

sum = 0

for line in lines:
    first = None
    last = None
    for char in line:
        if char.isnumeric():
            last = int(char)
            if first is None:
                first = int(char)
    sum += (first * 10) + last


print(f"The sum of all calibration values is: {sum}")