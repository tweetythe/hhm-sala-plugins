/**
 * Message Of The Day plugin for Haxball Headless Manager (HHM).
 * 
 * Displays a message when player joins and repeats it once in
 * every x minutes.
 */

let room = HBInit();
room.pluginSpec = {
  name: `hr/motd`,
  author: `salamini`,
  version: `1.0.0`,
  config: {
    // Message Of The Day.
    motd: `Join https://discord.gg/TeJAEWu for support.`,
    // How often to display the motd in minutes.
    // Set to 0 to disable displaying it repeatedly.
    interval: 10
  },
  dependencies: [`sav/cron`]
};

room.onPlayerJoin = function(player) {
  const motd = room.pluginSpec.config.motd;
  room.sendChat(motd, player.id);
}

if (room.pluginSpec.config.interval > 0) {
  displayMessageOnceIn(
    room.pluginSpec.config.motd,
    room.pluginSpec.config.interval
  );
}

function displayMessageOnceIn(interval, message) {
  room[`onCron${interval}Minutes`] = () => room.sendChat(message);
}