set -e

# for macOS
# yes "" | ./node_modules/.bin/vue init . test

echo -ne '\n' | ./node_modules/.bin/vue init . test

cd test
npm install
npm run build
