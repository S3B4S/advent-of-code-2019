# Script to generate new directory with files for day passed as bash argument
newDir="day-$1"
mkdir $newDir
touch "$newDir/README.md"
touch "$newDir/input.txt"
touch "$newDir/index.js"