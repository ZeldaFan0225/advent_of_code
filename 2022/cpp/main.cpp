#include <iostream>
#include "day_1/day_1.h"

int main() {
    unsigned char day;
    printf("What day do you want to run?\n");
    scanf("%i", &day);

    switch(day) {
        case 1: {
            unsigned char part;
            printf("What part do you want to run (1, 2)?\n");
            scanf("%i", &part);
            printf("Running day %i part %i.\n", day, part);

            part == 1 ? day_1_1() : day_1_2();
            break;
        }
        default: {
            printf("Day not completed");
            break;
        }
    }
    return 0;
}
