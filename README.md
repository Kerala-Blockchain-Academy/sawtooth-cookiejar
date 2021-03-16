# sawtooth-cookiejar

CookieJar is a simple blockchain application written in JavaScript with Hyperledger Sawtooth. It provides the very basic functionality where a baker bakes or eats cookies saved in a virtual cookie jar. The features incorporated in the application are: a user can bake cookies and add it to the CookieJar, the user can eat some cookies from the CookieJar and the user can view the count of the cookies in the CookieJar. The data is stored at an 70 hex digit address derived from:

* a 6-hex character prefix (the "cookiejar" Transaction Family namespace) and
* the first 64 hex characters of the SHA-512 hash of a public key in hex.

## Prerequisites

This example uses docker-compose and Docker containers. For installing Docker Engine and Docker Compose, please follow the instructions here: https://docs.docker.com/install/

**NOTE:** The preferred OS environment is Ubuntu Linux 16.04.3 LTS x64. Although other Linux distributions which support Docker should work.

## Getting Started

1. Open a command terminal and navigate to the directory where the sawtooth-cookiejar code is present.

`cd sawtooth-cookiejar`

2. Run the following command to start the CookieJar application in Sawtooth Docker environment.

`sudo docker-compose up`

3. Open a browser and go to ​http://localhost:3000

4. Now copy the private key given in separate file named sample_pk.priv in the sawtooth-cookiejar folder and enter it in the `Private_Key` field and click the `LOGIN` button. You will be directed to the home page of CookieJar.

5. Now you can play around with the CookieJar application. Select the `Bake` option from the menu. Enter the number of cookies to be baked, in the given `Cookies` field. After that click the `BAKE` button. You will get an alert. Click `OK`.

6. To check the count of the cookies in CookieJar, select `Count` option from the menu. Click the `COUNT` button to view the count in the `Cookies` field.

7. Similarly, you can try out the Eat option and check whether the count is reducing.

8. To stop the validator and destroy the containers, type `^c` in the docker-compose window, wait for it to stop, then type

`sudo docker-compose down`

## Source

This application is based on the original cookiejar example by Dan Anderson.

