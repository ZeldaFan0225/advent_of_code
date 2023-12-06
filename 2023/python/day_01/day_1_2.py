lines = open("input.txt", "r").read().replace(r"\r", "").split("\n")

numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

sum = 0


def get_num(s):
    if s[0].isnumeric():
        return int(s[0])

    i = 1
    res = None
    for n in numbers:
        if s.startswith(n):
            res = i
            break
        i += 1
    return res


for line in lines:
    first = None
    last = None
    for i in range(0, len(line)):
        num = get_num(line[i:len(line)])
        if num is None:
            continue
        if first is None:
            first = num
        last = num
    sum += (first * 10) + last

print(f"The sum of all calibration values is: {sum}")
