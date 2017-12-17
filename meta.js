module.exports = {
  prompts: {
    name: {
      "type": "string",
      "required": true,
      "message": "Project name"
    },
    description: {
      "type": "string",
      "required": false,
      "message": "Project description",
      "default": "A typescript project"
    },
    author: {
      "type": "string",
      "message": "Author"
    },
  },
  "completeMessage": "To get started:\n\n  cd {{destDirName}}\n  npm install\n  npm run start"
};
