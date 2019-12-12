# Script to generate new directory with files for day passed as bash argument
new_dir="day-$1"
index_file="$new_dir/index.js"
test_file="$new_dir/index.test.js"

mkdir $new_dir
touch "$new_dir/README.md"
touch "$new_dir/input.txt"
touch $index_file
touch $test_file

cat > $index_file << EOL
import { } from 'ramda';

/// Part 1

/// Part 2

export { }
EOL

cat > $test_file << EOL
import fs from 'fs';
import { } from 'ramda';
import { } from './index';

// Read in data and clean it
const txt = fs.readFileSync('./${new_dir}/input.txt', 'utf8');
const inputData; // Create input data as appropriate


test('Pass the examples for part 1', () => {
});

test('Pass the puzzle input for part 1', () => {
});


test('Pass the examples for part 2', () => {
});

test('Pass the puzzle input for part 2', () => {
});
EOL