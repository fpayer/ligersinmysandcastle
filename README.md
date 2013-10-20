Smart Window
====================

HackMIT 2013 Project
- Top Ten Finalist
- Weather Underground API Award
- Twilio API Award

Team 
- Jae Choi (UIUC '16) |  https://github.com/asd2734
- Frank Cangialosi (UMD '16) | https://github.com/sbfcangialosi
- Franz Payer (UMD '17) | https://github.com/fpayer
- Kevin Griffiths (UMD '15) | https://github.com/vantagestryke

Smart Window makes intelligent decisions about whether or not you should have your windows open at any given time, and then automatically opens or closes them for you, using servos installed in the tracks. It continuously reads the temperature outside your house, the temperature inside your house, the desired temperature you have specified on your thermostat, precipitation amounts, humidity levels, and inclement weather notifications, and uses an algorithm to determine when it would be most sensible or energy efficient to have your windows open or closed. 

Additionally, it contains an Android application that allows you to open and close your window manually at any time. For those without smart phones or mobile data, there is also a Twilio interface that allows you to open and close your window via SMS messages. 

The Smart Window system consists of an Android application, a NodeJS server, an Ardunio to drive circuits containing a thermistor to determine ambient temperature and servos to open and close the window, and an Electric Imp chip to facilitate communication between the server and Arduino over WiFi. 
