/* Sweep
 by BARRAGAN <http://barraganstudio.com>
 This example code is in the public domain.

 modified 8 Nov 2013
 by Scott Fitzgerald
 http://www.arduino.cc/en/Tutorial/Sweep
*/

#include <Servo.h>

Servo myservo1;  // create servo object to control a servo
Servo myservo2;  // create servo object to control a servo
Servo myservo3;  // create servo object to control a servo
Servo myservo4;  // create servo object to control a servo

// twelve servo objects can be created on most boards

int pos1 = 0;    // variable to store the servo position
int targetPos1 = random(100,180);
int pos2 = 0;    // variable to store the servo position
int targetPos2 = random(100,180);
int pos3 = 0;    // variable to store the servo position
int targetPos3 = random(100,180);
int pos4 = 0;    // variable to store the servo position
int targetPos4 = random(100,180);

void setup() {
  myservo1.attach(9);  // attaches the servo on pin 9 to the servo object
  myservo2.attach(10);  // attaches the servo on pin 9 to the servo object
  myservo3.attach(5);  // attaches the servo on pin 9 to the servo object
  myservo4.attach(6);  // attaches the servo on pin 9 to the servo object
}

void loop() {
  if(pos1 < targetPos1) {
    pos1 ++;
  }else if(pos1 == targetPos1) {
    targetPos1 = random(0,180);
  }else{
    pos1 --;
  }

  if(pos2 < targetPos2) {
    pos2 ++;
  }else if(pos2 == targetPos2) {
    targetPos2 = random(0,180);
  }else{
    pos2 --;
  }

  if(pos3 < targetPos3) {
    pos3 ++;
  }else if(pos3 == targetPos3) {
    targetPos3 = random(0,180);
  }else{
    pos3 --;
  }

  if(pos4 < targetPos4) {
    pos4 ++;
  }else if(pos4 == targetPos4) {
    targetPos4 = random(0,180);
  }else{
    pos4 --;
  }

  myservo1.write(pos1);
  myservo2.write(pos2);
  myservo3.write(pos3);
  myservo4.write(pos4);
  delay(15);
  
//  for (pos1 = 0; pos1 <= targetPos1; pos1 += 1) { // goes from 0 degrees to 180 degrees
//    // in steps of 1 degree
//    
//    myservo2.write(180-pos1);// tell servo to go to position in variable 'pos'
//    delay(15);                       // waits 15ms for the servo to reach the position
//  }
//  for (pos1 = 180; pos1 >= 0; pos1 -= 1) { // goes from 180 degrees to 0 degrees
//    myservo1.write(pos1);              // tell servo to go to position in variable 'pos'
//    myservo2.write(180 - pos1);
//    delay(15);                       // waits 15ms for the servo to reach the position
//  }

}
