# Installing Node

For this course, you will need Node installed on  your machine. Here are your instructions for various operating systems.

### MacOS and Windows

Install Node using its prebuit installer.

1. Press the "Download Node.js" button on [Node's website](https://nodejs.org/en/download/prebuilt-installer).
2. Open the downloaded file and follow the instructions.

### Linux and WSL

Install using `nvm`. Type each of these 2 lines separately into your terminal emulator, hitting enter after each one:

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

nvm install 20

You can verify that this worked by typing the following line into your terminal, hitting enter afterwards:

node -v

It should output a version number for you if this worked.

If it did not, then follow the directions at [Node's website](https://nodejs.org/en/download/prebuilt-installer), specifically the directions for installing via a Package Manager on Linux using nvm.
