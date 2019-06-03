set -e

yes "" | npx vue init . test

cd test
npm install
npm run build
npm run test
