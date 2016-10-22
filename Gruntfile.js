module.exports = function(grunt) {

  grunt.initConfig({
    "create-windows-installer": {
      x64: {
        description: "PC Presence",
        appDirectory: "./resources",
        outputDirectory: './outputs/x64',
        authors: 'PC_Presence',
        exe: 'pc-presence.exe',
        title: "PC Presence",
        iconUrl: "http://presence.pythonanywhere.com/icon",
        setupIcon: "./icon.ico"
      },
      x48: {
        description: "PC Presence", 
        appDirectory: "./resources",
        outputDirectory: './outputs/x48',
        authors: 'PC_Presence',
        exe: 'pc-presence.exe',
        title: "PC Presence",
        iconUrl: "http://presence.pythonanywhere.com/icon",
        setupIcon: "./icon.ico"
      }
    }
  });

  grunt.loadNpmTasks('grunt-electron-installer');
};
