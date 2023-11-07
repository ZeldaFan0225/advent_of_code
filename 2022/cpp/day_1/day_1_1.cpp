#include "day_1.h"
#include <string>
#include <fstream>
#include <vector>

using namespace std;

int day_1_1() {
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

    unsigned int largest = 0;

    for(int i = 0; i < packs.size(); i++) {
        if(packs.data()[i] > largest) {
            largest = packs.data()[i];
        }
    }

    printf("Largest Packpack: %i", largest);

    return 0;
}