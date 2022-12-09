#include <iostream>
#include <fsstream>
use namespace std

string input;

ifstream MyReadFile("filename.txt");

while (getline(MyReadFile, myText)) {
	cout << input;
}

MyReadFile.end();

void main() {
	cout << input;
}