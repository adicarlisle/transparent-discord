# TransparentDiscord

A BetterDiscord plugin that adds customizable transparency to Discord, allowing you to see through to windows behind Discord while maintaining usability.

## Features

- Adjustable transparency levels for:
  - Overall window
  - Server list
  - Channel list
  - Chat area
  - Members list
- Maintains text readability
- Keeps settings windows and modals opaque
- Smooth transitions
- Discord-style settings panel

## Installation

### From BetterDiscord Plugin Hub
1. Install [BetterDiscord](https://betterdiscord.app/)
2. Open Discord Settings > BetterDiscord > Plugins
3. Click "Browse" and search for "TransparentDiscord"
4. Click "Install"

### Manual Installation
1. Install [BetterDiscord](https://betterdiscord.app/)
2. Download `transparent-discord.plugin.js` from the [latest release](https://github.com/adicarlisle/transparent-discord/releases)
3. Move it to your BetterDiscord plugins folder:
   - Windows: `%appdata%/BetterDiscord/plugins`
   - Linux: `~/.config/BetterDiscord/plugins`
   - macOS: `~/Library/Application Support/BetterDiscord/plugins`

## Usage

1. Enable the plugin in Discord Settings > BetterDiscord > Plugins
2. Click the gear icon next to TransparentDiscord to adjust transparency levels
3. Changes apply in real-time

## Settings

- **Window Opacity**: Controls overall window transparency
- **Servers Opacity**: Controls server list transparency
- **Channels Opacity**: Controls channel list transparency
- **Chat Opacity**: Controls chat area transparency
- **Members Opacity**: Controls members list transparency

## Development

### Project Structure
```
transparent-discord/
├── src/
│   └── plugins/
│       └── transparent-discord.plugin.js
├── docs/
│   └── README.md
├── dist/
│   └── transparent-discord.plugin.js (built)
├── LICENSE
├── package.json
└── .gitignore
```

### Building
```bash
npm install
npm run build
```

### Development with Auto-rebuild
```bash
npm run dev
```

## Support

If you encounter any issues, please:
1. Check the console (Ctrl+Shift+I) for error messages
2. [Create an issue](https://github.com/adicarlisle/transparent-discord/issues) with:
   - Error message (if any)
   - Steps to reproduce
   - Discord version
   - BetterDiscord version

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.
