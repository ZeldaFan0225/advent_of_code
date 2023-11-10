#include "day_2.h"
#include <string>
#include <fstream>
#include <vector>
using namespace std;

// a - x - Rock
// b - y - Paper
// c - z - Scissors

// 0 - lost
// 3 - draw
// 6 - win

int day_2_1() {
    string line;

    ifstream MyReadFile("../day_2/input.txt");

    vector<string> game;

    int score = 0;

    while (getline (MyReadFile, line)) {
        char ownShape = line[2];
        score += ownShape == 'X' ? 1 : ownShape == 'Y' ? 2 : 3;
        if(line == "A X" || line == "B Y" || line == "C Z") {
            score += 3;
        } else if(line == "A Y" || line == "B Z" || line == "C X") {
            score += 6;
        }
    }

    printf("Final score: %i", score);

    return 0;
}