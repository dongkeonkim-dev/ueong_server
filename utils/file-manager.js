const fs = require('fs');
const path = require('path');
const { log } = require('./log');

class FileManager {
  static async deleteFile(fileName) {
    if (fileName) {
      const filePath = path.join(__dirname, '..', fileName);
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) log(`Failed to delete file at ${filePath}: ${unlinkErr.message}`);
      });
    }
  }
}

module.exports = FileManager;
