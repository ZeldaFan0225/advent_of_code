#include "day_3.h"
#include <string>
#include <fstream>
#include <vector>
#include <string.h>
#include <iostream>
using namespace std;

char similarChar(string line) {
    char similar;
    char str_length = strlen(line.c_str());
    string part_1 = "";
    string part_2 = "";

    for(int i = 0; i < str_length; i++) {
        if(i <= str_length / 2) {
            part_1.append(&line[i]);
        } else {
            part_2.append(&line[i]);
        }
    }

    outerloop:
    for(char c: part_1) {
        innerloop:
        for(char cc: part_2) {
            if(c == cc) {
                similar = c;
                goto exit;
            }
        }
    }

    exit:
    return similar;
}

int day_3_1() {
    string line;

    ifstream MyReadFile("../day_3/input.txt");

    vector<string> game;

    int score = 0;

    while (getline(MyReadFile, line)) {
        char similar = similarChar(line);

        if(isupper(similar)) {
            score += similar - 'A' + 27;
        } else {
            score += similar - 'a' + 1;
        }
    }

    printf("Final score: %i", score);

    return 0;
}