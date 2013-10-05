#include <Servo.h>

Servo left; //pin 5
Servo right; //pin 6
int ele_imp = 4; //input from imp
int up = 0; //window up = 1

void setup(){
  left.attach(5);
  right.attach(6);
  pinMode(ele_imp, INPUT);
  Serial.begin(9600);
}

void loop(){
  up = digitalRead(ele_imp);
  if(up){
    left.write(90);
    right.write(90);
  }else{
    left.write(1);
    right.write(1);
  }
}
