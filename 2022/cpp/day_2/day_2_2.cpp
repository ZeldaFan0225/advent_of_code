#include "day_2.h"
#include <string>
#include <fstream>
#include <vector>
using namespace std;

// a - Rock
// b - Paper
// c - Scissors

// x - lose
// y - draw
// z - win

int day_2_2() {
    string line;

    ifstream MyReadFile("../day_2/input.txt");

    vector<string> game;

    int score = 0;

    while (getline (MyReadFile, line)) {
        const char opponentShape = line[0];
        const char winType = line[2];

        score += winType == 'Z' ? 6 : winType == 'Y' ? 3 : 0;

        if(opponentShape == 'A') {
            score += winType == 'Z' ? 2 : winType == 'Y' ? 1 : 3;
        } else if(opponentShape == 'B') {
            score += winType == 'Z' ? 3 : winType == 'Y' ? 2 : 1;
        } else if(opponentShape == 'C') {
            score += winType == 'Z' ? 1 : winType == 'Y' ? 3 : 2;
        }
    }

    printf("Final score: %i", score);

    return 0;
}