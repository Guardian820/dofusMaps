# dofusMaps

## About

NodeJs script to create full quality dofus maps.

## Dependencies
- [Node.js](https://nodejs.org/en)
- [Python 3](https://www.python.org/downloads)
- [Imagemagick](http://www.imagemagick.org/script/download.php)
  On Windows tick **"Install legacy components (convert.exe etc)"** during the installation.

## Installation
**Warning**: Windows may have issues, the dependencies must be configured correctly.
On Windows you must be sure the PATH contains the entries to the Python and Imagemagick folders.

Download **dofusMaps** (open the command prompt and write `git clone https://github.com/balciseri/dofusMaps.git` or if you don't have/want to use git, download the ZIP by clicking the green Download button at the top right of this page)

Run the following command to install it:
```console
npm install
```

## Usage
Run `node ./index.js PATH/TO/DOFUS/HOME/FOLDER` in the **dofusMaps** directory to start the script.
Example:
```console
node ./index.js C:/Users/USERNAME/AppData/Local/Ankama/Dofus/
```
**Warning**: In Windows depending by the console you are using `C:\Users\USERNAME\AppData\Local\Ankama\Dofus\` may be not valid.
Use: 
- double `\\` : `C:\\Users\\USERNAME\\AppData\\Local\\Ankama\Dofus\\` 
or 
- one `/` `C:/Users/USERNAME/AppData/Local/Ankama/Dofus/`

## Contributors

- Mavvo  *(Maintainer)* - [@Balciseri](https://github.com/balciseri)
- [@blankoworld](https://github.com/blankoworld) inspired me with his [script](https://gist.githubusercontent.com/blankoworld/78b588fc6d9f58c9fd93b4ec7424cbfa/raw/1faa691036eddf8e50ead628bcd3186485b8fa23/generate_map.sh)
## License
MIT