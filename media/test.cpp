#include <iostream>

int main() {
    int count = 0;
    for (int i=0; i<1000; i++) {
        if (!(i % 3) || !(i%5)) {
            count += i;
        }
    }
    std::cout<<count<<std::endl;
    return 0;
}