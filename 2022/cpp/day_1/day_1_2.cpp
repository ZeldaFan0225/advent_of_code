#include "day_1.h"
#include <string>
#include <fstream>
#include <iostream>
#include <vector>

using namespace std;

int day_1_2() {
    string line;

    ifstream MyReadFile("../day_1/input.txt");

    vector<unsigned int> current_pack;
    vector<unsigned int> packs;

    while (getline (MyReadFile, line)) {
        if(line.length() != 0) {
            int i = std::stoi(line);
            current_pack.push_back(i);
        } else {
            unsigned int pack_sum = 0;
            for(unsigned int num: current_pack) {
                pack_sum += num;
            }
            packs.push_back(pack_sum);
            current_pack.clear();
        }
    }

    MyReadFile.close();

    unsigned int largest[3] = {0,0,0};

    for(int i = 0; i < packs.size(); i++) {
        unsigned int curr = packs.data()[i];
        if(curr > largest[0]) {
            largest[2] = largest[1];
            largest[1] = largest[0];
            largest[0] = curr;
        } else if(curr > largest[1]) {
            largest[2] = largest[1];
            largest[1] = curr;
        } else if(curr > largest[2]) {
            largest[2] = curr;
        }
    }

    printf("Sum of largest 3 Packpacks: %i", largest[0] + largest[1] + largest[2]);

    return 0;
}